import type { Metadata } from "next";
import { PrivacyView, privacyMeta } from "@/components/views/legal-views";
import { bilingualMetadata } from "@/lib/seo";

export const metadata: Metadata = bilingualMetadata("en", { en: "/privacy", es: "/es/privacy" }, privacyMeta("en"));

export default function Privacy() {
  return <PrivacyView locale="en" />;
}
