import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { PreviewBanner } from "@/components/PreviewBanner";
import { WelcomeChecklist } from "@/components/WelcomeChecklist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Video, Star, ArrowRight, BookOpen, TrendingUp } from "lucide-react";

export default async function ParentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("parent_email", user?.email ?? "")
    .order("session_date", { ascending: true });

  const allSessions = sessions ?? [];
  const upcoming = allSessions.filter(s => s.status === "upcoming");
  const completed = allSessions.filter(s => s.status === "completed");
  const totalSpent = allSessions.reduce((a, s) => a + (s.price_cents ?? 0), 0) / 100;

  const { data: reports } = await supabase
    .from("session_reports")
    .select("*")
    .eq("parent_email", user?.email ?? "")
    .order("created_at", { ascending: false })
    .limit(3);

  const parentName = user?.user_metadata?.name ?? "there";
  const isAdmin = user?.user_metadata?.role === "admin";
  const nextSession = upcoming[0];
  const latestReport = reports?.[0];

  return (
    <div className="flex min-h-screen bg-[#f8f8fb] flex-col">
      {isAdmin && <PreviewBanner role="parent" />}
      <div className="flex flex-1">
        <DashboardSidebar role="parent" />
        <main className="md:ml-64 flex-1 p-4 md:p-6 pt-18 md:pt-6 pb-20 md:pb-6 max-w-5xl">

          {/* Welcome checklist */}
          <WelcomeChecklist role="parent" hasSessions={allSessions.length > 0} hasReports={!!(reports && reports.length > 0)} />

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Good to see you, {parentName} 👋</h1>
              <p className="text-gray-400 text-xs mt-0.5">Here's your student's tutoring overview.</p>
            </div>
            <Link href="/book">
              <Button size="sm" className="text-xs px-4">+ Book Session</Button>
            </Link>
          </div>

          {/* Top row: Next session + stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">

            {/* Next Session - spans 2 cols */}
            <div className="md:col-span-2">
              {nextSession ? (
                <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-5 text-white h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-1">Next Session</p>
                      <h2 className="text-xl font-bold mb-1">{nextSession.subject}</h2>
                      <p className="text-violet-200 text-sm">
                        {nextSession.session_date
                          ? new Date(nextSession.session_date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
                          : "TBD"
                        } · {nextSession.session_time}
                      </p>
                    </div>
                    {nextSession.zoom_join_url && (
                      <a href={nextSession.zoom_join_url} target="_blank" rel="noopener noreferrer">
                        <button className="flex items-center gap-1.5 bg-white text-violet-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors">
                          <Video className="w-3.5 h-3.5" /> Join Zoom
                        </button>
                      </a>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-violet-500/40 flex items-center justify-between">
                    <p className="text-violet-300 text-xs">{completed.length} sessions completed · {upcoming.length} upcoming</p>
                    <Link href="/parent/sessions" className="text-violet-300 text-xs hover:text-white flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-dashed border-violet-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center h-full min-h-[140px]">
                  <Calendar className="w-8 h-8 text-violet-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">No upcoming sessions</p>
                  <p className="text-xs text-gray-400 mb-3">Book a session to get started</p>
                  <Link href="/book"><Button size="sm" className="text-xs">Book Now</Button></Link>
                </div>
              )}
            </div>

            {/* Quick stats - 1 col */}
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Sessions Done</p>
                <p className="text-2xl font-bold text-gray-900">{completed.length}</p>
                <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-1 bg-violet-500 rounded-full" style={{width: completed.length > 0 ? '70%' : '0%'}} />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(0)}</p>
              </div>
            </div>
          </div>

          {/* Middle row: Latest report + quick links */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">

            {/* Latest report */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-800">Latest Session Report</p>
                <Link href="/parent/sessions" className="text-xs text-violet-600 hover:underline flex items-center gap-1">All reports <ArrowRight className="w-3 h-3" /></Link>
              </div>
              {latestReport ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{latestReport.student_name}</p>
                      <p className="text-xs text-gray-400">{latestReport.subject} · {new Date(latestReport.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Confidence</p>
                      <p className="text-lg font-bold text-violet-600">{latestReport.confidence_score}%</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-1.5 bg-green-500 rounded-full" style={{width: `${latestReport.confidence_score}%`}} />
                  </div>
                  {latestReport.wins && (
                    <div className="bg-green-50 border-l-3 border-green-400 rounded-r-lg px-3 py-2 mb-2">
                      <p className="text-xs font-semibold text-green-700 mb-0.5">Win</p>
                      <p className="text-xs text-green-800">{latestReport.wins}</p>
                    </div>
                  )}
                  {latestReport.topics_covered && (
                    <p className="text-xs text-gray-400 mt-2">Topics: {latestReport.topics_covered}</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <TrendingUp className="w-7 h-7 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">Reports appear here after each session</p>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              <Link href="/book" className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl p-4 flex items-center justify-between transition-colors">
                <div>
                  <p className="text-xs font-semibold opacity-80 mb-0.5">Book</p>
                  <p className="font-bold text-sm">New Session</p>
                </div>
                <Calendar className="w-5 h-5 opacity-70" />
              </Link>
              <Link href="/courses" className="bg-white border border-gray-100 hover:border-violet-200 rounded-2xl p-4 flex items-center justify-between transition-colors">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Explore</p>
                  <p className="font-bold text-sm text-gray-900">Courses</p>
                </div>
                <BookOpen className="w-5 h-5 text-violet-400" />
              </Link>
              <a
                href="https://www.google.com/maps/place/MsHoraceTutoring/@38.6214401,-76.9105131,17z"
                target="_blank" rel="noopener noreferrer"
                className="bg-white border border-gray-100 hover:border-yellow-300 rounded-2xl p-4 flex items-center justify-between transition-colors"
              >
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Leave a</p>
                  <p className="font-bold text-sm text-gray-900">Google Review</p>
                </div>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </a>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
