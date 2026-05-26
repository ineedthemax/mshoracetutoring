"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const SESSION_PRICES: Record<string, number> = {
  "solo-30": 40,
  "solo-60": 75,
  "group": 25,
};

// Fires on /book/success — reads real session type from URL
export function MetaPixelPurchase({ value, currency = "USD" }: { value?: number; currency?: string }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    const sessionType = searchParams.get("type");
    const actualValue = sessionType ? (SESSION_PRICES[sessionType] ?? value ?? 75) : (value ?? 75);

    window.fbq("track", "Purchase", {
      currency,
      value: actualValue,
      content_type: "product",
      content_name: "Tutoring Session",
      content_category: sessionType ?? "session",
    });
  }, [value, currency, searchParams]);

  return null;
}

// Fires when user clicks "Pay Now" on the booking page
export function MetaPixelInitiateCheckout({ value, sessionType }: { value: number; sessionType: string }) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "InitiateCheckout", {
      currency: "USD",
      value,
      content_name: sessionType,
      content_category: "tutoring_session",
      num_items: 1,
    });
  }, [value, sessionType]);

  return null;
}

// Fires when visiting pricing or course pages
export function MetaPixelViewContent({ contentName, value }: { contentName: string; value?: number }) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: "tutoring",
      currency: "USD",
      value: value ?? 0,
    });
  }, [contentName, value]);

  return null;
}
