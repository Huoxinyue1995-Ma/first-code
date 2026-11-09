import "server-only";
import { type JWTVerifyGetKey, createRemoteJWKSet, jwtVerify } from "jose";
import type { GoogleProfile } from "@/lib/google-oauth";

// Verifies an ID token from Sign in with Google (button popup or One Tap), as Google documents:
// signature against Google's public keys, aud = our client ID, iss = accounts.google.com, not expired.
// We also require a verified email and the nonce we issued to this browser, so a token cannot be replayed.
const GOOGLE_ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
const googleKeys = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export async function verifyGoogleIdToken(
  token: string,
  options: { clientId: string; nonce: string; keys?: JWTVerifyGetKey },
): Promise<GoogleProfile> {
  const { payload } = await jwtVerify(token, options.keys ?? googleKeys, {
    issuer: GOOGLE_ISSUERS,
    audience: options.clientId,
    algorithms: ["RS256"],
  });
  if (!options.nonce || payload.nonce !== options.nonce) throw new Error("ID token nonce does not match.");
  if (typeof payload.sub !== "string" || typeof payload.email !== "string" || payload.email_verified !== true) {
    throw new Error("Google account email is not verified.");
  }
  return { sub: payload.sub, email: payload.email, name: typeof payload.name === "string" ? payload.name : null };
}
