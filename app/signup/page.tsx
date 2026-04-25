"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, BookOpen, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"parent" | "student" | "">("");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateForm(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleCreateAccount() {
    setError("");
    startTransition(async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong"); return; }
      // Now sign in
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });
      if (signInError) { setError(signInError.message); return; }
      router.push(role === "parent" ? "/parent" : "/student");
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <span className="text-2xl font-medium text-gray-800">Mshorace</span>
            <span className="text-2xl font-bold text-violet-600">Tutoring</span>
          </Link>
          <p className="text-gray-500 mt-2 text-sm">Create your account</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Step 0: Role selection */}
            {step === 0 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">I am a...</h2>
                <p className="text-gray-500 text-sm mb-6">Choose your role to set up the right account.</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { id: "parent", icon: Users, title: "Parent", desc: "Track my child's sessions and progress" },
                    { id: "student", icon: BookOpen, title: "Student", desc: "View my sessions and upload homework" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id as "parent" | "student")}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        role === r.id ? "border-violet-600 bg-violet-50" : "border-gray-200 hover:border-violet-300"
                      )}
                    >
                      <r.icon className={cn("w-6 h-6 mb-2", role === r.id ? "text-violet-600" : "text-gray-400")} />
                      <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                    </button>
                  ))}
                </div>
                <Button className="w-full" disabled={!role} onClick={() => setStep(1)}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-center text-sm text-gray-400 mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-violet-600 hover:underline font-medium">Sign in</Link>
                </p>
              </>
            )}

            {/* Step 1: Account details */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Account</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
                    { label: "Password", key: "password", type: "password", placeholder: "At least 8 characters" },
                    { label: "Phone Number (optional)", key: "phone", type: "tel", placeholder: "(555) 000-0000" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => updateForm(field.key, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                      />
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
                )}

                <Button
                  className="w-full mb-3"
                  disabled={!form.name || !form.email || form.password.length < 8 || isPending}
                  onClick={handleCreateAccount}
                >
                  {isPending ? "Creating account…" : "Create Account"}
                </Button>
                <button onClick={() => setStep(0)} className="w-full text-sm text-gray-400 hover:text-gray-600">
                  Back
                </button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Progress dots */}
        {step < 2 && (
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={cn("w-2 h-2 rounded-full transition-all", i === step ? "bg-violet-600 w-6" : "bg-gray-300")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
