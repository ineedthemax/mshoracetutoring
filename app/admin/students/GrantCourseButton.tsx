"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const COURSES = [
  { slug: "pre-algebra-mastery", name: "Pre-Algebra Mastery", price: "$197" },
  { slug: "algebra-1-mastery", name: "Algebra 1 Mastery", price: "$197" },
];

interface GrantCourseButtonProps {
  studentId: string;
  studentName: string;
}

export function GrantCourseButton({ studentId, studentName }: GrantCourseButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourse) {
      setError("Select a course");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/grant-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, courseSlug: selectedCourse }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to grant access");
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setDone(false);
        setSelectedCourse("");
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
      <Button
        size="sm"
        variant="outline"
        className="text-xs h-7 px-2"
        onClick={() => setOpen(true)}
      >
        <BookOpen className="w-3 h-3 mr-1" /> Grant Course
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Grant Course Access</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Access Granted!</p>
                <p className="text-sm text-gray-500 mt-1">{studentName} can now access the course.</p>
              </div>
            ) : (
              <form onSubmit={handleGrant} className="px-6 py-5 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Select course for <span className="font-bold">{studentName}</span>:
                  </p>
                  <div className="space-y-2">
                    {COURSES.map((course) => (
                      <label
                        key={course.slug}
                        className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                          selectedCourse === course.slug
                            ? "bg-violet-50 border-violet-300"
                            : "bg-white border-gray-200 hover:border-violet-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="course"
                          value={course.slug}
                          checked={selectedCourse === course.slug}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          className="w-4 h-4 accent-violet-600"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{course.name}</p>
                          <p className="text-xs text-gray-500">{course.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading || !selectedCourse}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Grant Access"}
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
