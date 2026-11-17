import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, Phone, Calendar, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
 new: "bg-blue-100 text-blue-700",
 contacted: "bg-yellow-100 text-yellow-700",
 booked: "bg-green-100 text-green-700",
 lost: "bg-gray-100 text-gray-500",
};

function formatDate(ts: string | null) {
 if (!ts) return null;
 return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function LeadsPage() {
 const admin = createAdminClient();

 const { data: leads } = await admin
 .from("leads")
 .select("*")
 .order("created_at", { ascending: false });

 const all = leads ?? [];

 const stats = {
 total: all.length,
 new: all.filter(l => l.status === "new").length,
 contacted: all.filter(l => l.status === "contacted").length,
 booked: all.filter(l => l.status === "booked").length,
 };

 return (
 <div className="p-6 max-w-7xl mx-auto">
 <div className="mb-8">
 <h1 className="text-2xl font-bold text-gray-900 mb-1">Leads</h1>
 <p className="text-gray-500 text-sm">Interest form submissions — email sequences run automatically.</p>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
 {[
 { label: "Total Leads", value: stats.total, icon: Users, color: "text-violet-600" },
 { label: "New", value: stats.new, icon: Mail, color: "text-blue-600" },
 { label: "Contacted", value: stats.contacted, icon: TrendingUp, color: "text-yellow-600" },
 { label: "Booked", value: stats.booked, icon: Calendar, color: "text-green-600" },
 ].map(s => (
 <Card key={s.label}>
 <CardContent className="p-4">
 <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
 <div className="text-2xl font-bold text-gray-900">{s.value}</div>
 <div className="text-sm text-gray-500">{s.label}</div>
 </CardContent>
 </Card>
 ))}
 </div>

 {/* Table */}
 <Card>
 <CardContent className="p-0">
 {all.length === 0 ? (
 <div className="p-12 text-center text-gray-400">
 <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
 <p className="font-medium">No leads yet</p>
 <p className="text-sm mt-1">Interest form submissions will appear here.</p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-gray-100">
 <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Contact</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Student</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Follow-ups</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Source</th>
 <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
 </tr>
 </thead>
 <tbody>
 {all.map(lead => (
 <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
 <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
 <td className="px-4 py-3">
 <div className="text-gray-700">{lead.email}</div>
 {lead.phone && <div className="text-gray-400 text-xs mt-0.5">{lead.phone}</div>}
 </td>
 <td className="px-4 py-3 text-gray-600">
 {[lead.grade, lead.subject].filter(Boolean).join(" · ") || <span className="text-gray-300">—</span>}
 </td>
 <td className="px-4 py-3">
 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-500"}`}>
 {lead.status}
 </span>
 </td>
 <td className="px-4 py-3">
 <div className="flex gap-1.5">
 <span title="Welcome (day 1)" className={`w-2.5 h-2.5 rounded-full ${lead.follow_up_1_sent_at ? "bg-green-400" : "bg-gray-200"}`} />
 <span title="Nudge (day 3)" className={`w-2.5 h-2.5 rounded-full ${lead.follow_up_2_sent_at ? "bg-green-400" : "bg-gray-200"}`} />
 <span title="Last call (day 7)" className={`w-2.5 h-2.5 rounded-full ${lead.follow_up_3_sent_at ? "bg-green-400" : "bg-gray-200"}`} />
 </div>
 </td>
 <td className="px-4 py-3 text-gray-500 text-xs">{lead.source}</td>
 <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(lead.created_at)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 );
}
