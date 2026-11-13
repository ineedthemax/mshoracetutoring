"use client";

import { useState } from "react";

const GRADES = [
  "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade+"
];
const SUBJECTS = ["Pre-Algebra", "Algebra 1", "Both / Not Sure"];

interface Props {
  source?: string;
  variant?: "banner" | "card" | "inline";
  cta?: string;
}

export function LeadCaptureForm({ source = "website", variant = "card", cta = "Get a Free Math Assessment" }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", subject: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`${variant === "card" ? "bg-white rounded-2xl shadow-lg p-8" : ""} text-center`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set! 🎉</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Check your inbox — we sent you a welcome email with everything you need to get started. Ms. Horace looks forward to helping your student succeed.
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-sm text-gray-900 bg-white transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className={variant === "card" ? "bg-white rounded-2xl shadow-lg p-8" : ""}>
      {/* Honeypot */}
      <input type="text" name="website" value={form.website} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

      {variant === "card" && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{cta}</h3>
          <p className="text-gray-500 text-sm">No commitment. We'll reach out within 24 hours.</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="lead-name" className={labelClass}>Parent / Guardian Name <span className="text-red-400">*</span></label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className={labelClass}>Email Address <span className="text-red-400">*</span></label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className={labelClass}>Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            placeholder="(301) 555-0100"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lead-grade" className={labelClass}>Student Grade</label>
            <select id="lead-grade" name="grade" value={form.grade} onChange={handleChange} className={inputClass}>
              <option value="">Select grade</option>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lead-subject" className={labelClass}>Subject</label>
            <select id="lead-subject" name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
              <option value="">Select subject</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm"
        >
          {status === "loading" ? "Sending…" : cta}
        </button>

        <p className="text-center text-xs text-gray-400">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </form>
  );
}
