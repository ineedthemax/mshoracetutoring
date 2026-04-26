import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function StudentCourseLessonPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (!course) notFound();

  const { data: lessonData } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("lesson_order");

  const lessons = lessonData ?? [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/student/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to My Courses
      </Link>

      <div className="mb-8">
        <Badge className="mb-2 bg-violet-100 text-violet-700 border-0">{course.grade_level}</Badge>
        <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{course.total_lessons} lessons · Lifetime access</p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson: { id: string; lesson_order: number; title: string; file_name: string; file_url: string; is_free_preview: boolean }) => (
          <Card key={lesson.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-sm font-bold text-violet-600 flex-shrink-0">
                    {lesson.lesson_order}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <FileText className="w-3 h-3" /> {lesson.file_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lesson.is_free_preview && (
                    <Badge variant="outline" className="text-xs text-green-600 border-green-300">Free</Badge>
                  )}
                  {lesson.file_url ? (
                    <a href={lesson.file_url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-violet-600 border-violet-300 hover:bg-violet-50">
                        <Download className="w-3 h-3" />
                        Download PDF
                      </Button>
                    </a>
                  ) : (
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-gray-400" disabled>
                      <Download className="w-3 h-3" />
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          You have <strong>lifetime access</strong> to all {course.total_lessons} lessons. Download any PDF anytime.
        </p>
      </div>
    </div>
  );
}
