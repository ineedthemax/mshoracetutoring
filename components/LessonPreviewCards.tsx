"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronDown, FileText, BookOpen, Lightbulb, Target, Zap } from "lucide-react";

interface Lesson {
  id: string;
  lesson_order: number;
  title: string;
  is_free_preview: boolean;
  description?: string;
}

interface Props {
  freeLessons: Lesson[];
  paidLessons: Lesson[];
  previewDescription?: string;
}

// Assign an icon to each lesson based on order
const LESSON_ICONS = [BookOpen, Lightbulb, Target, Zap, FileText, CheckCircle];
const LESSON_COLORS = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-pink-100 text-pink-600",
  "bg-indigo-100 text-indigo-600",
];

const SAMPLE_DETAILS: Record<number, { what: string; practice: string }> = {
  1: { what: "Understand the core concept with worked examples and step-by-step breakdowns.", practice: "5 guided problems + answer key" },
  2: { what: "Build on lesson 1 with more complex problems and real-world applications.", practice: "8 practice problems + answer key" },
  3: { what: "Put it all together. Ms. Horace walks through the most common mistakes and how to avoid them.", practice: "10 mixed problems + answer key" },
};

export function LessonPreviewCards({ freeLessons, paidLessons, previewDescription }: Props) {
  const [openLesson, setOpenLesson] = useState<string | null>(freeLessons[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);

  const visiblePaid = showAll ? paidLessons : paidLessons.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Free Preview Lessons */}
      {freeLessons.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-lg">Free Preview Lessons</h2>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
              {freeLessons.length} free inside
            </span>
          </div>
          {previewDescription && (
            <p className="text-sm text-gray-500 mb-4">{previewDescription}</p>
          )}

          <div className="space-y-3">
            {freeLessons.map((lesson, idx) => {
              const Icon = LESSON_ICONS[idx % LESSON_ICONS.length];
              const colorClass = LESSON_COLORS[idx % LESSON_COLORS.length];
              const details = SAMPLE_DETAILS[idx + 1] ?? SAMPLE_DETAILS[1];
              const isOpen = openLesson === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className="border border-green-200 rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ background: isOpen ? "#f0fdf4" : "#fff" }}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                    className="w-full flex items-center gap-4 p-4 text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lesson {lesson.lesson_order}</span>
                        <Badge variant="success" className="text-[10px] px-1.5 py-0">Free</Badge>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm truncate">{lesson.title}</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64" : "max-h-0"}`}
                  >
                    <div className="px-4 pb-4 pt-0 border-t border-green-200">
                      <p className="text-sm text-gray-600 mt-3 mb-3 leading-relaxed">{details.what}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-white border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          <FileText className="w-3 h-3" />
                          PDF lesson included
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {details.practice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Curriculum */}
      <div>
        <h2 className="font-bold text-gray-900 text-lg mb-3">Full Course Curriculum</h2>
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          {/* Progress bar */}
          <div className="bg-violet-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-violet-700">{paidLessons.length} lessons inside</span>
            <div className="flex items-center gap-1.5">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-xs text-gray-400">Unlocks after purchase</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {visiblePaid.map((lesson, idx) => {
              const Icon = LESSON_ICONS[idx % LESSON_ICONS.length];
              return (
                <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 bg-white">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate">{lesson.title}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                </div>
              );
            })}
          </div>

          {paidLessons.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-1"
            >
              {showAll ? "Show less" : `Show all ${paidLessons.length} lessons`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
