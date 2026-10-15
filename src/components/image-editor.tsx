"use client";

import {
  ChevronDown,
  Download,
  FileImage,
  ImagePlus,
  LockKeyhole,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  RotateCw,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { zipSync } from "fflate";
import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type PresetId = "amazon" | "shopify" | "tiktok" | "custom";
type OutputFormat = "image/jpeg" | "image/png";

type Crop = {
  zoom: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
};

type ImageItem = {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
  crop: Crop;
};

const MAX_FILES = 10;
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_CROP: Crop = { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0 };
const BATCH_PRICE = "$3.99";
const CHECKOUT_SESSION_STORAGE_KEY = "image-ready-batch-checkout-session";

const PRESETS: Array<{ id: PresetId; name: string; detail: string; width: number; height: number }> = [
  { id: "amazon", name: "Amazon", detail: "Product image", width: 2000, height: 2000 },
  { id: "shopify", name: "Shopify", detail: "Product image", width: 2048, height: 2048 },
  { id: "tiktok", name: "TikTok Shop", detail: "Product image", width: 1080, height: 1080 },
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getCropLimits(crop: Crop, imageWidth: number, imageHeight: number, targetWidth: number, targetHeight: number) {
  const turned = Math.abs(crop.rotation % 180) === 90;
  const availableWidth = turned ? imageHeight : imageWidth;
  const availableHeight = turned ? imageWidth : imageHeight;
  const baseScale = Math.max(targetWidth / availableWidth, targetHeight / availableHeight);
  const drawnWidth = availableWidth * baseScale * crop.zoom;
  const drawnHeight = availableHeight * baseScale * crop.zoom;

  return {
    maxX: Math.max(0, (drawnWidth - targetWidth) / 2) / targetWidth,
    maxY: Math.max(0, (drawnHeight - targetHeight) / 2) / targetHeight,
  };
}

function keepCropVisible(crop: Crop, item: ImageItem, targetWidth: number, targetHeight: number): Crop {
  const limits = getCropLimits(crop, item.width, item.height, targetWidth, targetHeight);
  return {
    ...crop,
    zoom: clamp(crop.zoom, 1, 3),
    offsetX: clamp(crop.offsetX, -limits.maxX, limits.maxX),
    offsetY: clamp(crop.offsetY, -limits.maxY, limits.maxY),
  };
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("This image could not be read."));
    image.src = url;
  });
}

function cleanFileName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "product-image";
}

function formatBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(bytes > 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function drawCrop(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  crop: Crop,
  targetWidth: number,
  targetHeight: number,
  outputFormat: OutputFormat,
) {
  context.clearRect(0, 0, targetWidth, targetHeight);
  if (outputFormat === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, targetWidth, targetHeight);
  }

  const turned = Math.abs(crop.rotation % 180) === 90;
  const availableWidth = turned ? image.naturalHeight : image.naturalWidth;
  const availableHeight = turned ? image.naturalWidth : image.naturalHeight;
  const scale = Math.max(targetWidth / availableWidth, targetHeight / availableHeight) * crop.zoom;
  const limits = getCropLimits(crop, image.naturalWidth, image.naturalHeight, targetWidth, targetHeight);
  const offsetX = clamp(crop.offsetX, -limits.maxX, limits.maxX) * targetWidth;
  const offsetY = clamp(crop.offsetY, -limits.maxY, limits.maxY) * targetHeight;

  context.save();
  context.translate(targetWidth / 2 + offsetX, targetHeight / 2 + offsetY);
  context.rotate((crop.rotation * Math.PI) / 180);
  context.drawImage(
    image,
    (-image.naturalWidth * scale) / 2,
    (-image.naturalHeight * scale) / 2,
    image.naturalWidth * scale,
    image.naturalHeight * scale,
  );
  context.restore();
}

function CropCanvas({
  item,
  targetWidth,
  targetHeight,
  outputFormat,
  onCropChange,
}: {
  item: ImageItem;
  targetWidth: number;
  targetHeight: number;
  outputFormat: OutputFormat;
  onCropChange: (crop: Crop) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragStart = useRef<{ x: number; y: number; crop: Crop } | null>(null);
  const [loaded, setLoaded] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(bounds.width * pixelRatio);
    canvas.height = Math.round(bounds.height * pixelRatio);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    drawCrop(context, image, item.crop, bounds.width, bounds.height, outputFormat);
  }, [item.crop, outputFormat]);

  useEffect(() => {
    let current = true;
    setLoaded(false);
    loadImage(item.url)
      .then((image) => {
        if (!current) return;
        imageRef.current = image;
        setLoaded(true);
      })
      .catch(() => setLoaded(false));
    return () => {
      current = false;
    };
  }, [item.url]);

  useEffect(() => {
    if (!loaded) return;
    paint();
    const observer = new ResizeObserver(paint);
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [loaded, paint]);

  function startDrag(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, crop: item.crop };
  }

  function moveDrag(event: ReactPointerEvent<HTMLCanvasElement>) {
    const startingPoint = dragStart.current;
    const canvas = canvasRef.current;
    if (!startingPoint || !canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const proposed = {
      ...startingPoint.crop,
      offsetX: startingPoint.crop.offsetX + (event.clientX - startingPoint.x) / bounds.width,
      offsetY: startingPoint.crop.offsetY + (event.clientY - startingPoint.y) / bounds.height,
    };
    onCropChange(keepCropVisible(proposed, item, targetWidth, targetHeight));
  }

  function stopDrag() {
    dragStart.current = null;
  }

  return (
    <div className="canvas-shell" style={{ aspectRatio: `${targetWidth} / ${targetHeight}` }}>
      <canvas
        aria-label="Image crop preview. Drag the image to reposition it."
        className={loaded ? "crop-canvas" : "crop-canvas is-loading"}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        ref={canvasRef}
      />
      {!loaded && <span className="canvas-loading">Preparing preview</span>}
      {loaded && <span className="drag-hint">Drag to position</span>}
    </div>
  );
}

export function ImageEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef(new Set<string>());
  const [items, setItems] = useState<ImageItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [presetId, setPresetId] = useState<PresetId>("amazon");
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(1200);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [showProNotice, setShowProNotice] = useState(false);
  const [checkoutSessionId, setCheckoutSessionId] = useState<string | null>(null);
  const [isBatchPaid, setIsBatchPaid] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const activeItem = items.find((item) => item.id === activeId) || items[0] || null;
  const activePreset = PRESETS.find((preset) => preset.id === presetId);
  const targetWidth = presetId === "custom" ? customWidth : activePreset?.width || 2000;
  const targetHeight = presetId === "custom" ? customHeight : activePreset?.height || 2000;
  const targetLabel = presetId === "custom" ? "custom" : activePreset?.name.toLowerCase() || "image";
  const aspectLabel = `${targetWidth} x ${targetHeight}`;

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    const storedSessionId = window.sessionStorage.getItem(CHECKOUT_SESSION_STORAGE_KEY);
    if (storedSessionId) setCheckoutSessionId(storedSessionId);
  }, []);

  const checkBatchPayment = useCallback(async (showError = true) => {
    if (!checkoutSessionId) return false;
    setIsCheckingPayment(true);
    try {
      const response = await fetch(`/api/verify-checkout-session?session_id=${encodeURIComponent(checkoutSessionId)}`, {
        cache: "no-store",
      });
      const result = await response.json() as { paid?: boolean; redeemed?: boolean; error?: string };
      if (result.paid && !result.redeemed) {
        setIsBatchPaid(true);
        setNotice("Payment confirmed. Your batch ZIP is ready to download.");
        return true;
      }
      if (result.redeemed) {
        window.sessionStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
        setCheckoutSessionId(null);
        setIsBatchPaid(false);
        if (showError) setNotice("This batch purchase has already been used.");
        return false;
      }
      if (showError) setNotice("We could not confirm payment yet. Finish checkout, then try again.");
      return false;
    } catch {
      if (showError) setNotice("We could not confirm payment. Please try again.");
      return false;
    } finally {
      setIsCheckingPayment(false);
    }
  }, [checkoutSessionId]);

  useEffect(() => {
    const onFocus = () => { void checkBatchPayment(false); };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [checkBatchPayment]);

  const updateActiveCrop = useCallback((crop: Crop) => {
    setItems((currentItems) => currentItems.map((item) => (item.id === activeId ? { ...item, crop } : item)));
  }, [activeId]);

  const addFiles = useCallback(async (files: File[]) => {
    setNotice(null);
    const remaining = Math.max(0, MAX_FILES - items.length);
    if (!remaining) {
      setNotice(`You can work with up to ${MAX_FILES} images at a time.`);
      return;
    }

    const accepted = files.slice(0, remaining).filter((file) => SUPPORTED_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE);
    if (accepted.length !== files.slice(0, remaining).length) {
      setNotice("Only JPG, PNG, or WebP images up to 25 MB were added.");
    }
    if (files.length > remaining) {
      setNotice(`Only the first ${remaining} image${remaining === 1 ? "" : "s"} were added.`);
    }
    if (!accepted.length) return;

    const decoded = await Promise.all(
      accepted.map(async (file) => {
        const url = URL.createObjectURL(file);
        objectUrls.current.add(url);
        try {
          const image = await loadImage(url);
          return {
            id: crypto.randomUUID(),
            file,
            url,
            width: image.naturalWidth,
            height: image.naturalHeight,
            crop: DEFAULT_CROP,
          } as ImageItem;
        } catch {
          URL.revokeObjectURL(url);
          objectUrls.current.delete(url);
          return null;
        }
      }),
    );
    const valid = decoded.filter((item): item is ImageItem => item !== null);
    if (!valid.length) {
      setNotice("We could not read those images. Please choose a JPG, PNG, or WebP file.");
      return;
    }
    setItems((currentItems) => [...currentItems, ...valid]);
    setActiveId((current) => current || valid[0].id);
  }, [items.length]);

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []);
    void addFiles(selected);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void addFiles(Array.from(event.dataTransfer.files));
  }

  function removeItem(id: string) {
    const found = items.find((item) => item.id === id);
    if (found) {
      URL.revokeObjectURL(found.url);
      objectUrls.current.delete(found.url);
    }
    const remaining = items.filter((item) => item.id !== id);
    setItems(remaining);
    if (activeId === id) setActiveId(remaining[0]?.id || null);
  }

  function resetActive() {
    if (!activeItem) return;
    updateActiveCrop(DEFAULT_CROP);
  }

  function rotateActive() {
    if (!activeItem) return;
    const next = keepCropVisible(
      { ...activeItem.crop, rotation: (activeItem.crop.rotation + 90) % 360 },
      activeItem,
      targetWidth,
      targetHeight,
    );
    updateActiveCrop(next);
  }

  function selectPreset(id: PresetId) {
    setPresetId(id);
    if (!activeItem) return;
    const preset = PRESETS.find((candidate) => candidate.id === id);
    const width = preset?.width || customWidth;
    const height = preset?.height || customHeight;
    updateActiveCrop(keepCropVisible(activeItem.crop, activeItem, width, height));
  }

  function setZoom(zoom: number) {
    if (!activeItem) return;
    updateActiveCrop(keepCropVisible({ ...activeItem.crop, zoom }, activeItem, targetWidth, targetHeight));
  }

  async function buildBlob(item: ImageItem) {
    const image = await loadImage(item.url);
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this image.");
    drawCrop(context, image, item.crop, targetWidth, targetHeight, format);
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("The image could not be exported."))), format, quality);
    });
  }

  function saveBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function buildBatchZip() {
    const extension = format === "image/png" ? "png" : "jpg";
    const entries: Record<string, Uint8Array> = {};
    for (const [index, item] of items.entries()) {
      const blob = await buildBlob(item);
      const prefix = `${String(index + 1).padStart(2, "0")}-${cleanFileName(item.file.name)}`;
      entries[`${prefix}-${targetLabel}-${targetWidth}x${targetHeight}.${extension}`] = new Uint8Array(await blob.arrayBuffer());
    }
    return new Blob([zipSync(entries, { level: 6 })], { type: "application/zip" });
  }

  async function startBatchCheckout() {
    if (isStartingCheckout) return;
    const checkoutWindow = window.open("about:blank", "_blank");
    setIsStartingCheckout(true);
    setNotice(null);
    try {
      const response = await fetch("/api/create-checkout-session", { method: "POST" });
      const result = await response.json() as { checkoutUrl?: string; sessionId?: string; error?: string };
      if (!response.ok || !result.checkoutUrl || !result.sessionId) {
        checkoutWindow?.close();
        throw new Error(result.error || "Checkout is not available yet.");
      }
      window.sessionStorage.setItem(CHECKOUT_SESSION_STORAGE_KEY, result.sessionId);
      setCheckoutSessionId(result.sessionId);
      checkoutWindow?.location.replace(result.checkoutUrl);
      if (!checkoutWindow) window.location.assign(result.checkoutUrl);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Checkout could not be started. Please try again.");
    } finally {
      setIsStartingCheckout(false);
    }
  }

  function resetBatchCheckout() {
    window.sessionStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
    setCheckoutSessionId(null);
    setIsBatchPaid(false);
    setNotice(null);
  }

  async function downloadBatch() {
    if (!checkoutSessionId || !isBatchPaid || isExporting) {
      setShowProNotice(true);
      return;
    }
    setIsExporting(true);
    setNotice(null);
    try {
      // Build the ZIP before redeeming payment so an export error never consumes a purchase.
      const zip = await buildBatchZip();
      const response = await fetch("/api/redeem-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: checkoutSessionId }),
      });
      const result = await response.json() as { redeemed?: boolean; error?: string };
      if (!response.ok || !result.redeemed) throw new Error(result.error || "This batch purchase is no longer available.");
      saveBlob(zip, `image-ready-${targetLabel}-${targetWidth}x${targetHeight}.zip`);
      window.sessionStorage.removeItem(CHECKOUT_SESSION_STORAGE_KEY);
      setCheckoutSessionId(null);
      setIsBatchPaid(false);
      setNotice("Your batch ZIP is ready. Your original images stayed in this browser.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The batch download could not be created. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  async function downloadImages() {
    if (!items.length || isExporting) return;
    if (items.length > 1) {
      if (isBatchPaid) {
        await downloadBatch();
        return;
      }
      setShowProNotice(true);
      return;
    }
    setIsExporting(true);
    setNotice(null);
    try {
      const extension = format === "image/png" ? "png" : "jpg";
      const blob = await buildBlob(items[0]);
      saveBlob(blob, `${cleanFileName(items[0].file.name)}-${targetLabel}-${targetWidth}x${targetHeight}.${extension}`);
      setNotice("Your download is ready. Your original images stayed in this browser.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The download could not be created. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  const selectionSummary = useMemo(() => {
    if (!items.length) return "No images selected";
    return `${items.length} image${items.length === 1 ? "" : "s"} selected`;
  }, [items.length]);

  return (
    <main className="tool-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Image Ready home">
          <span className="brand-mark"><Maximize2 size={18} strokeWidth={2.4} /></span>
          <span>Image Ready</span>
        </Link>
        <div className="local-pill"><LockKeyhole size={14} /> Local processing</div>
        <nav aria-label="Footer links" className="header-nav">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </header>

      <section className="tool-intro" aria-labelledby="tool-title">
        <p className="eyebrow">Product images, sized for where they sell</p>
        <h1 id="tool-title">Crop once. Publish everywhere.</h1>
        <p>Prepare Amazon, Shopify, and TikTok Shop product images without uploading your originals.</p>
      </section>

      {!items.length ? (
        <section
          className="drop-panel"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          aria-label="Choose images to edit"
        >
          <div className="drop-icon"><Upload size={28} /></div>
          <h2>Start with your product images</h2>
          <p>Drag images here, or choose them from your device.</p>
          <button className="primary-button" onClick={() => inputRef.current?.click()} type="button">
            <ImagePlus size={18} /> Choose images
          </button>
          <p className="drop-details">JPG, PNG, WebP · Up to 10 images · 25 MB each</p>
          <div className="privacy-note"><ShieldCheck size={17} /><span>Your files are handled in this browser only.</span></div>
        </section>
      ) : (
        <section className="editor-grid" aria-label="Image editor">
          <aside className="editor-panel image-panel">
            <div className="panel-title-row">
              <div>
                <p className="panel-kicker">Images</p>
                <h2>{selectionSummary}</h2>
              </div>
              <button className="icon-button" onClick={() => inputRef.current?.click()} type="button" aria-label="Add images" title="Add images">
                <Plus size={18} />
              </button>
            </div>
            <div className="thumb-list">
              {items.map((item) => (
                <button
                  className={`thumb-row ${activeItem?.id === item.id ? "is-active" : ""}`}
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  type="button"
                >
                  <img alt="" src={item.url} />
                  <span className="thumb-copy"><strong>{item.file.name}</strong><small>{item.width} x {item.height}</small></span>
                  <span
                    aria-label={`Remove ${item.file.name}`}
                    className="remove-thumb"
                    onClick={(event) => { event.stopPropagation(); removeItem(item.id); }}
                    role="button"
                    tabIndex={0}
                  ><X size={15} /></span>
                </button>
              ))}
            </div>
            <p className="storage-note"><LockKeyhole size={14} /> Images are never uploaded.</p>
          </aside>

          <section className="workspace" aria-label="Crop workspace">
            <div className="workspace-topbar">
              <div><p className="panel-kicker">Preview</p><strong>{aspectLabel} px</strong></div>
              <div className="workspace-actions">
                <button className="icon-button" onClick={rotateActive} type="button" aria-label="Rotate image" title="Rotate image"><RotateCw size={17} /></button>
                <button className="icon-button" onClick={resetActive} type="button" aria-label="Reset crop" title="Reset crop"><RotateCcw size={17} /></button>
              </div>
            </div>
            {activeItem && <CropCanvas item={activeItem} targetWidth={targetWidth} targetHeight={targetHeight} outputFormat={format} onCropChange={updateActiveCrop} />}
            <div className="workspace-caption"><span>Drag to reposition</span><span>Use the slider to zoom</span></div>
          </section>

          <aside className="editor-panel settings-panel">
            <div>
              <p className="panel-kicker">Output</p>
              <h2>Choose a size</h2>
            </div>
            <div className="preset-list" role="radiogroup" aria-label="Output size">
              {PRESETS.map((preset) => (
                <button
                  aria-checked={presetId === preset.id}
                  className={`preset-button ${presetId === preset.id ? "is-selected" : ""}`}
                  key={preset.id}
                  onClick={() => selectPreset(preset.id)}
                  role="radio"
                  type="button"
                >
                  <span><strong>{preset.name}</strong><small>{preset.detail}</small></span>
                  <span className="preset-size">{preset.width}<br />{preset.height}</span>
                </button>
              ))}
              <button
                aria-checked={presetId === "custom"}
                className={`preset-button ${presetId === "custom" ? "is-selected" : ""}`}
                onClick={() => selectPreset("custom")}
                role="radio"
                type="button"
              >
                <span><strong>Custom</strong><small>Your own size</small></span>
                <ChevronDown size={17} />
              </button>
            </div>
            {presetId === "custom" && (
              <div className="custom-size">
                <label>Width<input aria-label="Custom width" max="6000" min="100" onChange={(event) => setCustomWidth(clamp(Number(event.target.value) || 100, 100, 6000))} type="number" value={customWidth} /></label>
                <span>x</span>
                <label>Height<input aria-label="Custom height" max="6000" min="100" onChange={(event) => setCustomHeight(clamp(Number(event.target.value) || 100, 100, 6000))} type="number" value={customHeight} /></label>
              </div>
            )}
            <div className="setting-divider" />
            <label className="setting-label" htmlFor="zoom">Zoom <span>{Math.round((activeItem?.crop.zoom || 1) * 100)}%</span></label>
            <div className="zoom-control"><Minus size={15} /><input id="zoom" max="3" min="1" onChange={(event) => setZoom(Number(event.target.value))} step="0.01" type="range" value={activeItem?.crop.zoom || 1} /><Plus size={15} /></div>
            <div className="setting-divider" />
            <label className="setting-label" htmlFor="format">File type</label>
            <div className="select-wrap"><select id="format" onChange={(event) => setFormat(event.target.value as OutputFormat)} value={format}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select><ChevronDown size={16} /></div>
            {format === "image/jpeg" && <><label className="setting-label" htmlFor="quality">JPG quality <span>{Math.round(quality * 100)}%</span></label><input className="quality-range" id="quality" max="1" min="0.6" onChange={(event) => setQuality(Number(event.target.value))} step="0.05" type="range" value={quality} /></>}
            <button className="download-button" disabled={isExporting} onClick={() => void downloadImages()} type="button">
              <Download size={18} /> {isExporting ? "Preparing download..." : items.length > 1 ? isBatchPaid ? "Download paid batch" : `Unlock batch for ${BATCH_PRICE}` : "Download image"}
            </button>
            <p className="format-note"><FileImage size={14} /> {items.length > 1 ? `${BATCH_PRICE} · One ZIP · Up to ${MAX_FILES} images` : `${aspectLabel} px`} · {format === "image/jpeg" ? "JPG" : "PNG"}</p>
          </aside>
        </section>
      )}

      {notice && <div className="toast" role="status"><span>{notice}</span><button aria-label="Dismiss message" onClick={() => setNotice(null)} type="button"><X size={16} /></button></div>}
      {showProNotice && (
        <div className="modal-backdrop" onMouseDown={() => setShowProNotice(false)} role="presentation">
          <section aria-labelledby="pro-title" aria-modal="true" className="pro-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog">
            <button aria-label="Close batch compression message" className="modal-close" onClick={() => setShowProNotice(false)} type="button"><X size={18} /></button>
            <div className="pro-icon"><Maximize2 size={23} /></div>
            <p className="eyebrow">Batch download</p>
            <h2 id="pro-title">One batch. One ZIP. {BATCH_PRICE}.</h2>
            <p>Export up to {MAX_FILES} processed images in one ZIP. Checkout opens securely in Stripe; your original image files never leave this browser.</p>
            <div className="pro-modal-actions">
              {isBatchPaid ? (
                <button className="primary-button" onClick={() => { setShowProNotice(false); void downloadBatch(); }} type="button">Download paid batch</button>
              ) : checkoutSessionId ? (
                <>
                  <button className="primary-button" disabled={isCheckingPayment} onClick={() => void checkBatchPayment()} type="button">{isCheckingPayment ? "Checking payment..." : "I've paid - unlock batch"}</button>
                  <button className="text-button" onClick={resetBatchCheckout} type="button">Start a new checkout</button>
                </>
              ) : (
                <button className="primary-button" disabled={isStartingCheckout} onClick={() => void startBatchCheckout()} type="button">{isStartingCheckout ? "Opening checkout..." : `Pay ${BATCH_PRICE}`}</button>
              )}
              <button className="text-button" onClick={() => setShowProNotice(false)} type="button">Keep editing</button>
            </div>
            <Link className="modal-details-link" href="/pricing">See pricing details</Link>
          </section>
        </div>
      )}
      <input accept="image/jpeg,image/png,image/webp" className="file-input" multiple onChange={handleInput} ref={inputRef} type="file" />

      <footer className="site-footer">
        <span>Built for product teams that keep their images private.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div>
      </footer>
    </main>
  );
}
