"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function NewReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    parentEmail: "",
    subject: "Pre-Algebra",
    sessionType: "1-on-1",
    sessionDate: new Date().toISOString().split("T")[0],
    topicsCovered: "",
    wins: "",
    areasToImprove: "",
    confidenceScore: "75",
    homeworkAssigned: "",
    nextStep: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSend() {
    if (!form.studentName || !form.parentEmail || !form.topicsCovered || !form.wins) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("Failed to send report. Please try again.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Sent!</h1>
        <p className="text-gray-500 mb-6">The session report was emailed to <strong>{form.parentEmail}</strong>.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setSent(false); setForm({ ...form, studentName: "", parentEmail: "", topicsCovered: "", wins: "", areasToImprove: "", homeworkAssigned: "", nextStep: "" }); }}>
            Write Another Report
          </Button>
          <Link href="/admin/reports">
            <Button variant="outline">Back to Reports</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/admin/reports" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Reports
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Session Report</h1>

      <div className="space-y-5">
        {/* Student & Session Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Session Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                <input value={form.studentName} onChange={e => update("studentName", e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                <input value={form.parentEmail} onChange={e => update("parentEmail", e.target.value)}
                  type="email" placeholder="parent@email.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select value={form.subject} onChange={e => update("subject", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>Pre-Algebra</option>
                  <option>Algebra 1</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                <select value={form.sessionType} onChange={e => update("sessionType", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>1-on-1</option>
                  <option>Group Class</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
                <input value={form.sessionDate} onChange={e => update("sessionDate", e.target.value)}
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Report Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topics Covered *</label>
              <input value={form.topicsCovered} onChange={e => update("topicsCovered", e.target.value)}
                placeholder="e.g. One-step equations, solving for x"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Win This Session *</label>
              <textarea value={form.wins} onChange={e => update("wins", e.target.value)}
                rows={2} placeholder="What did the student do well? What clicked?"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Areas to Keep Working On</label>
              <textarea value={form.areasToImprove} onChange={e => update("areasToImprove", e.target.value)}
                rows={2} placeholder="What needs more practice?"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confidence Score: <span className="text-violet-600 font-bold">{form.confidenceScore}%</span>
              </label>
              <input type="range" min="0" max="100" value={form.confidenceScore}
                onChange={e => update("confidenceScore", e.target.value)}
                className="w-full accent-violet-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Homework Assigned</label>
              <input value={form.homeworkAssigned} onChange={e => update("homeworkAssigned", e.target.value)}
                placeholder="e.g. Complete worksheet pages 4-6"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Next Step</label>
              <input value={form.nextStep} onChange={e => update("nextStep", e.target.value)}
                placeholder="e.g. Focus on two-step equations next session"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSend} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 text-base">
          <Send className="w-4 h-4" />
          {loading ? "Sending Report..." : "Send Report to Parent"}
        </Button>
        <p className="text-center text-xs text-gray-400">Report will be emailed to the parent and saved to your records.</p>
      </div>
    </div>
  );
}
