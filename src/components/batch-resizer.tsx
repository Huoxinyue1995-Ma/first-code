"use client";

import { Check, Download, ImagePlus, Minus, Plus, RotateCw, ShieldCheck, Trash2, Upload, X } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, DragEvent, PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CREDIT_PACKS, MAX_BATCH_PHOTOS, MAX_FILE_MB, SIGNUP_BONUS_CREDITS, formatPrice } from "@/lib/credits";
import { type Dictionary, fmt } from "@/lib/dictionary";
import { type Locale, localePath } from "@/lib/i18n";
import {
  type Background,
  type Crop,
  DEFAULT_CROP,
  type FitMode,
  type OutputFormat,
  baseName,
  clampCrop,
  decode,
  drawFramed,
  fingerprint,
  makePreview,
  ratioLabel,
  renderToBlob,
} from "@/lib/image-render";
import type { SizePreset } from "@/lib/platforms";
import { createZipStream, saveBlob } from "@/lib/zip-stream";

const SUPPORTED = ["image/jpeg", "image/png", "image/webp"];
const CUSTOM_MIN = 100;
const CUSTOM_MAX = 6000;
const SIGNIN_CHANNEL = "image-ready-auth";

type Photo = {
  id: string;
  file: File;
  preview: string; // small object URL for thumbnails and framing
  width: number;
  height: number;
  crop: Crop;
  hash?: string;
  order: number; // keeps photos in the order they were chosen, even though they decode in parallel
};

type Size = { id: string; width: number; height: number; label: string; custom?: boolean };

type Account = { signedIn: boolean; balance?: number };

export type BatchResizerProps = {
  locale: Locale;
  t: Dictionary;
  presets: SizePreset[];
  platformId: string;
  defaultSelected?: string[];
};

function useAccount() {
  const [account, setAccount] = useState<Account | null>(null);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/credits", { cache: "no-store" });
      const data = (await response.json()) as Account;
      setAccount(data);
      return data;
    } catch {
      setAccount({ signedIn: false });
      return { signedIn: false } as Account;
    }
  }, []);
  useEffect(() => {
    void refresh();
    // Sign-in and checkout happen in another tab; refresh when this tab regains focus or is told to.
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(SIGNIN_CHANNEL) : null;
    if (channel) channel.onmessage = () => void refresh();
    return () => {
      window.removeEventListener("focus", onFocus);
      channel?.close();
    };
  }, [refresh]);
  return { account, refresh };
}

function FramingCanvas({
  photo,
  size,
  fit,
  background,
  format,
  onChange,
  dragHint,
}: {
  photo: Photo;
  size: Size;
  fit: FitMode;
  background: Background;
  format: OutputFormat;
  onChange: (crop: Crop) => void;
  dragHint: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const drag = useRef<{ x: number; y: number; crop: Crop } | null>(null);
  const [ready, setReady] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const source = Object.assign(image, { width: image.naturalWidth, height: image.naturalHeight });
    drawFramed(ctx, source, photo.crop, bounds.width, bounds.height, fit, background, format);
  }, [photo.crop, fit, background, format]);

  useEffect(() => {
    let live = true;
    setReady(false);
    const image = new Image();
    image.onload = () => {
      if (!live) return;
      imageRef.current = image;
      setReady(true);
    };
    image.src = photo.preview;
    return () => {
      live = false;
    };
  }, [photo.preview]);

  useEffect(() => {
    if (!ready) return;
    paint();
    const observer = new ResizeObserver(paint);
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [ready, paint, size.width, size.height]);

  function down(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, crop: photo.crop };
  }
  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    const start = drag.current;
    const canvas = canvasRef.current;
    if (!start || !canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const next = {
      ...start.crop,
      offsetX: start.crop.offsetX + (event.clientX - start.x) / bounds.width,
      offsetY: start.crop.offsetY + (event.clientY - start.y) / bounds.height,
    };
    onChange(clampCrop(next, photo.width, photo.height, size.width, size.height, fit));
  }

  return (
    <div className={`framing-canvas ${background === "transparent" && format === "image/png" ? "is-transparent" : ""}`} style={{ aspectRatio: `${size.width} / ${size.height}` }}>
      <canvas
        onPointerCancel={() => (drag.current = null)}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        ref={canvasRef}
      />
      {ready && <span className="drag-hint">{dragHint}</span>}
    </div>
  );
}

export function BatchResizer({ locale, t, presets, platformId, defaultSelected }: BatchResizerProps) {
  const e = t.editor;
  const inputRef = useRef<HTMLInputElement>(null);
  const urls = useRef(new Set<string>());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(defaultSelected ?? (presets[0] ? [presets[0].id] : [])));
  const [customSizes, setCustomSizes] = useState<Size[]>([]);
  const [customW, setCustomW] = useState(1200);
  const [customH, setCustomH] = useState(1200);
  const [fit, setFit] = useState<FitMode>("cover");
  const [background, setBackground] = useState<Background>("white");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewSizeId, setPreviewSizeId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [modal, setModal] = useState<null | "signin" | "credits">(null);
  const [needed, setNeeded] = useState(0);
  const [buying, setBuying] = useState<string | null>(null);
  const paidHashes = useRef(new Set<string>());
  const nextOrder = useRef(0);
  const { account, refresh } = useAccount();
  const resumeAfterAuth = useRef(false);

  const allSizes: Size[] = useMemo(
    () => [
      ...presets.map((p) => ({ id: p.id, width: p.width, height: p.height, label: p.label[locale] })),
      ...customSizes,
    ],
    [presets, customSizes, locale],
  );
  const chosenSizes = allSizes.filter((s) => selected.has(s.id));
  const editing = photos.find((p) => p.id === editingId) ?? null;
  const previewSize = chosenSizes.find((s) => s.id === previewSizeId) ?? chosenSizes[0] ?? allSizes[0];
  const unpaidCount = photos.filter((p) => !p.hash || !paidHashes.current.has(p.hash)).length;

  useEffect(() => {
    const all = urls.current;
    return () => all.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  async function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const room = MAX_BATCH_PHOTOS - photos.length;
    if (room <= 0) {
      setNotice(fmt(e.errors.tooMany, { max: MAX_BATCH_PHOTOS }));
      return;
    }
    const accepted = files.filter((f) => SUPPORTED.includes(f.type) && f.size <= MAX_FILE_MB * 1024 * 1024);
    const skipped = files.length - accepted.length;
    const take = accepted.slice(0, room);
    const messages: string[] = [];
    if (skipped) messages.push(fmt(e.errors.skipped, { n: skipped, mb: MAX_FILE_MB }));
    if (accepted.length > room) messages.push(fmt(e.errors.tooMany, { max: MAX_BATCH_PHOTOS }));
    setNotice(messages.join(" ") || null);

    setLoading((n) => n + take.length);
    // Decode a few at a time so a 100-photo drop does not freeze the page.
    const queue = take.map((file) => ({ file, order: nextOrder.current++ }));
    const workers = Array.from({ length: 3 }, async () => {
      while (queue.length) {
        const { file, order } = queue.shift()!;
        try {
          const preview = await makePreview(file);
          urls.current.add(preview.url);
          const photo: Photo = { id: crypto.randomUUID(), file, preview: preview.url, width: preview.width, height: preview.height, crop: DEFAULT_CROP, order };
          setPhotos((current) => (current.length >= MAX_BATCH_PHOTOS ? current : [...current, photo].sort((a, b) => a.order - b.order)));
          void fingerprint(file).then((hash) => setPhotos((current) => current.map((p) => (p.id === photo.id ? { ...p, hash } : p))));
        } catch {
          setNotice(fmt(e.errors.skipped, { n: 1, mb: MAX_FILE_MB }));
        } finally {
          setLoading((n) => n - 1);
        }
      }
    });
    await Promise.all(workers);
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) void addFiles(event.target.files);
    event.target.value = "";
  }
  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    void addFiles(event.dataTransfer.files);
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const target = current.find((p) => p.id === id);
      if (target) {
        URL.revokeObjectURL(target.preview);
        urls.current.delete(target.preview);
      }
      return current.filter((p) => p.id !== id);
    });
    if (editingId === id) setEditingId(null);
  }
  function clearAll() {
    photos.forEach((p) => {
      URL.revokeObjectURL(p.preview);
      urls.current.delete(p.preview);
    });
    setPhotos([]);
    setEditingId(null);
  }

  function toggleSize(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function addCustom() {
    const w = Math.round(customW);
    const h = Math.round(customH);
    if (!(w >= CUSTOM_MIN && w <= CUSTOM_MAX && h >= CUSTOM_MIN && h <= CUSTOM_MAX)) {
      setNotice(fmt(e.errors.customRange, { min: CUSTOM_MIN, max: CUSTOM_MAX }));
      return;
    }
    const id = `custom-${w}x${h}`;
    if (!allSizes.some((s) => s.id === id)) setCustomSizes((c) => [...c, { id, width: w, height: h, label: e.customSize, custom: true }]);
    setSelected((c) => new Set(c).add(id));
    setNotice(null);
  }

  function updateCrop(id: string, crop: Crop) {
    setPhotos((current) => current.map((p) => (p.id === id ? { ...p, crop } : p)));
  }

  async function ensureHashes(list: Photo[]) {
    return Promise.all(list.map(async (p) => p.hash ?? (await fingerprint(p.file))));
  }

  async function startDownload() {
    if (!photos.length) return setNotice(e.errors.noPhotos);
    if (!chosenSizes.length) return setNotice(e.errors.selectSize);
    setNotice(null);
    trackEvent("download_click", { photos: photos.length, sizes: chosenSizes.length, platform: platformId });

    const current = account?.signedIn ? account : await refresh();
    if (!current.signedIn) {
      resumeAfterAuth.current = true;
      setModal("signin");
      trackEvent("signin_prompt", { platform: platformId });
      return;
    }

    const hashes = await ensureHashes(photos);
    const response = await fetch("/api/downloads/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprints: hashes, sizes: chosenSizes.length }),
    });
    const result = (await response.json().catch(() => ({}))) as {
      ok?: boolean; code?: string; balance?: number; required?: number; charged?: number; balanceAfter?: number;
    };
    if (response.status === 401) {
      resumeAfterAuth.current = true;
      setModal("signin");
      return;
    }
    if (response.status === 402) {
      setNeeded(result.required ?? photos.length);
      setModal("credits");
      void refresh();
      trackEvent("credits_prompt", { required: result.required, balance: result.balance });
      return;
    }
    if (!response.ok || !result.ok) return setNotice(e.errors.chargeFailed);

    hashes.forEach((h) => paidHashes.current.add(h));
    void refresh();
    await buildAndSave(result.charged ?? 0);
  }

  async function buildAndSave(charged: number) {
    const total = photos.length * chosenSizes.length;
    const ext = format === "image/png" ? "png" : "jpg";
    setProgress({ done: 0, total });
    try {
      if (total === 1) {
        const bitmap = await decode(photos[0].file);
        try {
          const size = chosenSizes[0];
          const blob = await renderToBlob(bitmap, photos[0].crop, size.width, size.height, fit, background, format, quality);
          saveBlob(blob, `${baseName(photos[0].file.name)}-${size.width}x${size.height}.${ext}`);
        } finally {
          bitmap.close();
        }
        setProgress({ done: 1, total });
      } else {
        const zip = createZipStream();
        let done = 0;
        for (const photo of photos) {
          // One full-size photo in memory at a time.
          const bitmap = await decode(photo.file);
          try {
            for (const size of chosenSizes) {
              const blob = await renderToBlob(bitmap, photo.crop, size.width, size.height, fit, background, format, quality);
              const folder = chosenSizes.length > 1 ? `${size.width}x${size.height}/` : "";
              await zip.add(`${folder}${baseName(photo.file.name)}-${size.width}x${size.height}.${ext}`, blob);
              done += 1;
              setProgress({ done, total });
            }
          } finally {
            bitmap.close();
          }
        }
        saveBlob(await zip.finish(), `image-ready-${platformId}-${photos.length}-photos.zip`);
      }
      setNotice(charged ? fmt(e.done, { files: total, n: charged }) : fmt(e.doneFree, { files: total }));
      trackEvent("download_success", { photos: photos.length, sizes: chosenSizes.length, credits: charged, platform: platformId });
    } catch {
      setNotice(e.errors.exportFailed);
    } finally {
      setProgress(null);
    }
  }

  // Resume the download automatically once the user signs in (in another tab) or buys credits.
  useEffect(() => {
    if (!account?.signedIn) return;
    if (modal === "signin" && resumeAfterAuth.current) {
      resumeAfterAuth.current = false;
      setModal(null);
      void startDownload();
    } else if (modal === "credits" && (account.balance ?? 0) >= needed) {
      setModal(null);
      void startDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  async function buy(packId: string) {
    setBuying(packId);
    try {
      const response = await fetch("/api/credits/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: packId, locale, returnTo: "editor" }),
      });
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!result.checkoutUrl) throw new Error(result.error);
      trackEvent("begin_checkout", { pack: packId });
      window.open(result.checkoutUrl, "_blank", "noopener");
    } catch {
      setNotice(e.errors.chargeFailed);
    } finally {
      setBuying(null);
    }
  }

  const files = photos.length * chosenSizes.length;
  const busy = Boolean(progress);

  return (
    <div className="batch-resizer">
      {!photos.length && !loading ? (
        <section className="drop-panel" onDragOver={(ev) => ev.preventDefault()} onDrop={onDrop}>
          <span className="drop-icon"><Upload size={26} /></span>
          <h2>{e.dropTitle}</h2>
          <p>{e.dropBody}</p>
          <button className="primary-button" onClick={() => inputRef.current?.click()} type="button">
            <ImagePlus size={18} /> {e.choose}
          </button>
          <p className="drop-details">{fmt(e.limits, { max: MAX_BATCH_PHOTOS, mb: MAX_FILE_MB })}</p>
          <p className="privacy-note"><ShieldCheck size={15} /> {e.privacy}</p>
        </section>
      ) : (
        <div className="batch-grid">
          <section className="batch-photos" onDragOver={(ev) => ev.preventDefault()} onDrop={onDrop}>
            <div className="panel-title-row">
              <h2>{fmt(e.photosTitle, { n: photos.length })}{loading ? ` (+${loading})` : ""}</h2>
              <div className="panel-actions">
                <button className="ghost-button" disabled={busy || photos.length >= MAX_BATCH_PHOTOS} onClick={() => inputRef.current?.click()} type="button">
                  <Plus size={15} /> {e.addMore}
                </button>
                <button className="ghost-button" disabled={busy} onClick={clearAll} type="button">
                  <Trash2 size={15} /> {e.clearAll}
                </button>
              </div>
            </div>
            <ul className="thumb-grid">
              {photos.map((photo) => (
                <li className="thumb-card" key={photo.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={photo.file.name} src={photo.preview} />
                  <span className="thumb-name">{photo.file.name}</span>
                  <div className="thumb-actions">
                    <button disabled={busy} onClick={() => setEditingId(photo.id)} type="button">{e.adjust}</button>
                    <button aria-label={e.remove} disabled={busy} onClick={() => removePhoto(photo.id)} type="button"><X size={14} /></button>
                  </div>
                </li>
              ))}
              {Array.from({ length: loading }, (_, i) => <li className="thumb-card is-loading" key={`l${i}`} />)}
            </ul>
            <p className="privacy-note"><ShieldCheck size={15} /> {e.privacy}</p>
          </section>

          <aside className="batch-settings">
            <h2>{e.sizesTitle}</h2>
            <p className="settings-hint">{e.sizesHint}</p>
            <ul className="size-list">
              {allSizes.map((size) => (
                <li key={size.id}>
                  <label className={`size-option ${selected.has(size.id) ? "is-selected" : ""}`}>
                    <input checked={selected.has(size.id)} onChange={() => toggleSize(size.id)} type="checkbox" />
                    <span className="size-check">{selected.has(size.id) && <Check size={13} />}</span>
                    <span className="size-text">
                      <strong>{size.label}</strong>
                      <small>{size.width} × {size.height} · {ratioLabel(size.width, size.height)}</small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="custom-size-row">
              <label>{e.width}<input max={CUSTOM_MAX} min={CUSTOM_MIN} onChange={(ev) => setCustomW(Number(ev.target.value))} type="number" value={customW} /></label>
              <span>×</span>
              <label>{e.height}<input max={CUSTOM_MAX} min={CUSTOM_MIN} onChange={(ev) => setCustomH(Number(ev.target.value))} type="number" value={customH} /></label>
              <button className="ghost-button" onClick={addCustom} type="button"><Plus size={14} /> {e.addSize}</button>
            </div>

            <h3>{e.fitTitle}</h3>
            <div className="segmented">
              <button aria-pressed={fit === "cover"} onClick={() => setFit("cover")} type="button">{e.fitCover}</button>
              <button aria-pressed={fit === "contain"} onClick={() => setFit("contain")} type="button">{e.fitContain}</button>
            </div>
            <p className="settings-hint">{fit === "cover" ? e.fitCoverHint : e.fitContainHint}</p>

            <h3>{e.formatTitle}</h3>
            <div className="segmented">
              <button aria-pressed={format === "image/jpeg"} onClick={() => setFormat("image/jpeg")} type="button">JPG</button>
              <button aria-pressed={format === "image/png"} onClick={() => setFormat("image/png")} type="button">PNG</button>
            </div>
            {format === "image/jpeg" ? (
              <label className="range-label">{e.quality} <span>{Math.round(quality * 100)}%</span>
                <input max="1" min="0.6" onChange={(ev) => setQuality(Number(ev.target.value))} step="0.05" type="range" value={quality} />
              </label>
            ) : (
              fit === "contain" && (
                <div className="segmented">
                  <button aria-pressed={background === "white"} onClick={() => setBackground("white")} type="button">{e.white}</button>
                  <button aria-pressed={background === "transparent"} onClick={() => setBackground("transparent")} type="button">{e.transparent}</button>
                </div>
              )
            )}

            <div className="download-box">
              <p className="download-summary">{fmt(e.summary, { photos: photos.length, sizes: chosenSizes.length, files })}</p>
              <p className="download-cost">
                {unpaidCount ? fmt(e.cost, { n: unpaidCount }) : e.costFree}
                {account?.signedIn && <span> · {fmt(e.balance, { n: account.balance ?? 0 })}</span>}
              </p>
              <button className="download-button" disabled={busy || !photos.length || !chosenSizes.length || loading > 0} onClick={() => void startDownload()} type="button">
                <Download size={18} />
                {progress ? fmt(e.preparing, { done: progress.done, total: progress.total }) : files > 1 ? e.downloadZip : e.download}
              </button>
              {progress && <progress max={progress.total} value={progress.done} />}
            </div>
          </aside>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button aria-label="Close" onClick={() => setNotice(null)} type="button"><X size={16} /></button>
        </div>
      )}

      {editing && previewSize && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={e.previewTitle}>
          <section className="framing-modal">
            <div className="panel-title-row">
              <h2>{e.previewTitle}</h2>
              <button className="icon-button" onClick={() => setEditingId(null)} type="button" aria-label={e.close}><X size={18} /></button>
            </div>
            {chosenSizes.length > 1 && (
              <label className="preview-size-select">{e.previewFor}
                <select onChange={(ev) => setPreviewSizeId(ev.target.value)} value={previewSize.id}>
                  {chosenSizes.map((s) => <option key={s.id} value={s.id}>{s.label} · {s.width} × {s.height}</option>)}
                </select>
              </label>
            )}
            <FramingCanvas
              background={background}
              dragHint={e.dragHint}
              fit={fit}
              format={format}
              onChange={(crop) => updateCrop(editing.id, crop)}
              photo={editing}
              size={previewSize}
            />
            <div className="framing-controls">
              <label className="zoom-row">{e.zoom}
                <Minus size={14} />
                <input
                  max="4" min="1" step="0.01" type="range" value={editing.crop.zoom}
                  onChange={(ev) => updateCrop(editing.id, clampCrop({ ...editing.crop, zoom: Number(ev.target.value) }, editing.width, editing.height, previewSize.width, previewSize.height, fit))}
                />
                <Plus size={14} />
              </label>
              <button className="ghost-button" onClick={() => updateCrop(editing.id, { ...editing.crop, rotation: (editing.crop.rotation + 90) % 360, offsetX: 0, offsetY: 0 })} type="button"><RotateCw size={15} /> {e.rotate}</button>
              <button className="ghost-button" onClick={() => updateCrop(editing.id, DEFAULT_CROP)} type="button">{e.reset}</button>
              <button className="primary-button" onClick={() => setEditingId(null)} type="button">{e.close}</button>
            </div>
          </section>
        </div>
      )}

      {modal === "signin" && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={e.signInTitle}>
          <section className="pro-modal">
            <button className="modal-close" onClick={() => setModal(null)} type="button" aria-label={e.cancel}><X size={18} /></button>
            <h2>{e.signInTitle}</h2>
            <p>{fmt(e.signInBody, { n: SIGNUP_BONUS_CREDITS })}</p>
            <div className="pro-modal-actions">
              <a className="primary-button" href={`${localePath(locale, "/login")}?next=${encodeURIComponent(localePath(locale, "/login/done"))}`} rel="opener" target="_blank">
                {t.nav.signIn}
              </a>
              <button className="text-button" onClick={() => setModal(null)} type="button">{e.cancel}</button>
            </div>
            <p className="modal-footnote">{e.signInWaiting}</p>
          </section>
        </div>
      )}

      {modal === "credits" && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={e.creditsTitle}>
          <section className="pro-modal credits-modal">
            <button className="modal-close" onClick={() => setModal(null)} type="button" aria-label={e.cancel}><X size={18} /></button>
            <h2>{e.creditsTitle}</h2>
            <p>{fmt(e.creditsBody, { need: needed, have: account?.balance ?? 0 })}</p>
            <div className="pack-row">
              {Object.values(CREDIT_PACKS).map((pack) => (
                <button className={`pack-button ${pack.featured ? "is-featured" : ""}`} disabled={Boolean(buying)} key={pack.id} onClick={() => void buy(pack.id)} type="button">
                  <strong>{formatPrice(pack.priceCents)}</strong>
                  <span>{fmt(t.pricing.credits, { n: pack.credits })}</span>
                </button>
              ))}
            </div>
            <p className="modal-footnote">{e.creditsNote}</p>
          </section>
        </div>
      )}

      <input accept={SUPPORTED.join(",")} className="file-input" multiple onChange={onInput} ref={inputRef} type="file" />
    </div>
  );
}
