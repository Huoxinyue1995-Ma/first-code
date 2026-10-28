import { PageFrame } from "@/components/site-chrome";
import { type Locale, localePath } from "@/lib/i18n";

const CONTACT = "huoxinyue1995@gmail.com";

type Section = { h: string; p: string[] };
type Doc = { eyebrow: string; title: string; lead: string; sections: Section[] };

const PRIVACY: Record<Locale, Doc> = {
  en: {
    eyebrow: "Privacy",
    title: "Your product photos stay on your device.",
    lead: "Resizet resizes and crops photos inside your browser. We do not receive, store, or look at your images.",
    sections: [
      { h: "How image processing works", p: ["When you add a photo, your browser reads it, creates the preview, and generates every resized file on your device. The photos, previews, and exported files are never sent to our servers or to any third-party image service."] },
      { h: "What we record when you download", p: ["To charge credits fairly, your browser sends us a fingerprint of each photo (a SHA-256 hash of the file) when you download. A hash cannot be turned back into the image. We use it only so that re-downloading the same photo in other sizes within 24 hours does not cost extra credits. We also record how many photos and sizes a download contained."] },
      { h: "Accounts and credits", p: [
        "You do not need an account to add or preview photos. To download, you sign in so we can track credits. We store your email address, your name if you sign in with Google, the date you joined, and your credit purchases and use. Sign-in uses a secure cookie that keeps you logged in for up to 30 days.",
        "If you sign in with Google, Google shares your name, email address, and account identifier with us; we never receive your Google password. Sign-in emails are delivered by our email provider, Resend. Payments are handled by Stripe; we never see or store your card details.",
        "To delete your account and its data, email us from the address on the account.",
      ] },
      { h: "Analytics and advertising", p: [
        "We use Google Analytics to understand aggregate use of the site, such as pages viewed, referral source, browser and device type, and approximate location. Google AdSense may use cookies to show and measure ads. None of these services receive your photos.",
        "You can manage Google ad personalization through your Google account and browser settings.",
      ] },
      { h: "Contact", p: [`For privacy questions, email ${CONTACT}. We will update this page if our practices change.`] },
    ],
  },
  es: {
    eyebrow: "Privacidad",
    title: "Tus fotos de producto se quedan en tu dispositivo.",
    lead: "Resizet redimensiona y recorta las fotos dentro de tu navegador. No recibimos, guardamos ni vemos tus imágenes.",
    sections: [
      { h: "Cómo se procesan las imágenes", p: ["Cuando añades una foto, tu navegador la lee, crea la vista previa y genera cada archivo redimensionado en tu dispositivo. Las fotos, las vistas previas y los archivos exportados nunca se envían a nuestros servidores ni a ningún servicio de imágenes de terceros."] },
      { h: "Qué registramos al descargar", p: ["Para cobrar los créditos de forma justa, al descargar tu navegador nos envía una huella de cada foto (un hash SHA-256 del archivo). Un hash no se puede convertir de nuevo en la imagen. Solo lo usamos para que volver a descargar la misma foto en otros tamaños durante 24 horas no cueste créditos extra. También registramos cuántas fotos y tamaños tenía una descarga."] },
      { h: "Cuentas y créditos", p: [
        "No necesitas una cuenta para añadir o previsualizar fotos. Para descargar, inicias sesión para que podamos llevar la cuenta de tus créditos. Guardamos tu correo electrónico, tu nombre si usas Google, la fecha de registro y tus compras y uso de créditos. El inicio de sesión usa una cookie segura que mantiene la sesión hasta 30 días.",
        "Si inicias sesión con Google, Google nos comparte tu nombre, correo e identificador de cuenta; nunca recibimos tu contraseña de Google. Los correos de acceso los envía nuestro proveedor, Resend. Los pagos los gestiona Stripe; nunca vemos ni guardamos los datos de tu tarjeta.",
        "Para eliminar tu cuenta y sus datos, escríbenos desde el correo de la cuenta.",
      ] },
      { h: "Analítica y publicidad", p: [
        "Usamos Google Analytics para entender el uso general del sitio, como páginas vistas, origen de las visitas, navegador, dispositivo y ubicación aproximada. Google AdSense puede usar cookies para mostrar y medir anuncios. Ninguno de estos servicios recibe tus fotos.",
        "Puedes gestionar la personalización de anuncios de Google en tu cuenta de Google y en la configuración del navegador.",
      ] },
      { h: "Contacto", p: [`Para preguntas sobre privacidad, escribe a ${CONTACT}. Actualizaremos esta página si cambian nuestras prácticas.`] },
    ],
  },
};

const TERMS: Record<Locale, Doc> = {
  en: {
    eyebrow: "Terms",
    title: "Resize your photos, then check each platform's rules.",
    lead: "By using Resizet you agree to these terms.",
    sections: [
      { h: "Using this tool", p: ["You are responsible for the images you process and for having the right to use them. Do not use the service for unlawful content or content that violates another person's rights."] },
      { h: "Platform sizes", p: ["Etsy, eBay, Amazon, Shopify, Pinterest, Poshmark, Facebook Marketplace, TikTok Shop, Mercari, Depop, and Walmart sizes are practical starting points. They are not an approval guarantee or an official relationship with those companies. Platform rules change, so check the current requirements before publishing."] },
      { h: "Credits", p: [
        "New accounts receive 3 free credits. Each photo you download costs 1 credit, in every size you selected. Re-downloading the same photo within 24 hours does not use more credits. Credits do not expire, have no cash value, and cannot be transferred.",
        "Credit packs are a one-time digital purchase processed by Stripe. Unused credits from a purchase can be refunded within 14 days by emailing us with your Stripe receipt email. Credits that have been used are not refundable, except where the law requires otherwise.",
      ] },
      { h: "No warranty", p: ["We provide this tool as-is. Review downloaded files before using them in a storefront or advertising campaign."] },
      { h: "Contact", p: [`Questions or payment problems: ${CONTACT}. Do not send card details.`] },
    ],
  },
  es: {
    eyebrow: "Términos",
    title: "Redimensiona tus fotos y revisa las reglas de cada plataforma.",
    lead: "Al usar Resizet aceptas estos términos.",
    sections: [
      { h: "Uso de la herramienta", p: ["Eres responsable de las imágenes que procesas y de tener derecho a usarlas. No uses el servicio para contenido ilegal o que vulnere los derechos de otras personas."] },
      { h: "Tamaños de las plataformas", p: ["Los tamaños para Etsy, eBay, Amazon, Shopify, Pinterest, Poshmark, Facebook Marketplace, TikTok Shop, Mercari, Depop y Walmart son puntos de partida prácticos. No garantizan la aprobación ni implican una relación oficial con esas empresas. Las reglas cambian, así que revisa los requisitos actuales antes de publicar."] },
      { h: "Créditos", p: [
        "Las cuentas nuevas reciben 3 créditos gratis. Cada foto que descargas cuesta 1 crédito, en todos los tamaños que elijas. Volver a descargar la misma foto en 24 horas no usa más créditos. Los créditos no caducan, no tienen valor monetario y no se pueden transferir.",
        "Los paquetes de créditos son una compra digital única procesada por Stripe. Los créditos no usados de una compra se pueden reembolsar en un plazo de 14 días escribiéndonos con el correo del recibo de Stripe. Los créditos ya usados no son reembolsables, salvo que la ley indique lo contrario.",
      ] },
      { h: "Sin garantía", p: ["Ofrecemos la herramienta tal cual. Revisa los archivos descargados antes de usarlos en una tienda o en una campaña publicitaria."] },
      { h: "Contacto", p: [`Preguntas o problemas con pagos: ${CONTACT}. No envíes datos de tarjetas.`] },
    ],
  },
};

function DocView({ locale, doc, path }: { locale: Locale; doc: Doc; path: string }) {
  return (
    <PageFrame alternate={localePath(locale === "en" ? "es" : "en", path)} locale={locale}>
      <main className="content-main narrow legal-page">
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1>{doc.title}</h1>
        <p className="legal-lead">{doc.lead}</p>
        {doc.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((text) => <p key={text}>{text}</p>)}
          </section>
        ))}
      </main>
    </PageFrame>
  );
}

export const PrivacyView = ({ locale }: { locale: Locale }) => <DocView doc={PRIVACY[locale]} locale={locale} path="/privacy" />;
export const TermsView = ({ locale }: { locale: Locale }) => <DocView doc={TERMS[locale]} locale={locale} path="/terms" />;
export const privacyMeta = (locale: Locale) => ({ title: PRIVACY[locale].eyebrow, description: PRIVACY[locale].lead });
export const termsMeta = (locale: Locale) => ({ title: TERMS[locale].eyebrow, description: TERMS[locale].lead });
