"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  purchaseId: string;
  productKey: string;
  productName: string;
  buyerEmail: string;
}

export function ResendDeliveryButton({ purchaseId, productKey, productName, buyerEmail }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleResend() {
    if (!buyerEmail) {
      alert("No email address on file for this purchase.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/resend-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId, productKey, productName, buyerEmail }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
        <CheckCircle className="w-3.5 h-3.5" /> Sent!
      </span>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="text-xs h-7 px-3"
      onClick={handleResend}
      disabled={status === "loading"}
    >
      {status === "loading" ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <><Send className="w-3 h-3 mr-1" /> Resend</>
      )}
    </Button>
  );
}
