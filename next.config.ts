import type { NextConfig } from "next";

const scriptSource = process.env.NODE_ENV === "development"
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";
// Google Identity Services (Sign in with Google button and One Tap), per Google's CSP guidance.
const GSI = "https://accounts.google.com/gsi/";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Two root layouts (English at /, Spanish at /es) need a 404 that does not depend on either.
    globalNotFound: true,
  },
  async redirects() {
    // Domain move: opensourcephotoeditor.com -> www.resizet.com. Kept behind a flag so the new domain can be
    // verified first; set LEGACY_DOMAIN_REDIRECT=1 in Vercel to turn on the permanent redirect.
    const legacyDomainRedirects = process.env.LEGACY_DOMAIN_REDIRECT === "1"
      ? ["opensourcephotoeditor.com", "www.opensourcephotoeditor.com"].map((host) => ({
          source: "/:path*",
          has: [{ type: "host" as const, value: host }],
          destination: "https://www.resizet.com/:path*",
          permanent: true,
        }))
      : [];
    return [
      ...legacyDomainRedirects,
      // Old routes from the single-tool version of the site.
      { source: "/editor", destination: "/", permanent: true },
      { source: "/payment/success", destination: "/account", permanent: true },
      { source: "/payment/cancelled", destination: "/pricing", permanent: true },
      // Email sign-in moved from one-time links to 6-digit codes; old links land on the sign-in page.
      { source: "/login/verify", destination: "/login", permanent: false },
      { source: "/es/login/verify", destination: "/es/login", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://checkout.stripe.com https://accounts.google.com; img-src 'self' blob: data: https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.google-analytics.com https://*.googletagmanager.com https://*.adtrafficquality.google; media-src 'self' blob: data:; ${scriptSource} ${GSI}client https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.adtrafficquality.google; style-src 'self' 'unsafe-inline' ${GSI}style; connect-src 'self' ${GSI} https://*.stripe.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.adtrafficquality.google; frame-src ${GSI} https://*.stripe.com https://*.link.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.adtrafficquality.google; worker-src 'self' blob:` },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
          // Lets the Sign in with Google popup report back to this page (Google's recommended setting).
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;
