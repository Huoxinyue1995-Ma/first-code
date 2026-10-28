import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticleView, guideMetadata } from "@/components/views/guide-views";
import { GUIDES_ES, getGuideEs } from "@/lib/guides-es";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES_ES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: PageProps<"/es/guias/[slug]">): Promise<Metadata> {
  const guide = getGuideEs((await props.params).slug);
  return guide ? guideMetadata("es", guide) : {};
}

export default async function GuiaPage(props: PageProps<"/es/guias/[slug]">) {
  const guide = getGuideEs((await props.params).slug);
  if (!guide) notFound();
  return <GuideArticleView guide={guide} locale="es" />;
}
