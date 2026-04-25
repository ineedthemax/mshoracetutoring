import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockStudents, mockProgressReports, mockSessions } from "@/lib/mock-data";
import { TrendingUp, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

export default function StudentProgressPage() {
  const student = mockStudents[0]; // Jordan Campbell
  const reports = mockProgressReports.filter(r => r.student === student.name);
  const sessions = mockSessions.filter(s => s.student === student.name);

  const confidenceHistory = [55, 60, 65, 68, 72]; // mock trend

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{student.name}&apos;s Progress</h1>
          <p className="text-gray-500 text-sm mt-1">{student.grade} · {student.subject}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Sessions", value: student.sessions },
            { label: "Current Confidence", value: `${student.confidence}%` },
            { label: "Trend", value: student.trend === "up" ? "Improving" : "Stable" },
            { label: "Last Session", value: new Date(student.lastSession).toLocaleDateString("en-US", { month: "short", day: "numeric" }) },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Confidence trend */}
          <Card>
            <CardHeader>
              <CardTitle>Confidence Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {confidenceHistory.map((score, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20">Session {i + 1}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-violet-500 rounded-full transition-all"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-10 text-right">{score}%</span>
                    {i > 0 && confidenceHistory[i] > confidenceHistory[i-1] && (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">Confidence scores are assessed by Marcus each session (0-100 scale).</p>
            </CardContent>
          </Card>

          {/* Session History */}
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.subject}</p>
                      <p className="text-xs text-gray-400">{new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {s.duration} min</p>
                    </div>
                    <Badge variant={s.status === "upcoming" ? "default" : "success"}>{s.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Reports */}
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{r.subject} Session Report</h3>
                    <p className="text-sm text-gray-400">{new Date(r.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                  </div>
                  <Badge variant="success">Confidence: {r.studentConfidence}%</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-violet-500" /> Topics Covered
                    </h4>
                    <ul className="space-y-1">
                      {r.topicsCovered.map(t => (
                        <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-violet-400" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-yellow-500" /> Skill Gaps
                    </h4>
                    <ul className="space-y-1">
                      {r.skillGaps.map(g => (
                        <li key={g} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Wins</h4>
                    <p className="text-sm text-gray-500 italic">&ldquo;{r.wins}&rdquo;</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Steps</h4>
                    <p className="text-sm text-gray-500">{r.recommendedNextStep}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Homework Assigned</h4>
                    <p className="text-sm text-gray-500">{r.homeworkAssigned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
