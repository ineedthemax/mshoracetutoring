import { mockStudents } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Minus } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-500 text-sm mt-1">{mockStudents.length} active students.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Grade</th>
                <th className="px-6 py-4 font-medium">Parent</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Sessions</th>
                <th className="px-6 py-4 font-medium">Last Session</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockStudents.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-semibold text-xs">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.grade}</td>
                  <td className="px-6 py-4 text-gray-600">{s.parent}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{s.subject}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.sessions}</td>
                  <td className="px-6 py-4 text-gray-500">{s.lastSession}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.confidence}%` }} />
                      </div>
                      <span className="font-medium text-gray-700">{s.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {s.trend === "up" ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <TrendingUp className="w-3 h-3" /> Improving
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                        <Minus className="w-3 h-3" /> Stable
                      </span>
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
