import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformView } from "@/components/views/platform-view";
import { PLATFORM_PAGES, getPlatformBySlug } from "@/lib/platforms";
import { bilingualMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_PAGES.map((page) => ({ platform: page.slug.en }));
}

export async function generateMetadata(props: PageProps<"/[platform]">): Promise<Metadata> {
  const page = getPlatformBySlug("en", (await props.params).platform);
  if (!page) return {};
  return bilingualMetadata("en", { en: `/${page.slug.en}`, es: `/es/${page.slug.es}` }, { title: page.metaTitle.en, description: page.description.en });
}

export default async function PlatformPageEn(props: PageProps<"/[platform]">) {
  const page = getPlatformBySlug("en", (await props.params).platform);
  if (!page) notFound();
  return <PlatformView locale="en" page={page} />;
}
