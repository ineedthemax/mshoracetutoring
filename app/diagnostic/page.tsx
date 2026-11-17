import type { Metadata } from "next";
export const metadata: Metadata = {
 title: "Free Math Diagnostic Assessment | MsHorace Tutoring",
 description: "Get a free 20-minute math diagnostic session for your 6th-9th grader. Ms. Horace identifies exactly where your student needs help — no commitment required.",
};

import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { CheckCircle, Clock, FileText, MessageSquare } from "lucide-react";

const WHAT_HAPPENS = [
 {
 icon: Clock,
 title: "20-Minute Live Session",
 desc: "Ms. Horace works through a short set of problems with your student on Zoom to see where they are.",
 },
 {
 icon: FileText,
 title: "Written Gap Report",
 desc: "You receive a written summary identifying the specific concepts your student needs to strengthen.",
 },
 {
 icon: MessageSquare,
 title: "Recommendation",
 desc: "Ms. Horace recommends a session type and frequency based on what she observed — no upsell pressure.",
 },
];

export default function DiagnosticPage() {
 return (
 <div className="min-h-screen bg-gray-50">
 <PublicNav />

 {/* Hero */}
 <section className="bg-white py-16 px-4 border-b border-gray-100">
 <div className="max-w-2xl mx-auto text-center">
 <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
 100% Free - No Commitment
 </span>
 <h1 className="text-4xl font-bold text-gray-900 mb-4">
 Free 20-Min Math Diagnostic
 </h1>
 <p className="text-xl text-gray-500 leading-relaxed">
 Not sure where your student is struggling? Let Ms. Horace find out. One short session tells you exactly what needs work before the next grading period.
 </p>
 </div>
 </section>

 {/* What happens */}
 <section className="max-w-4xl mx-auto px-4 py-16">
 <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What Happens in the Diagnostic</h2>
 <div className="grid sm:grid-cols-3 gap-6 mb-16">
 {WHAT_HAPPENS.map((item, i) => (
 <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100">
 <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
 <item.icon className="w-5 h-5 text-violet-600" />
 </div>
 <div className="text-xs font-bold text-violet-500 mb-2">Step {i + 1}</div>
 <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
 <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>

 {/* What it covers */}
 <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-16">
 <h2 className="text-xl font-bold text-gray-900 mb-6">What We Check</h2>
 <div className="grid sm:grid-cols-2 gap-3">
 {[
 "Number sense and operations",
 "Fractions, decimals, ratios",
 "Order of operations",
 "Solving one and two-step equations",
 "Graphing and coordinate plane basics",
 "Variable and expression understanding",
 ].map(item => (
 <div key={item} className="flex items-center gap-3">
 <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
 <span className="text-sm text-gray-700">{item}</span>
 </div>
 ))}
 </div>
 <p className="text-xs text-gray-400 mt-4">Diagnostic is tailored to the student&apos;s grade level (6th-9th) and covers Pre-Algebra or Algebra 1 concepts.</p>
 </div>

 {/* Form */}
 <div className="max-w-lg mx-auto">
 <div className="text-center mb-8">
 <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Your Free Diagnostic</h2>
 <p className="text-gray-500">Ms. Horace will reach out within 24 hours to schedule a time.</p>
 </div>
 <LeadCaptureForm
 source="diagnostic-page"
 cta="Request Free Diagnostic"
 />
 </div>
 </section>

 <Footer />
 </div>
 );
}
