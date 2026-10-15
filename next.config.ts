import type { NextConfig } from "next";

const scriptSource = process.env.NODE_ENV === "development"
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://checkout.stripe.com; img-src 'self' blob: data:; media-src 'self' blob: data:; ${scriptSource}; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.stripe.com; frame-src https://*.stripe.com https://*.link.com; worker-src 'self' blob:` },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
