// Node module hooks for running src/ TypeScript outside Next.js in tests:
// - "server-only" resolves to an empty module,
// - "@/x" resolves to src/x.ts (matching tsconfig paths).
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcDir = new URL("../../src/", import.meta.url);

export async function resolve(specifier, context, next) {
  if (specifier === "server-only") return { url: "data:text/javascript,export {}", shortCircuit: true };
  if (specifier.startsWith("@/")) {
    const base = fileURLToPath(new URL(specifier.slice(2), srcDir));
    for (const candidate of [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`]) {
      if (existsSync(candidate)) return { url: pathToFileURL(candidate).href, shortCircuit: true };
    }
  }
  return next(specifier, context);
}
