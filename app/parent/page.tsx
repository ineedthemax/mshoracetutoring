import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSessions, mockStudents, mockProgressReports, mockPayments } from "@/lib/mock-data";
import { Calendar, TrendingUp, DollarSign, Users, Video, Star } from "lucide-react";

export default function ParentDashboard() {
  const upcoming = mockSessions.filter(s => s.status === "upcoming");
  const completed = mockSessions.filter(s => s.status === "completed");
  const totalSpent = mockPayments.filter(p => p.status === "paid").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />
      <main className="md:ml-64 flex-1 p-4 md:p-8 pt-18 md:pt-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Lisa!</h1>
            <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with Jordan&apos;s tutoring.</p>
          </div>
          <Link href="/book">
            <Button>+ Book New Session</Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-8">
          {[
            { label: "Sessions Completed", value: completed.length, icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Upcoming Sessions", value: upcoming.length, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Invested", value: `$${totalSpent}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Active Students", value: mockStudents.length, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Upcoming sessions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Sessions</CardTitle>
                <Link href="/parent/sessions" className="text-xs text-violet-600 hover:underline">View all</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcoming.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{session.subject}</p>
                      <p className="text-xs text-gray-400">{session.student} · {new Date(session.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {session.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={session.zoomUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="flex items-center gap-1">
                          <Video className="w-3 h-3" /> Join
                        </Button>
                      </a>
                      <Button size="sm" variant="ghost" className="text-xs text-gray-400">Reschedule</Button>
                    </div>
                  </div>
                ))}
                {upcoming.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No upcoming sessions</p>
                    <Link href="/book"><Button size="sm" className="mt-2">Book Now</Button></Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Student Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {mockStudents.map((student) => (
                  <div key={student.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-sm font-medium text-gray-800">{student.name}</span>
                        <span className="text-xs text-gray-400 ml-2">{student.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">{student.confidence}%</span>
                        {student.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full bg-violet-500 transition-all"
                        style={{ width: `${student.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Session Reports */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Session Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProgressReports.map((r) => (
                  <div key={r.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{r.student}</p>
                        <p className="text-xs text-gray-400">{r.subject} · {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      </div>
                      <Badge variant="success">+{r.studentConfidence}% confidence</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {r.topicsCovered.map(t => (
                        <span key={t} className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-600">{t}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 italic">&ldquo;{r.wins}&rdquo;</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Google Review */}
          <Card className="bg-gradient-to-br from-violet-600 to-violet-800 border-0 text-white">
            <CardContent className="pt-8">
              <Star className="w-10 h-10 text-yellow-300 fill-yellow-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">Leave a Google Review</h3>
              <p className="text-violet-100 text-sm mb-6">Had a great experience? Share it on Google and help other families find Mshorace Tutoring.</p>
              <a
                href="https://g.page/r/placeholder/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-violet-50 transition-colors"
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Write a Review
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
