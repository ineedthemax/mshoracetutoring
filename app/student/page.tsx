import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Video, Clock, BookOpen, Calendar } from "lucide-react";

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const parentEmail = user?.user_metadata?.parent_email ?? user?.email ?? "";

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("parent_email", parentEmail)
    .order("session_date", { ascending: true });

  const allSessions = sessions ?? [];
  const upcoming = allSessions.filter(s => s.status === "upcoming");
  const nextSession = upcoming[0];

  const { data: reports } = await supabase
    .from("session_reports")
    .select("*")
    .eq("parent_email", parentEmail)
    .order("created_at", { ascending: false })
    .limit(1);

  const lastReport = reports?.[0];
  const studentName = user?.user_metadata?.name ?? "there";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />
      <main className="md:ml-64 flex-1 p-4 md:p-8 pt-18 md:pt-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {studentName}!</h1>
          <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s coming up and where you left off.</p>
        </div>

        {/* Next session card */}
        {nextSession ? (
          <Card className="mb-6 bg-gradient-to-r from-violet-600 to-violet-800 text-white border-0 overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-3">Next Session</Badge>
                  <h2 className="text-2xl font-bold mb-1">{nextSession.subject}</h2>
                  <p className="text-violet-100">
                    {nextSession.session_date
                      ? new Date(nextSession.session_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                      : "Date TBD"
                    } at {nextSession.session_time}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-violet-200 text-sm">
                    <Clock className="w-4 h-4" />
                    {nextSession.duration_minutes} minutes · with Ms. Horace
                  </div>
                </div>
                {nextSession.zoom_join_url && (
                  <a href={nextSession.zoom_join_url} target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors flex items-center gap-2">
                      <Video className="w-4 h-4" /> Join Zoom
                    </button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 border-dashed border-2 border-violet-200">
            <CardContent className="pt-6 text-center py-8">
              <Calendar className="w-10 h-10 text-violet-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No upcoming sessions</p>
              <p className="text-gray-400 text-sm mt-1 mb-4">Book a session to get started</p>
              <Link href="/book"><Button>Book a Session</Button></Link>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* What to work on */}
          {lastReport ? (
            <Card>
              <CardHeader><CardTitle>What to Work On Next</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">From your last {lastReport.subject} session:</p>
                  {lastReport.recommended_next_step && (
                    <div className="bg-violet-50 rounded-xl p-3">
                      <p className="text-sm text-violet-700 font-medium">Recommended next step:</p>
                      <p className="text-sm text-violet-600 mt-1">{lastReport.recommended_next_step}</p>
                    </div>
                  )}
                  {lastReport.homework_assigned && (
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-violet-500 mt-0.5" />
                      <p className="text-sm text-gray-500">{lastReport.homework_assigned}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader><CardTitle>What to Work On Next</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 text-center py-4">Session reports appear here after each session.</p>
              </CardContent>
            </Card>
          )}

          {/* Session History */}
          <Card>
            <CardHeader><CardTitle>Recent Sessions</CardTitle></CardHeader>
            <CardContent>
              {allSessions.length > 0 ? (
                <div className="space-y-3">
                  {allSessions.slice(0, 5).map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${s.status === "upcoming" ? "bg-violet-500" : "bg-gray-300"}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{s.subject}</p>
                          <p className="text-xs text-gray-400">
                            {s.session_date ? new Date(s.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD"}
                            {s.duration_minutes ? ` · ${s.duration_minutes} min` : ""}
                          </p>
                        </div>
                      </div>
                      <Badge variant={s.status === "upcoming" ? "default" : "success"}>{s.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No sessions yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
