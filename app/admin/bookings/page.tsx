import { mockSessions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Video } from "lucide-react";

const statusVariant: Record<string, "default" | "success" | "warning" | "destructive" | "outline"> = {
  upcoming: "default",
  completed: "success",
  cancelled: "destructive",
  pending: "warning",
};

export default function BookingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">All sessions — upcoming and completed.</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-colors first:bg-violet-600 first:text-white first:border-violet-600"
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockSessions.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{s.student}</td>
                  <td className="px-6 py-4 text-gray-600">{s.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{s.date} · {s.time}</td>
                  <td className="px-6 py-4 text-gray-600">{s.duration}min</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{s.type}</Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${s.price}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant[s.status] ?? "outline"}>{s.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    {s.status === "upcoming" ? (
                      <a href={s.zoomUrl} target="_blank" rel="noreferrer">
                        <Button size="sm">
                          <Video className="w-3 h-3 mr-1" /> Join
                        </Button>
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
