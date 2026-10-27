import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformView } from "@/components/views/platform-view";
import { PLATFORM_PAGES, getPlatformBySlug } from "@/lib/platforms";
import { bilingualMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_PAGES.map((page) => ({ platform: page.slug.es }));
}

export async function generateMetadata(props: PageProps<"/es/[platform]">): Promise<Metadata> {
  const page = getPlatformBySlug("es", (await props.params).platform);
  if (!page) return {};
  return bilingualMetadata("es", { en: `/${page.slug.en}`, es: `/es/${page.slug.es}` }, { title: page.metaTitle.es, description: page.description.es });
}

export default async function PlatformPageEs(props: PageProps<"/es/[platform]">) {
  const page = getPlatformBySlug("es", (await props.params).platform);
  if (!page) notFound();
  return <PlatformView locale="es" page={page} />;
}
