import type { Metadata } from "next";
import { TermsView, termsMeta } from "@/components/views/legal-views";
import { bilingualMetadata } from "@/lib/seo";

export const metadata: Metadata = bilingualMetadata("es", { en: "/terms", es: "/es/terms" }, termsMeta("es"));

export default function Terms() {
  return <TermsView locale="es" />;
}
