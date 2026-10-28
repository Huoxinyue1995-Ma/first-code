import type { Locale } from "@/lib/i18n";

// Long-form, platform-specific guidance shown below the tool on each platform page.
// Each section: a heading and one or more paragraphs, written separately for English and Spanish.
export type GuideSection = { h: string; p: string[] };
export type PlatformGuide = Record<Locale, GuideSection[]>;

export const PLATFORM_GUIDES: Record<string, PlatformGuide> = {
  etsy: {
    en: [
      {
        h: "How Etsy displays your listing photos",
        p: [
          "Etsy uses your first photo in three places: as a cropped thumbnail in search results and on your shop page, as the large image at the top of the listing, and in the zoom view when a shopper taps the photo. Each place uses a different shape. Search thumbnails are close to square on most layouts, while the listing page shows the photo in its original proportions, usually 4:3 landscape.",
          "Because the thumbnail is cropped from the centre, anything near the left and right edges of a wide photo may be hidden in search. That is why many sellers shoot in 4:3 but keep the product well inside the middle of the frame. If your products are tall, such as bottles or framed prints, a square crop often looks better in both places.",
        ],
      },
      {
        h: "Choosing between 4:3 and square",
        p: [
          "Use 4:3 (for example 2700 × 2025 px) when your photos include context such as a styled table, a model, or a room, because the extra width tells more of the story on the listing page. Use square (2000 × 2000 px) when the product alone is the subject and you want your shop grid to look perfectly even.",
          "Whichever you choose, use it for every listing. A shop where some thumbnails are square crops of wide photos and others are true squares looks inconsistent, and the product size appears to jump from one listing to the next. Exporting both sizes from the same photos lets you compare them side by side before you upload.",
        ],
      },
      {
        h: "Resolution, file size, and zoom",
        p: [
          "Etsy recommends that the shortest side of a listing photo is at least 2000 px so that zoom stays sharp. Photos straight from a modern phone are much larger than this, often 4000 px or more, which only slows down uploads without improving what shoppers see. Resizing to around 2000–2700 px and saving as JPG at 85–90% quality usually produces files well under 1 MB with no visible loss.",
          "Avoid enlarging small photos to reach the recommended size. Upscaling a 900 px image to 2000 px makes the file bigger but adds no detail, and the zoom view will look soft. If an older photo is small, it is better to reshoot the item.",
        ],
      },
      {
        h: "Photo order and what to show",
        p: [
          "You can add up to 20 photos per listing. The first photo does most of the selling in search, so make it a clear, well-lit view of the whole item. Use the following photos for scale (the item in a hand or next to a common object), details such as texture, stitching, or engraving, the item in use, packaging if it is part of the gift experience, and size or colour options.",
          "Keep the background and lighting consistent across a listing. Mixing a bright white studio shot with a dim kitchen photo makes the colours look different from photo to photo, which can lead to questions or returns about colour.",
        ],
      },
      {
        h: "A quick workflow for a batch of listings",
        p: [
          "Shoot every item with some space around it, add all the photos here at once, select the Etsy listing size you use for your shop, and check the framing of any photo where the item sits off-centre. Download the ZIP, then upload each listing's photos from the matching files. Doing all the resizing in one pass means every listing in the batch has the same shape and margin.",
        ],
      },
    ],
    es: [
      {
        h: "Cómo muestra Etsy las fotos de tus anuncios",
        p: [
          "Etsy usa tu primera foto en tres lugares: como miniatura recortada en los resultados de búsqueda y en tu tienda, como imagen grande en la parte superior del anuncio y en la vista ampliada cuando el comprador toca la foto. Cada lugar usa una forma distinta. Las miniaturas de búsqueda son casi cuadradas en la mayoría de diseños, mientras que la página del anuncio muestra la foto con sus proporciones originales, normalmente 4:3 horizontal.",
          "Como la miniatura se recorta desde el centro, lo que esté cerca de los bordes izquierdo y derecho de una foto ancha puede quedar oculto en la búsqueda. Por eso muchos vendedores fotografían en 4:3 pero mantienen el producto bien dentro del centro del encuadre. Si tus productos son altos, como botellas o láminas enmarcadas, un recorte cuadrado suele verse mejor en ambos lugares.",
        ],
      },
      {
        h: "Elegir entre 4:3 y cuadrado",
        p: [
          "Usa 4:3 (por ejemplo 2700 × 2025 px) cuando tus fotos incluyan contexto, como una mesa decorada, una modelo o una habitación, porque el ancho extra cuenta más en la página del anuncio. Usa cuadrado (2000 × 2000 px) cuando el producto por sí solo sea el protagonista y quieras que la cuadrícula de tu tienda se vea perfectamente uniforme.",
          "Elijas lo que elijas, úsalo en todos los anuncios. Una tienda donde algunas miniaturas son recortes cuadrados de fotos anchas y otras son cuadrados reales se ve poco uniforme, y el tamaño del producto parece cambiar de un anuncio a otro. Exportar ambos tamaños desde las mismas fotos te permite compararlos antes de subirlos.",
        ],
      },
      {
        h: "Resolución, peso del archivo y zoom",
        p: [
          "Etsy recomienda que el lado más corto de una foto de anuncio tenga al menos 2000 px para que el zoom se vea nítido. Las fotos de un móvil actual son mucho más grandes, a menudo de 4000 px o más, lo que solo ralentiza la subida sin mejorar lo que ve el comprador. Redimensionar a unos 2000–2700 px y guardar en JPG con calidad del 85–90% suele dar archivos de menos de 1 MB sin pérdida visible.",
          "Evita agrandar fotos pequeñas para llegar al tamaño recomendado. Ampliar una imagen de 900 px a 2000 px hace el archivo más grande pero no añade detalle, y el zoom se verá borroso. Si una foto antigua es pequeña, es mejor volver a fotografiar el artículo.",
        ],
      },
      {
        h: "Orden de las fotos y qué mostrar",
        p: [
          "Puedes añadir hasta 20 fotos por anuncio. La primera foto es la que más vende en la búsqueda, así que haz que sea una vista clara y bien iluminada del artículo completo. Usa las siguientes para mostrar la escala (el artículo en la mano o junto a un objeto común), detalles como textura, costuras o grabados, el artículo en uso, el embalaje si forma parte del regalo y las opciones de tamaño o color.",
          "Mantén el mismo fondo e iluminación en todo el anuncio. Mezclar una foto de estudio blanca y luminosa con una foto oscura de cocina hace que los colores parezcan distintos de una foto a otra, lo que puede generar preguntas o devoluciones por el color.",
        ],
      },
      {
        h: "Un flujo rápido para un lote de anuncios",
        p: [
          "Fotografía cada artículo con algo de espacio alrededor, añade aquí todas las fotos a la vez, selecciona el tamaño de anuncio de Etsy que usa tu tienda y revisa el encuadre de cualquier foto en la que el artículo no esté centrado. Descarga el ZIP y sube las fotos de cada anuncio desde los archivos correspondientes. Hacer todo el redimensionado de una vez garantiza que todos los anuncios del lote tengan la misma forma y el mismo margen.",
        ],
      },
    ],
  },

  ebay: {
    en: [
      {
        h: "eBay's photo requirements in plain terms",
        p: [
          "eBay requires every listing to have at least one photo, and each photo must be at least 500 px on its longest side. It recommends around 1600 px on the longest side so buyers can zoom in on details. Photos must not have borders, added text, or artwork placed over the item, and stock photos are not allowed for used items, which must show the actual item being sold.",
          "eBay accepts JPG, PNG, and several other formats, but JPG is the practical choice for photographs because files stay small and upload quickly, especially when you list many items from a phone.",
        ],
      },
      {
        h: "Why square photos work best on eBay",
        p: [
          "eBay search results and the mobile app display gallery images in a square frame. A wide or tall photo is shrunk to fit inside that square, leaving empty space around it, so the item looks smaller than competing listings. Cropping to a square such as 1600 × 1600 px before you upload lets the item fill the whole thumbnail.",
          "If an item is long, such as a fishing rod or a rug, use the fit option with a white background instead of cropping, so the whole item stays visible while the file is still square.",
        ],
      },
      {
        h: "What to photograph for a listing",
        p: [
          "Buyers on eBay often compare several identical items, so honest, detailed photos help you win the sale. Show the front, back, and sides; any labels, model numbers, or serial plates; the condition of edges and corners; and every flaw, scratch, or mark mentioned in the description. Photographing flaws clearly reduces returns and negative feedback.",
          "Use daylight or two soft light sources, a plain background, and avoid flash, which creates glare on glossy surfaces. Clean the item before shooting; dust shows up clearly at 1600 px.",
        ],
      },
      {
        h: "Preparing photos for many listings at once",
        p: [
          "Resellers often photograph a whole batch of items in one session. Add all of those photos here, choose the 1600 × 1600 px listing size, and download one ZIP. The files keep their original names with the size added, so photos from the same item stay together when you sort the folder by name.",
          "Because eBay compresses uploaded images again, starting from a clean, correctly sized JPG gives a sharper result than uploading a very large original and letting eBay resize it.",
        ],
      },
    ],
    es: [
      {
        h: "Los requisitos de fotos de eBay, explicados",
        p: [
          "eBay exige que cada anuncio tenga al menos una foto y que cada foto mida al menos 500 px en su lado más largo. Recomienda unos 1600 px en el lado más largo para que los compradores puedan ampliar los detalles. Las fotos no pueden tener bordes, texto añadido ni gráficos sobre el artículo, y no se permiten fotos de catálogo para artículos usados, que deben mostrar el artículo real que se vende.",
          "eBay acepta JPG, PNG y otros formatos, pero JPG es la opción práctica para fotografías porque los archivos pesan poco y se suben rápido, sobre todo cuando publicas muchos artículos desde el móvil.",
        ],
      },
      {
        h: "Por qué las fotos cuadradas funcionan mejor en eBay",
        p: [
          "Los resultados de búsqueda de eBay y la aplicación móvil muestran las imágenes de galería en un marco cuadrado. Una foto ancha o alta se reduce para caber dentro de ese cuadrado y deja espacio vacío alrededor, así que el artículo parece más pequeño que el de la competencia. Recortar a un cuadrado como 1600 × 1600 px antes de subirla hace que el artículo ocupe toda la miniatura.",
          "Si el artículo es alargado, como una caña de pescar o una alfombra, usa la opción de ajustar con fondo blanco en lugar de recortar, para que el artículo completo siga visible y el archivo siga siendo cuadrado.",
        ],
      },
      {
        h: "Qué fotografiar en un anuncio",
        p: [
          "En eBay los compradores suelen comparar varios artículos idénticos, así que unas fotos honestas y detalladas te ayudan a cerrar la venta. Muestra el frente, la parte trasera y los laterales; las etiquetas, números de modelo o placas de serie; el estado de bordes y esquinas; y cada defecto, rasguño o marca mencionado en la descripción. Fotografiar los defectos con claridad reduce devoluciones y valoraciones negativas.",
          "Usa luz natural o dos fuentes de luz suave, un fondo liso y evita el flash, que crea reflejos en superficies brillantes. Limpia el artículo antes de fotografiarlo; el polvo se nota mucho a 1600 px.",
        ],
      },
      {
        h: "Preparar fotos para muchos anuncios a la vez",
        p: [
          "Los revendedores suelen fotografiar un lote entero de artículos en una sola sesión. Añade aquí todas esas fotos, elige el tamaño de anuncio de 1600 × 1600 px y descarga un ZIP. Los archivos conservan su nombre original con el tamaño añadido, así que las fotos de un mismo artículo quedan juntas al ordenar la carpeta por nombre.",
          "Como eBay vuelve a comprimir las imágenes que subes, partir de un JPG limpio y del tamaño correcto da un resultado más nítido que subir un original enorme y dejar que eBay lo redimensione.",
        ],
      },
    ],
  },

  amazon: {
    en: [
      {
        h: "Main image rules on Amazon",
        p: [
          "Amazon treats the main image differently from every other photo on the listing. It must show only the product being sold, on a pure white background (RGB 255, 255, 255), with the product filling about 85% of the frame. Text, logos, watermarks, borders, and accessories that are not included are not allowed in the main image, and listings that break these rules can be suppressed from search.",
          "The image must be at least 1000 px on its longest side for zoom to work. Many sellers use 2000 × 2000 px squares because they look sharp on high-resolution screens and match the square tiles Amazon uses in search.",
        ],
      },
      {
        h: "Getting the 85% framing right",
        p: [
          "If the product is too small in the frame, it looks tiny next to competitors in search results. If it touches the edges, it can look cramped and may be cut off on some layouts. A good starting point is to crop so the longest side of the product nearly reaches the frame, leaving a thin, even margin of white.",
          "Use the adjust button on each photo to zoom in until the product fills the square, then drag it to the centre. For products that are much wider than they are tall, such as keyboards, choose the fit option so the whole product stays in frame on a white background.",
        ],
      },
      {
        h: "Secondary images",
        p: [
          "Amazon allows several additional images, and these are not held to the white-background rule. Use them for lifestyle photos that show the product in use, close-ups of materials and features, a photo with a hand or a common object for scale, what is included in the box, and a simple dimensions graphic.",
          "Keep secondary images the same size as the main image, ideally square, so the image gallery and zoom behave consistently. Exporting every image for a listing in one batch at 2000 × 2000 px is the simplest way to achieve that.",
        ],
      },
      {
        h: "Background note",
        p: [
          "This tool crops, resizes, and can add a white background around a photo when you choose the fit option, but it does not remove an existing background. For the main image, photograph the product on a white sweep or light box, or remove the background first, then use this tool to size and frame the result. Check the corners of the final image: an off-white or grey background is one of the most common reasons a main image is flagged.",
        ],
      },
    ],
    es: [
      {
        h: "Reglas de la imagen principal en Amazon",
        p: [
          "Amazon trata la imagen principal de forma distinta al resto de fotos del anuncio. Debe mostrar solo el producto que se vende, sobre fondo blanco puro (RGB 255, 255, 255), con el producto ocupando cerca del 85% del encuadre. En la imagen principal no se permiten textos, logotipos, marcas de agua, bordes ni accesorios que no estén incluidos, y los anuncios que incumplen estas reglas pueden dejar de mostrarse en la búsqueda.",
          "La imagen debe medir al menos 1000 px en su lado más largo para que funcione el zoom. Muchos vendedores usan cuadrados de 2000 × 2000 px porque se ven nítidos en pantallas de alta resolución y coinciden con las casillas cuadradas que Amazon usa en la búsqueda.",
        ],
      },
      {
        h: "Conseguir el encuadre del 85%",
        p: [
          "Si el producto es demasiado pequeño en el encuadre, se ve diminuto junto a la competencia en los resultados de búsqueda. Si toca los bordes, puede verse apretado y quedar cortado en algunos diseños. Un buen punto de partida es recortar para que el lado más largo del producto casi llegue al borde, dejando un margen blanco fino y uniforme.",
          "Usa el botón de ajustar en cada foto para ampliar hasta que el producto llene el cuadrado y luego arrástralo al centro. Para productos mucho más anchos que altos, como teclados, elige la opción de ajustar para que el producto completo quede en el encuadre sobre fondo blanco.",
        ],
      },
      {
        h: "Imágenes secundarias",
        p: [
          "Amazon permite varias imágenes adicionales, y estas no tienen que cumplir la regla del fondo blanco. Úsalas para fotos de ambiente que muestren el producto en uso, primeros planos de materiales y funciones, una foto con una mano o un objeto común para dar escala, el contenido de la caja y un gráfico sencillo con las medidas.",
          "Mantén las imágenes secundarias del mismo tamaño que la principal, preferiblemente cuadradas, para que la galería y el zoom funcionen de forma uniforme. Exportar todas las imágenes de un anuncio en un solo lote a 2000 × 2000 px es la manera más sencilla de conseguirlo.",
        ],
      },
      {
        h: "Nota sobre el fondo",
        p: [
          "Esta herramienta recorta, redimensiona y puede añadir un fondo blanco alrededor de la foto cuando eliges la opción de ajustar, pero no elimina un fondo existente. Para la imagen principal, fotografía el producto sobre un fondo blanco continuo o una caja de luz, o elimina antes el fondo, y luego usa esta herramienta para dar tamaño y encuadre al resultado. Revisa las esquinas de la imagen final: un fondo blanco roto o gris es uno de los motivos más habituales por los que se marca una imagen principal.",
        ],
      },
    ],
  },

  shopify: {
    en: [
      {
        h: "Why image consistency matters on Shopify",
        p: [
          "Shopify themes display products in grids on the home page, collection pages, and search. When every product image has the same aspect ratio and a similar margin around the product, the grid looks orderly and products are easy to compare. When shapes vary, the theme either crops images unpredictably or leaves uneven gaps, and the store looks unfinished.",
          "Shopify recommends 2048 × 2048 px for square product images. This is large enough for high-resolution screens and theme zoom features without creating unnecessarily heavy files.",
        ],
      },
      {
        h: "Matching your theme's image settings",
        p: [
          "Most Shopify themes, including the free Dawn theme, let you choose how product cards display images: adapt to the image, square, portrait, or landscape. Check this setting in the theme editor before resizing a catalogue. If your theme uses a square or portrait ratio, export images in exactly that ratio so the theme never has to crop them.",
          "Portrait (4:5, for example 1600 × 2000 px) suits clothing and tall products and takes up more of a phone screen. Square is the safest default for most other categories.",
        ],
      },
      {
        h: "Image size and store speed",
        p: [
          "Shopify serves resized and modern-format versions of your images automatically, but it starts from the file you upload. Very large originals take longer to upload and process. Exporting at the recommended size as JPG with 80–90% quality usually keeps each product image under 1 MB with no visible difference, which helps pages load quickly on mobile connections.",
          "Use PNG only for images that need transparency or have sharp flat graphics, such as a size chart. For photographs, PNG files are often several times larger than a good JPG.",
        ],
      },
      {
        h: "Variants, collections, and alt text",
        p: [
          "If a product has colour or style variants, give each variant its own image with the same framing, so switching variants does not make the product appear to jump in size. Collection images are shown smaller and are often cropped by the theme, so a 1024 × 1024 px square is usually enough.",
          "After uploading, add short, descriptive alt text to every product image in Shopify, such as \"Brown leather card holder, front view\". Alt text helps shoppers who use screen readers and gives search engines context about the image.",
        ],
      },
    ],
    es: [
      {
        h: "Por qué la uniformidad de las imágenes importa en Shopify",
        p: [
          "Los temas de Shopify muestran los productos en cuadrículas en la página de inicio, las colecciones y la búsqueda. Cuando todas las imágenes tienen la misma proporción y un margen parecido alrededor del producto, la cuadrícula se ve ordenada y es fácil comparar productos. Cuando las formas varían, el tema recorta las imágenes de forma imprevisible o deja huecos desiguales, y la tienda parece sin terminar.",
          "Shopify recomienda 2048 × 2048 px para las imágenes de producto cuadradas. Es un tamaño suficiente para pantallas de alta resolución y para el zoom de los temas sin crear archivos innecesariamente pesados.",
        ],
      },
      {
        h: "Ajustarte a la configuración de imágenes de tu tema",
        p: [
          "La mayoría de temas de Shopify, incluido el tema gratuito Dawn, te permiten elegir cómo se muestran las imágenes en las tarjetas de producto: adaptar a la imagen, cuadrado, vertical u horizontal. Revisa esta opción en el editor del tema antes de redimensionar un catálogo. Si tu tema usa una proporción cuadrada o vertical, exporta las imágenes exactamente en esa proporción para que el tema nunca tenga que recortarlas.",
          "El formato vertical (4:5, por ejemplo 1600 × 2000 px) es ideal para ropa y productos altos y ocupa más pantalla en el móvil. El cuadrado es la opción más segura para la mayoría de categorías.",
        ],
      },
      {
        h: "Tamaño de imagen y velocidad de la tienda",
        p: [
          "Shopify sirve automáticamente versiones redimensionadas y en formatos modernos de tus imágenes, pero parte del archivo que subes. Los originales muy grandes tardan más en subirse y procesarse. Exportar al tamaño recomendado en JPG con calidad del 80–90% suele dejar cada imagen de producto por debajo de 1 MB sin diferencia visible, lo que ayuda a que las páginas carguen rápido en el móvil.",
          "Usa PNG solo para imágenes que necesiten transparencia o tengan gráficos planos nítidos, como una tabla de tallas. Para fotografías, los PNG suelen pesar varias veces más que un buen JPG.",
        ],
      },
      {
        h: "Variantes, colecciones y texto alternativo",
        p: [
          "Si un producto tiene variantes de color o estilo, da a cada variante su propia imagen con el mismo encuadre, para que al cambiar de variante el producto no parezca cambiar de tamaño. Las imágenes de colección se muestran más pequeñas y el tema suele recortarlas, así que normalmente basta con un cuadrado de 1024 × 1024 px.",
          "Después de subirlas, añade en Shopify un texto alternativo breve y descriptivo a cada imagen de producto, como \"Tarjetero de cuero marrón, vista frontal\". El texto alternativo ayuda a quienes usan lectores de pantalla y da contexto a los buscadores sobre la imagen.",
        ],
      },
    ],
  },

  pinterest: {
    en: [
      {
        h: "Why Pinterest favours tall images",
        p: [
          "Pinterest arranges pins in columns, so taller images take up more vertical space in the feed and are more likely to be noticed while people scroll. Pinterest recommends a 2:3 aspect ratio, such as 1000 × 1500 px, for standard pins. Images taller than 2:3 may be cut off in the feed, which can hide the part of the photo that matters most.",
          "Square pins (1000 × 1000 px) are fine for simple product shots, but they occupy less space than a 2:3 pin next to them.",
        ],
      },
      {
        h: "Turning product photos into pins",
        p: [
          "Most product photos are square or landscape, so they need to be cropped or extended to work as pins. Cropping to 2:3 works well when the product is tall or sits in the middle of a lifestyle scene. For wide products, choose the fit option with a white background to keep the whole product visible, and leave the empty space above or below for a short title added in Pinterest or your design tool.",
          "Because Pinterest is visual search, the clearest, best-lit photo of the product usually performs better than a busy collage. Keep any text large enough to read on a phone.",
        ],
      },
      {
        h: "Testing several formats",
        p: [
          "It is common to publish several pins for the same product and see which one gets saved and clicked most. Select the standard, square, and full-screen sizes together and every photo is exported in all three, still for one credit per photo. You can then upload the variations over a few weeks and keep the format that performs best for your audience.",
          "Pinterest accepts JPG and PNG. JPG keeps photo-based pins small and fast to load.",
        ],
      },
    ],
    es: [
      {
        h: "Por qué Pinterest favorece las imágenes altas",
        p: [
          "Pinterest organiza los pines en columnas, así que las imágenes más altas ocupan más espacio vertical en el feed y es más probable que se vean al desplazarse. Pinterest recomienda una proporción 2:3, como 1000 × 1500 px, para los pines estándar. Las imágenes más altas que 2:3 pueden cortarse en el feed y ocultar justo la parte más importante de la foto.",
          "Los pines cuadrados (1000 × 1000 px) sirven para fotos de producto sencillas, pero ocupan menos espacio que un pin 2:3 a su lado.",
        ],
      },
      {
        h: "Convertir fotos de producto en pines",
        p: [
          "La mayoría de fotos de producto son cuadradas u horizontales, así que hay que recortarlas o ampliarlas para que funcionen como pines. Recortar a 2:3 funciona bien cuando el producto es alto o está en el centro de una escena de ambiente. Para productos anchos, elige la opción de ajustar con fondo blanco para mantener el producto completo visible, y deja el espacio libre de arriba o abajo para un título breve añadido en Pinterest o en tu herramienta de diseño.",
          "Como Pinterest es una búsqueda visual, la foto más clara y mejor iluminada del producto suele funcionar mejor que un collage recargado. Mantén cualquier texto lo bastante grande para leerse en el móvil.",
        ],
      },
      {
        h: "Probar varios formatos",
        p: [
          "Es habitual publicar varios pines del mismo producto y ver cuál se guarda y recibe más clics. Selecciona a la vez los tamaños estándar, cuadrado y de pantalla completa y cada foto se exporta en los tres, por un crédito por foto. Después puedes subir las variantes durante unas semanas y quedarte con el formato que mejor funcione con tu público.",
          "Pinterest acepta JPG y PNG. El JPG mantiene ligeros los pines basados en fotos y hace que carguen rápido.",
        ],
      },
    ],
  },

  "etsy-banner": {
    en: [
      {
        h: "Big banner or mini banner?",
        p: [
          "Etsy lets you show either a big banner or a mini banner at the top of your shop. The big banner is a wide image, commonly made at 3360 × 840 px (a 4:1 ratio), that spans the full width of the shop page and works like a storefront sign. The mini banner is a slim strip, commonly 1200 × 160 px, that leaves more room for your listings above the fold.",
          "A big banner suits shops with a strong visual brand or a seasonal campaign. A mini banner suits shops where shoppers mainly want to see products straight away. You can switch between them at any time in your shop settings, so it is worth exporting both from the same artwork and seeing which one looks better on your shop.",
        ],
      },
      {
        h: "Designing for very wide proportions",
        p: [
          "A 4:1 banner is four times wider than it is tall, so most photos lose a large part of their top and bottom when cropped. Choose images with a horizontal composition: a row of products, a flat lay across a table, or a landscape-style scene. Close-up portraits and tall products rarely crop well to banner proportions.",
          "Etsy scales and trims the banner on smaller screens, so the left and right edges are the first to disappear on phones. Keep your shop name, logo, and any short message within the middle third of the image. Leave the edges for background texture that can be lost without harm.",
        ],
      },
      {
        h: "Text, contrast, and file size",
        p: [
          "If you add text, keep it short and large. A banner is seen at a glance, and small type becomes unreadable when the image is scaled down on a phone. Use strong contrast between text and background, and avoid placing text over a busy part of the photo.",
          "Save photographic banners as JPG to keep the file light. Use PNG only if the banner is mostly flat colour and sharp text, where JPG compression could create fuzzy edges. After uploading, check the shop on both a computer and a phone before you consider the banner finished.",
        ],
      },
      {
        h: "Keeping your branding consistent",
        p: [
          "Your banner, shop icon, and listing photos are seen together, so they should feel like one shop. Reuse the same colours and fonts across the banner and any graphics, and pick a shop icon (500 × 500 px) that is still recognisable when shown as a small circle. Exporting the banner and icon in one batch makes it easy to keep them matched.",
        ],
      },
    ],
    es: [
      {
        h: "¿Banner grande o mini banner?",
        p: [
          "Etsy te permite mostrar un banner grande o un mini banner en la parte superior de tu tienda. El banner grande es una imagen ancha, que suele hacerse en 3360 × 840 px (proporción 4:1), ocupa todo el ancho de la página de la tienda y funciona como el rótulo de un escaparate. El mini banner es una franja estrecha, normalmente de 1200 × 160 px, que deja más espacio para tus anuncios en la parte visible de la página.",
          "El banner grande encaja en tiendas con una imagen de marca fuerte o una campaña de temporada. El mini banner encaja en tiendas donde los compradores quieren ver los productos enseguida. Puedes cambiar entre ambos cuando quieras en la configuración de la tienda, así que vale la pena exportar los dos a partir del mismo diseño y ver cuál queda mejor en tu tienda.",
        ],
      },
      {
        h: "Diseñar para proporciones muy anchas",
        p: [
          "Un banner 4:1 es cuatro veces más ancho que alto, así que la mayoría de fotos pierden gran parte de la zona superior e inferior al recortarlas. Elige imágenes de composición horizontal: una fila de productos, un bodegón sobre una mesa o una escena tipo paisaje. Los primeros planos y los productos altos rara vez se recortan bien a proporciones de banner.",
          "Etsy escala y recorta el banner en pantallas pequeñas, por lo que los bordes izquierdo y derecho son lo primero que desaparece en el móvil. Mantén el nombre de la tienda, el logotipo y cualquier mensaje breve dentro del tercio central de la imagen. Deja los bordes para texturas de fondo que puedan perderse sin problema.",
        ],
      },
      {
        h: "Texto, contraste y peso del archivo",
        p: [
          "Si añades texto, que sea breve y grande. Un banner se ve de un vistazo, y la letra pequeña se vuelve ilegible cuando la imagen se reduce en el móvil. Usa un contraste fuerte entre el texto y el fondo y evita colocar texto sobre una zona recargada de la foto.",
          "Guarda los banners fotográficos en JPG para que pesen poco. Usa PNG solo si el banner es sobre todo color plano y texto nítido, donde la compresión JPG podría difuminar los bordes. Después de subirlo, revisa la tienda en un ordenador y en un móvil antes de dar el banner por terminado.",
        ],
      },
      {
        h: "Mantener una imagen de marca uniforme",
        p: [
          "El banner, el icono de la tienda y las fotos de los anuncios se ven juntos, así que deben parecer una misma tienda. Reutiliza los mismos colores y tipografías en el banner y en cualquier gráfico, y elige un icono (500 × 500 px) que se reconozca incluso como un círculo pequeño. Exportar el banner y el icono en un solo lote facilita que combinen.",
        ],
      },
    ],
  },

  "shopify-banner": {
    en: [
      {
        h: "There is no single Shopify banner size",
        p: [
          "Shopify does not set one banner size for every store. Each theme decides how hero images, slideshows, and image banners are displayed, and many themes let you choose the section height, such as small, medium, large, or adapt to image. That is why the sizes on this page are practical starting points rather than fixed rules.",
          "For most themes, a hero or image banner between 1920 and 2000 px wide stays sharp on large desktop screens. A 16:9 image (1920 × 1080 px) suits tall hero sections, while a wider 2000 × 800 px image suits slideshows and shorter banners. Announcement or promotional strips are often around 1200 × 400 px.",
        ],
      },
      {
        h: "How themes crop banners on phones",
        p: [
          "A wide banner shown on a phone is either scaled down until it is very short, or cropped to a taller shape so it still fills the screen. Which one happens depends on the theme and section settings. In both cases, the left and right edges are the parts most likely to disappear, so put products, faces, and text near the centre.",
          "Some themes, including Dawn, let you upload a separate image for mobile. If yours does, export a second, taller version from the same photo, for example a 4:5 or square crop, so the mobile banner is framed on purpose instead of cropped automatically.",
        ],
      },
      {
        h: "Text on banners",
        p: [
          "Most Shopify themes let you add a heading and button on top of a banner using the theme editor. Using that text instead of writing words into the image keeps them sharp on every screen, makes them readable by search engines and screen readers, and lets you change a sale message without editing the image again.",
          "If you do overlay text in the theme, choose a photo with a calm area of colour where the text will sit, and use the theme's overlay or opacity setting to keep enough contrast.",
        ],
      },
      {
        h: "Keeping banners fast",
        p: [
          "The banner is usually the largest image on the home page and one of the first things to load, so its file size affects how quickly the page appears. Export photographic banners as JPG at 80–90% quality. A well-prepared 1920 px banner is usually a few hundred kilobytes, which is far lighter than an untouched camera original.",
        ],
      },
    ],
    es: [
      {
        h: "No existe un único tamaño de banner en Shopify",
        p: [
          "Shopify no fija un único tamaño de banner para todas las tiendas. Cada tema decide cómo se muestran las imágenes de portada, los carruseles y los banners de imagen, y muchos temas te permiten elegir la altura de la sección, como pequeña, mediana, grande o adaptada a la imagen. Por eso los tamaños de esta página son puntos de partida prácticos y no reglas fijas.",
          "En la mayoría de temas, una portada o banner de imagen de entre 1920 y 2000 px de ancho se ve nítida en pantallas grandes. Una imagen 16:9 (1920 × 1080 px) encaja en secciones de portada altas, mientras que una más ancha de 2000 × 800 px encaja en carruseles y banners más bajos. Las franjas de anuncios o promociones suelen rondar los 1200 × 400 px.",
        ],
      },
      {
        h: "Cómo recortan los temas los banners en el móvil",
        p: [
          "Un banner ancho en un móvil se reduce hasta quedar muy bajo o se recorta a una forma más alta para que siga llenando la pantalla. Lo que ocurra depende del tema y de la configuración de la sección. En ambos casos, los bordes izquierdo y derecho son lo que más probablemente desaparece, así que coloca productos, caras y texto cerca del centro.",
          "Algunos temas, como Dawn, te permiten subir una imagen distinta para el móvil. Si el tuyo lo permite, exporta una segunda versión más alta de la misma foto, por ejemplo un recorte 4:5 o cuadrado, para que el banner móvil esté encuadrado a propósito y no recortado automáticamente.",
        ],
      },
      {
        h: "Texto en los banners",
        p: [
          "La mayoría de temas de Shopify te permiten añadir un título y un botón sobre el banner desde el editor del tema. Usar ese texto en lugar de escribir las palabras dentro de la imagen las mantiene nítidas en cualquier pantalla, permite que los buscadores y los lectores de pantalla las lean y te deja cambiar un mensaje de rebajas sin volver a editar la imagen.",
          "Si superpones texto desde el tema, elige una foto con una zona de color tranquila donde vaya el texto y usa la opción de superposición u opacidad del tema para mantener suficiente contraste.",
        ],
      },
      {
        h: "Mantener los banners ligeros",
        p: [
          "El banner suele ser la imagen más grande de la página de inicio y una de las primeras en cargarse, así que su peso influye en lo rápido que aparece la página. Exporta los banners fotográficos en JPG con calidad del 80–90%. Un banner de 1920 px bien preparado suele pesar unos cientos de kilobytes, mucho menos que un original de cámara sin tocar.",
        ],
      },
    ],
  },

  poshmark: {
    en: [
      {
        h: "Poshmark shows every photo as a square",
        p: [
          "Poshmark displays listing photos in a square frame in the feed, in search, and in your closet. When you upload a rectangular photo, the app asks you to crop it to a square, and anything outside the crop is lost. Cropping to a square yourself before uploading, at around 1280 × 1280 px, means you decide exactly what stays in the frame.",
          "For clothing, a square crop usually works best when the garment is shown flat or on a hanger with a little space around it. For a full-length dress or coat, choose the fit option with a white background so the hem and neckline both stay visible.",
        ],
      },
      {
        h: "The cover shot sells the listing",
        p: [
          "The first photo is your cover shot. It is the only image most shoppers see while they scroll, so it should show the whole item clearly, straight on, and well lit. Save close-ups, labels, and flaws for the photos that follow.",
          "Consistent cover shots also make your closet look professional. Use the same background, the same distance, and the same square crop for every cover photo, so shoppers browsing your closet see a tidy grid rather than a mix of styles.",
        ],
      },
      {
        h: "Photos that answer buyers' questions",
        p: [
          "Buyers on Poshmark often ask about size, fabric, and condition. Answer those questions in your photos: include the brand and size label, the fabric content tag, close-ups of any pilling, stains, or wear, and a shot of the garment's fit or measurements if you can. Clear photos reduce back-and-forth comments and returns.",
          "Natural daylight from a window gives the most accurate colour for clothing. Avoid mixing indoor bulbs and daylight in the same photo, which can make colours look different from the real item.",
        ],
      },
      {
        h: "Batch-preparing a closet",
        p: [
          "If you list many items at once, photograph them in one session with the same setup, then add all the photos here and export them as 1280 × 1280 px squares in one ZIP. Adjust the framing on any photo where the item sits off-centre. Every photo then arrives on your phone already square, so you can skip cropping in the app.",
        ],
      },
    ],
    es: [
      {
        h: "Poshmark muestra todas las fotos en cuadrado",
        p: [
          "Poshmark muestra las fotos de los anuncios en un marco cuadrado en el feed, en la búsqueda y en tu armario. Cuando subes una foto rectangular, la aplicación te pide recortarla a cuadrado y lo que quede fuera se pierde. Recortarla tú a cuadrado antes de subirla, a unos 1280 × 1280 px, te permite decidir exactamente qué queda en el encuadre.",
          "En ropa, el recorte cuadrado suele funcionar mejor cuando la prenda se muestra estirada o en una percha con algo de espacio alrededor. Para un vestido o abrigo largo, elige la opción de ajustar con fondo blanco para que el bajo y el cuello sigan visibles.",
        ],
      },
      {
        h: "La foto de portada vende el anuncio",
        p: [
          "La primera foto es tu portada. Es la única imagen que la mayoría de compradores ve al desplazarse, así que debe mostrar el artículo completo, de frente y bien iluminado. Deja los primeros planos, las etiquetas y los defectos para las fotos siguientes.",
          "Unas portadas uniformes también hacen que tu armario se vea profesional. Usa el mismo fondo, la misma distancia y el mismo recorte cuadrado en todas las portadas, para que quien navegue por tu armario vea una cuadrícula ordenada y no una mezcla de estilos.",
        ],
      },
      {
        h: "Fotos que responden a las dudas del comprador",
        p: [
          "En Poshmark los compradores suelen preguntar por la talla, el tejido y el estado. Responde con tus fotos: incluye la etiqueta de marca y talla, la etiqueta de composición, primeros planos de bolitas, manchas o desgaste y, si puedes, una foto del ajuste o de las medidas de la prenda. Unas fotos claras reducen los comentarios de ida y vuelta y las devoluciones.",
          "La luz natural de una ventana da el color más fiel en ropa. Evita mezclar bombillas interiores y luz de día en la misma foto, porque los colores pueden verse distintos al artículo real.",
        ],
      },
      {
        h: "Preparar un armario en lote",
        p: [
          "Si publicas muchos artículos a la vez, fotografíalos en una sola sesión con la misma configuración, añade aquí todas las fotos y expórtalas como cuadrados de 1280 × 1280 px en un ZIP. Ajusta el encuadre de cualquier foto en la que el artículo no esté centrado. Así todas las fotos llegan a tu móvil ya cuadradas y puedes saltarte el recorte en la aplicación.",
        ],
      },
    ],
  },

  "facebook-marketplace": {
    en: [
      {
        h: "How Marketplace displays photos",
        p: [
          "Facebook Marketplace shows listings in a grid of square tiles, mostly viewed on phones. The first photo is cropped to fill that square, so the edges of a wide or tall photo may not appear in the grid. A square image such as 1080 × 1080 px shows exactly what you intended and looks sharp on modern phone screens.",
          "When a buyer opens the listing, Marketplace shows the photos larger and closer to their original shape. A portrait 4:5 photo (1080 × 1350 px) uses more of the screen at that point, which is useful for furniture, clothing, and other tall items.",
        ],
      },
      {
        h: "Make the first photo count",
        p: [
          "People scroll Marketplace quickly, so the first photo needs to show what the item is at a glance. Photograph the whole item, in good light, against an uncluttered background, and fill most of the frame with it. Move nearby objects out of the shot so buyers do not wonder which item is for sale.",
          "Local buyers also want to know the condition before they message you. Add photos of any wear, the brand or model label, and the item in use or assembled. Photos that answer common questions mean fewer messages asking for more pictures.",
        ],
      },
      {
        h: "Using the same photo for ads and shares",
        p: [
          "If you share a listing to a group or use the photo in a Facebook ad or link post, a landscape image of 1200 × 628 px is the common size for link previews and many ad placements. Selecting both the square and the link size here exports each photo in both shapes at once, still for one credit per photo.",
        ],
      },
      {
        h: "Practical tips for phone photos",
        p: [
          "Wipe your phone's camera lens before shooting; a smudged lens is a common cause of hazy listing photos. Shoot near a window rather than under a ceiling light, and hold the phone level with the middle of the item to avoid distorted shapes. Photos taken this way need only a quick resize and crop before they are ready to post.",
        ],
      },
    ],
    es: [
      {
        h: "Cómo muestra Marketplace las fotos",
        p: [
          "Facebook Marketplace muestra los anuncios en una cuadrícula de casillas cuadradas, que se ve sobre todo en el móvil. La primera foto se recorta para llenar ese cuadrado, así que los bordes de una foto ancha o alta pueden no aparecer en la cuadrícula. Una imagen cuadrada como 1080 × 1080 px muestra exactamente lo que querías y se ve nítida en los móviles actuales.",
          "Cuando el comprador abre el anuncio, Marketplace muestra las fotos más grandes y más cerca de su forma original. Una foto vertical 4:5 (1080 × 1350 px) aprovecha más la pantalla en ese momento, algo útil para muebles, ropa y otros artículos altos.",
        ],
      },
      {
        h: "Haz que la primera foto cuente",
        p: [
          "En Marketplace la gente se desplaza rápido, así que la primera foto debe mostrar de un vistazo qué es el artículo. Fotografía el artículo completo, con buena luz, sobre un fondo despejado, y haz que ocupe la mayor parte del encuadre. Retira los objetos cercanos para que el comprador no dude de qué artículo se vende.",
          "Los compradores locales también quieren conocer el estado antes de escribirte. Añade fotos del desgaste, de la etiqueta de marca o modelo y del artículo en uso o montado. Unas fotos que responden a las preguntas habituales significan menos mensajes pidiendo más imágenes.",
        ],
      },
      {
        h: "Usar la misma foto en anuncios y publicaciones",
        p: [
          "Si compartes un anuncio en un grupo o usas la foto en un anuncio o publicación con enlace de Facebook, una imagen horizontal de 1200 × 628 px es el tamaño habitual para las vistas previas de enlaces y muchas ubicaciones de anuncios. Al seleccionar aquí el tamaño cuadrado y el de enlace, cada foto se exporta en ambas formas a la vez, por un crédito por foto.",
        ],
      },
      {
        h: "Consejos prácticos para fotos con el móvil",
        p: [
          "Limpia la lente de la cámara del móvil antes de fotografiar; una lente manchada es una causa habitual de fotos borrosas. Fotografía junto a una ventana en lugar de bajo una lámpara de techo y sujeta el móvil a la altura del centro del artículo para evitar formas deformadas. Las fotos hechas así solo necesitan un redimensionado y recorte rápidos para estar listas.",
        ],
      },
    ],
  },

  "tiktok-shop": {
    en: [
      {
        h: "Product images on a video-first platform",
        p: [
          "Most TikTok Shop sales start with a video, but the product listing images are what shoppers see when they tap through to buy, browse the Shop tab, or compare products. Those images appear as square cards on a phone screen, often next to similar products from other sellers, so they need to be clear at a small size.",
          "A square image of 1080 × 1080 px is sharp on modern phones while keeping files small. TikTok Shop sets its own minimum resolution and file size limits, which can vary by region, so check the listing guidelines in Seller Center for your market.",
        ],
      },
      {
        h: "What makes a strong main image",
        p: [
          "Show the whole product, large and centred, on a clean background. Strong contrast between the product and the background helps the shape read instantly on a small screen. Avoid crowding the main image with text, badges, or multiple products; small text becomes unreadable and some regions restrict promotional text on the main image.",
          "Use the remaining images to show the product from other angles, its size in a hand or next to a common object, close-ups of materials or features, and what comes in the box.",
        ],
      },
      {
        h: "Vertical images",
        p: [
          "TikTok itself is vertical, and a 9:16 image (1080 × 1920 px) fills the screen. Vertical images are useful for content you create around a product, such as photo posts or promotional graphics, even though the listing images themselves are square. Exporting both shapes from the same product photos keeps your listing and your content visually consistent.",
        ],
      },
      {
        h: "Reusing photos from other marketplaces",
        p: [
          "If you already sell on Amazon or Shopify, you can usually reuse the same product photos. Rather than uploading a 2000 px Amazon image, export a 1080 × 1080 px version for TikTok Shop so files stay within upload limits and load quickly over mobile data. Adding the same photos here once and selecting each platform's size gives you a set for every channel in one download.",
        ],
      },
    ],
    es: [
      {
        h: "Imágenes de producto en una plataforma de vídeo",
        p: [
          "La mayoría de ventas en TikTok Shop empiezan con un vídeo, pero las imágenes del anuncio son lo que ve el comprador cuando pulsa para comprar, navega por la pestaña Shop o compara productos. Esas imágenes aparecen como tarjetas cuadradas en la pantalla del móvil, a menudo junto a productos parecidos de otros vendedores, así que deben verse claras en tamaño pequeño.",
          "Una imagen cuadrada de 1080 × 1080 px se ve nítida en los móviles actuales y mantiene los archivos ligeros. TikTok Shop fija sus propios mínimos de resolución y límites de peso, que pueden variar según la región, así que revisa las normas de anuncios en Seller Center para tu mercado.",
        ],
      },
      {
        h: "Qué hace fuerte una imagen principal",
        p: [
          "Muestra el producto completo, grande y centrado, sobre un fondo limpio. Un contraste fuerte entre el producto y el fondo ayuda a que la forma se entienda al instante en una pantalla pequeña. Evita llenar la imagen principal de texto, insignias o varios productos; el texto pequeño se vuelve ilegible y algunas regiones restringen el texto promocional en la imagen principal.",
          "Usa el resto de imágenes para mostrar el producto desde otros ángulos, su tamaño en la mano o junto a un objeto común, primeros planos de materiales o funciones y el contenido de la caja.",
        ],
      },
      {
        h: "Imágenes verticales",
        p: [
          "TikTok es vertical, y una imagen 9:16 (1080 × 1920 px) llena la pantalla. Las imágenes verticales son útiles para el contenido que creas en torno a un producto, como publicaciones de fotos o gráficos promocionales, aunque las imágenes del anuncio sean cuadradas. Exportar ambas formas a partir de las mismas fotos mantiene uniformes tu anuncio y tu contenido.",
        ],
      },
      {
        h: "Reutilizar fotos de otros marketplaces",
        p: [
          "Si ya vendes en Amazon o Shopify, normalmente puedes reutilizar las mismas fotos de producto. En lugar de subir una imagen de Amazon de 2000 px, exporta una versión de 1080 × 1080 px para TikTok Shop, así los archivos respetan los límites de subida y cargan rápido con datos móviles. Añadir aquí las mismas fotos una vez y seleccionar el tamaño de cada plataforma te da un juego para cada canal en una sola descarga.",
        ],
      },
    ],
  },

  mercari: {
    en: [
      {
        h: "Square photos on Mercari",
        p: [
          "Mercari displays listing photos as squares in search results and on the listing page, and the app crops rectangular photos to fit. Cropping to a square such as 1080 × 1080 px before you upload keeps the item framed the way you want and stops the app from cutting off a corner of the item.",
          "If an item does not fit a square well, such as a long scarf or a tall lamp, use the fit option with a white background. The whole item stays visible and the photo is still square.",
        ],
      },
      {
        h: "What buyers look for in Mercari photos",
        p: [
          "Mercari is used heavily for second-hand items, so buyers want to judge condition from the photos. Start with a clear photo of the whole item, then show labels, model numbers, the back and underside, and close-ups of any scratches, stains, or missing parts. For electronics, a photo of the item switched on helps show that it works.",
          "Photos that match the description build trust. If the listing says \"minor wear\", show that wear so the buyer knows exactly what to expect.",
        ],
      },
      {
        h: "Light and background",
        p: [
          "Shoot near a window during the day and turn off overhead lights to avoid a yellow tint. A plain sheet of white card or a clean wall makes a simple background that works for most small items. Keep the background the same across all your listings so your profile looks consistent.",
        ],
      },
      {
        h: "Listing several items at once",
        p: [
          "Photograph a batch of items in one session, add every photo here, and export them as squares in a single ZIP. File names keep the original name with the size added, so photos of the same item stay together. You can then upload them straight from your phone's downloads without cropping each one in the app.",
        ],
      },
    ],
    es: [
      {
        h: "Fotos cuadradas en Mercari",
        p: [
          "Mercari muestra las fotos de los anuncios en cuadrado en los resultados de búsqueda y en la página del anuncio, y la aplicación recorta las fotos rectangulares para que encajen. Recortar a un cuadrado como 1080 × 1080 px antes de subirlas mantiene el artículo encuadrado como quieres y evita que la aplicación corte una esquina del artículo.",
          "Si un artículo no encaja bien en un cuadrado, como una bufanda larga o una lámpara alta, usa la opción de ajustar con fondo blanco. El artículo completo sigue visible y la foto sigue siendo cuadrada.",
        ],
      },
      {
        h: "Qué buscan los compradores en las fotos de Mercari",
        p: [
          "Mercari se usa mucho para artículos de segunda mano, así que los compradores quieren juzgar el estado a partir de las fotos. Empieza con una foto clara del artículo completo y luego muestra etiquetas, números de modelo, la parte trasera e inferior y primeros planos de rasguños, manchas o piezas que falten. En electrónica, una foto del artículo encendido ayuda a demostrar que funciona.",
          "Las fotos que coinciden con la descripción generan confianza. Si el anuncio dice \"desgaste leve\", muestra ese desgaste para que el comprador sepa exactamente qué esperar.",
        ],
      },
      {
        h: "Luz y fondo",
        p: [
          "Fotografía junto a una ventana durante el día y apaga las luces del techo para evitar un tono amarillento. Una cartulina blanca o una pared limpia son un fondo sencillo que funciona con la mayoría de artículos pequeños. Mantén el mismo fondo en todos tus anuncios para que tu perfil se vea uniforme.",
        ],
      },
      {
        h: "Publicar varios artículos a la vez",
        p: [
          "Fotografía un lote de artículos en una sola sesión, añade aquí todas las fotos y expórtalas como cuadrados en un solo ZIP. Los nombres de archivo conservan el nombre original con el tamaño añadido, así que las fotos de un mismo artículo quedan juntas. Después puedes subirlas directamente desde las descargas del móvil sin recortar cada una en la aplicación.",
        ],
      },
    ],
  },

  depop: {
    en: [
      {
        h: "Depop's square grid",
        p: [
          "Depop shows listings in a square grid on your shop page and in search, and buyers often decide whether to tap from that grid alone. Square photos of around 1280 × 1280 px look clean in the grid and avoid surprise crops when the app fits a rectangular photo into a square.",
          "Because shoppers scroll quickly, your first photo needs to show the item and its style immediately. Many Depop sellers use a consistent look across their shop, such as the same backdrop, the same lighting, or the item always worn, so the grid feels like a curated collection.",
        ],
      },
      {
        h: "Flat lay, hanger, or worn",
        p: [
          "There are three common ways to photograph clothing on Depop. A flat lay, with the item laid out on a plain surface and photographed from above, shows shape and details clearly and is easy to keep consistent. A hanger shot against a plain wall shows how the garment hangs. A worn shot shows fit and style, which is often what sells vintage and streetwear.",
          "Whichever you choose, crop every cover photo to the same square with a similar margin, so items look the same size in your grid.",
        ],
      },
      {
        h: "Show details and condition",
        p: [
          "Follow the cover photo with close-ups of the label, fabric, any graphics or embroidery, and any flaws such as fading, pilling, or small holes. For vintage items, buyers value honesty about wear, and clear photos of it reduce disputes.",
          "Natural light gives the most accurate colours. If a colour is hard to capture, mention it in the description as well as showing it in the photos.",
        ],
      },
      {
        h: "Preparing a drop",
        p: [
          "If you list a batch of items together, photograph them all with the same setup, add the photos here, and export them as squares in one ZIP. Adjust the framing for any item that sits off-centre. Every photo arrives already square and evenly framed, ready to upload from your phone.",
        ],
      },
    ],
    es: [
      {
        h: "La cuadrícula cuadrada de Depop",
        p: [
          "Depop muestra los anuncios en una cuadrícula cuadrada en tu tienda y en la búsqueda, y los compradores suelen decidir si entrar solo con esa cuadrícula. Las fotos cuadradas de unos 1280 × 1280 px se ven limpias en la cuadrícula y evitan recortes inesperados cuando la aplicación encaja una foto rectangular en un cuadrado.",
          "Como los compradores se desplazan rápido, tu primera foto debe mostrar el artículo y su estilo de inmediato. Muchos vendedores de Depop usan un estilo uniforme en su tienda, como el mismo fondo, la misma luz o el artículo siempre puesto, para que la cuadrícula parezca una colección seleccionada.",
        ],
      },
      {
        h: "Estirada, en percha o puesta",
        p: [
          "Hay tres formas habituales de fotografiar ropa en Depop. La prenda estirada sobre una superficie lisa y fotografiada desde arriba muestra la forma y los detalles con claridad y es fácil de mantener uniforme. La foto en percha contra una pared lisa muestra cómo cae la prenda. La foto con la prenda puesta muestra el ajuste y el estilo, que a menudo es lo que vende la ropa vintage y urbana.",
          "Elijas la que elijas, recorta todas las portadas al mismo cuadrado con un margen parecido, para que los artículos se vean del mismo tamaño en tu cuadrícula.",
        ],
      },
      {
        h: "Muestra los detalles y el estado",
        p: [
          "Después de la portada, añade primeros planos de la etiqueta, el tejido, los estampados o bordados y cualquier defecto, como decoloración, bolitas o pequeños agujeros. En artículos vintage, los compradores valoran la sinceridad sobre el desgaste, y unas fotos claras reducen las disputas.",
          "La luz natural da los colores más fieles. Si un color es difícil de captar, menciónalo en la descripción además de mostrarlo en las fotos.",
        ],
      },
      {
        h: "Preparar un lanzamiento",
        p: [
          "Si publicas un lote de artículos juntos, fotografíalos todos con la misma configuración, añade aquí las fotos y expórtalas como cuadrados en un ZIP. Ajusta el encuadre de cualquier artículo que no esté centrado. Todas las fotos llegan ya cuadradas y con el mismo encuadre, listas para subir desde el móvil.",
        ],
      },
    ],
  },

  walmart: {
    en: [
      {
        h: "Walmart Marketplace image basics",
        p: [
          "Walmart Marketplace asks for square product images large enough for zoom, and many sellers export them at about 2000 × 2000 px. The main image should show the product on a white background, filling most of the frame, without added text, watermarks, or promotional graphics. Walmart publishes detailed image guidelines in Seller Center, and those are the final reference for your category.",
          "Images that are too small, cropped awkwardly, or on a coloured background are common reasons for content quality issues, which can affect how a listing is shown.",
        ],
      },
      {
        h: "Framing the main image",
        p: [
          "Crop so the product fills most of the square with a thin, even white margin. If the product is much wider or taller than it is deep, use the fit option so the whole product stays in frame and the empty space is filled with white. Check that nothing important, such as a cap, cable, or handle, touches the edge.",
        ],
      },
      {
        h: "Additional images",
        p: [
          "Use the remaining image slots to show other angles, close-ups of materials and features, the product in use, its size relative to a common object, and what is included. Keep every image for a listing the same square size so the image carousel and zoom behave consistently.",
        ],
      },
      {
        h: "Selling the same product on several marketplaces",
        p: [
          "Walmart, Amazon, and many other marketplaces use similar square, white-background main images, so the same photography can usually serve all of them. Add your photos here once and select each marketplace's size to export a full set in one ZIP. Check each marketplace's current rules before publishing, because details such as minimum size and file limits differ.",
        ],
      },
    ],
    es: [
      {
        h: "Lo básico de las imágenes en Walmart Marketplace",
        p: [
          "Walmart Marketplace pide imágenes de producto cuadradas y lo bastante grandes para el zoom, y muchos vendedores las exportan a unos 2000 × 2000 px. La imagen principal debe mostrar el producto sobre fondo blanco, ocupando la mayor parte del encuadre, sin texto añadido, marcas de agua ni gráficos promocionales. Walmart publica normas de imagen detalladas en Seller Center, que son la referencia final para tu categoría.",
          "Las imágenes demasiado pequeñas, mal recortadas o con fondo de color son motivos habituales de problemas de calidad de contenido, que pueden afectar a cómo se muestra un anuncio.",
        ],
      },
      {
        h: "Encuadrar la imagen principal",
        p: [
          "Recorta para que el producto ocupe la mayor parte del cuadrado con un margen blanco fino y uniforme. Si el producto es mucho más ancho o alto que profundo, usa la opción de ajustar para que el producto completo quede en el encuadre y el espacio vacío se rellene de blanco. Comprueba que nada importante, como un tapón, un cable o un asa, toque el borde.",
        ],
      },
      {
        h: "Imágenes adicionales",
        p: [
          "Usa el resto de huecos de imagen para mostrar otros ángulos, primeros planos de materiales y funciones, el producto en uso, su tamaño junto a un objeto común y el contenido incluido. Mantén todas las imágenes de un anuncio con el mismo tamaño cuadrado para que el carrusel y el zoom funcionen de forma uniforme.",
        ],
      },
      {
        h: "Vender el mismo producto en varios marketplaces",
        p: [
          "Walmart, Amazon y muchos otros marketplaces usan imágenes principales cuadradas y con fondo blanco parecidas, así que normalmente las mismas fotos sirven para todos. Añade aquí tus fotos una vez y selecciona el tamaño de cada marketplace para exportar un juego completo en un ZIP. Revisa las normas actuales de cada marketplace antes de publicar, porque detalles como el tamaño mínimo y los límites de archivo cambian.",
        ],
      },
    ],
  },
};
