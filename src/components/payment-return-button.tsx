"use client";

export function PaymentReturnButton() {
  function returnToEditor(event: React.MouseEvent<HTMLAnchorElement>) {
    const editorWindow = window.opener;
    if (!editorWindow || editorWindow.closed) return;

    event.preventDefault();
    try {
      editorWindow.postMessage({ type: "image-ready:checkout-return" }, window.location.origin);
      editorWindow.focus();
      window.close();
    } catch {
      window.location.assign("/");
    }
  }

  return <a className="email-link" href="/" onClick={returnToEditor}>Return to Image Ready</a>;
}
