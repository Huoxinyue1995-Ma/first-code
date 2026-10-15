import { PaymentReturnButton } from "@/components/payment-return-button";

export const metadata = {
  title: "Payment complete",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return (
    <main className="legal-page payment-status-page">
      <p className="eyebrow">Payment complete</p>
      <h1>Your batch download is ready.</h1>
      <p className="legal-lead">Return to the Image Ready tab where your images are still open. It will confirm the payment and let you download your ZIP.</p>
      <PaymentReturnButton />
    </main>
  );
}
