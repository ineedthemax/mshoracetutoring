"use client";
import { useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { category: "Booking", q: "How do I book a session?", a: "Go to the Book page, select your grade level, subject, session type, and preferred time slot. Complete the form and payment, and you'll receive a Zoom link by email immediately." },
  { category: "Booking", q: "Do I need an account to book?", a: "No account is required for your first booking. After your first session, you can create a parent or student account to track progress, view session reports, and manage bookings easily." },
  { category: "Booking", q: "How far in advance do I need to book?", a: "We recommend booking at least 24 hours in advance. Same-day bookings may be available based on Marcus's schedule. Check the live availability on the booking page." },
  { category: "Booking", q: "Can I book recurring sessions?", a: "Yes. Once you have an account, you can schedule recurring weekly sessions. Many families find a consistent weekly slot works best for steady progress." },
  { category: "Payments", q: "What payment methods do you accept?", a: "We accept all major credit and debit cards through Stripe. Apple Pay and Google Pay are also supported. We do not accept cash or checks." },
  { category: "Payments", q: "When am I charged?", a: "Payment is collected at the time of booking. For session packages, the full package amount is charged upfront." },
  { category: "Payments", q: "Can I get a refund?", a: "If you cancel more than 24 hours before your session, you'll receive a full refund. Cancellations within 24 hours are non-refundable, but you can reschedule for a $15 fee. First-session satisfaction guarantee applies." },
  { category: "Sessions", q: "What technology do I need for sessions?", a: "You need a computer, tablet, or phone with a camera and microphone, a stable internet connection, and the free Zoom app. We recommend having paper and pencil or a writing tablet for working through problems." },
  { category: "Sessions", q: "How long are sessions?", a: "Individual sessions are either 30 minutes or 60 minutes. Group classes are typically 90 minutes. You choose the length when booking." },
  { category: "Sessions", q: "Can a parent observe the session?", a: "Absolutely. Parents are welcome to join and observe any session. Just let Marcus know beforehand so the session environment is set up appropriately." },
  { category: "Sessions", q: "What if a student shows up without doing the prep work?", a: "No problem. Marcus will assess where the student is and work from there. Coming with specific questions or a recent test is helpful, but not required." },
  { category: "Cancellations", q: "What is the cancellation policy?", a: "Free cancellation with full refund up to 24 hours before the session. Within 24 hours, a $15 rescheduling fee applies. No-show (student doesn't show up without notice) is non-refundable." },
  { category: "Progress", q: "How will I know my child is improving?", a: "After every 60-minute 1-on-1 session, parents receive a written progress report including: topics covered, wins, skill gaps, homework assigned, a confidence score (0-100), and recommended next steps." },
  { category: "Progress", q: "What is the confidence score?", a: "The confidence score (0-100) is Marcus's assessment of the student's comfort and competency with the session's material. Tracking this across sessions shows clear growth trends over time." },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-violet-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
          <div className="pt-4">{faq.a}</div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-500">Everything you need to know before booking.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-violet-600 rounded-full inline-block" />
              {cat}
            </h2>
            <div className="space-y-3">
              {faqs.filter(f => f.category === cat).map((faq) => (
                <FAQItem key={faq.q} faq={faq} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
