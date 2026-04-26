export const dynamic = "force-dynamic";

import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBundle } from "@/lib/mock-courses";
import { BookOpen, FileText, Star, Zap, CheckCircle, Lock } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/public";

export default async function CoursesPage() {
  const supabase = createPublicClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at");

  // Get free preview counts separately
  const { data: freeLessonCounts } = await supabase
    .from("lessons")
    .select("course_id")
    .eq("is_free_preview", true);

  const courseList = courses ?? [];
  const freeCountMap: Record<string, number> = {};
  (freeLessonCounts ?? []).forEach((l: { course_id: string }) => {
    freeCountMap[l.course_id] = (freeCountMap[l.course_id] ?? 0) + 1;
  });

  return (
    <div className="min-h-screen">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/20 text-white border-0">Digital Courses</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn at your own pace</h1>
          <p className="text-violet-100 text-lg max-w-2xl mx-auto mb-8">
            PDF-based math courses you can work through anytime. Step-by-step lessons, practice problems, and answer keys — all downloadable.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-violet-200">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> PDF Downloads</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Answer Keys Included</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Lifetime Access</span>
          </div>
        </div>
      </section>

      {/* Bundle highlight */}
      <section className="bg-amber-50 border-b border-amber-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-amber-400 ring-1 ring-amber-400 overflow-hidden">
            <div className="bg-amber-500 px-6 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold">Complete Math Bundle — Both Courses</span>
            </div>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{mockBundle.title}</h2>
                  <p className="text-gray-500 mb-4">{mockBundle.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {courseList.map((c) => (
                      <span key={c.id} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">{c.title}</span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right flex-shrink-0">
                  <div className="text-4xl font-bold text-amber-500 mb-1">${mockBundle.price}</div>
                  <p className="text-sm text-gray-400 mb-4">Both courses · Lifetime access</p>
                  <Link href="/login">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8">Get the Bundle</Button>
                  </Link>
                  <p className="text-xs text-gray-400 mt-2">Login required to purchase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Individual courses */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Individual Courses</h2>
            <p className="text-gray-500">Purchase just the course your student needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courseList.map((course) => {
              const freeLessons = freeCountMap[course.id] ?? 0;
              return (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-br from-violet-100 to-violet-200 h-36 flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-10 h-10 text-violet-600 mx-auto mb-2" />
                      <span className="text-sm font-semibold text-violet-700">{course.subject}</span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2 text-xs">{course.grade_level}</Badge>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{course.short_description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {course.total_lessons} lessons</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {freeLessons} free preview</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div className="text-2xl font-bold text-violet-600">${(course.price_cents / 100).toFixed(0)}</div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm">View Course</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Everything you need to succeed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: "PDF Worksheets", desc: "Print or work digitally" },
              { icon: CheckCircle, label: "Answer Keys", desc: "Check your work anytime" },
              { icon: Lock, label: "Lifetime Access", desc: "One payment, keep forever" },
              { icon: BookOpen, label: "Step-by-Step", desc: "Designed to be self-taught" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-violet-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
