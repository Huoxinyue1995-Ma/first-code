export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string };

export type GuideSection = {
  heading: string;
  blocks: GuideBlock[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  published: string;
  updated: string;
  readingMinutes: number;
  sections: GuideSection[];
};

const PUBLISHED = "2026-10-24";

export const GUIDES: Guide[] = [
  {
    slug: "amazon-product-image-requirements",
    title: "Amazon Product Image Requirements: A Practical Checklist for Sellers",
    description:
      "What Amazon expects from main and secondary product images: size, white background, framing, file format, and the mistakes that most often get listings suppressed.",
    summary:
      "Size, background, framing, and file format rules for Amazon main images, plus a checklist you can run before every upload.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 7,
    sections: [
      {
        heading: "Why the main image matters more than any other",
        blocks: [
          { type: "p", text: "On Amazon, the main image is the only picture most shoppers see before they decide whether to click. It appears in search results, in sponsored placements, and in comparison widgets, usually at a small size next to competing products. A main image that is too small, poorly cropped, or set on the wrong background can make a good product look worse than it is, and an image that breaks Amazon's style rules can cause the listing to be suppressed from search entirely." },
          { type: "p", text: "Amazon publishes its image rules in Seller Central under the product image requirements and the style guide for each category. Those documents are the final authority and they do change, so treat this guide as a working checklist and confirm the details for your category and marketplace before a large upload." },
        ],
      },
      {
        heading: "Image size and zoom",
        blocks: [
          { type: "p", text: "Amazon enables its hover-to-zoom feature when the longest side of an image is at least 1,000 pixels. Images below that size can still be accepted, but shoppers lose the ability to inspect details, which is one of the main reasons people trust an online listing." },
          { type: "ul", items: [
            "Aim for at least 1,600 pixels on the longest side; many sellers use 2,000 × 2,000 pixels as a standard.",
            "A square 1:1 canvas displays most consistently across search results, mobile, and the product detail page.",
            "Avoid upscaling a small photo to reach the minimum. Enlarging a 600-pixel image to 2,000 pixels adds no real detail and often looks soft when zoomed.",
          ] },
          { type: "tip", text: "Image Ready's Amazon preset exports a 2,000 × 2,000 pixel square, which comfortably clears the zoom threshold while keeping file sizes reasonable." },
        ],
      },
      {
        heading: "Pure white background for the main image",
        blocks: [
          { type: "p", text: "The main image must be on a pure white background, which Amazon defines as RGB 255, 255, 255. An off-white or light gray studio backdrop is one of the most common reasons a main image is flagged. Your camera may record a white sweep as 245 or 250 rather than a true 255, so check the corners of the image in an editor that shows pixel values before you upload." },
          { type: "p", text: "Secondary images (the additional photos on the detail page) are not held to the white-background rule. This is where lifestyle shots, scale references, close-ups of materials, and infographic-style images belong." },
        ],
      },
      {
        heading: "Framing: fill the frame without cropping the product",
        blocks: [
          { type: "p", text: "Amazon asks that the product fill roughly 85 percent of the image frame. In practice that means the product should be the dominant element with a modest, even margin around it. Too much empty space makes the product look tiny in search results; too little margin, or cutting off part of the product, looks careless and can violate the rule that the entire product must be visible." },
          { type: "ol", items: [
            "Start with a photo that has some breathing room around the product.",
            "Crop to a square and zoom in until the product's longest edge nearly reaches the frame.",
            "Center the product visually, not mathematically. Bottles and tall items often look better with slightly more space below than above.",
            "Check that no part of the product, including caps, straps, or cables, touches or crosses the edge.",
          ] },
        ],
      },
      {
        heading: "What must not appear in the main image",
        blocks: [
          { type: "ul", items: [
            "Text, logos, watermarks, badges, or promotional graphics added on top of the photo.",
            "Props or accessories that are not included with the product.",
            "Multiple angles or variations of the product in one image, unless the item is sold as a set.",
            "Mannequins in most apparel categories; check your category style guide for the specific rule.",
            "Borders, color blocks, or placeholder images.",
          ] },
        ],
      },
      {
        heading: "File format and color",
        blocks: [
          { type: "p", text: "Amazon accepts JPEG, PNG, TIFF, and non-animated GIF files. JPEG is the most practical choice for photographs because it keeps file sizes small while preserving detail. Save in the sRGB color profile; images saved in a wide-gamut profile such as Adobe RGB can look dull or shifted once they are displayed in a browser." },
          { type: "p", text: "If you edit images on a phone or with a design tool, also check the file name. Amazon's bulk tools rely on the ASIN or SKU in the file name, so a consistent naming habit saves time later." },
        ],
      },
      {
        heading: "Pre-upload checklist",
        blocks: [
          { type: "ul", items: [
            "Longest side is at least 1,000 pixels, ideally 1,600 to 2,000 or more.",
            "Main image background is pure white (255, 255, 255) all the way to the corners.",
            "The product fills about 85 percent of the frame and nothing is cut off.",
            "No added text, logos, watermarks, or items that are not included.",
            "File is JPEG (or PNG) in sRGB and below the upload size limit.",
            "Secondary images show scale, details, and use, rather than repeating the main shot.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "shopify-product-image-size",
    title: "Shopify Product Image Size: How to Keep a Store Looking Consistent",
    description:
      "The image size Shopify recommends, why square photos make collection pages look tidy, and how to balance sharpness against page speed.",
    summary:
      "Recommended dimensions, aspect ratios, and file-size habits that keep Shopify collection pages tidy and fast.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "The short answer",
        blocks: [
          { type: "p", text: "Shopify recommends 2,048 × 2,048 pixels for square product images. At that size the photo looks sharp on high-density phone screens and still has enough detail for the zoom feature that many themes include. Shopify accepts larger files, but anything much bigger mostly adds upload time without a visible benefit to shoppers." },
          { type: "p", text: "More important than the exact number is consistency. A store where every product photo shares the same aspect ratio and a similar margin around the product looks deliberate. A store with a mix of tall, wide, and square photos looks unfinished, even if each individual photo is good." },
        ],
      },
      {
        heading: "Choose one aspect ratio and keep it",
        blocks: [
          { type: "p", text: "Most Shopify themes display product cards in a grid. When images have different shapes, the theme either crops them unpredictably or leaves uneven gaps. Pick one ratio for the whole catalog:" },
          { type: "ul", items: [
            "Square (1:1) works for almost every category and is the safest default.",
            "Portrait (4:5 or 3:4) suits apparel and tall products, and fills more of a phone screen.",
            "Landscape ratios are rarely a good choice for product grids because they appear small on mobile.",
          ] },
          { type: "p", text: "Many themes also have a setting for the image ratio on collection pages. Match that setting to the ratio you export, so the theme does not have to crop anything on its own." },
        ],
      },
      {
        heading: "Sharpness versus page speed",
        blocks: [
          { type: "p", text: "Shopify's content delivery network automatically creates smaller versions of your images and serves modern formats to browsers that support them. That helps, but it starts from the file you upload. A 9 MB original still takes longer to process and can produce heavier variants than a well-compressed 600 KB file of the same dimensions." },
          { type: "ul", items: [
            "For photographs, export JPEG at quality 80 to 90. The difference from 100 is rarely visible, and the file is often less than half the size.",
            "Use PNG only when you need transparency or sharp flat graphics such as size charts.",
            "Keep most product photos well under 1 MB. If a file is much larger, check whether it was exported at quality 100 or with unnecessary metadata.",
          ] },
          { type: "tip", text: "Image Ready's Shopify preset crops to 2,048 × 2,048 pixels and lets you set JPEG quality before download, so you can check the result before it goes into your admin." },
        ],
      },
      {
        heading: "Framing products consistently",
        blocks: [
          { type: "p", text: "Shoppers compare products side by side on collection pages. If one product fills its square and the next floats in the middle with a wide border, the second one looks smaller and less important. Decide on a margin, for example that the product's longest edge should reach about 85 to 90 percent of the frame, and apply it to every photo." },
          { type: "p", text: "Background matters too. You do not have to use pure white on Shopify, but using the same background color across a collection gives a cleaner result than mixing white, gray, and lifestyle backgrounds in the first image of each product." },
        ],
      },
      {
        heading: "Alt text and file names",
        blocks: [
          { type: "p", text: "Every product image in Shopify has an alt text field. Write a short, literal description of what the image shows, such as \"Brown leather card holder, front view\". Alt text helps shoppers using screen readers and gives search engines context about the image. Descriptive file names, such as brown-leather-card-holder-front.jpg, are a small extra signal and make your own media library easier to search." },
        ],
      },
      {
        heading: "Quick checklist",
        blocks: [
          { type: "ul", items: [
            "One aspect ratio across the catalog, matched to your theme's setting.",
            "2,048 × 2,048 pixels for square images, or an equivalent size for portrait.",
            "JPEG quality around 80 to 90, with most files under 1 MB.",
            "Consistent margin and background on the first image of every product.",
            "Alt text that describes the product and the view.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "tiktok-shop-product-image-size",
    title: "TikTok Shop Product Images: Size, Format, and What Converts on Mobile",
    description:
      "How to size and frame TikTok Shop product images for a phone-first audience, including square crops, file limits, and practical tips for the main image.",
    summary:
      "Square sizing, file limits, and phone-first framing tips for TikTok Shop listings.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "TikTok Shop is a phone-first storefront",
        blocks: [
          { type: "p", text: "Almost every TikTok Shop visit happens on a phone, often after a shopper taps a product link inside a video. The product image is seen at a small size, usually while the person is still deciding whether to leave the video. That changes what a good image looks like: clarity at small sizes matters more than fine detail, and the product has to be recognizable instantly." },
          { type: "p", text: "TikTok Shop's exact listing rules differ by region and are updated in Seller Center. Before you rely on a specific limit, check the current product listing guidelines for your market." },
        ],
      },
      {
        heading: "Recommended size and format",
        blocks: [
          { type: "ul", items: [
            "Use a square 1:1 image. Square photos display consistently in product cards, search results, and the product page carousel.",
            "1,080 × 1,080 pixels is a practical target. It is sharp on modern phones and clears the minimum resolution TikTok Shop has generally asked for (often 600 × 600 pixels).",
            "Upload JPG or PNG. Keep each file small, since TikTok Shop applies a per-image file size limit of a few megabytes.",
            "Save in sRGB so colors look the same in the app as they do on your computer.",
          ] },
          { type: "tip", text: "Image Ready's TikTok Shop preset exports a 1,080 × 1,080 square, and the quality control lets you keep each file comfortably within upload limits." },
        ],
      },
      {
        heading: "The main image: clear before clever",
        blocks: [
          { type: "p", text: "The first image in your listing does the same job as a thumbnail on a video: it has to be understood in a fraction of a second. A few habits help:" },
          { type: "ol", items: [
            "Show the whole product, large and centered, on a clean background.",
            "Avoid busy text overlays. Small text becomes unreadable on a phone and some regions restrict promotional text on the main image.",
            "Use strong contrast between product and background so the shape reads instantly.",
            "Keep the same framing across your catalog so your shop page looks consistent.",
          ] },
        ],
      },
      {
        heading: "Use the rest of the carousel to answer questions",
        blocks: [
          { type: "p", text: "Shoppers coming from a video already have context, but they still want answers before they buy. Use the additional images for what the video does not show clearly:" },
          { type: "ul", items: [
            "A scale reference, such as the product in a hand or next to a common object.",
            "Close-ups of materials, stitching, texture, or ports.",
            "What is included in the box.",
            "A simple size chart or dimensions image for apparel and furniture.",
          ] },
        ],
      },
      {
        heading: "Reusing images from other marketplaces",
        blocks: [
          { type: "p", text: "Many sellers list the same product on Amazon, Shopify, and TikTok Shop. You can usually reuse the same source photo, but export a separate version for each platform rather than uploading one oversized file everywhere. A 2,000-pixel Amazon image is larger than TikTok Shop needs, and an image prepared at exactly the right size and quality uploads faster and displays more predictably." },
        ],
      },
    ],
  },
  {
    slug: "compress-product-images-without-losing-quality",
    title: "How to Compress Product Images Without Losing Visible Quality",
    description:
      "A practical explanation of image compression for online sellers: dimensions versus file size, JPEG quality settings, and a simple workflow that keeps photos sharp.",
    summary:
      "Why resizing comes before compression, which JPEG quality to use, and a repeatable workflow for small, sharp files.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 7,
    sections: [
      {
        heading: "Why file size matters for sellers",
        blocks: [
          { type: "p", text: "Large image files slow down product pages, especially on mobile connections. Slower pages lead to more shoppers leaving before the page has finished loading, and many marketplaces also have per-file upload limits. The good news is that most product photos straight from a camera or phone are far larger than they need to be, so there is a lot of room to reduce size without any visible change." },
        ],
      },
      {
        heading: "Dimensions come first, compression second",
        blocks: [
          { type: "p", text: "There are two separate ways an image file gets smaller, and the order matters." },
          { type: "ol", items: [
            "Resize the dimensions. A modern phone photo can be 4,000 × 3,000 pixels or more. If the platform displays it at 2,000 × 2,000 at most, the extra pixels are never shown to anyone. Cropping and resizing to the target size often removes more than half of the file size on its own.",
            "Compress the result. Once the image is at its final size, JPEG compression reduces the data needed to store it. This is where the quality setting comes in.",
          ] },
          { type: "p", text: "Doing it in this order matters because compressing a huge image and then shrinking it wastes quality and time. Crop to the final shape and size first, then export once at a sensible quality." },
        ],
      },
      {
        heading: "Choosing a JPEG quality setting",
        blocks: [
          { type: "p", text: "JPEG quality is usually shown as a number from 0 to 100. It is not a percentage of the original quality; it controls how aggressively the encoder simplifies detail that the eye is less likely to notice." },
          { type: "ul", items: [
            "90 to 100: very large files with little visible improvement over 85 to 90. Rarely worth it for web use.",
            "80 to 90: the sweet spot for most product photos. Sharp edges and smooth gradients are preserved.",
            "70 to 80: acceptable for thumbnails or lifestyle images, but look closely at fine textures and text.",
            "Below 70: blocky artifacts start to appear, especially around high-contrast edges and on plain backgrounds.",
          ] },
          { type: "tip", text: "Check compression at 100 percent zoom on the area with the finest detail, such as fabric texture or printed text on packaging. If that area looks clean, the rest of the image will too." },
        ],
      },
      {
        heading: "Watch out for these common problems",
        blocks: [
          { type: "ul", items: [
            "Banding on white or gradient backgrounds. Plain backgrounds show compression artifacts first. If you see faint rings or blocks, raise the quality slightly.",
            "Re-compressing a JPEG repeatedly. Every save at a lossy quality loses a little more detail. Keep your original and always export from it.",
            "Using PNG for photographs. PNG is lossless, which sounds better, but for photos it often produces files several times larger than a high-quality JPEG with no visible gain.",
            "Hidden metadata. Camera files can include location data and large embedded previews. Re-exporting from a canvas-based editor drops most of this automatically.",
          ] },
        ],
      },
      {
        heading: "A simple workflow you can repeat",
        blocks: [
          { type: "ol", items: [
            "Keep the original photo untouched in a separate folder.",
            "Crop to the platform's aspect ratio and export at the platform's recommended size.",
            "Export JPEG at quality 85 as a starting point.",
            "Inspect the most detailed area at full size; adjust quality up or down by 5 if needed.",
            "Use the same settings for the whole catalog so photos look consistent.",
          ] },
          { type: "p", text: "Image Ready follows this workflow in the browser: you crop and resize to one or more platform sizes, choose JPEG or PNG and a quality level, and download every result at once. Your original file is not uploaded anywhere, so you can experiment with settings without creating copies on a server." },
        ],
      },
    ],
  },
  {
    slug: "jpg-vs-png-for-product-photos",
    title: "JPG vs PNG for Product Photos: Which Format Should You Use?",
    description:
      "When to choose JPG and when PNG makes sense for ecommerce images, with examples for photos, transparent cutouts, size charts, and infographics.",
    summary:
      "A plain-language comparison of JPG and PNG for ecommerce, with clear rules for photos, cutouts, and graphics.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: "The one-sentence answer",
        blocks: [
          { type: "p", text: "Use JPG for photographs and PNG for graphics with flat colors, sharp text, or transparency. Most product images are photographs, so most product images should be JPG." },
        ],
      },
      {
        heading: "How the two formats differ",
        blocks: [
          { type: "p", text: "JPG (also written JPEG) uses lossy compression designed for photographs. It discards detail the eye is unlikely to notice, which makes files dramatically smaller. It does not support transparency." },
          { type: "p", text: "PNG uses lossless compression. Every pixel is stored exactly, which is ideal for logos, screenshots, and text, and it supports transparent backgrounds. For photographs, though, lossless storage produces very large files because photos contain millions of slightly different colors." },
        ],
      },
      {
        heading: "When to use JPG",
        blocks: [
          { type: "ul", items: [
            "Main product photos on white or colored backgrounds.",
            "Lifestyle and in-use photos.",
            "Close-ups of materials and textures.",
            "Any image where file size and page speed matter, which is almost every product page.",
          ] },
        ],
      },
      {
        heading: "When to use PNG",
        blocks: [
          { type: "ul", items: [
            "Cutout product images that need a transparent background, for example to place on a colored banner in your own store theme.",
            "Size charts, comparison tables, and infographics with small text.",
            "Logos and badges used in your store design.",
          ] },
          { type: "p", text: "Note that marketplaces such as Amazon require a white background for the main image rather than a transparent one. A transparent PNG may be displayed on white, but exporting a JPG on a true white background gives you predictable results." },
        ],
      },
      {
        heading: "What about WebP and AVIF?",
        blocks: [
          { type: "p", text: "WebP and AVIF are newer formats that produce smaller files than JPG at similar quality. Many platforms, including Shopify, already convert your uploads into these formats automatically when a shopper's browser supports them. Because marketplace upload support for these formats varies, uploading a well-prepared JPG is still the most compatible choice. Image Ready accepts WebP files as input and exports JPG or PNG for that reason." },
        ],
      },
      {
        heading: "A quick decision guide",
        blocks: [
          { type: "ol", items: [
            "Is it a photograph? Use JPG at quality 80 to 90.",
            "Does it need a transparent background? Use PNG.",
            "Is it mostly text, lines, or flat colors? Use PNG.",
            "Unsure? Export both and compare file size and appearance at full size.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "crop-product-photos-consistently",
    title: "How to Crop Product Photos Consistently Across a Catalog",
    description:
      "A step-by-step method for cropping product photos so every listing has the same shape, margin, and alignment, whether you sell on Amazon, Shopify, or TikTok Shop.",
    summary:
      "A repeatable method for consistent square crops, margins, and alignment across dozens of product photos.",
    published: PUBLISHED,
    updated: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: "Why consistency is worth the effort",
        blocks: [
          { type: "p", text: "Shoppers rarely look at one product in isolation. They scroll through search results, collection pages, and shop grids where your products sit next to each other and next to competitors. When every image shares the same shape, margin, and alignment, the grid looks professional and products are easy to compare. When crops vary, some products look bigger, some look lost in white space, and the whole catalog looks less trustworthy." },
        ],
      },
      {
        heading: "Step 1: Shoot with room to crop",
        blocks: [
          { type: "p", text: "Cropping can only remove pixels, never add them. Leave space around the product when you take the photo, keep the camera at the same height and distance for similar products, and use the highest resolution your camera offers. A little extra background gives you freedom to center and square the product later." },
        ],
      },
      {
        heading: "Step 2: Pick a target shape and size per platform",
        blocks: [
          { type: "ul", items: [
            "Amazon: square, around 2,000 × 2,000 pixels.",
            "Shopify: square 2,048 × 2,048, or the portrait ratio your theme uses.",
            "TikTok Shop: square, around 1,080 × 1,080 pixels.",
          ] },
          { type: "p", text: "Write these down, or use an editor with presets, so you do not have to remember them every time." },
        ],
      },
      {
        heading: "Step 3: Decide on a margin rule",
        blocks: [
          { type: "p", text: "A margin rule is a simple statement such as \"the product's longest side fills 85 percent of the frame\". It is the single most effective way to make different products look like they belong to the same catalog. For tall products such as bottles, the height defines the margin; for wide products such as keyboards, the width does." },
        ],
      },
      {
        heading: "Step 4: Align by visual center",
        blocks: [
          { type: "p", text: "Mathematically centering an object does not always look centered. Products with a heavy base, such as lamps or bottles, often look better with slightly more space below them. Products with handles or spouts on one side may need a small shift to look balanced. Decide once how you treat each product type and apply it every time." },
        ],
      },
      {
        heading: "Step 5: Straighten before you crop",
        blocks: [
          { type: "p", text: "A slightly tilted horizon or shelf line is very noticeable in a grid of otherwise straight images. Rotate the photo first so edges are level, then crop. Rotating after cropping can cut off corners of the product." },
        ],
      },
      {
        heading: "Step 6: Export with the same settings every time",
        blocks: [
          { type: "p", text: "Use the same format and quality for every image in a batch. If one image is a 4 MB PNG and the next is a 300 KB JPG, they will load differently and may look slightly different in color and sharpness." },
          { type: "tip", text: "In Image Ready you can add up to 100 photos, select one or more platform sizes, and adjust zoom, position, and rotation for each photo individually. Every photo then exports at the same sizes, format, and quality in one ZIP." },
        ],
      },
      {
        heading: "A final check in context",
        blocks: [
          { type: "p", text: "Before you publish, look at the new images together, ideally in a grid at the size shoppers will see them. Outliers are much easier to spot side by side than one at a time. Fix the odd ones out, and keep your settings so the next batch matches." },
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
