import type { Metadata } from "next";
import Link from "next/link";
import { safeReturnPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Confirm sign-in",
  robots: { index: false, follow: false },
};

// Email security scanners often open links automatically. Requiring a click here means
// only the person reading the email can use the one-time token.
export default async function VerifyLoginPage(props: PageProps<"/login/verify">) {
  const searchParams = await props.searchParams;
  const token = typeof searchParams.token === "string" ? searchParams.token : "";
  const next = safeReturnPath(typeof searchParams.next === "string" ? searchParams.next : null);

  return (
    <main className="legal-page auth-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Account</p>
      <h1>Confirm sign-in.</h1>
      {token ? (
        <form action="/api/auth/email/verify" className="auth-card" method="post">
          <input name="token" type="hidden" value={token} />
          <input name="next" type="hidden" value={next} />
          <p className="legal-lead">Click the button to finish signing in to Image Ready.</p>
          <button className="plan-button" type="submit">Sign in</button>
        </form>
      ) : (
        <p className="legal-lead">This link is missing its sign-in code. <Link href="/login">Request a new link</Link>.</p>
      )}
    </main>
  );
}
