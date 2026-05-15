import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Sparkles, Clock } from "lucide-react";

export default function HomeworkHelpPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />
      <main className="md:ml-64 flex-1 flex items-center justify-center p-6 pt-20 md:pt-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Clock className="w-3.5 h-3.5" /> Coming Soon
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">AI Homework Helper</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Get step-by-step help on any Pre-Algebra or Algebra 1 problem, available 24/7. This feature is launching soon!
          </p>
          <p className="text-violet-600 text-sm font-medium mt-4">
            In the meantime, reach out to Ms. Horace directly for help.
          </p>
        </div>
      </main>
    </div>
  );
}
