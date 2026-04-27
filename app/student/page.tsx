import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSessions, mockProgressReports } from "@/lib/mock-data";
import { Video, Upload, Clock, CheckCircle, BookOpen } from "lucide-react";

export default function StudentDashboard() {
  const upcoming = mockSessions.filter(s => s.status === "upcoming" && s.student === "Jordan Campbell");
  const nextSession = upcoming[0];
  const lastReport = mockProgressReports[0];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />
      <main className="md:ml-64 flex-1 p-4 md:p-8 pt-18 md:pt-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Jordan!</h1>
          <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s coming up and where you left off.</p>
        </div>

        {/* Next session - big card */}
        {nextSession && (
          <Card className="mb-6 bg-gradient-to-r from-violet-600 to-violet-800 text-white border-0 overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-3">Next Session</Badge>
                  <h2 className="text-2xl font-bold mb-1">{nextSession.subject}</h2>
                  <p className="text-violet-100">
                    {new Date(nextSession.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {nextSession.time}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-violet-200 text-sm">
                    <Clock className="w-4 h-4" />
                    {nextSession.duration} minutes · with Marcus Horace
                  </div>
                </div>
                <a href={nextSession.zoomUrl} target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors flex items-center gap-2">
                    <Video className="w-4 h-4" /> Join Zoom
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Upload Homework */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Homework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-4 hover:border-violet-300 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Drop files here or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
              <div className="flex gap-2">
                <select className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>Tag a topic...</option>
                  <option>Quadratic Formula</option>
                  <option>Factoring</option>
                  <option>Completing the Square</option>
                  <option>Other</option>
                </select>
                <Button>Send</Button>
              </div>
            </CardContent>
          </Card>

          {/* What to work on next */}
          {lastReport && (
            <Card>
              <CardHeader>
                <CardTitle>What to Work On Next</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">From your last {lastReport.subject} session:</p>
                    <div className="bg-violet-50 rounded-xl p-3 mb-3">
                      <p className="text-sm text-violet-700 font-medium">Recommended next step:</p>
                      <p className="text-sm text-violet-600 mt-1">{lastReport.recommendedNextStep}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Homework assigned:</p>
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-violet-500 mt-0.5" />
                      <p className="text-sm text-gray-500">{lastReport.homeworkAssigned}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Areas to review:</p>
                    <ul className="space-y-1">
                      {lastReport.skillGaps.map(g => (
                        <li key={g} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Session History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSessions.filter(s => s.student === "Jordan Campbell").map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.status === "upcoming" ? "bg-violet-500" : "bg-gray-300"}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.subject}</p>
                      <p className="text-xs text-gray-400">{new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {s.duration} min</p>
                    </div>
                  </div>
                  <Badge variant={s.status === "upcoming" ? "default" : "success"}>{s.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
