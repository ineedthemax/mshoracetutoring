"use client";

import { useState } from "react";
import { FileText, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SUBJECTS = ["Pre-Algebra", "Algebra 1"];
const CONFIDENCE_LEVELS = [
  { value: "10", label: "10 - Very Lost" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50 - Getting There" },
  { value: "60", label: "60" },
  { value: "70", label: "70" },
  { value: "80", label: "80" },
  { value: "90", label: "90" },
  { value: "100", label: "100 - Confident" },
];

export default function SessionReportPage() {
  const [form, setForm] = useState({
    studentName: "",
    parentEmail: "",
    subject: "",
    sessionDate: new Date().toISOString().split("T")[0],
    topicsCovered: "",
    wins: "",
    areasToWatch: "",
    homework: "",
    nextSteps: "",
    confidenceScore: "70",
    additionalNotes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/session-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send report");
      setStatus("success");
      setForm(prev => ({
        ...prev,
        topicsCovered: "",
        wins: "",
        areasToWatch: "",
        homework: "",
        nextSteps: "",
        additionalNotes: "",
        confidenceScore: "70",
      }));
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-sm text-gray-900 bg-white transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const textareaClass = inputClass + " resize-none";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Send Session Report</h1>
          <p className="text-gray-500 text-sm mt-0.5">Fill in session notes and send a progress report to the parent&apos;s inbox.</p>
        </div>
      </div>

      {status === "success" && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 text-sm font-medium">Report sent to {form.parentEmail}!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Session Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Student Name <span className="text-red-400">*</span></label>
                <input name="studentName" type="text" required placeholder="Alex Smith" value={form.studentName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Parent Email <span className="text-red-400">*</span></label>
                <input name="parentEmail" type="email" required placeholder="parent@example.com" value={form.parentEmail} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
                  <option value="">Select subject</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Session Date</label>
                <input name="sessionDate" type="date" value={form.sessionDate} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Content */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Session Content</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Topics Covered <span className="text-red-400">*</span></label>
                <textarea name="topicsCovered" required rows={3} placeholder="e.g. Solving two-step equations, combining like terms, substitution method..." value={form.topicsCovered} onChange={handleChange} className={textareaClass} />
              </div>
              <div>
                <label className={labelClass}>Wins / What Clicked <span className="text-red-400">*</span></label>
                <textarea name="wins" required rows={2} placeholder="e.g. Really got the hang of distributing negatives, remembered to check work..." value={form.wins} onChange={handleChange} className={textareaClass} />
              </div>
              <div>
                <label className={labelClass}>Areas to Watch</label>
                <textarea name="areasToWatch" rows={2} placeholder="e.g. Still mixing up adding/multiplying fractions — needs more practice..." value={form.areasToWatch} onChange={handleChange} className={textareaClass} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Next Steps</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Homework Assigned</label>
                <textarea name="homework" rows={2} placeholder="e.g. Pages 142-143 #1-15, Khan Academy: Solving equations unit..." value={form.homework} onChange={handleChange} className={textareaClass} />
              </div>
              <div>
                <label className={labelClass}>Ms. Horace Recommends</label>
                <textarea name="nextSteps" rows={2} placeholder="e.g. Practice 10 minutes daily on equations before next session, review notes from today..." value={form.nextSteps} onChange={handleChange} className={textareaClass} />
              </div>
              <div>
                <label className={labelClass}>Confidence Score</label>
                <select name="confidenceScore" value={form.confidenceScore} onChange={handleChange} className={inputClass}>
                  {CONFIDENCE_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">How confident was the student by the end of session?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional notes */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Additional Notes <span className="text-gray-400 font-normal text-sm">(optional)</span></h2>
            <textarea name="additionalNotes" rows={3} placeholder="Anything else you want the parent to know..." value={form.additionalNotes} onChange={handleChange} className={textareaClass} />
          </CardContent>
        </Card>

        {status === "error" && (
          <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {status === "loading" ? "Sending Report..." : "Send Report to Parent"}
        </button>
      </form>
    </div>
  );
}
