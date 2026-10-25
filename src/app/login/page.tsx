import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, safeReturnPath } from "@/lib/auth";
import { isGoogleConfigured } from "@/lib/google-oauth";
import { SIGNUP_BONUS_CREDITS } from "@/lib/credits";
import { EmailLoginForm } from "@/components/email-login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  google_unavailable: "Google sign-in is not available yet. Please use email instead.",
  google_cancelled: "Google sign-in was cancelled.",
  google_state: "That sign-in attempt expired. Please try again.",
  google_failed: "Google sign-in failed. Please try again.",
  link_invalid: "That sign-in link is invalid, expired, or already used. Request a new one below.",
};

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const next = safeReturnPath(typeof searchParams.next === "string" ? searchParams.next : null);
  const errorKey = typeof searchParams.error === "string" ? searchParams.error : "";

  if (await getCurrentUser()) redirect(next);

  return (
    <main className="legal-page auth-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Account</p>
      <h1>Sign in to use AI tools.</h1>
      <p className="legal-lead">
        An account keeps track of your credits for AI features. New accounts get {SIGNUP_BONUS_CREDITS} free credits. The free crop and resize tool works without an account.
      </p>
      {ERRORS[errorKey] && <p className="auth-error" role="alert">{ERRORS[errorKey]}</p>}
      <div className="auth-card">
        {isGoogleConfigured() && (
          <>
            <a className="plan-button google-button" href={`/api/auth/google/start?next=${encodeURIComponent(next)}`}>
              Continue with Google
            </a>
            <div className="auth-divider"><span>or</span></div>
          </>
        )}
        <EmailLoginForm next={next} />
      </div>
      <p className="auth-footnote">
        By signing in you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </main>
  );
}
