import type { Metadata } from "next";
import { LoginDoneView } from "@/components/views/login-done-view";

export const metadata: Metadata = { title: "Image Ready", robots: { index: false, follow: false } };

export default function LoginDone() {
  return <LoginDoneView locale="en" />;
}
