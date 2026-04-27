import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Video, Lightbulb, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: BookOpen,
    title: "Browse & Book Online",
    desc: "Visit the booking page, choose your grade level, subject, and preferred session type. You can book a 30-min, 60-min, or group class. Pick a date and time that works for your schedule from the live availability grid.",
    details: ["No account needed to book", "Choose from individual or group sessions", "See real-time availability by day and time"],
  },
  {
    step: 2,
    icon: DollarSign,
    title: "Secure Stripe Payment",
    desc: "After selecting your session, you'll be taken to a Stripe-powered checkout page. Your payment info is never stored by us. You can also purchase session packages (4 or 8 sessions) for savings.",
    details: ["Credit/debit cards accepted", "Session packages save up to 13%", "Instant payment confirmation"],
  },
  {
    step: 3,
    icon: Video,
    title: "Get Your Zoom Link",
    desc: "Once payment is confirmed, you'll receive a confirmation email immediately with your unique Zoom meeting link, session time, and tutor details. Add it to your calendar with one click.",
    details: ["Instant email confirmation", "Calendar invite included", "Zoom link doesn't expire"],
  },
  {
    step: 4,
    icon: Lightbulb,
    title: "Attend Your Live Session",
    desc: "Show up at the scheduled time. Ms. Horace will guide the session with screen sharing, a digital whiteboard, and worked examples. Come with questions, a problem set, or just say what you're stuck on.",
    details: ["Interactive digital whiteboard", "Screen share for problem walkthrough", "Session recording available on request"],
  },
  {
    step: 5,
    icon: FileText,
    title: "Receive the Session Report",
    desc: "Within 24 hours, parents receive a written session report covering: topics covered, student wins, identified skill gaps, homework assigned, confidence score (0-100), and recommended next steps.",
    details: ["Written report within 24 hours", "Confidence score tracked over time", "Clear next-step recommendations"],
  },
];

const faqs = [
  { q: "What do I need to join a session?", a: "A computer or tablet with a camera and microphone, a stable internet connection, and the free Zoom app. A pencil and paper or a tablet for working through problems is helpful." },
  { q: "Can I watch my child's session?", a: "Yes. You're welcome to observe any session. Just let Ms. Horace know ahead of time so he can set up the session accordingly." },
  { q: "What if we need to reschedule?", a: "You can reschedule up to 24 hours before the session start time at no charge. Within 24 hours, a $15 reschedule fee applies. Cancellations within 2 hours are non-refundable." },
  { q: "How do I know if my student is improving?", a: "Every session comes with a written report that includes a confidence score (0-100). You can track this score over multiple sessions to see growth trends. Ms. Horace also notes specific wins and skill gaps each time." },
  { q: "What grade levels do you work with?", a: "6th through 12th grade. This covers Pre-Algebra through AP Calculus AB and BC, plus SAT/ACT Math prep." },
  { q: "Do you offer a trial or first-session guarantee?", a: "If you're not satisfied after your first session, contact us within 48 hours and we'll work to make it right or provide a full refund no questions asked." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      {/* Hero */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-500">From &ldquo;I&apos;m stuck&rdquo; to &ldquo;I got this&rdquo; here&apos;s exactly what to expect.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        {steps.map((s, i) => (
          <Card key={s.step} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-6 p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {s.step}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-violet-200 mt-3" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <s.icon className="w-5 h-5 text-violet-500" />
                    <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-violet-100 mb-8">Booking takes under 3 minutes. No account required.</p>
          <Link href="/book">
            <button className="bg-white text-violet-700 font-semibold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors text-base">
              Book a Session Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
