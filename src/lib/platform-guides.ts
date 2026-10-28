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
};
