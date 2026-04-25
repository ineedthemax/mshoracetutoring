import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCourses, mockBundle } from "@/lib/mock-courses";
import { Lock, FileText, CheckCircle, Star, ArrowLeft, BookOpen } from "lucide-react";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = mockCourses.find(c => c.slug === params.slug);
  if (!course) notFound();

  const freeLessons = course.lessons.filter(l => l.isFreePreview);
  const paidLessons = course.lessons.filter(l => !l.isFreePreview);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-8 text-white mb-6">
              <Badge className="mb-3 bg-white/20 text-white border-0">{course.gradeLevel}</Badge>
              <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-violet-100 leading-relaxed">{course.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-violet-200">
                <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {course.totalLessons} PDF lessons</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {freeLessons.length} free previews</span>
              </div>
            </div>

            {/* Free Preview Lessons */}
            <Card className="mb-4">
              <CardContent className="p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-1">Free Preview Lessons</h2>
                <p className="text-sm text-gray-500 mb-4">{course.previewDescription}</p>
                <div className="space-y-2">
                  {freeLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-xs font-bold text-green-700">
                          {lesson.order}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{lesson.title}</span>
                      </div>
                      <Badge variant="success">Free</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Paid Lessons */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-4">Full Course Curriculum</h2>
                <div className="space-y-2">
                  {paidLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                          {lesson.order}
                        </div>
                        <span className="text-sm text-gray-600">{lesson.title}</span>
                      </div>
                      <Lock className="w-4 h-4 text-gray-300" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar purchase card */}
          <div className="md:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card className="border-violet-200 shadow-md">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-violet-600 mb-1">${course.price}</div>
                    <p className="text-sm text-gray-400">One-time purchase · Lifetime access</p>
                  </div>

                  <Link href="/login">
                    <Button className="w-full mb-3">Buy This Course</Button>
                  </Link>

                  <p className="text-center text-xs text-gray-400 mb-4">Login required to purchase</p>

                  <div className="space-y-2 text-sm">
                    {[
                      `${course.totalLessons} PDF lesson files`,
                      "Full answer keys included",
                      "Lifetime access after purchase",
                      "Works on any device",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bundle upsell */}
              <Card className="border-amber-300 bg-amber-50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-amber-700">Better deal</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Get all 3 courses for <strong>${mockBundle.price}</strong> and save ${mockBundle.savings}.
                  </p>
                  <Link href="/courses">
                    <Button size="sm" variant="outline" className="w-full border-amber-400 text-amber-700 hover:bg-amber-100">
                      View Bundle
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
