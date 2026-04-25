"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function NewCoursePage() {
  const [lessons, setLessons] = useState([
    { title: "", isFreePreview: false, fileName: "" },
  ]);

  function addLesson() {
    setLessons([...lessons, { title: "", isFreePreview: false, fileName: "" }]);
  }

  function removeLesson(i: number) {
    setLessons(lessons.filter((_, idx) => idx !== i));
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href="/admin/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Course Info</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Algebra 1 Mastery"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Algebra 1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                <input
                  type="text"
                  placeholder="e.g. 8th-9th Grade"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input
                type="text"
                placeholder="One sentence summary shown on course cards"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={3}
                placeholder="Detailed description shown on the course detail page"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Free Preview Description</label>
              <input
                type="text"
                placeholder="e.g. First 2 lessons are free..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  placeholder="49"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  placeholder="algebra-1-mastery"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Lessons</h2>
              <Button size="sm" variant="outline" onClick={addLesson} className="flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Lesson
              </Button>
            </div>

            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                  <span className="w-6 h-6 bg-gray-100 rounded text-xs font-bold text-gray-500 flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Lesson title"
                    value={lesson.title}
                    onChange={(e) => {
                      const updated = [...lessons];
                      updated[i].title = e.target.value;
                      setLessons(updated);
                    }}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lesson.isFreePreview}
                      onChange={(e) => {
                        const updated = [...lessons];
                        updated[i].isFreePreview = e.target.checked;
                        setLessons(updated);
                      }}
                      className="accent-violet-600"
                    />
                    Free preview
                  </label>
                  <button
                    onClick={() => removeLesson(i)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-3">
              PDF files will be uploaded to Supabase Storage when the course is saved.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/courses">
            <Button variant="outline">Cancel</Button>
          </Link>
          <div className="flex gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Course</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
