"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelPurchase({ value, currency = "USD" }: { value?: number; currency?: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        currency,
        value: value ?? 0,
        content_type: "product",
        content_name: "Tutoring Session",
      });
    }
  }, [value, currency]);

  return null;
}
