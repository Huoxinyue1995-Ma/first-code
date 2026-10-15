import Link from "next/link";

export const metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

export default function PaymentCancelledPage() {
  return (
    <main className="legal-page payment-status-page">
      <p className="eyebrow">Checkout cancelled</p>
      <h1>Your images are still private and ready.</h1>
      <p className="legal-lead">No payment was taken. Return to Image Ready whenever you are ready to download a batch.</p>
      <Link className="email-link" href="/">Return to Image Ready</Link>
    </main>
  );
}
