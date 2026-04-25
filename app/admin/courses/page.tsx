import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCourses, mockBundle } from "@/lib/mock-courses";
import { BookOpen, FileText, Plus, Edit, Eye, DollarSign } from "lucide-react";

export default function AdminCoursesPage() {
  const totalRevenue = mockCourses.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your digital PDF courses and bundles.</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Course
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-gray-500 mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900">{mockCourses.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-gray-500 mb-1">Total Lessons</p>
            <p className="text-2xl font-bold text-gray-900">{mockCourses.reduce((s, c) => s + c.totalLessons, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-gray-500 mb-1">Individual Value</p>
            <p className="text-2xl font-bold text-violet-600">${mockCourses.reduce((s, c) => s + c.price, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Individual Courses</h2>
      <div className="space-y-4 mb-8">
        {mockCourses.map((course) => {
          const freeLessons = course.lessons.filter(l => l.isFreePreview).length;
          return (
            <Card key={course.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                        <Badge variant="success" className="text-xs">Published</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{course.gradeLevel}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {course.totalLessons} lessons</span>
                        <span>{freeLessons} free previews</span>
                        <span className="font-semibold text-violet-600">${course.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/courses/${course.slug}`} target="_blank">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Preview
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Edit className="w-3 h-3" /> Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bundle */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Bundle</h2>
      <Card className="border-amber-300 bg-amber-50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">{mockBundle.title}</h3>
                <Badge className="text-xs bg-amber-500 text-white border-0">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{mockBundle.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{mockCourses.length} courses included</span>
                <span className="font-semibold text-amber-600">${mockBundle.price} (saves ${mockBundle.savings})</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="flex items-center gap-1 border-amber-400">
              <Edit className="w-3 h-3" /> Edit Bundle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
