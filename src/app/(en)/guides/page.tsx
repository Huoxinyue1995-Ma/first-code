import type { Metadata } from "next";
import { GuideIndexView, guideIndexMetadata } from "@/components/views/guide-views";

export const metadata: Metadata = guideIndexMetadata("en");

export default function GuidesPage() {
  return <GuideIndexView locale="en" />;
}
