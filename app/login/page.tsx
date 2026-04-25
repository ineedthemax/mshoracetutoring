"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "@/app/auth/actions";

export default function LoginPage() {
  const [role, setRole] = useState<"parent" | "student">("parent");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
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
          <p className="text-gray-500 mt-2 text-sm">Sign in to your portal</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {(["parent", "student"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                    role === r ? "bg-white text-violet-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <input type="hidden" name="role" value={role} />
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
                  <button type="button" className="text-xs text-violet-600 hover:underline">Forgot password?</button>
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
                {isPending ? "Signing in…" : `Sign In as ${role === "parent" ? "Parent" : "Student"}`}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-violet-600 hover:underline font-medium">Sign up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
