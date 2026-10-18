import type { Metadata } from "next";
import Script from "next/script";
import { PRIMARY_SITE_URL } from "../lib/site";
import "./globals.css";

const googleAnalyticsId = "G-R7WZ6RM19T";

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_SITE_URL),
  title: {
    default: "Image Ready",
    template: "%s | Image Ready",
  },
  description:
    "Crop, resize, and compress product images for Amazon, Shopify, and TikTok Shop directly in your browser. Your original images stay on your device.",
  keywords: [
    "ecommerce image editor",
    "product image cropper",
    "Amazon image resizer",
    "Shopify image resizer",
    "TikTok Shop image resizer",
    "private photo editor",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Image Ready",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8978385290584635"
        />
      </head>
      <body>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
    </html>
  );
}
