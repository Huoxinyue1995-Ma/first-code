"use client";

import { useEffect } from "react";

// Tells the original editor tab (same origin) that sign-in or a purchase finished, so it refreshes credits
// and resumes the download. The photos stay in that tab the whole time.
export function NotifyEditorTab({ closeSelf = false }: { closeSelf?: boolean }) {
  useEffect(() => {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("resizet-auth");
      channel.postMessage({ type: "account-updated" });
      channel.close();
    }
    if (closeSelf && window.opener) {
      try {
        window.opener.focus();
      } catch {
        // Ignore cross-window focus errors.
      }
      window.setTimeout(() => window.close(), 400);
    }
  }, [closeSelf]);
  return null;
}
