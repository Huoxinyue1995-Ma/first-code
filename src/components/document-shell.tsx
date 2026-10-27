import Script from "next/script";
import { HTML_LANG, type Locale } from "@/lib/i18n";

const GOOGLE_ANALYTICS_ID = "G-R7WZ6RM19T";
const ADSENSE_CLIENT = "ca-pub-8978385290584635";

// Shared <html> document for both language root layouts.
export function DocumentShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={HTML_LANG[locale]}>
      <head>
        <script async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} />
      </head>
      <body>{children}</body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </html>
  );
}
