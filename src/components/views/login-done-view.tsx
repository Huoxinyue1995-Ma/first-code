import Link from "next/link";
import { NotifyEditorTab } from "@/components/notify-editor-tab";
import { PageFrame } from "@/components/site-chrome";
import { type Locale, localePath } from "@/lib/i18n";

const COPY = {
  en: { title: "You're signed in.", body: "Go back to your Resizet tab. Your photos are still there and the download will continue.", link: "Open Resizet" },
  es: { title: "Has iniciado sesión.", body: "Vuelve a tu pestaña de Resizet. Tus fotos siguen ahí y la descarga continuará.", link: "Abrir Resizet" },
};

// Landing page for sign-ins started from the editor (opened in a new tab).
export function LoginDoneView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/login/done")} locale={locale}>
      <main className="content-main narrow">
        <NotifyEditorTab closeSelf />
        <section className="hero is-compact">
          <h1>{c.title}</h1>
          <p className="hero-lead">{c.body}</p>
          <Link className="plan-button" href={localePath(locale, "/")}>{c.link}</Link>
        </section>
      </main>
    </PageFrame>
  );
}
