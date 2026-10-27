import type { Metadata } from "next";
import { VerifyLoginView } from "@/components/views/login-view";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = { title: getDictionary("en").login.verifyTitle, robots: { index: false, follow: false } };

export default async function VerifyLogin(props: PageProps<"/login/verify">) {
  return <VerifyLoginView locale="en" searchParams={await props.searchParams} />;
}
