import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";
import { getDictionary } from "@/lib/dictionary";
import { HOME_OG_IMAGE, bilingualMetadata } from "@/lib/seo";

const t = getDictionary("en");
export const metadata: Metadata = bilingualMetadata("en", { en: "/", es: "/es" }, { title: t.home.metaTitle, description: t.home.metaDescription, absoluteTitle: true, image: HOME_OG_IMAGE });

export default function Home() {
  return <HomeView locale="en" />;
}
