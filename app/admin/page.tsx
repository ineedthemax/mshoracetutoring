import Link from "next/link";
import { mockSessions, mockStudents, mockPayments, mockGroupClasses } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, Users, DollarSign, BookOpen,
  ArrowRight, Clock, TrendingUp, Plus
} from "lucide-react";

const completedSessions = mockSessions.filter((s) => s.status === "completed");
const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming");
const totalRevenue = mockPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
const todaySessions = upcomingSessions.slice(0, 2);

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back — here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/availability">
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" /> Set Availability
            </Button>
          </Link>
          <Link href="/admin/groups">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> New Group Class
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: "Total Sessions", value: mockSessions.length, icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Active Students", value: mockStudents.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Monthly Revenue", value: `$${totalRevenue}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Group Enrollments", value: mockGroupClasses.reduce((s, g) => s + g.enrolled, 0), icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Today's Sessions */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Sessions</CardTitle>
                <Link href="/admin/bookings" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{session.student}</p>
                        <p className="text-xs text-gray-500">{session.subject} · {session.date} at {session.time} · {session.duration}min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="default">{session.type}</Badge>
                      <a href={session.zoomUrl} target="_blank" rel="noreferrer">
                        <Button size="sm">Join Zoom</Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Payments</CardTitle>
                <Link href="/admin/payments" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100 pb-2">
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockPayments.slice(0, 4).map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 text-gray-700 truncate max-w-[200px]">{p.description}</td>
                      <td className="py-3 text-gray-500">{p.date}</td>
                      <td className="py-3 font-semibold text-gray-900">${p.amount}</td>
                      <td className="py-3">
                        <Badge variant={p.status === "paid" ? "success" : "warning"}>
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Students */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Students</CardTitle>
                <Link href="/admin/students" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudents.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-semibold text-xs">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.subject} · {s.grade}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {s.confidence}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Group Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Group Classes</CardTitle>
                <Link href="/admin/groups" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                  Manage <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockGroupClasses.slice(0, 3).map((g) => (
                  <div key={g.id} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{g.title}</p>
                      <Badge variant={g.status === "full" ? "destructive" : "success"}>
                        {g.enrolled}/{g.capacity}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{g.date} · ${g.price}/student</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
