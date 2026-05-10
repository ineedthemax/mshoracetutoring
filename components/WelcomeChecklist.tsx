"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, X, BookOpen, Calendar, Sparkles, FileText } from "lucide-react";

interface ChecklistItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  href: string;
  done: boolean;
}

interface Props {
  role: "parent" | "student";
  hasSessions: boolean;
  hasReports: boolean;
}

export function WelcomeChecklist({ role, hasSessions, hasReports }: Props) {
  const [dismissed, setDismissed] = useState(false);

  const parentItems: ChecklistItem[] = [
    {
      id: "book",
      icon: <Calendar className="w-5 h-5" />,
      title: "Book your first session",
      desc: "Pick a date, subject, and session type that works for your schedule.",
      cta: "Book Now",
      href: "/book",
      done: hasSessions,
    },
    {
      id: "courses",
      icon: <BookOpen className="w-5 h-5" />,
      title: "Explore digital courses",
      desc: "Self-paced Pre-Algebra and Algebra 1 courses your student can work through anytime.",
      cta: "View Courses",
      href: "/courses",
      done: false,
    },
    {
      id: "report",
      icon: <FileText className="w-5 h-5" />,
      title: "See your first session report",
      desc: "After each session you'll receive a detailed progress report with a confidence score.",
      cta: "View Reports",
      href: "/parent/sessions",
      done: hasReports,
    },
  ];

  const studentItems: ChecklistItem[] = [
    {
      id: "book",
      icon: <Calendar className="w-5 h-5" />,
      title: "Book your first session",
      desc: "Get matched with Ms. Horace and pick a time that works for you.",
      cta: "Book Now",
      href: "/book",
      done: hasSessions,
    },
    {
      id: "ai",
      icon: <Sparkles className="w-5 h-5" />,
      title: "Try the AI Homework Helper",
      desc: "Get step-by-step help on any Pre-Algebra or Algebra 1 problem — available 24/7.",
      cta: "Try It Now",
      href: "/student/homework-help",
      done: false,
    },
    {
      id: "courses",
      icon: <BookOpen className="w-5 h-5" />,
      title: "Access your courses",
      desc: "Interactive lessons and practice problems for Pre-Algebra and Algebra 1.",
      cta: "View Courses",
      href: "/student/courses",
      done: false,
    },
  ];

  const items = role === "parent" ? parentItems : studentItems;
  const completedCount = items.filter(i => i.done).length;
  const allDone = completedCount === items.length;

  if (dismissed || allDone) return null;

  return (
    <div className="bg-white border border-violet-200 rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-700 px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-base">
            Welcome! Here's how to get started 👋
          </h3>
          <p className="text-violet-200 text-xs mt-0.5">{completedCount} of {items.length} steps complete</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-violet-300 hover:text-white transition-colors p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-violet-100">
        <div
          className="h-1.5 bg-violet-500 transition-all duration-500"
          style={{ width: `${(completedCount / items.length) * 100}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.id} className={`flex items-start gap-4 px-5 py-4 ${item.done ? 'opacity-60' : ''}`}>
            <div className={`mt-0.5 flex-shrink-0 ${item.done ? 'text-green-500' : 'text-violet-400'}`}>
              {item.done
                ? <CheckCircle className="w-5 h-5" />
                : <Circle className="w-5 h-5" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${item.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {item.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            {!item.done && (
              <Link href={item.href}>
                <button className="flex-shrink-0 text-xs font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-lg transition-colors">
                  {item.cta} →
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
