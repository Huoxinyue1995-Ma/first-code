import type { Metadata } from "next";
import { GuideIndexView, guideIndexMetadata } from "@/components/views/guide-views";

export const metadata: Metadata = guideIndexMetadata("es");

export default function GuiasPage() {
  return <GuideIndexView locale="es" />;
}
