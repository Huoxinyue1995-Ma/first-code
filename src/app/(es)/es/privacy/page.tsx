import type { Metadata } from "next";
import { PrivacyView, privacyMeta } from "@/components/views/legal-views";
import { bilingualMetadata } from "@/lib/seo";

export const metadata: Metadata = bilingualMetadata("es", { en: "/privacy", es: "/es/privacy" }, privacyMeta("es"));

export default function Privacy() {
  return <PrivacyView locale="es" />;
}
