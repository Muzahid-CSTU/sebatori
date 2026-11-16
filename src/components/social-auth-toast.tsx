"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const messages: Record<string, string> = {
  google: "Signed in with Google successfully!",
};

export function SocialAuthToast() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("auth");

    if (!provider) {
      return;
    }

    toast.success(messages[provider] ?? "Signed in successfully!");

    params.delete("auth");
    const query = params.toString();

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`
    );
  }, []);

  return null;
}
