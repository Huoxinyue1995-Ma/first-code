import { getCurrentUser, isSameOriginRequest } from "@/lib/auth";
import { MAX_BATCH_PHOTOS } from "@/lib/credits";
import { InsufficientCreditsError, chargeForDownload, isFingerprint } from "@/lib/download-charge";

export const dynamic = "force-dynamic";

// Charges credits for a batch download before the browser generates the files.
// Body: { fingerprints: string[] (sha-256 hex per photo), sizes: number }
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: "Invalid request." }, { status: 403 });

  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Please sign in.", code: "signin_required" }, { status: 401 });

  let fingerprints: unknown;
  let sizes: unknown;
  try {
    ({ fingerprints, sizes } = (await request.json()) as { fingerprints?: unknown; sizes?: unknown });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(fingerprints) || fingerprints.length === 0 || fingerprints.length > MAX_BATCH_PHOTOS || !fingerprints.every(isFingerprint)) {
    return Response.json({ error: "Invalid photos." }, { status: 400 });
  }
  const sizeCount = typeof sizes === "number" && Number.isInteger(sizes) && sizes > 0 && sizes <= 50 ? sizes : 1;

  try {
    const result = await chargeForDownload(user.id, fingerprints, { sizes: sizeCount });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return Response.json(
        { error: "Not enough credits.", code: "insufficient_credits", balance: error.balance, required: error.required },
        { status: 402 },
      );
    }
    console.error("Download charge failed.", { message: error instanceof Error ? error.message : String(error) });
    return Response.json({ error: "Could not confirm credits." }, { status: 500 });
  }
}
