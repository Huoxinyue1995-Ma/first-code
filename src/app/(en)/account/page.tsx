import type { Metadata } from "next";
import { AccountView } from "@/components/views/account-view";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = { title: getDictionary("en").account.metaTitle, robots: { index: false, follow: false } };

export default async function Account(props: PageProps<"/account">) {
  return <AccountView locale="en" searchParams={await props.searchParams} />;
}
