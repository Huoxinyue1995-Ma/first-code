import Link from "next/link";
import { BatchResizer } from "@/components/batch-resizer";
import { PageFrame } from "@/components/site-chrome";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { ratioLabel } from "@/lib/image-render";
import { CUSTOM_PRESETS, PLATFORM_PAGES, customPath, platformPath } from "@/lib/platforms";

export function CustomView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.custom;
  const p = t.platform;
  return (
    <PageFrame alternate={customPath(locale === "en" ? "es" : "en")} locale={locale}>
      <main className="content-main">
        <section className="hero is-compact">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="hero-lead">{c.intro}</p>
        </section>

        <BatchResizer defaultSelected={["square-2000"]} locale={locale} platformId="custom" presets={CUSTOM_PRESETS} t={t} />

        <section aria-labelledby="sizes-title" className="content-section">
          <h2 id="sizes-title">{c.sizesTitle}</h2>
          <table className="size-table">
            <thead><tr><th>{p.colUse}</th><th>{p.colSize}</th><th>{p.colRatio}</th></tr></thead>
            <tbody>
              {CUSTOM_PRESETS.map((s) => (
                <tr key={s.id}><td>{s.label[locale]}</td><td>{s.width} × {s.height}</td><td>{ratioLabel(s.width, s.height)}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="other-title" className="content-section">
          <h2 id="other-title">{p.otherTitle}</h2>
          <ul className="platform-chips">
            {PLATFORM_PAGES.map((o) => <li key={o.id}><Link href={platformPath(locale, o)}>{o.title[locale]}</Link></li>)}
          </ul>
        </section>
      </main>
    </PageFrame>
  );
}
