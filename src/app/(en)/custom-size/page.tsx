import type { Metadata } from "next";
import { CustomView } from "@/components/views/custom-view";
import { getDictionary } from "@/lib/dictionary";
import { bilingualMetadata } from "@/lib/seo";

const t = getDictionary("en");
export const metadata: Metadata = bilingualMetadata("en", { en: "/custom-size", es: "/es/tamano-personalizado" }, { title: t.custom.metaTitle, description: t.custom.metaDescription, absoluteTitle: true });

export default function CustomSize() {
  return <CustomView locale="en" />;
}
