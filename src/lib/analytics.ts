export type AnalyticsEventName =
  | "download_click"
  | "signin_prompt"
  | "credits_prompt"
  | "begin_checkout"
  | "download_success"
  | "home_handoff"
  | "login" // GA4 recommended event; `method` is google_button, google_one_tap, google_redirect or email_code
  | "login_start"
  | "login_code_sent"
  | "one_tap_requested";

type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
};

export function trackEvent(eventName: AnalyticsEventName, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const eventParameters = process.env.NODE_ENV === "development"
    ? { ...parameters, debug_mode: true }
    : parameters;
  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag !== "function") {
    // gtag.js only processes `arguments` objects from dataLayer; plain arrays are ignored.
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      analyticsWindow.dataLayer!.push(arguments);
    };
  }
  analyticsWindow.gtag("event", eventName, eventParameters);
}
