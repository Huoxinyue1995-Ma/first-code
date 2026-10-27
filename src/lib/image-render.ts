// Browser-only image helpers for the batch resizer. Nothing here sends image data anywhere.

export type FitMode = "cover" | "contain";
export type OutputFormat = "image/jpeg" | "image/png";
export type Background = "white" | "transparent";

export type Crop = { zoom: number; offsetX: number; offsetY: number; rotation: number };
export const DEFAULT_CROP: Crop = { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0 };

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function rotatedSize(width: number, height: number, rotation: number) {
  const turned = Math.abs(rotation % 180) === 90;
  return turned ? { w: height, h: width } : { w: width, h: height };
}

// How far the image can be panned (as a fraction of the target) before an edge would show.
export function panLimits(crop: Crop, imgW: number, imgH: number, targetW: number, targetH: number, fit: FitMode) {
  const { w, h } = rotatedSize(imgW, imgH, crop.rotation);
  const base = fit === "cover" ? Math.max(targetW / w, targetH / h) : Math.min(targetW / w, targetH / h);
  const drawnW = w * base * crop.zoom;
  const drawnH = h * base * crop.zoom;
  return {
    maxX: Math.max(0, (drawnW - targetW) / 2) / targetW,
    maxY: Math.max(0, (drawnH - targetH) / 2) / targetH,
  };
}

export function clampCrop(crop: Crop, imgW: number, imgH: number, targetW: number, targetH: number, fit: FitMode): Crop {
  const zoom = clamp(crop.zoom, 1, 4);
  const limits = panLimits({ ...crop, zoom }, imgW, imgH, targetW, targetH, fit);
  return {
    ...crop,
    zoom,
    offsetX: clamp(crop.offsetX, -limits.maxX, limits.maxX),
    offsetY: clamp(crop.offsetY, -limits.maxY, limits.maxY),
  };
}

export function drawFramed(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource & { width: number; height: number },
  crop: Crop,
  targetW: number,
  targetH: number,
  fit: FitMode,
  background: Background,
  format: OutputFormat,
) {
  ctx.clearRect(0, 0, targetW, targetH);
  // JPG has no transparency, so always paint white behind it.
  if (format === "image/jpeg" || background === "white") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetW, targetH);
  }
  const { w, h } = rotatedSize(source.width, source.height, crop.rotation);
  const base = fit === "cover" ? Math.max(targetW / w, targetH / h) : Math.min(targetW / w, targetH / h);
  const scale = base * crop.zoom;
  const safe = clampCrop(crop, source.width, source.height, targetW, targetH, fit);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.translate(targetW / 2 + safe.offsetX * targetW, targetH / 2 + safe.offsetY * targetH);
  ctx.rotate((crop.rotation * Math.PI) / 180);
  ctx.drawImage(source, (-source.width * scale) / 2, (-source.height * scale) / 2, source.width * scale, source.height * scale);
  ctx.restore();
}

// Decodes a file with EXIF orientation applied. The caller must close() the bitmap when done.
export async function decode(file: Blob): Promise<ImageBitmap> {
  return createImageBitmap(file, { imageOrientation: "from-image" });
}

// Small preview used for thumbnails and the framing editor, so 100 full-size photos never sit in memory at once.
export async function makePreview(file: File, maxSide = 900): Promise<{ url: string; width: number; height: number }> {
  const bitmap = await decode(file);
  try {
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("preview failed"))), "image/jpeg", 0.85),
    );
    return { url: URL.createObjectURL(blob), width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

export async function renderToBlob(
  bitmap: ImageBitmap,
  crop: Crop,
  width: number,
  height: number,
  fit: FitMode,
  background: Background,
  format: OutputFormat,
  quality: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  drawFramed(ctx, bitmap, crop, width, height, fit, background, format);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("export failed"))), format, format === "image/jpeg" ? quality : undefined),
  );
  // Release the canvas backing store immediately; large batches would otherwise exhaust memory.
  canvas.width = 0;
  canvas.height = 0;
  return blob;
}

// SHA-256 of the file bytes, used to avoid charging twice for the same photo. Only this hash leaves the browser.
export async function fingerprint(file: File): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "photo";
}

export function ratioLabel(width: number, height: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const d = gcd(width, height);
  const rw = width / d;
  const rh = height / d;
  if (rw <= 32 && rh <= 32) return `${rw}:${rh}`;
  return (width / height).toFixed(2).replace(/\.?0+$/, "") + ":1";
}
