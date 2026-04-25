import Link from "next/link";
import { mockProgressReports } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Session Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Post-session notes and progress summaries.</p>
        </div>
        <Link href="/admin/reports/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Report</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockProgressReports.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{r.student}</h3>
                  <p className="text-sm text-gray-500">{r.subject} · {r.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-violet-600">{r.studentConfidence}% confidence</span>
                  <Badge variant="success">Completed</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Topics Covered</p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.topicsCovered.map((t) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Skill Gaps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(r.skillGaps) ? r.skillGaps : r.skillGaps.split(",")).map((g) => (
                      <Badge key={g} variant="warning">{g.trim()}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-xl">
                <p className="text-xs font-medium text-green-700 mb-1">Win from this session</p>
                <p className="text-sm text-green-800">&ldquo;{r.wins}&rdquo;</p>
              </div>

              <div className="mt-3 flex items-start gap-6 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Homework assigned: </span>
                  <span className="text-gray-700">{r.homeworkAssigned}</span>
                </div>
              </div>

              <div className="mt-2 p-3 bg-violet-50 rounded-xl text-sm text-violet-800">
                <span className="font-medium">Next step: </span>{r.recommendedNextStep}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
