import Link from "next/link";
import { redirect } from "next/navigation";
import { EmailLoginForm } from "@/components/email-login-form";
import { PageFrame } from "@/components/site-chrome";
import { getCurrentUser, safeReturnPath } from "@/lib/auth";
import { SIGNUP_BONUS_CREDITS } from "@/lib/credits";
import { fmt, getDictionary } from "@/lib/dictionary";
import { isGoogleConfigured } from "@/lib/google-oauth";
import { type Locale, localePath } from "@/lib/i18n";

export async function LoginView({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string | string[] | undefined> }) {
  const t = getDictionary(locale);
  const l = t.login;
  const fallback = localePath(locale, "/account");
  const nextParam = typeof searchParams.next === "string" ? searchParams.next : null;
  const next = nextParam ? safeReturnPath(nextParam) : fallback;
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
        {l.errors[errorKey] && <p className="auth-error" role="alert">{l.errors[errorKey]}</p>}
        <div className="auth-card">
          {isGoogleConfigured() && (
            <>
              <a className="plan-button google-button" href={`/api/auth/google/start?next=${encodeURIComponent(next)}&locale=${locale}`}>{l.google}</a>
              <div className="auth-divider"><span>{l.or}</span></div>
            </>
          )}
          <EmailLoginForm
            labels={{
              email: l.emailLabel, placeholder: l.emailPlaceholder, send: l.send, sending: l.sending,
              checkInbox: l.checkInbox, sentTo: l.sentTo, useDifferent: l.useDifferent, failed: l.sendFailed,
            }}
            locale={locale}
            next={next}
          />
        </div>
        <p className="auth-footnote">
          {l.agreePrefix} <Link href={localePath(locale, "/terms")}>{l.terms}</Link> {l.agreeAnd} <Link href={localePath(locale, "/privacy")}>{l.privacy}</Link>.
        </p>
      </main>
    </PageFrame>
  );
}

export async function VerifyLoginView({ locale, searchParams }: { locale: Locale; searchParams: Record<string, string | string[] | undefined> }) {
  const l = getDictionary(locale).login;
  const token = typeof searchParams.token === "string" ? searchParams.token : "";
  const next = safeReturnPath(typeof searchParams.next === "string" ? searchParams.next : localePath(locale, "/account"));
  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", "/login")} locale={locale}>
      <main className="content-main narrow">
        <section className="hero is-compact">
          <p className="eyebrow">{l.eyebrow}</p>
          <h1>{l.verifyTitle}</h1>
        </section>
        {token ? (
          <form action="/api/auth/email/verify" className="auth-card" method="post">
            <input name="token" type="hidden" value={token} />
            <input name="next" type="hidden" value={next} />
            <p>{l.verifyLead}</p>
            <button className="plan-button" type="submit">{l.verifyButton}</button>
          </form>
        ) : (
          <p className="hero-lead">{l.verifyMissing} <Link href={localePath(locale, "/login")}>{l.requestNew}</Link>.</p>
        )}
      </main>
    </PageFrame>
  );
}
