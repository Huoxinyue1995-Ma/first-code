import { Zip, ZipPassThrough } from "fflate";

// Builds a ZIP incrementally. Images are already compressed, so entries are stored, not deflated.
// Only the finished ZIP chunks are kept; each rendered image can be released right after it is added.
export function createZipStream() {
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let failure: Error | null = null;
  let resolveDone: (blob: Blob) => void;
  let rejectDone: (error: Error) => void;
  const done = new Promise<Blob>((resolve, reject) => {
    resolveDone = resolve;
    rejectDone = reject;
  });

  const zip = new Zip((error, chunk, final) => {
    if (error) {
      failure = error;
      rejectDone(error);
      return;
    }
    chunks.push(chunk as Uint8Array<ArrayBuffer>);
    if (final) resolveDone(new Blob(chunks, { type: "application/zip" }));
  });

  const usedNames = new Set<string>();
  function uniqueName(name: string) {
    if (!usedNames.has(name)) {
      usedNames.add(name);
      return name;
    }
    const dot = name.lastIndexOf(".");
    for (let i = 2; ; i++) {
      const candidate = `${name.slice(0, dot)}-${i}${name.slice(dot)}`;
      if (!usedNames.has(candidate)) {
        usedNames.add(candidate);
        return candidate;
      }
    }
  }

  return {
    async add(name: string, blob: Blob) {
      if (failure) throw failure;
      const entry = new ZipPassThrough(uniqueName(name));
      zip.add(entry);
      entry.push(new Uint8Array(await blob.arrayBuffer()), true);
    },
    finish() {
      zip.end();
      return done;
    },
  };
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
