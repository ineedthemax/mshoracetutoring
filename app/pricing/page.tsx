import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPricing } from "@/lib/mock-data";
import { CheckCircle, CreditCard } from "lucide-react";

const faqs = [
  { q: "Do you offer payment plans?", a: "Yes! Payment plans are available on all courses and the bundle. Courses can be split into 2 payments of $99/month. The bundle can be split into 2 payments of $197/month or 3 payments of $132/month. Simply select your plan at checkout — Stripe handles the rest automatically." },
  { q: "Do session packages expire?", a: "Session packages are valid for 90 days from purchase. This gives you plenty of time to use them without rushing." },
  { q: "Can I mix subjects across sessions in a package?", a: "Yes. Session packages can be used for any subject, any grade level. Use them however you need." },
  { q: "Is there a cancellation policy?", a: "Free cancellation up to 24 hours before your session. Within 24 hours, a $15 rescheduling fee applies. No-shows are non-refundable." },
  { q: "Do you offer discounts for multiple children?", a: "Yes families with 2+ students receive 10% off all sessions. Contact us to set this up." },
  { q: "How do group class prices work?", a: "Group class prices are per student per session. A 90-minute group session is $25/student (3-8 students per class)." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      {/* Hero */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h1>
          <p className="text-xl text-gray-500">No contracts. No surprise fees. Pay per session or save with packages.</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                    plan.type === "group" ? "3-8 students per class" : "Focused 1-on-1 attention",
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

        {/* Packages */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Session Packages Save More</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mockPricing.filter(p => p.type === "package").map((plan) => {
            const savings = "originalPrice" in plan && plan.originalPrice ? plan.originalPrice - plan.price : 0;
            const savingsPct = "originalPrice" in plan && plan.originalPrice ? Math.round((savings / plan.originalPrice) * 100) : 0;
            return (
              <Card key={plan.id} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-xl">{plan.name}</h3>
                    <Badge variant="success">Save {savingsPct}%</Badge>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold text-violet-600">${plan.price}</span>
                    {"originalPrice" in plan && plan.originalPrice && (
                      <span className="text-gray-400 line-through text-lg">${plan.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-6">
                    {"sessions" in plan ? `$${Math.round(plan.price / (plan.sessions || 1))}/session · Valid 90 days` : ""}
                  </p>
                  <Link href="/book">
                    <Button className="w-full">Buy Package</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
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
                  <th className="text-center p-4 font-semibold text-gray-700">Package</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Live Zoom session", true, true, true, true],
                  ["1-on-1 with Marcus", true, true, true, false],
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

        {/* Payment Plans Banner */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-8 mb-16 text-center">
          <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Plans Available</h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Don&apos;t let the upfront cost hold you back. Split your purchase into easy monthly payments with no interest and no hidden fees.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            {[
              { label: "Pre-Algebra Course", full: "$197", plan: "2 × $99/mo" },
              { label: "Algebra 1 Course", full: "$197", plan: "2 × $99/mo" },
              { label: "Complete Bundle", full: "$394", plan: "2 × $197/mo or 3 × $132/mo" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 border border-violet-100">
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                <p className="text-xs text-gray-400 mb-2">Full price: {item.full}</p>
                <p className="text-violet-600 font-bold text-sm">{item.plan}</p>
              </div>
            ))}
          </div>
          <Link href="/courses">
            <Button className="px-8">View Courses & Payment Plans</Button>
          </Link>
        </div>

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
