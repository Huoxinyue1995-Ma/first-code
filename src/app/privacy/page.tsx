import Link from "next/link";

export const metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">Back to Image Ready</Link>
      <p className="eyebrow">Privacy</p>
      <h1>Your product images stay on your device.</h1>
      <p className="legal-lead">
        Image Ready is built so you can crop and export product images without uploading the originals to us.
      </p>
      <section>
        <h2>How image processing works</h2>
        <p>
          When you choose a file, your browser reads it on your device and creates the preview and download there. Image Ready does not send your original image, preview, or exported file to our servers or to a third-party image service.
        </p>
      </section>
      <section>
        <h2>What happens when you leave</h2>
        <p>
          Your current editing session exists only in your browser. Refreshing or closing the page removes unsaved work from the session. Downloaded files remain on your device until you delete them.
        </p>
      </section>
      <section>
        <h2>Basic website information</h2>
        <p>
          Hosting services may collect normal technical information needed to deliver a webpage, such as browser type and anonymous request logs. We do not use that information to inspect or rebuild your images.
        </p>
      </section>
      <section>
        <h2>Accounts and credits</h2>
        <p>
          You do not need an account to crop, resize, or compress images. If you create an account to use credits, we store your email address, your name if you sign in with Google, the date you joined, and a history of credit purchases and use. Sign-in uses a secure cookie that keeps you logged in for up to 30 days.
        </p>
        <p>
          If you sign in with Google, Google shares your name, email address, and account identifier with us. We do not receive your Google password. Sign-in emails are delivered by our email provider, Resend. Payments are handled by Stripe; we never see or store your card details.
        </p>
        <p>
          To delete your account and its data, email us from the address on the account.
        </p>
      </section>
      <section>
        <h2>Analytics and advertising</h2>
        <p>
          We use Google Analytics to understand aggregate website use, such as pages viewed, referral source, browser and device information, approximate location, and interactions with the site. Google AdSense may use cookies and similar technologies to display and measure advertising. These services do not receive the original images, previews, or exports that you process in Image Ready.
        </p>
        <p>
          You can manage Google ad personalization through your Google account and browser settings.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact us at <a href="mailto:huoxinyue1995@gmail.com">huoxinyue1995@gmail.com</a>. We will update this page if our privacy practices change.
        </p>
      </section>
    </main>
  );
}
