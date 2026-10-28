import type { Guide } from "@/lib/guides";

// Spanish translations of the English guides. `enSlug` links each guide to its English original for hreflang.
export type GuideEs = Guide & { enSlug: string };

const PUBLISHED = "2026-10-28";

export const GUIDES_ES: GuideEs[] = [
  {
    slug: "requisitos-imagenes-producto-amazon",
    enSlug: "amazon-product-image-requirements",
    title: "Requisitos de imágenes de producto en Amazon: lista práctica para vendedores",
    description:
      "Qué espera Amazon de las imágenes principales y secundarias: tamaño, fondo blanco, encuadre, formato de archivo y los errores que más a menudo hacen que un anuncio deje de mostrarse.",
    summary:
      "Reglas de tamaño, fondo, encuadre y formato para la imagen principal de Amazon, con una lista de comprobación para antes de cada subida.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 7,
    sections: [
      {
        heading: "Por qué la imagen principal importa más que ninguna otra",
        blocks: [
          { type: "p", text: "En Amazon, la imagen principal es la única que la mayoría de compradores ve antes de decidir si hace clic. Aparece en los resultados de búsqueda, en los espacios patrocinados y en los módulos de comparación, normalmente en tamaño pequeño junto a productos de la competencia. Una imagen principal demasiado pequeña, mal recortada o con el fondo equivocado puede hacer que un buen producto parezca peor de lo que es, y una imagen que incumple las normas de estilo de Amazon puede hacer que el anuncio deje de aparecer en la búsqueda." },
          { type: "p", text: "Amazon publica sus normas de imagen en Seller Central, en los requisitos de imágenes de producto y en la guía de estilo de cada categoría. Esos documentos son la referencia final y cambian con el tiempo, así que usa esta guía como lista de trabajo y confirma los detalles de tu categoría y marketplace antes de una subida grande." },
        ],
      },
      {
        heading: "Tamaño de imagen y zoom",
        blocks: [
          { type: "p", text: "Amazon activa el zoom al pasar el cursor cuando el lado más largo de la imagen mide al menos 1000 píxeles. Las imágenes más pequeñas pueden aceptarse, pero el comprador pierde la posibilidad de examinar los detalles, que es uno de los principales motivos por los que la gente confía en un anuncio online." },
          { type: "ul", items: [
            "Apunta a al menos 1600 píxeles en el lado más largo; muchos vendedores usan 2000 × 2000 píxeles como estándar.",
            "Un lienzo cuadrado 1:1 se muestra de forma más uniforme en la búsqueda, en el móvil y en la página de detalle del producto.",
            "Evita ampliar una foto pequeña para llegar al mínimo. Agrandar una imagen de 600 píxeles a 2000 no añade detalle real y suele verse borrosa al hacer zoom.",
          ] },
          { type: "tip", text: "El tamaño de Amazon en Image Ready exporta un cuadrado de 2000 × 2000 píxeles, que supera con holgura el umbral del zoom y mantiene un peso de archivo razonable." },
        ],
      },
      {
        heading: "Fondo blanco puro en la imagen principal",
        blocks: [
          { type: "p", text: "La imagen principal debe tener fondo blanco puro, que Amazon define como RGB 255, 255, 255. Un fondo de estudio blanco roto o gris claro es uno de los motivos más habituales por los que se marca una imagen principal. Tu cámara puede registrar un fondo blanco como 245 o 250 en lugar de un 255 real, así que revisa las esquinas de la imagen en un editor que muestre los valores de los píxeles antes de subirla." },
          { type: "p", text: "Las imágenes secundarias (las fotos adicionales de la página de detalle) no tienen que cumplir la regla del fondo blanco. Ahí van las fotos de ambiente, las referencias de escala, los primeros planos de materiales y las imágenes tipo infografía." },
        ],
      },
      {
        heading: "Encuadre: llenar el marco sin cortar el producto",
        blocks: [
          { type: "p", text: "Amazon pide que el producto ocupe aproximadamente el 85 por ciento del encuadre. En la práctica, el producto debe ser el elemento dominante con un margen moderado y uniforme alrededor. Demasiado espacio vacío hace que el producto parezca diminuto en la búsqueda; un margen demasiado pequeño, o cortar parte del producto, parece descuidado y puede incumplir la norma de que el producto completo debe verse." },
          { type: "ol", items: [
            "Parte de una foto que tenga algo de aire alrededor del producto.",
            "Recorta a cuadrado y amplía hasta que el borde más largo del producto casi llegue al marco.",
            "Centra el producto a ojo, no matemáticamente. Las botellas y los artículos altos suelen verse mejor con algo más de espacio abajo que arriba.",
            "Comprueba que ninguna parte del producto, incluidos tapones, correas o cables, toque o cruce el borde.",
          ] },
        ],
      },
      {
        heading: "Lo que no debe aparecer en la imagen principal",
        blocks: [
          { type: "ul", items: [
            "Textos, logotipos, marcas de agua, insignias o gráficos promocionales añadidos sobre la foto.",
            "Accesorios o atrezo que no se incluyan con el producto.",
            "Varios ángulos o variantes del producto en una misma imagen, salvo que se venda como lote.",
            "Maniquíes en la mayoría de categorías de ropa; revisa la guía de estilo de tu categoría para la regla concreta.",
            "Bordes, bloques de color o imágenes provisionales.",
          ] },
        ],
      },
      {
        heading: "Formato de archivo y color",
        blocks: [
          { type: "p", text: "Amazon acepta archivos JPEG, PNG, TIFF y GIF no animados. JPEG es la opción más práctica para fotografías porque mantiene los archivos ligeros conservando el detalle. Guarda en el perfil de color sRGB; las imágenes guardadas en un perfil de gama amplia como Adobe RGB pueden verse apagadas o con los colores desplazados al mostrarse en un navegador." },
          { type: "p", text: "Si editas imágenes en el móvil o con una herramienta de diseño, revisa también el nombre del archivo. Las herramientas de carga masiva de Amazon se basan en el ASIN o el SKU del nombre del archivo, así que un hábito de nombres coherente ahorra tiempo después." },
        ],
      },
      {
        heading: "Lista de comprobación antes de subir",
        blocks: [
          { type: "ul", items: [
            "El lado más largo mide al menos 1000 píxeles, idealmente entre 1600 y 2000 o más.",
            "El fondo de la imagen principal es blanco puro (255, 255, 255) hasta las esquinas.",
            "El producto ocupa cerca del 85 por ciento del encuadre y no se corta nada.",
            "Sin texto añadido, logotipos, marcas de agua ni artículos que no se incluyan.",
            "El archivo es JPEG (o PNG) en sRGB y está por debajo del límite de subida.",
            "Las imágenes secundarias muestran escala, detalles y uso, en lugar de repetir la foto principal.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "tamano-imagen-producto-shopify",
    enSlug: "shopify-product-image-size",
    title: "Tamaño de imagen de producto en Shopify: cómo mantener una tienda uniforme",
    description:
      "El tamaño de imagen que recomienda Shopify, por qué las fotos cuadradas ordenan las páginas de colección y cómo equilibrar nitidez y velocidad de carga.",
    summary:
      "Dimensiones recomendadas, proporciones y hábitos de peso de archivo que mantienen ordenadas y rápidas las colecciones de Shopify.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "La respuesta corta",
        blocks: [
          { type: "p", text: "Shopify recomienda 2048 × 2048 píxeles para las imágenes de producto cuadradas. A ese tamaño la foto se ve nítida en pantallas de móvil de alta densidad y conserva suficiente detalle para el zoom que incluyen muchos temas. Shopify acepta archivos más grandes, pero cualquier cosa mucho mayor solo añade tiempo de subida sin una mejora visible para el comprador." },
          { type: "p", text: "Más importante que la cifra exacta es la uniformidad. Una tienda en la que todas las fotos comparten la misma proporción y un margen parecido alrededor del producto se ve cuidada. Una tienda con una mezcla de fotos altas, anchas y cuadradas parece sin terminar, aunque cada foto por separado sea buena." },
        ],
      },
      {
        heading: "Elige una proporción y mantenla",
        blocks: [
          { type: "p", text: "La mayoría de temas de Shopify muestran las tarjetas de producto en una cuadrícula. Cuando las imágenes tienen formas distintas, el tema las recorta de forma imprevisible o deja huecos desiguales. Elige una sola proporción para todo el catálogo:" },
          { type: "ul", items: [
            "Cuadrado (1:1) funciona en casi todas las categorías y es la opción más segura.",
            "Vertical (4:5 o 3:4) encaja con ropa y productos altos, y ocupa más pantalla en el móvil.",
            "Las proporciones horizontales rara vez son buena idea en cuadrículas de producto porque se ven pequeñas en el móvil.",
          ] },
          { type: "p", text: "Muchos temas tienen además una opción para la proporción de imagen en las páginas de colección. Ajústala a la proporción que exportas para que el tema no tenga que recortar nada por su cuenta." },
        ],
      },
      {
        heading: "Nitidez frente a velocidad de carga",
        blocks: [
          { type: "p", text: "La red de distribución de Shopify crea automáticamente versiones más pequeñas de tus imágenes y sirve formatos modernos a los navegadores que los admiten. Eso ayuda, pero parte del archivo que subes. Un original de 9 MB sigue tardando más en procesarse y puede generar variantes más pesadas que un archivo bien comprimido de 600 KB con las mismas dimensiones." },
          { type: "ul", items: [
            "Para fotografías, exporta JPEG con calidad entre 80 y 90. La diferencia con 100 rara vez se nota y el archivo suele pesar menos de la mitad.",
            "Usa PNG solo cuando necesites transparencia o gráficos planos nítidos, como tablas de tallas.",
            "Mantén la mayoría de fotos de producto muy por debajo de 1 MB. Si un archivo pesa mucho más, comprueba si se exportó con calidad 100 o con metadatos innecesarios.",
          ] },
          { type: "tip", text: "El tamaño de Shopify en Image Ready recorta a 2048 × 2048 píxeles y te deja fijar la calidad JPEG antes de descargar, para revisar el resultado antes de subirlo a tu panel." },
        ],
      },
      {
        heading: "Encuadrar los productos de forma uniforme",
        blocks: [
          { type: "p", text: "Los compradores comparan productos uno junto a otro en las páginas de colección. Si un producto llena su cuadrado y el siguiente flota en el centro con un borde ancho, el segundo parece más pequeño y menos importante. Decide un margen, por ejemplo que el borde más largo del producto llegue a cerca del 85 o 90 por ciento del encuadre, y aplícalo a todas las fotos." },
          { type: "p", text: "El fondo también importa. En Shopify no es obligatorio el blanco puro, pero usar el mismo color de fondo en toda una colección da un resultado más limpio que mezclar fondos blancos, grises y de ambiente en la primera imagen de cada producto." },
        ],
      },
      {
        heading: "Texto alternativo y nombres de archivo",
        blocks: [
          { type: "p", text: "Cada imagen de producto en Shopify tiene un campo de texto alternativo. Escribe una descripción breve y literal de lo que muestra la imagen, como \"Tarjetero de cuero marrón, vista frontal\". El texto alternativo ayuda a quienes usan lectores de pantalla y da contexto a los buscadores. Los nombres de archivo descriptivos, como tarjetero-cuero-marron-frontal.jpg, son una pequeña señal extra y facilitan buscar en tu propia biblioteca de archivos." },
        ],
      },
      {
        heading: "Lista rápida",
        blocks: [
          { type: "ul", items: [
            "Una sola proporción en todo el catálogo, ajustada a la opción de tu tema.",
            "2048 × 2048 píxeles para imágenes cuadradas, o un tamaño equivalente en vertical.",
            "Calidad JPEG entre 80 y 90, con la mayoría de archivos por debajo de 1 MB.",
            "Margen y fondo uniformes en la primera imagen de cada producto.",
            "Texto alternativo que describa el producto y la vista.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "tamano-imagen-producto-tiktok-shop",
    enSlug: "tiktok-shop-product-image-size",
    title: "Imágenes de producto en TikTok Shop: tamaño, formato y qué convierte en el móvil",
    description:
      "Cómo dimensionar y encuadrar las imágenes de producto de TikTok Shop para un público que compra desde el móvil: recortes cuadrados, límites de archivo y consejos para la imagen principal.",
    summary:
      "Tamaño cuadrado, límites de archivo y consejos de encuadre pensados para el móvil en los anuncios de TikTok Shop.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "TikTok Shop es una tienda pensada para el móvil",
        blocks: [
          { type: "p", text: "Casi todas las visitas a TikTok Shop ocurren en un móvil, a menudo después de que el comprador toque el enlace de un producto dentro de un vídeo. La imagen del producto se ve en tamaño pequeño, normalmente mientras la persona aún decide si sale del vídeo. Eso cambia lo que es una buena imagen: la claridad en tamaño pequeño importa más que el detalle fino, y el producto tiene que reconocerse al instante." },
          { type: "p", text: "Las normas exactas de los anuncios de TikTok Shop cambian según la región y se actualizan en Seller Center. Antes de fiarte de un límite concreto, revisa las normas de anuncios vigentes para tu mercado." },
        ],
      },
      {
        heading: "Tamaño y formato recomendados",
        blocks: [
          { type: "ul", items: [
            "Usa una imagen cuadrada 1:1. Las fotos cuadradas se muestran de forma uniforme en las tarjetas de producto, la búsqueda y el carrusel de la página del producto.",
            "1080 × 1080 píxeles es un objetivo práctico. Se ve nítido en los móviles actuales y supera la resolución mínima que TikTok Shop suele pedir (a menudo 600 × 600 píxeles).",
            "Sube JPG o PNG. Mantén cada archivo ligero, ya que TikTok Shop aplica un límite de peso por imagen de pocos megabytes.",
            "Guarda en sRGB para que los colores se vean igual en la aplicación que en tu ordenador.",
          ] },
          { type: "tip", text: "El tamaño de TikTok Shop en Image Ready exporta un cuadrado de 1080 × 1080 y el control de calidad te permite mantener cada archivo dentro de los límites de subida." },
        ],
      },
      {
        heading: "La imagen principal: primero claridad",
        blocks: [
          { type: "p", text: "La primera imagen del anuncio cumple la misma función que la miniatura de un vídeo: tiene que entenderse en una fracción de segundo. Algunos hábitos ayudan:" },
          { type: "ol", items: [
            "Muestra el producto completo, grande y centrado, sobre un fondo limpio.",
            "Evita superponer mucho texto. El texto pequeño se vuelve ilegible en el móvil y algunas regiones restringen el texto promocional en la imagen principal.",
            "Usa un contraste fuerte entre producto y fondo para que la forma se lea al instante.",
            "Mantén el mismo encuadre en todo el catálogo para que la página de tu tienda se vea uniforme.",
          ] },
        ],
      },
      {
        heading: "Usa el resto del carrusel para responder preguntas",
        blocks: [
          { type: "p", text: "Los compradores que llegan desde un vídeo ya tienen contexto, pero aun así quieren respuestas antes de comprar. Usa las imágenes adicionales para lo que el vídeo no muestra con claridad:" },
          { type: "ul", items: [
            "Una referencia de escala, como el producto en la mano o junto a un objeto común.",
            "Primeros planos de materiales, costuras, texturas o conectores.",
            "Lo que incluye la caja.",
            "Una tabla de tallas sencilla o una imagen con medidas para ropa y muebles.",
          ] },
        ],
      },
      {
        heading: "Reutilizar imágenes de otros marketplaces",
        blocks: [
          { type: "p", text: "Muchos vendedores publican el mismo producto en Amazon, Shopify y TikTok Shop. Normalmente puedes reutilizar la misma foto de origen, pero exporta una versión distinta para cada plataforma en lugar de subir un archivo enorme a todas. Una imagen de Amazon de 2000 píxeles es más grande de lo que necesita TikTok Shop, y una imagen preparada al tamaño y calidad exactos se sube más rápido y se muestra de forma más previsible." },
        ],
      },
    ],
  },
  {
    slug: "comprimir-imagenes-producto-sin-perder-calidad",
    enSlug: "compress-product-images-without-losing-quality",
    title: "Cómo comprimir imágenes de producto sin perder calidad visible",
    description:
      "Una explicación práctica de la compresión de imágenes para vendedores online: dimensiones frente a peso de archivo, ajustes de calidad JPEG y un flujo sencillo que mantiene las fotos nítidas.",
    summary:
      "Por qué redimensionar va antes que comprimir, qué calidad JPEG usar y un flujo repetible para archivos ligeros y nítidos.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 7,
    sections: [
      {
        heading: "Por qué el peso de los archivos importa a los vendedores",
        blocks: [
          { type: "p", text: "Las imágenes pesadas ralentizan las páginas de producto, sobre todo con conexiones móviles. Las páginas lentas hacen que más compradores se vayan antes de que termine de cargar, y muchos marketplaces tienen además límites de peso por archivo. La buena noticia es que la mayoría de fotos de producto tal como salen de la cámara o del móvil son mucho más grandes de lo necesario, así que hay mucho margen para reducir el peso sin ningún cambio visible." },
        ],
      },
      {
        heading: "Primero las dimensiones, después la compresión",
        blocks: [
          { type: "p", text: "Hay dos formas distintas de que un archivo de imagen pese menos, y el orden importa." },
          { type: "ol", items: [
            "Redimensiona. Una foto de móvil actual puede medir 4000 × 3000 píxeles o más. Si la plataforma la muestra como mucho a 2000 × 2000, los píxeles sobrantes nunca los ve nadie. Recortar y redimensionar al tamaño objetivo suele eliminar más de la mitad del peso por sí solo.",
            "Comprime el resultado. Cuando la imagen ya tiene su tamaño final, la compresión JPEG reduce los datos necesarios para guardarla. Aquí es donde entra el ajuste de calidad.",
          ] },
          { type: "p", text: "Hacerlo en este orden importa porque comprimir una imagen enorme y luego reducirla desperdicia calidad y tiempo. Recorta primero a la forma y el tamaño finales y luego exporta una sola vez con una calidad razonable." },
        ],
      },
      {
        heading: "Elegir la calidad JPEG",
        blocks: [
          { type: "p", text: "La calidad JPEG se muestra normalmente como un número del 0 al 100. No es un porcentaje de la calidad original; controla con qué intensidad el codificador simplifica los detalles que el ojo tiene menos probabilidad de notar." },
          { type: "ul", items: [
            "90 a 100: archivos muy grandes con poca mejora visible respecto a 85–90. Rara vez merece la pena para la web.",
            "80 a 90: el punto ideal para la mayoría de fotos de producto. Se conservan los bordes nítidos y los degradados suaves.",
            "70 a 80: aceptable para miniaturas o fotos de ambiente, pero revisa con atención las texturas finas y el texto.",
            "Por debajo de 70: empiezan a aparecer bloques, sobre todo en bordes de alto contraste y en fondos lisos.",
          ] },
          { type: "tip", text: "Revisa la compresión al 100 por cien de zoom en la zona con más detalle, como la textura de un tejido o el texto impreso de un envase. Si esa zona se ve limpia, el resto de la imagen también." },
        ],
      },
      {
        heading: "Cuidado con estos problemas habituales",
        blocks: [
          { type: "ul", items: [
            "Bandas en fondos blancos o degradados. Los fondos lisos son los primeros en mostrar defectos de compresión. Si ves anillos o bloques tenues, sube un poco la calidad.",
            "Volver a comprimir un JPEG una y otra vez. Cada guardado con pérdida elimina un poco más de detalle. Conserva tu original y exporta siempre desde él.",
            "Usar PNG para fotografías. PNG no tiene pérdida, lo que suena mejor, pero en fotos suele producir archivos varias veces más grandes que un JPEG de alta calidad sin ganancia visible.",
            "Metadatos ocultos. Los archivos de cámara pueden incluir la ubicación y vistas previas incrustadas grandes. Volver a exportar desde un editor basado en canvas elimina la mayor parte automáticamente.",
          ] },
        ],
      },
      {
        heading: "Un flujo sencillo que puedes repetir",
        blocks: [
          { type: "ol", items: [
            "Guarda la foto original sin tocar en una carpeta aparte.",
            "Recorta a la proporción de la plataforma y exporta al tamaño recomendado.",
            "Exporta en JPEG con calidad 85 como punto de partida.",
            "Revisa la zona con más detalle a tamaño completo; ajusta la calidad 5 puntos arriba o abajo si hace falta.",
            "Usa los mismos ajustes en todo el catálogo para que las fotos se vean uniformes.",
          ] },
          { type: "p", text: "Image Ready sigue este flujo en el navegador: recortas y redimensionas a uno o varios tamaños de plataforma, eliges JPEG o PNG y un nivel de calidad, y descargas todos los resultados a la vez. Tu archivo original no se sube a ningún sitio, así que puedes probar ajustes sin crear copias en un servidor." },
        ],
      },
    ],
  },
  {
    slug: "jpg-o-png-fotos-producto",
    enSlug: "jpg-vs-png-for-product-photos",
    title: "JPG o PNG para fotos de producto: ¿qué formato usar?",
    description:
      "Cuándo elegir JPG y cuándo tiene sentido PNG en imágenes de ecommerce, con ejemplos para fotos, recortes con transparencia, tablas de tallas e infografías.",
    summary:
      "Una comparación sencilla de JPG y PNG para ecommerce, con reglas claras para fotos, recortes y gráficos.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: "La respuesta en una frase",
        blocks: [
          { type: "p", text: "Usa JPG para fotografías y PNG para gráficos con colores planos, texto nítido o transparencia. La mayoría de imágenes de producto son fotografías, así que la mayoría deberían ser JPG." },
        ],
      },
      {
        heading: "En qué se diferencian los dos formatos",
        blocks: [
          { type: "p", text: "JPG (también escrito JPEG) usa una compresión con pérdida pensada para fotografías. Descarta detalles que el ojo difícilmente nota, lo que reduce mucho el peso de los archivos. No admite transparencia." },
          { type: "p", text: "PNG usa compresión sin pérdida. Cada píxel se guarda exactamente, lo que es ideal para logotipos, capturas de pantalla y texto, y admite fondos transparentes. Sin embargo, en fotografías el almacenamiento sin pérdida produce archivos muy grandes, porque las fotos contienen millones de colores ligeramente distintos." },
        ],
      },
      {
        heading: "Cuándo usar JPG",
        blocks: [
          { type: "ul", items: [
            "Fotos principales de producto sobre fondo blanco o de color.",
            "Fotos de ambiente y de uso.",
            "Primeros planos de materiales y texturas.",
            "Cualquier imagen en la que importen el peso y la velocidad de la página, es decir, casi todas las páginas de producto.",
          ] },
        ],
      },
      {
        heading: "Cuándo usar PNG",
        blocks: [
          { type: "ul", items: [
            "Recortes de producto que necesitan fondo transparente, por ejemplo para colocarlos sobre un banner de color en el tema de tu tienda.",
            "Tablas de tallas, comparativas e infografías con texto pequeño.",
            "Logotipos e insignias del diseño de tu tienda.",
          ] },
          { type: "p", text: "Ten en cuenta que marketplaces como Amazon exigen un fondo blanco en la imagen principal, no uno transparente. Un PNG transparente puede mostrarse sobre blanco, pero exportar un JPG sobre un blanco real da resultados previsibles." },
        ],
      },
      {
        heading: "¿Y WebP y AVIF?",
        blocks: [
          { type: "p", text: "WebP y AVIF son formatos más nuevos que producen archivos más ligeros que JPG con una calidad parecida. Muchas plataformas, incluida Shopify, ya convierten automáticamente tus imágenes a estos formatos cuando el navegador del comprador los admite. Como la compatibilidad de los marketplaces con estos formatos varía, subir un JPG bien preparado sigue siendo la opción más compatible. Por eso Image Ready acepta WebP como entrada y exporta JPG o PNG." },
        ],
      },
      {
        heading: "Guía rápida para decidir",
        blocks: [
          { type: "ol", items: [
            "¿Es una fotografía? Usa JPG con calidad entre 80 y 90.",
            "¿Necesita fondo transparente? Usa PNG.",
            "¿Es sobre todo texto, líneas o colores planos? Usa PNG.",
            "¿Dudas? Exporta los dos y compara el peso y el aspecto a tamaño completo.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "recortar-fotos-producto-uniforme",
    enSlug: "crop-product-photos-consistently",
    title: "Cómo recortar fotos de producto de forma uniforme en todo el catálogo",
    description:
      "Un método paso a paso para recortar fotos de producto de modo que todos los anuncios tengan la misma forma, margen y alineación, vendas en Amazon, Shopify, Etsy o TikTok Shop.",
    summary:
      "Un método repetible para recortes cuadrados, márgenes y alineación uniformes en decenas de fotos de producto.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "Por qué merece la pena la uniformidad",
        blocks: [
          { type: "p", text: "Los compradores rara vez miran un producto aislado. Se desplazan por resultados de búsqueda, páginas de colección y cuadrículas de tiendas donde tus productos están unos junto a otros y junto a la competencia. Cuando todas las imágenes comparten forma, margen y alineación, la cuadrícula se ve profesional y los productos son fáciles de comparar. Cuando los recortes varían, unos productos parecen más grandes, otros se pierden en el espacio blanco y todo el catálogo transmite menos confianza." },
        ],
      },
      {
        heading: "Paso 1: fotografía con espacio para recortar",
        blocks: [
          { type: "p", text: "Recortar solo puede quitar píxeles, nunca añadirlos. Deja espacio alrededor del producto al hacer la foto, mantén la cámara a la misma altura y distancia para productos parecidos y usa la máxima resolución de tu cámara. Un poco de fondo extra te da libertad para centrar y cuadrar el producto después." },
        ],
      },
      {
        heading: "Paso 2: elige una forma y un tamaño por plataforma",
        blocks: [
          { type: "ul", items: [
            "Amazon: cuadrado, unos 2000 × 2000 píxeles.",
            "Shopify: cuadrado de 2048 × 2048, o la proporción vertical que use tu tema.",
            "Etsy: 4:3 de unos 2700 × 2025 píxeles, o cuadrado de 2000 × 2000.",
            "TikTok Shop: cuadrado, unos 1080 × 1080 píxeles.",
          ] },
          { type: "p", text: "Anótalos o usa un editor con tamaños predefinidos para no tener que recordarlos cada vez." },
        ],
      },
      {
        heading: "Paso 3: decide una regla de margen",
        blocks: [
          { type: "p", text: "Una regla de margen es una frase sencilla como \"el lado más largo del producto ocupa el 85 por ciento del encuadre\". Es la forma más eficaz de que productos distintos parezcan del mismo catálogo. En productos altos como botellas, la altura define el margen; en productos anchos como teclados, lo define el ancho." },
        ],
      },
      {
        heading: "Paso 4: alinea por el centro visual",
        blocks: [
          { type: "p", text: "Centrar un objeto matemáticamente no siempre hace que parezca centrado. Los productos con una base pesada, como lámparas o botellas, suelen verse mejor con algo más de espacio debajo. Los productos con asas o pitorros a un lado pueden necesitar un pequeño desplazamiento para verse equilibrados. Decide una vez cómo tratas cada tipo de producto y aplícalo siempre." },
        ],
      },
      {
        heading: "Paso 5: endereza antes de recortar",
        blocks: [
          { type: "p", text: "Un horizonte o una balda ligeramente inclinados se notan mucho en una cuadrícula de imágenes rectas. Gira primero la foto para nivelar los bordes y luego recorta. Girar después de recortar puede cortar las esquinas del producto." },
        ],
      },
      {
        heading: "Paso 6: exporta siempre con los mismos ajustes",
        blocks: [
          { type: "p", text: "Usa el mismo formato y calidad en todas las imágenes de un lote. Si una imagen es un PNG de 4 MB y la siguiente un JPG de 300 KB, cargarán de forma distinta y pueden verse ligeramente diferentes en color y nitidez." },
          { type: "tip", text: "En Image Ready puedes añadir hasta 100 fotos, seleccionar uno o varios tamaños de plataforma y ajustar el zoom, la posición y el giro de cada foto por separado. Después todas las fotos se exportan con los mismos tamaños, formato y calidad en un solo ZIP." },
        ],
      },
      {
        heading: "Una última revisión en contexto",
        blocks: [
          { type: "p", text: "Antes de publicar, mira las imágenes nuevas juntas, idealmente en una cuadrícula al tamaño en que las verá el comprador. Las excepciones se detectan mucho mejor una junto a otra que de una en una. Corrige las que no encajen y conserva tus ajustes para que el siguiente lote coincida." },
        ],
      },
    ],
  },
];

export function getGuideEs(slug: string) {
  return GUIDES_ES.find((guide) => guide.slug === slug);
}

export function esSlugFor(enSlug: string) {
  return GUIDES_ES.find((guide) => guide.enSlug === enSlug)?.slug;
}
