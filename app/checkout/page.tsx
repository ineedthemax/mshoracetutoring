"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "4-session";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const packages: Record<string, { title: string; price: string }> = {
    "4-session": { title: "4-Session Pack", price: "$300" },
    "8-session": { title: "8-Session Pack", price: "$600" },
  };

  const pkg = packages[type] || packages["4-session"];

  const handleCheckout = async () => {
    if (!email.trim()) {
      setError("Email required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/package", {
        method: "POST",
        body: JSON.stringify({ packageType: type, parentEmail: email }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Checkout failed");
    } catch (err) {
      setError("Error processing checkout");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
        <div className="text-5xl font-bold text-violet-600 mb-6">{pkg.price}</div>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">Powered by Stripe</p>
        <Link href="/" className="text-center block text-violet-600 text-sm mt-4">
          Back
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-20 px-4" />}>
      <CheckoutForm />
    </Suspense>
  );
}
