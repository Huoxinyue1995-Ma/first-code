import { NextResponse } from "next/server";
import { endSession, getSiteOrigin, isSameOriginRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = getSiteOrigin(request);
  if (isSameOriginRequest(request)) await endSession();
  return NextResponse.redirect(new URL("/", origin), 303);
}
