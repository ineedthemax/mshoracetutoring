"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUSES = ["upcoming", "completed", "cancelled", "no-show"];
const SUBJECTS = ["Pre-Algebra", "Algebra 1"];
const GRADES = ["6th Grade", "7th Grade", "8th Grade", "9th Grade"];
const SESSION_TYPES = [
  { id: "solo-30", label: "1-on-1 · 30 min" },
  { id: "solo-60", label: "1-on-1 · 60 min" },
  { id: "group",   label: "Group · 90 min" },
];
const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

interface Session {
  id: string;
  parent_name: string;
  parent_email: string;
  subject: string;
  grade_level: string;
  session_type: string;
  session_date: string;
  session_time: string;
  status: string;
  price_cents: number;
}

export function EditBookingButton({ session }: { session: Session }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // Convert time "3:00 PM" → "15:00" for the time input
  function toInputTime(t: string): string {
    if (!t) return "";
    if (t.includes(":") && !t.includes("AM") && !t.includes("PM")) return t.slice(0, 5);
    const [timePart, mod] = t.split(" ");
    const [h, m] = timePart.split(":").map(Number);
    let hours = h;
    if (mod === "PM" && h !== 12) hours += 12;
    if (mod === "AM" && h === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  const [form, setForm] = useState({
    parentName: session.parent_name ?? "",
    parentEmail: session.parent_email ?? "",
    subject: session.subject ?? "Pre-Algebra",
    gradeLevel: session.grade_level ?? "7th Grade",
    sessionType: session.session_type ?? "solo-60",
    sessionDate: session.session_date ?? "",
    sessionTime: toInputTime(session.session_time),
    status: session.status ?? "upcoming",
    priceCents: session.price_cents ?? 7500,
  });

  function update(field: string, value: string | number) {
    setForm(p => ({ ...p, [field]: value }));
    setError("");
  }

  // Auto-update zoom link when session type changes
  function updateType(t: string) {
    setForm(p => ({ ...p, sessionType: t }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/update-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: session.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setDone(false);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button size="sm" variant="outline" className="text-xs h-7 px-2" onClick={() => setOpen(true)}>
        <Pencil className="w-3 h-3 mr-1" /> Edit
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900">Edit Booking</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Booking Updated!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                {/* Status — most important, show first */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</label>
                  <div className="grid grid-cols-4 gap-2">
                    {STATUSES.map(s => (
                      <button key={s} type="button" onClick={() => update("status", s)}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize transition-colors border ${
                          form.status === s
                            ? s === "completed" ? "bg-green-600 text-white border-green-600"
                            : s === "cancelled" || s === "no-show" ? "bg-red-500 text-white border-red-500"
                            : "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Session Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {SESSION_TYPES.map(t => (
                      <button key={t.id} type="button" onClick={() => updateType(t.id)}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                          form.sessionType === t.id
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}>
                        {t.label}
                      </button>
                    ))}
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
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date</label>
                    <input type="date" value={form.sessionDate} onChange={e => update("sessionDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Time</label>
                    <input type="time" value={form.sessionTime} onChange={e => update("sessionTime", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>

                {/* Parent info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Parent Name</label>
                    <input type="text" value={form.parentName} onChange={e => update("parentName", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Parent Email</label>
                    <input type="email" value={form.parentEmail} onChange={e => update("parentEmail", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
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
