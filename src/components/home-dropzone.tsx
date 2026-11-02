"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DropPanel, SUPPORTED } from "@/components/batch-resizer";
import { trackEvent } from "@/lib/analytics";
import { MAX_BATCH_PHOTOS, MAX_FILE_MB } from "@/lib/credits";
import { type Dictionary, fmt } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { handOffPhotos } from "@/lib/photo-handoff";
import { PLATFORM_PAGES, customPath, platformPath } from "@/lib/platforms";

// Home page upload: drop photos first, then pick a platform. The photos are handed to that tool page,
// which opens with them already added.
export function HomeDropzone({ locale, t }: { locale: Locale; t: Dictionary }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [skipped, setSkipped] = useState(0);
  const h = t.home;

  function accept(list: FileList | null) {
    const all = Array.from(list ?? []);
    const ok = all.filter((f) => SUPPORTED.includes(f.type) && f.size <= MAX_FILE_MB * 1024 * 1024).slice(0, MAX_BATCH_PHOTOS);
    setSkipped(all.length - ok.length);
    setFiles(ok);
  }

  function open(href: string, tool: string) {
    handOffPhotos(files);
    trackEvent("home_handoff", { photos: files.length, platform: tool });
    router.push(href);
  }

  return (
    <div className="batch-resizer home-dropzone">
      {files.length ? (
        <section className="handoff-panel" aria-live="polite">
          <h2>{fmt(h.dropReady, { n: files.length })}</h2>
          {skipped > 0 && <p className="settings-hint">{fmt(h.dropSkipped, { n: skipped, max: MAX_BATCH_PHOTOS, mb: MAX_FILE_MB })}</p>}
          <p>{h.dropPick}</p>
          <ul className="handoff-grid">
            {PLATFORM_PAGES.map((page) => (
              <li key={page.id}>
                <button onClick={() => open(platformPath(locale, page), page.id)} type="button">
                  {page.title[locale]} <ArrowRight size={14} />
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => open(customPath(locale), "custom")} type="button">
                {h.customTitle} <ArrowRight size={14} />
              </button>
            </li>
          </ul>
          <div className="handoff-footer">
            <p className="privacy-note"><ShieldCheck size={15} /> {t.editor.privacy}</p>
            <button className="text-button" onClick={() => setFiles([])} type="button">{h.dropChange}</button>
          </div>
        </section>
      ) : (
        <DropPanel e={t.editor} onChoose={() => inputRef.current?.click()} onDropFiles={accept} />
      )}
      {files.length === 0 && skipped > 0 && <p className="settings-hint">{fmt(h.dropSkipped, { n: skipped, max: MAX_BATCH_PHOTOS, mb: MAX_FILE_MB })}</p>}
      <input
        accept={SUPPORTED.join(",")}
        className="file-input"
        multiple
        onChange={(ev) => {
          accept(ev.target.files);
          ev.target.value = "";
        }}
        ref={inputRef}
        type="file"
      />
    </div>
  );
}
