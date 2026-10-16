import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.opensourcephotoeditor.com";
const googleAnalyticsId = "G-R7WZ6RM19T";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Image Ready | Private product image cropper",
    template: "%s | Image Ready",
  },
  description:
    "Crop product images for Amazon, Shopify, and TikTok Shop directly in your browser. Your original images never leave your device.",
  keywords: [
    "open source photo editor",
    "product image cropper",
    "Amazon image resizer",
    "Shopify image resizer",
    "TikTok Shop image resizer",
    "private photo editor",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Image Ready",
    title: "Image Ready | Private product image cropper",
    description:
      "Crop product images for Amazon, Shopify, and TikTok Shop directly in your browser.",
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
