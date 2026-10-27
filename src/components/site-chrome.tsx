import { Globe, Maximize2 } from "lucide-react";
import Link from "next/link";
import { AccountLink } from "@/components/account-link";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, localePath } from "@/lib/i18n";
import { PLATFORM_PAGES, platformPath } from "@/lib/platforms";

// `alternate` is the same page in the other language, for the language switcher.
export function SiteHeader({ locale, alternate }: { locale: Locale; alternate: string }) {
  const t = getDictionary(locale);
  return (
    <header className="site-header">
      <Link className="brand" href={localePath(locale, "/")} aria-label="Image Ready">
        <span className="brand-mark"><Maximize2 size={18} strokeWidth={2.4} /></span>
        <span>Image Ready</span>
      </Link>
      <nav aria-label="Main" className="header-nav">
        <Link href={`${localePath(locale, "/")}#platforms`}>{t.nav.platforms}</Link>
        <Link href={localePath(locale, "/pricing")}>{t.nav.pricing}</Link>
        {locale === "en" && <Link href="/guides">{t.nav.guides}</Link>}
        <Link aria-label={t.nav.switchLanguageLabel} className="lang-switch" href={alternate} hrefLang={locale === "en" ? "es" : "en"}>
          <Globe size={14} /> {t.nav.switchLanguage}
        </Link>
        <AccountLink accountHref={localePath(locale, "/account")} creditsTemplate={t.nav.credits} loginHref={localePath(locale, "/login")} signInLabel={t.nav.signIn} />
      </nav>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>{t.footer.tagline}</p>
        <nav aria-label={t.footer.platformsTitle} className="footer-platforms">
          {PLATFORM_PAGES.map((page) => (
            <Link href={platformPath(locale, page)} key={page.id}>{page.title[locale]}</Link>
          ))}
        </nav>
      </div>
      <nav aria-label="Site" className="footer-links">
        <Link href={localePath(locale, "/pricing")}>{t.nav.pricing}</Link>
        <Link href="/about">{t.footer.about}</Link>
        <Link href={localePath(locale, "/privacy")}>{t.footer.privacy}</Link>
        <Link href={localePath(locale, "/terms")}>{t.footer.terms}</Link>
        <Link href="/contact">{t.footer.contact}</Link>
      </nav>
    </footer>
  );
}

export function PageFrame({ locale, alternate, children }: { locale: Locale; alternate: string; children: React.ReactNode }) {
  return (
    <div className="page-frame">
      <SiteHeader alternate={alternate} locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
