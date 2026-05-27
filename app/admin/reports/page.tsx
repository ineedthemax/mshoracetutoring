import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const admin = createAdminClient();

  const { data: reports } = await admin
    .from("session_reports")
    .select("*")
    .order("created_at", { ascending: false });

  const allReports = reports ?? [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Session Reports</h1>
          <p className="text-gray-500 text-sm mt-1">{allReports.length} reports sent.</p>
        </div>
        <Link href="/admin/reports/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Report</Button>
        </Link>
      </div>

      {allReports.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">No reports yet. Create one after each session.</p>
            <Link href="/admin/reports/new">
              <Button className="mt-4" size="sm">Create First Report</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allReports.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{r.student_name ?? "Student"}</h3>
                    <p className="text-sm text-gray-500">
                      {r.subject ?? "—"} · {r.session_date ? new Date(r.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </p>
                    {r.parent_email && <p className="text-xs text-gray-400 mt-0.5">{r.parent_email}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    {r.confidence_score && (
                      <span className="text-sm font-semibold text-violet-600">{r.confidence_score}% confidence</span>
                    )}
                    <Badge variant="success">Sent</Badge>
                  </div>
                </div>

                {r.topics_covered && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Topics Covered</p>
                    <p className="text-sm text-gray-700">{r.topics_covered}</p>
                  </div>
                )}

                {r.wins && (
                  <div className="mt-3 p-3 bg-green-50 rounded-xl">
                    <p className="text-xs font-medium text-green-700 mb-1">Win from this session</p>
                    <p className="text-sm text-green-800">&ldquo;{r.wins}&rdquo;</p>
                  </div>
                )}

                {r.recommended_next_step && (
                  <div className="mt-2 p-3 bg-violet-50 rounded-xl text-sm text-violet-800">
                    <span className="font-medium">Next step: </span>{r.recommended_next_step}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
