import type { Metadata } from "next";
import { AccountView } from "@/components/views/account-view";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = { title: getDictionary("es").account.metaTitle, robots: { index: false, follow: false } };

export default async function Account(props: PageProps<"/es/account">) {
  return <AccountView locale="es" searchParams={await props.searchParams} />;
}
