import type { Locale } from "@/lib/i18n";

export type SizePreset = {
  id: string;
  width: number;
  height: number;
  label: Record<Locale, string>;
  note?: Record<Locale, string>;
};

type Localized = Record<Locale, string>;

export type PlatformPage = {
  id: string;
  platform: string;
  slug: Localized;
  title: Localized;
  metaTitle: Localized;
  description: Localized;
  intro: Localized;
  sizes: SizePreset[];
  tips: Record<Locale, string[]>;
  faq: Record<Locale, Array<{ q: string; a: string }>>;
  sourceNote: Localized;
};

const both = (en: string, es: string): Localized => ({ en, es });

const CHECK_NOTE = both(
  "Sizes are practical starting points based on each platform's published guidance. Platforms change their rules, so confirm current requirements in their seller help center before publishing.",
  "Los tamaños son puntos de partida prácticos basados en las indicaciones publicadas por cada plataforma. Las plataformas cambian sus reglas, así que confirma los requisitos actuales en su centro de ayuda para vendedores antes de publicar.",
);

export const PLATFORM_PAGES: PlatformPage[] = [
  {
    id: "etsy",
    platform: "Etsy",
    slug: both("resize-for-etsy", "redimensionar-para-etsy"),
    title: both("Resize images for Etsy", "Redimensionar imágenes para Etsy"),
    metaTitle: both("Etsy Image Size Resizer: Listing Photos, Square & Shop Icon", "Redimensionar imágenes para Etsy: fotos de anuncios, cuadradas e icono"),
    description: both(
      "Batch resize product photos to Etsy listing sizes. Crop to 4:3, square, or shop icon dimensions in your browser and download them all at once.",
      "Redimensiona en lote tus fotos de producto a los tamaños de Etsy. Recorta a 4:3, cuadrado o icono de tienda en tu navegador y descárgalas todas a la vez.",
    ),
    intro: both(
      "Etsy shows listing photos in search as a cropped thumbnail and on the listing page at full size. A 4:3 landscape image at least 2000 px wide stays sharp when shoppers zoom, while a square crop keeps search thumbnails consistent across your shop.",
      "Etsy muestra las fotos de los anuncios en la búsqueda como una miniatura recortada y en la página del anuncio a tamaño completo. Una imagen horizontal 4:3 de al menos 2000 px de ancho se ve nítida cuando el comprador hace zoom, y un recorte cuadrado mantiene las miniaturas uniformes en toda tu tienda.",
    ),
    sizes: [
      { id: "listing-4x3", width: 2700, height: 2025, label: both("Listing photo (4:3)", "Foto de anuncio (4:3)"), note: both("Recommended", "Recomendado") },
      { id: "listing-square", width: 2000, height: 2000, label: both("Square listing photo", "Foto de anuncio cuadrada") },
      { id: "shop-icon", width: 500, height: 500, label: both("Shop icon", "Icono de tienda") },
      { id: "profile", width: 400, height: 400, label: both("Profile photo", "Foto de perfil") },
    ],
    tips: {
      en: [
        "Use the same crop for every listing so your shop grid looks tidy.",
        "Keep the product centered: Etsy search thumbnails crop the edges of wide photos.",
        "Images at least 2000 px on the shortest side let buyers zoom without blur.",
      ],
      es: [
        "Usa el mismo recorte en todos los anuncios para que la cuadrícula de tu tienda se vea ordenada.",
        "Mantén el producto centrado: las miniaturas de búsqueda de Etsy recortan los bordes de las fotos anchas.",
        "Las imágenes con al menos 2000 px en el lado más corto permiten hacer zoom sin que se vean borrosas.",
      ],
    },
    faq: {
      en: [
        { q: "What is the best image size for Etsy listings?", a: "Etsy recommends listing images at least 2000 px on the shortest side. A 4:3 photo such as 2700 × 2025 px works well for the listing page; a square 2000 × 2000 px photo keeps search thumbnails consistent." },
        { q: "Can I resize many Etsy photos at once?", a: "Yes. Add up to 100 photos, pick one or more Etsy sizes, and download every result in a single ZIP." },
      ],
      es: [
        { q: "¿Cuál es el mejor tamaño de imagen para los anuncios de Etsy?", a: "Etsy recomienda imágenes de al menos 2000 px en el lado más corto. Una foto 4:3 como 2700 × 2025 px funciona bien en la página del anuncio; una foto cuadrada de 2000 × 2000 px mantiene uniformes las miniaturas de búsqueda." },
        { q: "¿Puedo redimensionar muchas fotos de Etsy a la vez?", a: "Sí. Añade hasta 100 fotos, elige uno o varios tamaños de Etsy y descarga todos los resultados en un solo ZIP." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "etsy-banner",
    platform: "Etsy",
    slug: both("etsy-banner-size", "tamano-banner-etsy"),
    title: both("Etsy banner size", "Tamaño del banner de Etsy"),
    metaTitle: both("Etsy Banner Size: Resize Big & Mini Shop Banners", "Tamaño del banner de Etsy: redimensiona banners grandes y mini"),
    description: both(
      "Resize images to Etsy big banner (3360 × 840) and mini banner (1200 × 160) sizes. Crop and position your banner, then download.",
      "Redimensiona imágenes al banner grande (3360 × 840) y mini banner (1200 × 160) de Etsy. Recorta y coloca tu banner y descárgalo.",
    ),
    intro: both(
      "Etsy offers a big banner that spans the top of your shop and a slim mini banner. Both are very wide, so most photos need to be cropped. Keep text and logos near the center, because Etsy trims the sides on smaller screens.",
      "Etsy ofrece un banner grande que ocupa la parte superior de tu tienda y un mini banner estrecho. Ambos son muy anchos, así que la mayoría de las fotos necesitan recorte. Mantén textos y logotipos cerca del centro, porque Etsy recorta los lados en pantallas pequeñas.",
    ),
    sizes: [
      { id: "big-banner", width: 3360, height: 840, label: both("Big banner", "Banner grande"), note: both("Recommended", "Recomendado") },
      { id: "mini-banner", width: 1200, height: 160, label: both("Mini banner", "Mini banner") },
      { id: "shop-icon", width: 500, height: 500, label: both("Shop icon", "Icono de tienda") },
    ],
    tips: {
      en: [
        "Place important text in the middle third of the banner.",
        "Use a simple background: busy photos look cluttered at banner proportions.",
        "Preview the banner on a phone after uploading; mobile crops more of the sides.",
      ],
      es: [
        "Coloca el texto importante en el tercio central del banner.",
        "Usa un fondo sencillo: las fotos recargadas se ven desordenadas en proporciones de banner.",
        "Revisa el banner en el móvil después de subirlo; en móvil se recortan más los lados.",
      ],
    },
    faq: {
      en: [
        { q: "What size is the Etsy big banner?", a: "A big banner of 3360 × 840 px (4:1) is a common choice that stays sharp on large screens. Keep important content centered." },
        { q: "What size is the Etsy mini banner?", a: "The mini banner is commonly made at 1200 × 160 px." },
      ],
      es: [
        { q: "¿Qué tamaño tiene el banner grande de Etsy?", a: "Un banner grande de 3360 × 840 px (4:1) es una opción habitual que se ve nítida en pantallas grandes. Mantén centrado el contenido importante." },
        { q: "¿Qué tamaño tiene el mini banner de Etsy?", a: "El mini banner suele hacerse en 1200 × 160 px." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "ebay",
    platform: "eBay",
    slug: both("resize-for-ebay", "redimensionar-para-ebay"),
    title: both("Resize images for eBay", "Redimensionar imágenes para eBay"),
    metaTitle: both("eBay Image Size Resizer: 1600 × 1600 Listing Photos", "Redimensionar imágenes para eBay: fotos de 1600 × 1600"),
    description: both(
      "Batch resize photos to eBay's recommended 1600 × 1600 px or the 500 px minimum. Process many listing photos in your browser and download a ZIP.",
      "Redimensiona en lote fotos al tamaño recomendado por eBay de 1600 × 1600 px o al mínimo de 500 px. Procesa muchas fotos en tu navegador y descarga un ZIP.",
    ),
    intro: both(
      "eBay requires listing photos to be at least 500 px on the longest side and recommends around 1600 px so buyers can zoom. Square photos display most consistently in search results and on mobile.",
      "eBay exige que las fotos de los anuncios tengan al menos 500 px en el lado más largo y recomienda unos 1600 px para que los compradores puedan hacer zoom. Las fotos cuadradas se muestran de forma más uniforme en los resultados de búsqueda y en el móvil.",
    ),
    sizes: [
      { id: "recommended", width: 1600, height: 1600, label: both("Listing photo", "Foto de anuncio"), note: both("Recommended", "Recomendado") },
      { id: "large", width: 2000, height: 2000, label: both("Large listing photo", "Foto de anuncio grande") },
      { id: "minimum", width: 500, height: 500, label: both("Minimum size", "Tamaño mínimo") },
    ],
    tips: {
      en: [
        "Use a plain, light background so the item stands out in search.",
        "Fill most of the frame with the item; eBay shows small thumbnails in search.",
        "Keep every photo for a listing the same size for a consistent gallery.",
      ],
      es: [
        "Usa un fondo liso y claro para que el artículo destaque en la búsqueda.",
        "Haz que el artículo ocupe la mayor parte del encuadre; eBay muestra miniaturas pequeñas.",
        "Mantén todas las fotos de un anuncio del mismo tamaño para una galería uniforme.",
      ],
    },
    faq: {
      en: [
        { q: "What size should eBay photos be?", a: "eBay's minimum is 500 px on the longest side, and it recommends about 1600 px. A 1600 × 1600 px square is a safe default." },
        { q: "Does eBay accept PNG?", a: "eBay accepts JPG and PNG. JPG keeps files smaller for photographs." },
      ],
      es: [
        { q: "¿Qué tamaño deben tener las fotos de eBay?", a: "El mínimo de eBay es 500 px en el lado más largo y recomienda unos 1600 px. Un cuadrado de 1600 × 1600 px es una opción segura." },
        { q: "¿eBay acepta PNG?", a: "eBay acepta JPG y PNG. El JPG mantiene los archivos más ligeros en fotografías." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "amazon",
    platform: "Amazon",
    slug: both("resize-for-amazon", "redimensionar-para-amazon"),
    title: both("Resize images for Amazon", "Redimensionar imágenes para Amazon"),
    metaTitle: both("Amazon Product Image Size Resizer: 2000 × 2000 Square", "Redimensionar imágenes para Amazon: cuadrado de 2000 × 2000"),
    description: both(
      "Batch resize product photos to Amazon's recommended square sizes so zoom works. Crop in your browser and download every image at once.",
      "Redimensiona en lote fotos de producto a los tamaños cuadrados recomendados por Amazon para que funcione el zoom. Recorta en tu navegador y descárgalas todas.",
    ),
    intro: both(
      "Amazon enables zoom when the longest side is at least 1000 px, and many sellers use 2000 × 2000 px squares. The main image must sit on a pure white background with the product filling about 85% of the frame.",
      "Amazon activa el zoom cuando el lado más largo tiene al menos 1000 px, y muchos vendedores usan cuadrados de 2000 × 2000 px. La imagen principal debe tener fondo blanco puro y el producto debe ocupar cerca del 85% del encuadre.",
    ),
    sizes: [
      { id: "main", width: 2000, height: 2000, label: both("Main image", "Imagen principal"), note: both("Recommended", "Recomendado") },
      { id: "standard", width: 1600, height: 1600, label: both("Standard product image", "Imagen de producto estándar") },
      { id: "zoom-min", width: 1000, height: 1000, label: both("Zoom minimum", "Mínimo para zoom") },
    ],
    tips: {
      en: [
        "The main image needs a pure white background (RGB 255, 255, 255).",
        "Let the product fill about 85% of the frame without cutting it off.",
        "Use secondary images for lifestyle shots, details, and scale.",
      ],
      es: [
        "La imagen principal necesita fondo blanco puro (RGB 255, 255, 255).",
        "Haz que el producto ocupe cerca del 85% del encuadre sin cortarlo.",
        "Usa las imágenes secundarias para fotos de uso, detalles y escala.",
      ],
    },
    faq: {
      en: [
        { q: "What size should Amazon product images be?", a: "At least 1000 px on the longest side for zoom; 2000 × 2000 px squares are a common standard." },
        { q: "Does this tool make the background white?", a: "No. It crops and resizes. Shoot on a white background, or use a background remover first." },
      ],
      es: [
        { q: "¿Qué tamaño deben tener las imágenes de Amazon?", a: "Al menos 1000 px en el lado más largo para el zoom; los cuadrados de 2000 × 2000 px son un estándar habitual." },
        { q: "¿Esta herramienta pone el fondo blanco?", a: "No. Recorta y redimensiona. Fotografía sobre fondo blanco o usa antes un eliminador de fondo." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "shopify",
    platform: "Shopify",
    slug: both("resize-for-shopify", "redimensionar-para-shopify"),
    title: both("Resize images for Shopify", "Redimensionar imágenes para Shopify"),
    metaTitle: both("Shopify Product Image Size Resizer: 2048 × 2048", "Redimensionar imágenes para Shopify: 2048 × 2048"),
    description: both(
      "Batch resize product and collection images to Shopify's recommended 2048 × 2048 px. Keep your store grid consistent and download a ZIP.",
      "Redimensiona en lote imágenes de productos y colecciones al tamaño recomendado por Shopify de 2048 × 2048 px. Mantén uniforme tu tienda y descarga un ZIP.",
    ),
    intro: both(
      "Shopify recommends 2048 × 2048 px for square product images. Using the same aspect ratio for every product keeps collection pages tidy, and resizing before upload keeps your store fast.",
      "Shopify recomienda 2048 × 2048 px para imágenes de producto cuadradas. Usar la misma proporción en todos los productos mantiene ordenadas las páginas de colección, y redimensionar antes de subir mantiene rápida tu tienda.",
    ),
    sizes: [
      { id: "product", width: 2048, height: 2048, label: both("Product image", "Imagen de producto"), note: both("Recommended", "Recomendado") },
      { id: "portrait", width: 1600, height: 2000, label: both("Portrait product (4:5)", "Producto vertical (4:5)") },
      { id: "collection", width: 1024, height: 1024, label: both("Collection image", "Imagen de colección") },
    ],
    tips: {
      en: [
        "Pick one aspect ratio for the whole catalog and match your theme setting.",
        "Export JPG at quality 80–90 to keep pages fast.",
        "Add descriptive alt text to every product image in Shopify.",
      ],
      es: [
        "Elige una proporción para todo el catálogo y ajústala en tu tema.",
        "Exporta JPG con calidad 80–90 para que las páginas carguen rápido.",
        "Añade texto alternativo descriptivo a cada imagen en Shopify.",
      ],
    },
    faq: {
      en: [
        { q: "What is the best Shopify product image size?", a: "Shopify recommends 2048 × 2048 px for square product images." },
        { q: "Should all Shopify product photos be the same size?", a: "Yes. A single aspect ratio keeps collection grids even and avoids unexpected theme cropping." },
      ],
      es: [
        { q: "¿Cuál es el mejor tamaño de imagen para Shopify?", a: "Shopify recomienda 2048 × 2048 px para imágenes de producto cuadradas." },
        { q: "¿Deben tener todas las fotos de Shopify el mismo tamaño?", a: "Sí. Una sola proporción mantiene uniformes las colecciones y evita recortes inesperados del tema." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "shopify-banner",
    platform: "Shopify",
    slug: both("shopify-banner-size", "tamano-banner-shopify"),
    title: both("Shopify banner size", "Tamaño del banner de Shopify"),
    metaTitle: both("Shopify Banner Size: Resize Hero & Slideshow Images", "Tamaño del banner de Shopify: imágenes de portada y carrusel"),
    description: both(
      "Resize images to common Shopify banner sizes: 1920 × 1080 hero, 2000 × 800 slideshow, and 1200 × 400 announcement banners.",
      "Redimensiona imágenes a los tamaños habituales de banner de Shopify: portada 1920 × 1080, carrusel 2000 × 800 y anuncio 1200 × 400.",
    ),
    intro: both(
      "Shopify banner sizes depend on your theme, but most hero and slideshow sections look best between 1920 and 2000 px wide. Wide banners are cropped on phones, so keep the subject centered.",
      "El tamaño del banner de Shopify depende de tu tema, pero la mayoría de secciones de portada y carrusel se ven mejor entre 1920 y 2000 px de ancho. En el móvil se recortan los banners anchos, así que mantén el motivo centrado.",
    ),
    sizes: [
      { id: "hero", width: 1920, height: 1080, label: both("Hero banner (16:9)", "Banner de portada (16:9)"), note: both("Recommended", "Recomendado") },
      { id: "slideshow", width: 2000, height: 800, label: both("Slideshow banner", "Banner de carrusel") },
      { id: "wide", width: 1200, height: 400, label: both("Announcement banner", "Banner de anuncio") },
    ],
    tips: {
      en: [
        "Check your theme's image settings; some crop banners to fit the screen.",
        "Avoid putting text near the edges of a wide banner.",
        "Export JPG to keep large banners lightweight.",
      ],
      es: [
        "Revisa la configuración de imágenes de tu tema; algunos recortan los banners.",
        "Evita colocar texto cerca de los bordes de un banner ancho.",
        "Exporta en JPG para que los banners grandes pesen poco.",
      ],
    },
    faq: {
      en: [
        { q: "What size should a Shopify banner be?", a: "It depends on the theme. 1920 × 1080 px works for most hero sections, and 2000 × 800 px for slideshows." },
        { q: "Why is my Shopify banner cut off on mobile?", a: "Themes crop wide images to fit narrow screens. Keep the important part in the center." },
      ],
      es: [
        { q: "¿Qué tamaño debe tener un banner de Shopify?", a: "Depende del tema. 1920 × 1080 px funciona en la mayoría de portadas y 2000 × 800 px en carruseles." },
        { q: "¿Por qué mi banner de Shopify se corta en el móvil?", a: "Los temas recortan las imágenes anchas en pantallas estrechas. Mantén lo importante en el centro." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "pinterest",
    platform: "Pinterest",
    slug: both("resize-for-pinterest", "redimensionar-para-pinterest"),
    title: both("Resize images for Pinterest", "Redimensionar imágenes para Pinterest"),
    metaTitle: both("Pinterest Pin Size Resizer: 1000 × 1500 (2:3)", "Redimensionar imágenes para Pinterest: 1000 × 1500 (2:3)"),
    description: both(
      "Batch resize product photos to Pinterest's recommended 1000 × 1500 px (2:3) pin size, plus square and story formats.",
      "Redimensiona en lote fotos de producto al tamaño de pin recomendado por Pinterest de 1000 × 1500 px (2:3), además de formatos cuadrado e historia.",
    ),
    intro: both(
      "Pinterest recommends a 2:3 aspect ratio such as 1000 × 1500 px for standard pins. Taller images may be cropped in the feed, and square pins take up less space.",
      "Pinterest recomienda una proporción 2:3, como 1000 × 1500 px, para los pines estándar. Las imágenes más altas pueden recortarse en el feed y los pines cuadrados ocupan menos espacio.",
    ),
    sizes: [
      { id: "standard-pin", width: 1000, height: 1500, label: both("Standard pin (2:3)", "Pin estándar (2:3)"), note: both("Recommended", "Recomendado") },
      { id: "square-pin", width: 1000, height: 1000, label: both("Square pin", "Pin cuadrado") },
      { id: "story", width: 1080, height: 1920, label: both("Full-screen pin (9:16)", "Pin a pantalla completa (9:16)") },
    ],
    tips: {
      en: [
        "Vertical 2:3 pins get the most space in the Pinterest feed.",
        "Leave room at the top and bottom for text overlays.",
        "Use the same product photo in several sizes to test what performs best.",
      ],
      es: [
        "Los pines verticales 2:3 ocupan más espacio en el feed de Pinterest.",
        "Deja espacio arriba y abajo para superponer texto.",
        "Usa la misma foto en varios tamaños para probar cuál funciona mejor.",
      ],
    },
    faq: {
      en: [
        { q: "What is the best Pinterest pin size?", a: "Pinterest recommends a 2:3 ratio, such as 1000 × 1500 px." },
        { q: "Can I export one photo as several pin sizes?", a: "Yes. Select more than one size and each photo is exported in every selected size." },
      ],
      es: [
        { q: "¿Cuál es el mejor tamaño de pin en Pinterest?", a: "Pinterest recomienda una proporción 2:3, como 1000 × 1500 px." },
        { q: "¿Puedo exportar una foto en varios tamaños de pin?", a: "Sí. Selecciona varios tamaños y cada foto se exporta en todos ellos." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "poshmark",
    platform: "Poshmark",
    slug: both("poshmark-image-size", "tamano-imagen-poshmark"),
    title: both("Poshmark image size", "Tamaño de imagen para Poshmark"),
    metaTitle: both("Poshmark Image Size: Resize Listing Photos to Square", "Tamaño de imagen para Poshmark: fotos cuadradas"),
    description: both(
      "Resize listing photos to square Poshmark sizes so nothing gets cut off. Batch crop in your browser and download a ZIP.",
      "Redimensiona fotos de anuncios a tamaños cuadrados para Poshmark para que nada se corte. Recorta en lote en tu navegador y descarga un ZIP.",
    ),
    intro: both(
      "Poshmark displays listing photos as squares, so non-square photos get cropped automatically. Cropping to a square yourself, around 1280 × 1280 px, lets you decide what shoppers see first.",
      "Poshmark muestra las fotos de los anuncios en formato cuadrado, así que las fotos no cuadradas se recortan automáticamente. Recortarlas tú mismo a un cuadrado, de unos 1280 × 1280 px, te permite decidir qué ve primero el comprador.",
    ),
    sizes: [
      { id: "listing", width: 1280, height: 1280, label: both("Listing photo", "Foto de anuncio"), note: both("Recommended", "Recomendado") },
      { id: "large", width: 2000, height: 2000, label: both("Large square", "Cuadrado grande") },
      { id: "closet", width: 640, height: 640, label: both("Closet cover / small", "Portada de armario / pequeño") },
    ],
    tips: {
      en: [
        "Square crops stop Poshmark from cutting off the item.",
        "Make the cover photo the clearest full view of the item.",
        "Use the same background across your closet for a consistent look.",
      ],
      es: [
        "Los recortes cuadrados evitan que Poshmark corte el artículo.",
        "Haz que la foto de portada sea la vista completa más clara.",
        "Usa el mismo fondo en todo tu armario para un aspecto uniforme.",
      ],
    },
    faq: {
      en: [
        { q: "What size are Poshmark photos?", a: "Poshmark shows photos as squares. A 1280 × 1280 px square is a good default." },
        { q: "Why are my Poshmark photos cut off?", a: "Non-square photos are cropped to a square. Crop them yourself first to control the framing." },
      ],
      es: [
        { q: "¿Qué tamaño tienen las fotos de Poshmark?", a: "Poshmark muestra las fotos cuadradas. Un cuadrado de 1280 × 1280 px es una buena opción." },
        { q: "¿Por qué se cortan mis fotos en Poshmark?", a: "Las fotos no cuadradas se recortan a cuadrado. Recórtalas tú primero para controlar el encuadre." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "facebook-marketplace",
    platform: "Facebook Marketplace",
    slug: both("facebook-marketplace-image-size", "tamano-imagen-facebook-marketplace"),
    title: both("Facebook Marketplace image size", "Tamaño de imagen para Facebook Marketplace"),
    metaTitle: both("Facebook Marketplace Image Size: Resize Listing Photos", "Tamaño de imagen para Facebook Marketplace"),
    description: both(
      "Resize photos for Facebook Marketplace listings and catalog ads. Square 1080 × 1080 and 1200 × 628 link sizes, batch processed in your browser.",
      "Redimensiona fotos para anuncios de Facebook Marketplace y del catálogo. Cuadrado 1080 × 1080 y 1200 × 628, procesadas en lote en tu navegador.",
    ),
    intro: both(
      "Facebook Marketplace shows listing photos in a square grid. A 1080 × 1080 px square looks sharp on phones, and 1200 × 628 px works when the same image is shared as a link or used in ads.",
      "Facebook Marketplace muestra las fotos en una cuadrícula cuadrada. Un cuadrado de 1080 × 1080 px se ve nítido en el móvil, y 1200 × 628 px funciona cuando la imagen se comparte como enlace o se usa en anuncios.",
    ),
    sizes: [
      { id: "square", width: 1080, height: 1080, label: both("Listing photo (square)", "Foto de anuncio (cuadrada)"), note: both("Recommended", "Recomendado") },
      { id: "portrait", width: 1080, height: 1350, label: both("Portrait (4:5)", "Vertical (4:5)") },
      { id: "link", width: 1200, height: 628, label: both("Link / ad image", "Imagen de enlace / anuncio") },
    ],
    tips: {
      en: [
        "Square photos avoid automatic cropping in the Marketplace grid.",
        "Put the whole item in the first photo; it is the one buyers scroll past.",
        "Bright, even lighting matters more than resolution on a phone.",
      ],
      es: [
        "Las fotos cuadradas evitan el recorte automático en Marketplace.",
        "Muestra el artículo completo en la primera foto; es la que ve el comprador al desplazarse.",
        "En el móvil importa más una luz clara y uniforme que la resolución.",
      ],
    },
    faq: {
      en: [
        { q: "What size should Facebook Marketplace photos be?", a: "A square 1080 × 1080 px photo displays well in the Marketplace grid." },
        { q: "What size for Facebook link and ad images?", a: "1200 × 628 px is the common size for link previews and ads." },
      ],
      es: [
        { q: "¿Qué tamaño deben tener las fotos de Facebook Marketplace?", a: "Una foto cuadrada de 1080 × 1080 px se ve bien en Marketplace." },
        { q: "¿Qué tamaño para imágenes de enlace y anuncios de Facebook?", a: "1200 × 628 px es el tamaño habitual para vistas previas de enlaces y anuncios." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "tiktok-shop",
    platform: "TikTok Shop",
    slug: both("resize-for-tiktok-shop", "redimensionar-para-tiktok-shop"),
    title: both("Resize images for TikTok Shop", "Redimensionar imágenes para TikTok Shop"),
    metaTitle: both("TikTok Shop Product Image Size Resizer: 1080 × 1080", "Redimensionar imágenes para TikTok Shop: 1080 × 1080"),
    description: both(
      "Batch resize product images for TikTok Shop listings. Square 1080 × 1080 px and 9:16 vertical sizes, processed in your browser.",
      "Redimensiona en lote imágenes para anuncios de TikTok Shop. Cuadrado de 1080 × 1080 px y vertical 9:16, procesadas en tu navegador.",
    ),
    intro: both(
      "TikTok Shop product cards are square and viewed almost entirely on phones. A 1080 × 1080 px square stays sharp, and keeping files small helps listings load quickly.",
      "Las tarjetas de producto de TikTok Shop son cuadradas y se ven casi siempre en el móvil. Un cuadrado de 1080 × 1080 px se ve nítido y los archivos ligeros cargan más rápido.",
    ),
    sizes: [
      { id: "product", width: 1080, height: 1080, label: both("Product image", "Imagen de producto"), note: both("Recommended", "Recomendado") },
      { id: "large", width: 1600, height: 1600, label: both("Large product image", "Imagen de producto grande") },
      { id: "vertical", width: 1080, height: 1920, label: both("Vertical (9:16)", "Vertical (9:16)") },
    ],
    tips: {
      en: [
        "Keep the product large and centered for small phone screens.",
        "Avoid small text on the main image; it becomes unreadable.",
        "Use the same framing across your catalog.",
      ],
      es: [
        "Mantén el producto grande y centrado para pantallas pequeñas.",
        "Evita texto pequeño en la imagen principal; se vuelve ilegible.",
        "Usa el mismo encuadre en todo tu catálogo.",
      ],
    },
    faq: {
      en: [
        { q: "What size are TikTok Shop product images?", a: "Square images work best; 1080 × 1080 px is a practical target." },
      ],
      es: [
        { q: "¿Qué tamaño tienen las imágenes de TikTok Shop?", a: "Las imágenes cuadradas funcionan mejor; 1080 × 1080 px es un objetivo práctico." },
      ],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "mercari",
    platform: "Mercari",
    slug: both("mercari-image-size", "tamano-imagen-mercari"),
    title: both("Mercari image size", "Tamaño de imagen para Mercari"),
    metaTitle: both("Mercari Image Size: Resize Listing Photos to Square", "Tamaño de imagen para Mercari: fotos cuadradas"),
    description: both(
      "Resize photos to square Mercari listing sizes in bulk. Crop in your browser so the item is never cut off, then download a ZIP.",
      "Redimensiona fotos en lote a tamaños cuadrados para Mercari. Recorta en tu navegador para que el artículo nunca se corte y descarga un ZIP.",
    ),
    intro: both(
      "Mercari displays listing photos as squares. Cropping to 1080 × 1080 px before you upload keeps the item framed the way you want.",
      "Mercari muestra las fotos de los anuncios en formato cuadrado. Recortar a 1080 × 1080 px antes de subirlas mantiene el artículo encuadrado como quieres.",
    ),
    sizes: [
      { id: "listing", width: 1080, height: 1080, label: both("Listing photo", "Foto de anuncio"), note: both("Recommended", "Recomendado") },
      { id: "large", width: 1600, height: 1600, label: both("Large square", "Cuadrado grande") },
    ],
    tips: {
      en: ["Show the full item in the first photo.", "Use natural light and a plain background."],
      es: ["Muestra el artículo completo en la primera foto.", "Usa luz natural y un fondo liso."],
    },
    faq: {
      en: [{ q: "What size should Mercari photos be?", a: "Mercari uses square photos; 1080 × 1080 px is a good default." }],
      es: [{ q: "¿Qué tamaño deben tener las fotos de Mercari?", a: "Mercari usa fotos cuadradas; 1080 × 1080 px es una buena opción." }],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "depop",
    platform: "Depop",
    slug: both("depop-image-size", "tamano-imagen-depop"),
    title: both("Depop image size", "Tamaño de imagen para Depop"),
    metaTitle: both("Depop Image Size: Resize Listing Photos to Square", "Tamaño de imagen para Depop: fotos cuadradas"),
    description: both(
      "Batch resize listing photos to square Depop sizes. Frame each item in your browser and download every photo at once.",
      "Redimensiona en lote fotos de anuncios a tamaños cuadrados para Depop. Encuadra cada artículo en tu navegador y descarga todas las fotos a la vez.",
    ),
    intro: both(
      "Depop shows listings in a square grid, so square photos around 1280 × 1280 px look clean and avoid surprise crops.",
      "Depop muestra los anuncios en una cuadrícula cuadrada, así que las fotos cuadradas de unos 1280 × 1280 px se ven limpias y evitan recortes inesperados.",
    ),
    sizes: [
      { id: "listing", width: 1280, height: 1280, label: both("Listing photo", "Foto de anuncio"), note: both("Recommended", "Recomendado") },
      { id: "large", width: 2000, height: 2000, label: both("Large square", "Cuadrado grande") },
    ],
    tips: {
      en: ["Keep a consistent style across your shop grid.", "Center the item so nothing is cut off in the grid."],
      es: ["Mantén un estilo uniforme en la cuadrícula de tu tienda.", "Centra el artículo para que nada se corte en la cuadrícula."],
    },
    faq: {
      en: [{ q: "What size should Depop photos be?", a: "Depop uses square photos; 1280 × 1280 px is a good default." }],
      es: [{ q: "¿Qué tamaño deben tener las fotos de Depop?", a: "Depop usa fotos cuadradas; 1280 × 1280 px es una buena opción." }],
    },
    sourceNote: CHECK_NOTE,
  },
  {
    id: "walmart",
    platform: "Walmart",
    slug: both("walmart-image-size", "tamano-imagen-walmart"),
    title: both("Walmart image size", "Tamaño de imagen para Walmart"),
    metaTitle: both("Walmart Marketplace Image Size: Resize to 2000 × 2000", "Tamaño de imagen para Walmart Marketplace: 2000 × 2000"),
    description: both(
      "Resize product images for Walmart Marketplace. Square 2000 × 2000 px for zoom, batch processed in your browser.",
      "Redimensiona imágenes de producto para Walmart Marketplace. Cuadrado de 2000 × 2000 px para zoom, procesadas en lote en tu navegador.",
    ),
    intro: both(
      "Walmart Marketplace asks for square product images and recommends around 2000 × 2000 px so zoom works. The main image should be on a white background.",
      "Walmart Marketplace pide imágenes de producto cuadradas y recomienda unos 2000 × 2000 px para que funcione el zoom. La imagen principal debe tener fondo blanco.",
    ),
    sizes: [
      { id: "main", width: 2000, height: 2000, label: both("Product image", "Imagen de producto"), note: both("Recommended", "Recomendado") },
      { id: "minimum", width: 1500, height: 1500, label: both("Minimum for zoom", "Mínimo para zoom") },
    ],
    tips: {
      en: ["Use a white background for the main image.", "Keep the product filling most of the frame."],
      es: ["Usa fondo blanco en la imagen principal.", "Haz que el producto ocupe la mayor parte del encuadre."],
    },
    faq: {
      en: [{ q: "What size should Walmart product images be?", a: "Square images around 2000 × 2000 px are recommended so zoom works." }],
      es: [{ q: "¿Qué tamaño deben tener las imágenes de Walmart?", a: "Se recomiendan imágenes cuadradas de unos 2000 × 2000 px para que funcione el zoom." }],
    },
    sourceNote: CHECK_NOTE,
  },
];

export function getPlatformBySlug(locale: Locale, slug: string) {
  return PLATFORM_PAGES.find((page) => page.slug[locale] === slug);
}

export function getPlatformById(id: string) {
  return PLATFORM_PAGES.find((page) => page.id === id);
}

// Path of a platform page in a locale, e.g. /resize-for-etsy or /es/redimensionar-para-etsy.
export function platformPath(locale: Locale, page: PlatformPage) {
  return locale === "en" ? `/${page.slug.en}` : `/es/${page.slug.es}`;
}

// Generic sizes used by the "custom size" tool on the home page.
export const CUSTOM_PRESETS: SizePreset[] = [
  { id: "square-2000", width: 2000, height: 2000, label: both("Square", "Cuadrado") },
  { id: "square-1080", width: 1080, height: 1080, label: both("Square (small)", "Cuadrado (pequeño)") },
  { id: "portrait-4x5", width: 1080, height: 1350, label: both("Portrait 4:5", "Vertical 4:5") },
  { id: "landscape-16x9", width: 1920, height: 1080, label: both("Landscape 16:9", "Horizontal 16:9") },
];
