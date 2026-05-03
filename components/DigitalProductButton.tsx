"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Props {
  productKey: string;
}

export function DigitalProductButton({ productKey }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/digital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey }),
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
      size="sm"
      variant="outline"
      onClick={handleBuy}
      disabled={loading}
      className="flex items-center gap-1.5"
    >
      <ShoppingCart className="w-3.5 h-3.5" />
      {loading ? "Loading..." : "Buy Now"}
    </Button>
  );
}
