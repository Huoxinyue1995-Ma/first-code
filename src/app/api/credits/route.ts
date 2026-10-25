import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Current balance for the signed-in user. Used by client components to refresh the credit badge.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ signedIn: false }, { headers: { "Cache-Control": "no-store" } });
  return Response.json(
    { signedIn: true, email: user.email, balance: user.creditBalance },
    { headers: { "Cache-Control": "no-store" } },
  );
}
