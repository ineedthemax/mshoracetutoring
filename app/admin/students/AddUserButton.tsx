"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, X, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface ParentOption { name: string; email: string; }

export function AddUserButton({ parentOptions = [] }: { parentOptions?: ParentOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "parent" as "parent" | "student",
    password: "",
    parentEmail: "",
    sendWelcome: true,
  });

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
    setError("");
  }

  function generatePassword() {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
    const pw = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    update("password", pw);
    setShowPassword(true);
  }

  function resetForm() {
    setForm({ name: "", email: "", role: "parent", password: "", parentEmail: "", sendWelcome: true });
    setError("");
    setDone(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          parent_email: form.role === "student" ? form.parentEmail : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");

      if (form.sendWelcome) {
        const emailRes = await fetch("/api/admin/send-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
        });
        if (!emailRes.ok) {
          const emailData = await emailRes.json();
          setError(`Account created, but welcome email failed: ${emailData.error}`);
        }
      }

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
      <Button onClick={() => setOpen(true)} size="sm">
        <UserPlus className="w-4 h-4 mr-2" /> Add Student / Parent
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900">Add Student / Parent</h2>
              <button onClick={() => { setOpen(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Account Created!</p>
                <p className="text-sm text-gray-400 mt-1">
                  {form.sendWelcome ? "Welcome email sent." : "No email sent."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                {/* Role toggle */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Account Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["parent", "student"] as const).map(r => (
                      <button key={r} type="button" onClick={() => update("role", r)}
                        className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors border ${
                          form.role === r
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input type="text" value={form.name} onChange={e => update("name", e.target.value)}
                    placeholder={form.role === "parent" ? "e.g. Lisa Johnson" : "e.g. Jordan Johnson"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>

                {/* Parent link — only for students */}
                {form.role === "student" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Link to Parent <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    {parentOptions.length > 0 ? (
                      <select
                        value={form.parentEmail}
                        onChange={e => update("parentEmail", e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                      >
                        <option value="">— No parent linked —</option>
                        {parentOptions.map(p => (
                          <option key={p.email} value={p.email}>{p.name} ({p.email})</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="email"
                        value={form.parentEmail}
                        onChange={e => update("parentEmail", e.target.value)}
                        placeholder="parent@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Temporary Password</label>
                    <button type="button" onClick={generatePassword} className="text-xs text-violet-600 font-semibold hover:underline">Generate</button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={e => update("password", e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Welcome email */}
                <label className="flex items-center gap-3 cursor-pointer bg-violet-50 rounded-xl px-4 py-3">
                  <input type="checkbox" checked={form.sendWelcome}
                    onChange={e => update("sendWelcome", e.target.checked)}
                    className="w-4 h-4 accent-violet-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Send welcome email</p>
                    <p className="text-xs text-gray-400">Sends login link + temp password to their email</p>
                  </div>
                </label>

                {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
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
