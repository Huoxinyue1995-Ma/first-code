import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { PageFrame } from "@/components/site-chrome";
import { getCurrentUser, safeReturnPath } from "@/lib/auth";
import { SIGNUP_BONUS_CREDITS } from "@/lib/credits";
import { fmt, getDictionary } from "@/lib/dictionary";
import { type Locale, localePath } from "@/lib/i18n";

export async function LoginView({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string | string[] | undefined> }) {
  const t = getDictionary(locale);
  const l = t.login;
  const fallback = localePath(locale, "/account");
  const nextParam = typeof searchParams.next === "string" ? searchParams.next : null;
  const next = nextParam ? safeReturnPath(nextParam, locale) : fallback;
  const errorKey = typeof searchParams.error === "string" ? searchParams.error : "";

  if (await getCurrentUser()) redirect(next);

  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/login")} locale={locale}>
      <main className="content-main narrow">
        <section className="hero is-compact">
          <p className="eyebrow">{l.eyebrow}</p>
          <h1>{l.title}</h1>
          <p className="hero-lead">{fmt(l.lead, { n: SIGNUP_BONUS_CREDITS })}</p>
        </section>
        {l.errors[errorKey] && <p className="auth-error" role="alert">{fmt(l.errors[errorKey], { n: 0 })}</p>}
        <div className="auth-card">
          <LoginForm l={l} locale={locale} next={next} />
        </div>
        <p className="auth-footnote">
          {l.agreePrefix} <Link href={localePath(locale, "/terms")}>{l.terms}</Link> {l.agreeAnd} <Link href={localePath(locale, "/privacy")}>{l.privacy}</Link>.
        </p>
      </main>
    </PageFrame>
  );
}
