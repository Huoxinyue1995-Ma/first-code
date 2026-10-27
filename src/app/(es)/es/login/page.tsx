import type { Metadata } from "next";
import { LoginView } from "@/components/views/login-view";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = { title: getDictionary("es").login.metaTitle, robots: { index: false, follow: false } };

export default async function Login(props: PageProps<"/es/login">) {
  return <LoginView locale="es" searchParams={await props.searchParams} />;
}
