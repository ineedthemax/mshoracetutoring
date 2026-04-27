"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockAvailability } from "@/lib/mock-data";
import { CheckCircle, Video, Clock, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const gradeLevels = ["6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"];

const subjectsByGrade: Record<string, string[]> = {
  "6th Grade": ["Pre-Algebra", "General Math"],
  "7th Grade": ["Pre-Algebra", "Algebra 1"],
  "8th Grade": ["Algebra 1", "Geometry", "Pre-Algebra"],
  "9th Grade": ["Algebra 1", "Algebra 2", "Geometry"],
  "10th Grade": ["Algebra 2", "Geometry", "Trigonometry"],
  "11th Grade": ["Pre-Calculus", "Trigonometry", "Algebra 2", "SAT Math"],
  "12th Grade": ["Pre-Calculus", "Calculus", "AP Calculus AB", "AP Calculus BC", "SAT Math", "ACT Math"],
};

const sessionTypes = [
  { id: "solo-30", label: "1-on-1 (30 min)", price: 40, icon: Clock, desc: "Quick focused help on one topic" },
  { id: "solo-60", label: "1-on-1 (60 min)", price: 75, icon: Video, desc: "Deep dive into concepts and practice", popular: true },
  { id: "group", label: "Group Class", price: 25, icon: Users, desc: "3-10 students, exam prep and review" },
];

const steps = ["Grade", "Subject", "Session Type", "Date & Time", "Your Info", "Payment", "Confirmed"];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", timezone: "Eastern (ET)" });

  const [isPending, startTransition] = useTransition();
  const [payError, setPayError] = useState("");
  const selectedSession = sessionTypes.find(s => s.id === sessionType);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  async function handleCheckout() {
    setPayError("");
    startTransition(async () => {
      const durationKey = sessionType === "solo-30" ? "30-min" : sessionType === "solo-60" ? "60-min" : "group";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionType,
          subject,
          gradeLevel: grade,
          duration: durationKey,
          date: selectedDay,
          time: selectedSlot,
          parentName: form.name,
          parentEmail: form.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setPayError(data.error || "Payment setup failed. Please try again."); return; }
      window.location.href = data.url;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step indicator */}
        {step < 6 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Step {step + 1} of 6</span>
              <span className="text-sm font-medium text-violet-600">{steps[step]}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-violet-600 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / 6) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {steps.slice(0, 6).map((s, i) => (
                <span key={s} className={cn("text-xs", i <= step ? "text-violet-600 font-medium" : "text-gray-300")}>
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step 0: Grade Level */}
        {step === 0 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What grade is the student in?</h2>
              <p className="text-gray-500 mb-6">We&apos;ll show the right subjects for their level.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {gradeLevels.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all",
                      grade === g
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-gray-200 text-gray-600 hover:border-violet-300"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <Button onClick={next} disabled={!grade} className="w-full">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Subject */}
        {step === 1 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which subject?</h2>
              <p className="text-gray-500 mb-6">Choose the subject you need help with for {grade}.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {(subjectsByGrade[grade] || []).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all",
                      subject === s
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-gray-200 text-gray-600 hover:border-violet-300"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={next} disabled={!subject} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Session Type */}
        {step === 2 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of session?</h2>
              <p className="text-gray-500 mb-6">Choose the format that works best for you.</p>
              <div className="space-y-3 mb-8">
                {sessionTypes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSessionType(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
                      sessionType === s.id
                        ? "border-violet-600 bg-violet-50"
                        : "border-gray-200 hover:border-violet-300"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {s.label}
                          {s.popular && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Popular</span>}
                        </div>
                        <div className="text-sm text-gray-500">{s.desc}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-violet-600">${s.price}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={next} disabled={!sessionType} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick a date &amp; time</h2>
              <p className="text-gray-500 mb-6">All times are Eastern. Available slots shown below.</p>
              <div className="space-y-4 mb-8">
                {mockAvailability.map((avail) => (
                  <div key={avail.day}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{avail.day}</h3>
                    <div className="flex flex-wrap gap-2">
                      {avail.slots.map((slot) => {
                        const key = `${avail.day}-${slot}`;
                        return (
                          <button
                            key={slot}
                            onClick={() => { setSelectedDay(avail.day); setSelectedSlot(slot); }}
                            className={cn(
                              "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                              selectedDay === avail.day && selectedSlot === slot
                                ? "border-violet-600 bg-violet-600 text-white"
                                : "border-gray-200 text-gray-600 hover:border-violet-400"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {selectedDay && selectedSlot && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 mb-6 text-sm text-violet-700">
                  Selected: <strong>{selectedDay} at {selectedSlot}</strong>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={next} disabled={!selectedDay || !selectedSlot} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Your Info */}
        {step === 4 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
              <p className="text-gray-500 mb-6">We&apos;ll send the Zoom link and confirmation to this email.</p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone Number", key: "phone", type: "tel", placeholder: "(555) 000-0000" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    value={form.timezone}
                    onChange={(e) => setForm(f => ({ ...f, timezone: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                  >
                    <option>Eastern (ET)</option>
                    <option>Central (CT)</option>
                    <option>Mountain (MT)</option>
                    <option>Pacific (PT)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={next} disabled={!form.name || !form.email} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Payment */}
        {step === 5 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review &amp; Pay</h2>
              <p className="text-gray-500 mb-6">Check your booking details before completing payment.</p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Student Grade</span>
                  <span className="font-medium text-gray-900">{grade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subject</span>
                  <span className="font-medium text-gray-900">{subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Session Type</span>
                  <span className="font-medium text-gray-900">{selectedSession?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date &amp; Time</span>
                  <span className="font-medium text-gray-900">{selectedDay} at {selectedSlot}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">{form.name}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-violet-600 text-lg">${selectedSession?.price}</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure payment via Stripe</p>
                  <p className="text-xs text-gray-500">You&apos;ll be redirected to Stripe&apos;s secure checkout page.</p>
                </div>
              </div>

              {payError && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{payError}</p>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={back} className="flex-1" disabled={isPending}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={handleCheckout} className="flex-1 bg-green-600 hover:bg-green-700" disabled={isPending}>
                  {isPending ? "Redirecting..." : `Pay $${selectedSession?.price} →`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Confirmed */}
        {step === 6 && (
          <Card>
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 mb-8">
                A confirmation email with your Zoom link has been sent to <strong>{form.email || "your email"}</strong>.
              </p>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Session Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subject</span>
                    <span className="font-medium text-gray-900">{subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date &amp; Time</span>
                    <span className="font-medium text-gray-900">{selectedDay} at {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Zoom Link</span>
                    <a href="https://zoom.us/j/placeholder" className="text-violet-600 font-medium hover:underline">Join Meeting</a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/parent" className="block">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
