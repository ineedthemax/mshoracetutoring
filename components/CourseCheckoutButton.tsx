"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  courseId?: string;
  bundleId?: string;
  planKey?: string;
  productName?: string;
  variant?: "default" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CourseCheckoutButton({
  label, courseId, bundleId, planKey, productName,
  variant = "default", className = "", size,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const endpoint = planKey ? "/api/checkout/installment" : "/api/checkout/course";
      const body = planKey
        ? { planKey, courseId, bundleId, productName }
        : { courseId, bundleId };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading ? "Redirecting..." : label}
    </Button>
  );
}
