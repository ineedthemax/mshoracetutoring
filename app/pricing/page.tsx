import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Math Tutoring Prices & Plans | MsHorace Tutoring",
  description: "Affordable online math tutoring starting at $25. 30-min sessions $40, 60-min $75, group classes $25. Flexible payment plans and back-to-school bundles available.",
};

import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaPixelViewContent } from "@/components/MetaPixelPurchase";
import { Button } from "@/components/ui/button";
import { mockPricing, bundles } from "@/lib/mock-data";
import { CheckCircle, CreditCard } from "lucide-react";

const faqs = [
  {
    q: "Do you offer payment plans?",
    a: "Yes! Payment plans are available on the First Grading Period Pack ($300), the 8-Session Pack ($600), and the Two Kids Family Pack ($490). Each can be split into 2 payments charged 30 days apart. All sessions are released immediately when your first payment is made. Afterpay, Klarna, and Affirm are also accepted at checkout.",
  },
  {
    q: "Do session packages expire?",
    a: "It depends on the bundle. The First Grading Period Pack is valid for 60 days, the 8-Session Pack for 90 days, and the Grade Rescue Pack for 45 days. The Family Pack and Group Pass also have 90-day windows.",
  },
  {
    q: "Can I mix subjects across sessions in a package?",
    a: "Yes. Session packages can be used for Pre-Algebra or Algebra I. Use them however your child needs.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "Free cancellation up to 24 hours before your session. Within 24 hours, a $15 rescheduling fee applies. No-shows are non-refundable.",
  },
  {
    q: "Do you offer discounts for multiple children?",
    a: "Yes — the Two Kids Family Pack gives you 8 sessions for $490, saving $110 compared to booking two separate 4-session packs.",
  },
  {
    q: "How do group class prices work?",
    a: "Group class prices are per student per session. A 75-minute group session is $25/student (max 4 students per class). The Group Class Semester Pass gives you 6 sessions for $150 — saving $25 vs. pay-as-you-go.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaPixelViewContent contentName="Pricing Page" value={75} />
      <PublicNav />

      {/* Hero */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h1>
          <p className="text-xl text-gray-500">No contracts. No surprise fees. Pay per session or save with bundles.</p>
        </div>
      </section>

      {/* Per-session pricing cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {mockPricing.filter(p => p.type !== "package").map((plan) => (
            <Card key={plan.id} className={`p-6 relative ${plan.name === "60-Min Session" ? "border-violet-300 shadow-lg" : ""}`}>
              {plan.name === "60-Min Session" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-violet-600 text-white border-0">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-0 text-center">
                <h3 className="font-bold text-gray-900 text-xl mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="text-5xl font-bold text-violet-600 mb-1">${plan.price}</div>
                <p className="text-gray-400 text-xs mb-6">per session</p>
                <ul className="text-left space-y-2 mb-8">
                  {[
                    "Live 1-on-1 Zoom session",
                    "Session progress report",
                    "Digital whiteboard",
                    plan.type === "group" ? "3-10 students per class" : "Focused 1-on-1 attention",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book">
                  <Button
                    className="w-full"
                    variant={plan.name === "60-Min Session" ? "default" : "outline"}
                  >
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bundles */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Back-to-School Bundle Packages</h2>
          <p className="text-gray-500">Save more when you commit. Every bundle includes personalized session notes and WhatsApp check-ins.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bundles.map((bundle) => (
            <Card key={bundle.id} className="relative overflow-hidden flex flex-col">
              {/* Badge */}
              <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 text-center">
                {bundle.badge}
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{bundle.name}</h3>
                <p className="text-gray-400 text-xs mb-4 italic">{bundle.tagline}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  {bundle.originalPrice && (
                    <span className="text-gray-300 line-through text-lg">${bundle.originalPrice}</span>
                  )}
                  <span className="text-3xl font-bold text-violet-600">${bundle.price}</span>
                  {bundle.id === "b4" && <span className="text-gray-400 text-sm">/mo</span>}
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  {bundle.perSession} · {bundle.validity}
                </p>

                {/* Payment plan callout */}
                {bundle.paymentPlan && (
                  <div className="bg-violet-50 border border-violet-100 rounded-lg px-3 py-2 mb-4 flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-violet-700">
                      <span className="font-semibold">Payment plan: </span>
                      {bundle.paymentPlan.splits}×${bundle.paymentPlan.amount}, {bundle.paymentPlan.interval}. All sessions released on first payment.
                    </p>
                  </div>
                )}

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6 flex-1">
                  {bundle.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href={`/checkout?type=${bundle.checkoutType}`} className="mt-auto">
                  <Button className="w-full">Buy Bundle</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Plans Banner */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-violet-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Plans Available</h2>
              <p className="text-gray-500 mb-4">
                Don&apos;t let the upfront cost hold you back. Split your purchase into 2 easy payments — no interest, no hidden fees. All sessions are released immediately on your first payment.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "First Grading Period Pack", full: "$300", plan: "2 × $150" },
                  { label: "8-Session Pack", full: "$600", plan: "2 × $300" },
                  { label: "Two Kids Family Pack", full: "$490", plan: "2 × $245" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-violet-100">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-gray-400 mb-2">Full price: {item.full}</p>
                    <p className="text-violet-600 font-bold text-sm">{item.plan} · 30 days apart</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Afterpay, Klarna, and Affirm also accepted at checkout. A card on file is required to activate a payment plan.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What&apos;s Included</h2>
        <Card className="overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Feature</th>
                  <th className="text-center p-4 font-semibold text-gray-700">30-Min</th>
                  <th className="text-center p-4 font-semibold text-violet-700 bg-violet-50">60-Min</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Bundle</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Live Zoom session", true, true, true, true],
                  ["1-on-1 with Ms. Horace", true, true, true, false],
                  ["Session progress report", false, true, true, true],
                  ["Homework assigned", false, true, true, false],
                  ["Confidence score", false, true, true, false],
                  ["Next-step recommendations", false, true, true, false],
                  ["Session recording (on request)", true, true, true, false],
                ].map(([feature, ...cols]) => (
                  <tr key={String(feature)} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{String(feature)}</td>
                    {cols.map((v, i) => (
                      <td key={i} className={`p-4 text-center ${i === 1 ? "bg-violet-50/50" : ""}`}>
                        {v ? (
                          <CheckCircle className="w-4 h-4 text-violet-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">--</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <CardContent className="pt-5 pb-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
