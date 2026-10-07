"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CreditCard, CheckCircle } from "lucide-react";

const BUNDLE_CONFIG: Record<string, {
  title: string;
  price: string;
  priceNum: number;
  paymentPlan?: { splits: number; amount: number; label: string };
}> = {
  "4-session":    { title: "First Grading Period Pack", price: "$300", priceNum: 300, paymentPlan: { splits: 2, amount: 150, label: "2 payments of $150, 30 days apart" } },
  "8-session":    { title: "8-Session Pack",            price: "$600", priceNum: 600, paymentPlan: { splits: 2, amount: 300, label: "2 payments of $300, 30 days apart" } },
  "grade-rescue": { title: 'Grade Rescue Pack',          price: "$195", priceNum: 195 },
  "monthly":      { title: "Weekly Rhythm Monthly Pack", price: "$260/mo", priceNum: 260 },
  "family-pack":  { title: '"Two Kids" Family Pack',     price: "$490", priceNum: 490, paymentPlan: { splits: 2, amount: 245, label: "2 payments of $245, 30 days apart" } },
  "group-pass":   { title: "Group Class Semester Pass",  price: "$150", priceNum: 150 },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "4-session";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payOption, setPayOption] = useState<"full" | "plan">("full");

  const bundle = BUNDLE_CONFIG[type] || BUNDLE_CONFIG["4-session"];
  const hasPlan = !!bundle.paymentPlan;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageType: type,
          parentEmail: email,
          paymentOption: hasPlan ? payOption : "full",
        }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Checkout failed");
    } catch {
      setError("Error processing checkout");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{bundle.title}</h1>
        <div className="text-4xl font-bold text-violet-600 mb-6">{bundle.price}</div>

        {/* Payment option toggle */}
        {hasPlan && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">How would you like to pay?</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Pay in full */}
              <button
                onClick={() => setPayOption("full")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  payOption === "full"
                    ? "border-violet-600 bg-violet-50"
                    : "border-gray-200 hover:border-violet-300"
                }`}
              >
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Pay in full</p>
                <p className="text-violet-600 font-bold">{bundle.price}</p>
                <p className="text-xs text-gray-400 mt-1">One payment today</p>
                {payOption === "full" && (
                  <CheckCircle className="w-4 h-4 text-violet-600 mt-2" />
                )}
              </button>

              {/* Payment plan */}
              <button
                onClick={() => setPayOption("plan")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  payOption === "plan"
                    ? "border-violet-600 bg-violet-50"
                    : "border-gray-200 hover:border-violet-300"
                }`}
              >
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Payment plan</p>
                <p className="text-violet-600 font-bold">${bundle.paymentPlan!.amount} today</p>
                <p className="text-xs text-gray-400 mt-1">{bundle.paymentPlan!.label}</p>
                {payOption === "plan" && (
                  <CheckCircle className="w-4 h-4 text-violet-600 mt-2" />
                )}
              </button>
            </div>

            {payOption === "plan" && (
              <div className="mt-3 bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 flex gap-2 items-start">
                <CreditCard className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-violet-700">
                  All sessions released immediately. Your card will be saved and payment 2 auto-charges in 30 days. No interest, no hidden fees.
                </p>
              </div>
            )}
          </div>
        )}

        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {loading
            ? "Processing..."
            : hasPlan && payOption === "plan"
            ? `Pay $${bundle.paymentPlan!.amount} Now`
            : `Pay ${bundle.price} Now`}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">Powered by Stripe · Secure checkout</p>
        <Link href="/pricing" className="text-center block text-violet-600 text-sm mt-3">
          ← Back to pricing
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
