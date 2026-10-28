import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticleView, guideMetadata } from "@/components/views/guide-views";
import { GUIDES, getGuide } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await props.params).slug);
  return guide ? guideMetadata("en", guide) : {};
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await props.params).slug);
  if (!guide) notFound();
  return <GuideArticleView guide={guide} locale="en" />;
}
