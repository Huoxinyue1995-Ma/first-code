// Carries photos dropped on the home page to the tool page the user picks next.
// Files stay in browser memory: navigation between pages is client-side, so this module survives it.
// A full page load clears it, and the tool page simply starts empty.
let pending: File[] = [];

export function handOffPhotos(files: File[]) {
  pending = files;
}

export function takeHandedOffPhotos() {
  const files = pending;
  pending = [];
  return files;
}
