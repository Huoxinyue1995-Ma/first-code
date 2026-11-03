import type { Locale } from "@/lib/i18n";
import { PLATFORM_PAGES, type PlatformPage, type SizePreset } from "@/lib/platforms";

// Rows of the size table on the home page. The size shown for each platform is the recommended
// preset of its own tool page, so the numbers are never typed twice. Each note is checked against the
// platform's official guidelines; `doc` is only set where we could open and read that page.
type Localized = Record<Locale, string>;
type Row = { id: string; note: Localized; doc?: { url: string; label: Localized } };

const ETSY_DOC = {
  url: "https://help.etsy.com/hc/en-us/articles/115015663347",
  label: { en: "Etsy image requirements", es: "Requisitos de imágenes de Etsy" },
};
const SHOPIFY_DOC = {
  url: "https://help.shopify.com/en/manual/online-store/images/theme-images",
  label: { en: "Shopify image help", es: "Ayuda de imágenes de Shopify" },
};

const ROWS: Row[] = [
  {
    id: "etsy",
    note: {
      en: "Etsy recommends at least 2000 px on each side; the first photo needs at least 635 px.",
      es: "Etsy recomienda al menos 2000 px por lado; la primera foto necesita al menos 635 px.",
    },
    doc: ETSY_DOC,
  },
  {
    id: "ebay",
    note: {
      en: "At least 500 px on the longest side; eBay recommends about 1600 × 1600 px for zoom.",
      es: "Al menos 500 px en el lado más largo; eBay recomienda unos 1600 × 1600 px para el zoom.",
    },
    doc: {
      url: "https://www.ebay.com/help/selling/listings/adding-pictures-listings?id=4148",
      label: { en: "eBay photo guidelines", es: "Guía de fotos de eBay" },
    },
  },
  {
    id: "amazon",
    note: {
      en: "Main image on pure white; 1000 px or more on the longest side turns on zoom.",
      es: "Imagen principal sobre blanco puro; desde 1000 px en el lado más largo se activa el zoom.",
    },
    doc: {
      url: "https://sellercentral.amazon.com/help/hub/reference/external/G1881",
      label: { en: "Amazon product image guide", es: "Guía de imágenes de Amazon" },
    },
  },
  {
    id: "shopify",
    note: {
      en: "Use one aspect ratio for the whole catalog; Shopify accepts up to 5000 × 5000 px.",
      es: "Usa una sola proporción en todo el catálogo; Shopify acepta hasta 5000 × 5000 px.",
    },
    doc: SHOPIFY_DOC,
  },
  {
    id: "pinterest",
    note: {
      en: "Pinterest recommends 2:3, such as 1000 × 1500 px; taller pins may be cropped.",
      es: "Pinterest recomienda 2:3, como 1000 × 1500 px; los pines más altos pueden recortarse.",
    },
    doc: {
      url: "https://help.pinterest.com/en/business/article/pinterest-product-specs",
      label: { en: "Pinterest pin specs", es: "Especificaciones de pines" },
    },
  },
  {
    id: "poshmark",
    note: {
      en: "Poshmark recommends 1000 × 1000 px; a listing can have up to 16 photos.",
      es: "Poshmark recomienda 1000 × 1000 px; un anuncio admite hasta 16 fotos.",
    },
    doc: {
      url: "https://support.poshmark.com/s/article/894455911?language=en_US",
      label: { en: "Poshmark: How to list", es: "Poshmark: cómo publicar" },
    },
  },
  {
    id: "facebook-marketplace",
    note: {
      en: "Meta shows shop product images as 1:1 squares, at least 500 × 500 px.",
      es: "Meta muestra las imágenes de producto como cuadrados 1:1, de al menos 500 × 500 px.",
    },
    doc: {
      url: "https://www.facebook.com/business/help/686259348512056",
      label: { en: "Meta product image specs", es: "Especificaciones de Meta" },
    },
  },
  {
    id: "tiktok-shop",
    note: {
      en: "Up to 9 square images; the main image shows the product from the front.",
      es: "Hasta 9 imágenes cuadradas; la principal muestra el producto de frente.",
    },
  },
  {
    id: "mercari",
    note: {
      en: "Photos display as squares; show the full item in the first photo.",
      es: "Las fotos se muestran cuadradas; enseña el artículo completo en la primera foto.",
    },
  },
  {
    id: "depop",
    note: {
      en: "Square shop grid; center the item so nothing is cut off.",
      es: "Cuadrícula cuadrada; centra el artículo para que no se corte nada.",
    },
  },
  {
    id: "walmart",
    note: {
      en: "Seamless white background; at least 1500 × 1500 px for zoom and 5 MB or less per file.",
      es: "Fondo blanco uniforme; al menos 1500 × 1500 px para zoom y 5 MB o menos por archivo.",
    },
    doc: {
      url: "https://marketplacelearn.walmart.com/guides/Item%20setup/Item%20content,%20imagery%20and%20media/Product-detail-page:-Image-guidelines-&-requirements",
      label: { en: "Walmart image guidelines", es: "Guía de imágenes de Walmart" },
    },
  },
  {
    id: "etsy-banner",
    note: {
      en: "Big banner; minimum 1200 × 300 px. The mini banner is 1600 × 213 px.",
      es: "Banner grande; mínimo 1200 × 300 px. El mini banner es de 1600 × 213 px.",
    },
    doc: ETSY_DOC,
  },
  {
    id: "shopify-banner",
    note: {
      en: "The exact size depends on your theme; wide banners are cropped on phones.",
      es: "El tamaño exacto depende de tu tema; los banners anchos se recortan en el móvil.",
    },
    doc: SHOPIFY_DOC,
  },
];

export type HomeSizeRow = Row & { page: PlatformPage; size: SizePreset };

export const HOME_SIZE_ROWS: HomeSizeRow[] = ROWS.map((row) => {
  const page = PLATFORM_PAGES.find((p) => p.id === row.id);
  if (!page) throw new Error(`Unknown platform in home size table: ${row.id}`);
  return { ...row, page, size: page.sizes.find((s) => s.note) ?? page.sizes[0] };
});
