import type { Metadata } from "next";
import { TermsView, termsMeta } from "@/components/views/legal-views";
import { bilingualMetadata } from "@/lib/seo";

export const metadata: Metadata = bilingualMetadata("en", { en: "/terms", es: "/es/terms" }, termsMeta("en"));

export default function Terms() {
  return <TermsView locale="en" />;
}
