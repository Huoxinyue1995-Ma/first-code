import type { Metadata } from "next";
import { PricingView } from "@/components/views/pricing-view";
import { getDictionary } from "@/lib/dictionary";
import { bilingualMetadata } from "@/lib/seo";

const t = getDictionary("es");
export const metadata: Metadata = bilingualMetadata("es", { en: "/pricing", es: "/es/pricing" }, { title: t.pricing.metaTitle, description: t.pricing.metaDescription, absoluteTitle: true });

export default function Pricing() {
  return <PricingView locale="es" />;
}
