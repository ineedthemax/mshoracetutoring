"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

const SESSION_TYPES = [
  { id: "solo-30", label: "1-on-1 · 30 min", price: 40, duration: 30 },
  { id: "solo-60", label: "1-on-1 · 60 min", price: 75, duration: 60 },
  { id: "group",   label: "Group Class · 90 min", price: 25, duration: 90 },
];

const SUBJECTS = ["Pre-Algebra", "Algebra 1"];
const GRADES   = ["6th Grade", "7th Grade", "8th Grade", "9th Grade"];

export function CreateBookingButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  const [form, setForm] = useState({
    parentName: "",
    parentEmail: "",
    subject: "Pre-Algebra",
    gradeLevel: "7th Grade",
    sessionType: "solo-60",
    sessionDate: "",
    sessionTime: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }));
    setError("");
  }

  function resetForm() {
    setForm({ parentName: "", parentEmail: "", subject: "Pre-Algebra", gradeLevel: "7th Grade", sessionType: "solo-60", sessionDate: "", sessionTime: "", notes: "" });
    setDone(false);
    setError("");
  }

  const selectedType = SESSION_TYPES.find(s => s.id === form.sessionType)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.parentName || !form.parentEmail || !form.sessionDate || !form.sessionTime) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sendEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");

      setDone(true);
      setTimeout(() => {
        setOpen(false);
        resetForm();
        router.refresh();
      }, 1800);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" /> Create Booking
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900">Create Booking</h2>
              <button onClick={() => { setOpen(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Booking Created!</p>
                {sendEmail && <p className="text-sm text-gray-400 mt-1">Confirmation email sent.</p>}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                {/* Session type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Session Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {SESSION_TYPES.map(t => (
                      <button key={t.id} type="button" onClick={() => update("sessionType", t.id)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold text-center transition-colors border ${
                          form.sessionType === t.id
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {/* Zoom link preview */}
                  <div className="mt-2 bg-violet-50 rounded-xl px-3 py-2 flex items-center justify-between">
                    <span className="text-xs text-violet-600 font-medium">Auto-assigned Zoom link</span>
                    <span className="text-xs text-gray-400">${selectedType.price} · {selectedType.duration} min</span>
                  </div>
                </div>

                {/* Subject + Grade */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                    <select value={form.subject} onChange={e => update("subject", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Grade</label>
                    <select value={form.gradeLevel} onChange={e => update("gradeLevel", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                      {GRADES.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date <span className="text-red-400">*</span></label>
                    <input type="date" value={form.sessionDate} onChange={e => update("sessionDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Time <span className="text-red-400">*</span></label>
                    <input type="time" value={form.sessionTime} onChange={e => update("sessionTime", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>

                {/* Parent info */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Parent Name <span className="text-red-400">*</span></label>
                  <input type="text" value={form.parentName} onChange={e => update("parentName", e.target.value)}
                    placeholder="e.g. Lisa Johnson"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Parent Email <span className="text-red-400">*</span></label>
                  <input type="email" value={form.parentEmail} onChange={e => update("parentEmail", e.target.value)}
                    placeholder="parent@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={2}
                    placeholder="e.g. Cash payment, rescheduled from..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
                </div>

                {/* Send confirmation email */}
                <label className="flex items-center gap-3 cursor-pointer bg-violet-50 rounded-xl px-4 py-3">
                  <input type="checkbox" checked={sendEmail} onChange={e => setSendEmail(e.target.checked)}
                    className="w-4 h-4 accent-violet-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Send confirmation email</p>
                    <p className="text-xs text-gray-400">Sends Zoom link + session details to parent</p>
                  </div>
                </label>

                {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Booking"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
