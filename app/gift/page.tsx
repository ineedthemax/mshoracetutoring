"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, CheckCircle, Heart, Star } from "lucide-react";

const GIFT_OPTIONS = [
 { id: "solo-30", label: "30-Min Session", price: 40, desc: "Quick focused help on one topic", popular: false },
 { id: "solo-60", label: "60-Min Session", price: 75, desc: "Deep dive with a full progress report", popular: true },
 { id: "pack-4", label: "4-Session Pack", price: 240, desc: "Save $60 — great for a full grading period", popular: false },
];

export default function GiftPage() {
 const [selected, setSelected] = useState("solo-60");
 const [form, setForm] = useState({ gifterName: "", gifterEmail: "", recipientName: "", recipientEmail: "", message: "" });
 const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
 const [errorMsg, setErrorMsg] = useState("");

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setStatus("loading");
 setErrorMsg("");
 try {
 const res = await fetch("/api/gift", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...form, sessionType: selected }),
 });
 const data = await res.json();
 if (!res.ok) throw new Error(data.error || "Something went wrong");
 if (data.checkoutUrl) {
 window.location.href = data.checkoutUrl;
 } else {
 setStatus("success");
 }
 } catch (err: any) {
 setStatus("error");
 setErrorMsg(err.message || "Something went wrong. Please try again.");
 }
 };

 const selectedOption = GIFT_OPTIONS.find(o => o.id === selected);
 const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-sm text-gray-900 bg-white transition-colors";
 const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

 if (status === "success") {
 return (
 <div className="min-h-screen bg-gray-50">
 <PublicNav />
 <div className="max-w-lg mx-auto px-4 py-24 text-center">
 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <CheckCircle className="w-8 h-8 text-green-600" />
 </div>
 <h1 className="text-2xl font-bold text-gray-900 mb-3">Gift Sent!</h1>
 <p className="text-gray-500 mb-6">
 {form.recipientName} will receive an email with their session gift and instructions to book. A confirmation was also sent to {form.gifterEmail}.
 </p>
 <Link href="/"><Button variant="outline">Back to Home</Button></Link>
 </div>
 <Footer />
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-gray-50">
 <PublicNav />

 {/* Hero */}
 <section className="bg-white py-16 px-4 border-b border-gray-100">
 <div className="max-w-2xl mx-auto text-center">
 <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
 <Gift className="w-7 h-7 text-violet-600" />
 </div>
 <h1 className="text-4xl font-bold text-gray-900 mb-4">Gift a Tutoring Session</h1>
 <p className="text-xl text-gray-500">Give the gift of confidence. A math session with Ms. Horace is the kind of gift that changes grades.</p>
 </div>
 </section>

 <section className="max-w-2xl mx-auto px-4 py-12">

 {/* Why it's a great gift */}
 <div className="grid sm:grid-cols-3 gap-4 mb-10">
 {[
 { icon: Star, text: "4.9-star rated tutor" },
 { icon: Heart, text: "Perfect for the holidays" },
 { icon: CheckCircle, text: "Instant email delivery" },
 ].map(item => (
 <div key={item.text} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100">
 <item.icon className="w-5 h-5 text-violet-500 flex-shrink-0" />
 <span className="text-sm text-gray-700 font-medium">{item.text}</span>
 </div>
 ))}
 </div>

 <form onSubmit={handleSubmit} className="space-y-8">
 {/* Step 1: Choose session */}
 <Card>
 <CardContent className="p-6">
 <h2 className="text-lg font-bold text-gray-900 mb-4">1. Choose a Session</h2>
 <div className="space-y-3">
 {GIFT_OPTIONS.map(option => (
 <label
 key={option.id}
 className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
 selected === option.id ? "border-violet-500 bg-violet-50" : "border-gray-100 hover:border-gray-200 bg-white"
 }`}
 >
 <input
 type="radio"
 name="sessionType"
 value={option.id}
 checked={selected === option.id}
 onChange={() => setSelected(option.id)}
 className="sr-only"
 />
 <div className="flex-1">
 <div className="flex items-center gap-2">
 <span className="font-semibold text-gray-900 text-sm">{option.label}</span>
 {option.popular && (
 <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-2 py-0.5 rounded-full">Most Popular</span>
 )}
 </div>
 <p className="text-xs text-gray-500 mt-0.5">{option.desc}</p>
 </div>
 <span className="text-lg font-bold text-violet-600">${option.price}</span>
 </label>
 ))}
 </div>
 </CardContent>
 </Card>

 {/* Step 2: Recipient info */}
 <Card>
 <CardContent className="p-6">
 <h2 className="text-lg font-bold text-gray-900 mb-4">2. Who is this for?</h2>
 <div className="space-y-4">
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label className={labelClass}>Recipient&apos;s Name <span className="text-red-400">*</span></label>
 <input name="recipientName" type="text" required placeholder="Alex Smith" value={form.recipientName} onChange={handleChange} className={inputClass} />
 </div>
 <div>
 <label className={labelClass}>Recipient&apos;s Email <span className="text-red-400">*</span></label>
 <input name="recipientEmail" type="email" required placeholder="alex@example.com" value={form.recipientEmail} onChange={handleChange} className={inputClass} />
 </div>
 </div>
 <div>
 <label className={labelClass}>Personal Message <span className="text-gray-400 font-normal">(optional)</span></label>
 <textarea
 name="message"
 rows={3}
 placeholder="Add a note to include in the gift email..."
 value={form.message}
 onChange={handleChange}
 className={inputClass + " resize-none"}
 />
 </div>
 </div>
 </CardContent>
 </Card>

 {/* Step 3: Gifter info */}
 <Card>
 <CardContent className="p-6">
 <h2 className="text-lg font-bold text-gray-900 mb-4">3. Your Info</h2>
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label className={labelClass}>Your Name <span className="text-red-400">*</span></label>
 <input name="gifterName" type="text" required placeholder="Jane Smith" value={form.gifterName} onChange={handleChange} className={inputClass} />
 </div>
 <div>
 <label className={labelClass}>Your Email <span className="text-red-400">*</span></label>
 <input name="gifterEmail" type="email" required placeholder="jane@example.com" value={form.gifterEmail} onChange={handleChange} className={inputClass} />
 </div>
 </div>
 </CardContent>
 </Card>

 {status === "error" && (
 <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{errorMsg}</p>
 )}

 {/* Summary + CTA */}
 <div className="bg-violet-50 rounded-2xl p-6">
 <div className="flex items-center justify-between mb-4">
 <div>
 <p className="font-semibold text-gray-900">{selectedOption?.label}</p>
 <p className="text-sm text-gray-500">for {form.recipientName || "recipient"}</p>
 </div>
 <span className="text-2xl font-bold text-violet-600">${selectedOption?.price}</span>
 </div>
 <button
 type="submit"
 disabled={status === "loading"}
 className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-colors"
 >
 {status === "loading" ? "Redirecting to checkout..." : `Purchase Gift — $${selectedOption?.price}`}
 </button>
 <p className="text-center text-xs text-gray-400 mt-3">Secure checkout via Stripe. Gift email delivered instantly after payment.</p>
 </div>
 </form>
 </section>

 <Footer />
 </div>
 );
}
