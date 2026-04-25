import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Lock, FileText, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function StudentCoursesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: allCourses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at");

  let purchasedCourseIds: string[] = [];
  if (user) {
    const { data: purchases } = await supabase
      .from("course_purchases")
      .select("course_id")
      .eq("student_id", user.id);
    purchasedCourseIds = purchases?.map(p => p.course_id) ?? [];
  }

  const courses = allCourses ?? [];
  const purchased = courses.filter(c => purchasedCourseIds.includes(c.id));
  const available = courses.filter(c => !purchasedCourseIds.includes(c.id));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-500 text-sm mt-1">Access your purchased courses and PDF lessons.</p>
      </div>

      {/* Purchased courses */}
      {purchased.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Courses</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {purchased.map((course) => (
              <Card key={course.id} className="border-violet-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="success" className="mb-2">Purchased</Badge>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.grade_level}</p>
                    </div>
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {course.total_lessons} lessons</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Lifetime access</span>
                  </div>
                  <Link href={`/student/courses/${course.id}`}>
                    <Button className="w-full">Open Course</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No purchases yet */}
      {purchased.length === 0 && (
        <div className="mb-10 p-6 bg-violet-50 border border-violet-200 rounded-xl text-center">
          <BookOpen className="w-10 h-10 text-violet-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">You haven&apos;t purchased any courses yet.</p>
          <p className="text-gray-400 text-sm mt-1 mb-4">Browse available courses below and get started.</p>
        </div>
      )}

      {/* Available to purchase */}
      {available.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Courses</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {available.map((course) => (
              <Card key={course.id} className="opacity-90">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="outline" className="mb-2">Not purchased</Badge>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.grade_level}</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{course.short_description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-violet-600">${(course.price_cents / 100).toFixed(0)}</span>
                    <Link href={`/courses/${course.slug}`}>
                      <Button size="sm" variant="outline">View & Buy</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
