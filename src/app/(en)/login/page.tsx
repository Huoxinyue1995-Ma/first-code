import type { Metadata } from "next";
import { LoginView } from "@/components/views/login-view";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = { title: getDictionary("en").login.metaTitle, robots: { index: false, follow: false } };

export default async function Login(props: PageProps<"/login">) {
  return <LoginView locale="en" searchParams={await props.searchParams} />;
}
