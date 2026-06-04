"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: "https://mshoracetutoring.com/auth/reset-password",
    });
    setResetSent(true);
    setResetLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <span className="text-2xl font-medium text-gray-800">Mshorace</span>
            <span className="text-2xl font-bold text-violet-600">Tutoring</span>
          </Link>
          <p className="text-gray-500 mt-2 text-sm">Sign in to your portal</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {resetMode ? (
              resetSent ? (
                <div className="text-center py-4">
                  <p className="text-green-600 font-semibold mb-1">Reset email sent!</p>
                  <p className="text-sm text-gray-500 mb-4">Check your inbox for a password reset link.</p>
                  <button onClick={() => { setResetMode(false); setResetSent(false); }} className="text-sm text-violet-600 hover:underline">Back to sign in</button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={resetLoading}>
                    {resetLoading ? "Sending…" : "Send Reset Link"}
                  </Button>
                  <button type="button" onClick={() => setResetMode(false)} className="w-full text-sm text-gray-500 hover:underline">
                    Back to sign in
                  </button>
                </form>
              )
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                  <input type="hidden" name="role" value="parent" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <button type="button" onClick={() => setResetMode(true)} className="text-xs text-violet-600 hover:underline">Forgot password?</button>
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in…" : "Sign In"}
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-violet-600 hover:underline font-medium">Sign up</Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
