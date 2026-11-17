import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
 Calendar, Users, DollarSign, BookOpen, ArrowRight, Clock, Plus,
 Gift, Stethoscope, ExternalLink, AlertTriangle, UserCheck,
 Video, FileText, TrendingUp, AlertCircle
} from "lucide-react";

export const dynamic = "force-dynamic";

function WeeklySparkline({ data }: { data: { day: string; amount: number }[] }) {
 const max = Math.max(...data.map(d => d.amount), 1);
 const W = 120, H = 36, barW = 12, gap = 5;
 return (
 <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
 {data.map((d, i) => {
 const h = Math.max(2, (d.amount / max) * (H - 4));
 const x = i * (barW + gap);
 const y = H - h;
 return (
 <g key={i}>
 <rect x={x} y={y} width={barW} height={h} rx={3}
 fill={d.amount > 0 ? "#7c3aed" : "#e5e7eb"} opacity={0.85} />
 </g>
 );
 })}
 </svg>
 );
}

export default async function AdminDashboard() {
 const admin = createAdminClient();

 const [
 { data: sessions },
 { data: payments },
 { data: digitalPurchases },
 { data: { users } },
 { data: leads },
 { data: sessionReports },
 ] = await Promise.all([
 admin.from("sessions").select("*").order("created_at", { ascending: false }),
 admin.from("payments").select("*").order("created_at", { ascending: false }),
 admin.from("digital_purchases").select("*").order("created_at", { ascending: false }),
 admin.auth.admin.listUsers({ perPage: 200 }),
 admin.from("leads").select("*").order("created_at", { ascending: false }),
 admin.from("session_reports").select("session_id, created_at"),
 ]);

 const allSessions = sessions ?? [];
 const allPayments = payments ?? [];
 const allLeads = leads ?? [];

 // ── Upcoming / today ──────────────────────────────────────────────────
 const upcoming = allSessions.filter(s => s.status === "upcoming");

 const nowNY = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
 const todayStr = `${nowNY.getFullYear()}-${String(nowNY.getMonth() + 1).padStart(2, "0")}-${String(nowNY.getDate()).padStart(2, "0")}`;
 const todaySessions = upcoming.filter(s => s.session_date === todayStr);

 // ── Revenue ───────────────────────────────────────────────────────────
 const sessionRevenue = allPayments.reduce((s, p) => s + (p.amount_cents ?? 0), 0);
 const digitalRevenue = (digitalPurchases ?? []).reduce((s, p) => s + (p.amount_cents ?? 0), 0);
 const totalRevenueDollars = (sessionRevenue + digitalRevenue) / 100;

 // Monthly revenue (this calendar month)
 const monthStart = new Date(nowNY.getFullYear(), nowNY.getMonth(), 1);
 const monthRevenue = allPayments
 .filter(p => new Date(p.created_at) >= monthStart)
 .reduce((s, p) => s + (p.amount_cents ?? 0), 0) / 100;
 const monthGoal = 3000;
 const goalPct = Math.min(100, Math.round((monthRevenue / monthGoal) * 100));

 // Weekly sparkline (last 7 days)
 const weekDays: { day: string; amount: number }[] = [];
 for (let i = 6; i >= 0; i--) {
 const d = new Date(nowNY);
 d.setDate(d.getDate() - i);
 const dayStr = d.toLocaleDateString("en-US", { weekday: "short" });
 const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
 const amount = allPayments
 .filter(p => p.created_at.startsWith(dateKey))
 .reduce((s, p) => s + (p.amount_cents ?? 0), 0) / 100;
 weekDays.push({ day: dayStr, amount });
 }

 // ── Clients ───────────────────────────────────────────────────────────
 const clients = (users ?? []).filter(u =>
 u.user_metadata?.role === "student" || u.user_metadata?.role === "parent"
 );

 // ── Lead pipeline ─────────────────────────────────────────────────────
 const pipelineNew = allLeads.filter(l => !l.status || l.status === "new").length;
 const pipelineContacted = allLeads.filter(l => l.status === "contacted").length;
 const pipelineBooked = allLeads.filter(l => l.status === "booked").length;
 const pipelineTotal = allLeads.length;

 // ── Needs attention ───────────────────────────────────────────────────
 const reportedSessionIds = new Set((sessionReports ?? []).map((r: any) => r.session_id));
 const completedSessions = allSessions.filter(s => s.status === "completed");
 const sessionsWithoutReports = completedSessions.filter(s => !reportedSessionIds.has(s.id));
 const uncontactedLeads = allLeads.filter(l => !l.follow_up_1_sent_at && (!l.status || l.status === "new"));
 const upcomingWithoutZoom = upcoming.filter(s => !s.zoom_join_url);

 const attentionItems = [
 uncontactedLeads.length > 0 && {
 icon: UserCheck, color: "text-amber-600", bg: "bg-amber-50",
 label: `${uncontactedLeads.length} uncontacted lead${uncontactedLeads.length > 1 ? "s" : ""}`,
 sub: "Haven't received a follow-up",
 href: "/admin/leads",
 },
 sessionsWithoutReports.length > 0 && {
 icon: FileText, color: "text-red-600", bg: "bg-red-50",
 label: `${sessionsWithoutReports.length} session${sessionsWithoutReports.length > 1 ? "s" : ""} without report`,
 sub: "Parents haven't heard back",
 href: "/admin/reports/new",
 },
 upcomingWithoutZoom.length > 0 && {
 icon: Video, color: "text-blue-600", bg: "bg-blue-50",
 label: `${upcomingWithoutZoom.length} session${upcomingWithoutZoom.length > 1 ? "s" : ""} missing Zoom link`,
 sub: "Add before the session",
 href: "/admin/bookings",
 },
 ].filter(Boolean) as { icon: any; color: string; bg: string; label: string; sub: string; href: string }[];

 // ── At-risk students (no session in 21+ days) ─────────────────────────
 const threeWeeksAgo = new Date(nowNY);
 threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
 const parentLastSession: Record<string, { name: string; date: Date }> = {};
 for (const s of completedSessions) {
 const key = s.parent_email ?? s.parent_id ?? "";
 if (!key) continue;
 const d = s.session_date ? new Date(s.session_date) : new Date(s.created_at);
 if (!parentLastSession[key] || d > parentLastSession[key].date) {
 parentLastSession[key] = { name: s.parent_name ?? s.parent_email ?? "Unknown", date: d };
 }
 }
 const atRisk = Object.entries(parentLastSession)
 .filter(([, v]) => v.date < threeWeeksAgo)
 .map(([, v]) => ({ name: v.name, daysAgo: Math.round((nowNY.getTime() - v.date.getTime()) / 86400000) }))
 .sort((a, b) => b.daysAgo - a.daysAgo)
 .slice(0, 4);

 // ── Recent payments with student names ────────────────────────────────
 const sessionMap: Record<string, { parent_name?: string; subject?: string }> = {};
 for (const s of allSessions) sessionMap[s.id] = { parent_name: s.parent_name, subject: s.subject };

 const recentPayments = [
 ...allPayments.map(p => ({
 id: p.id,
 label: sessionMap[p.session_id]?.parent_name ?? "Session Booking",
 sub: sessionMap[p.session_id]?.subject ?? "Tutoring Session",
 amount: (p.amount_cents ?? 0) / 100,
 date: p.created_at,
 })),
 ...(digitalPurchases ?? []).map(p => ({
 id: p.id,
 label: p.product_name ?? "Digital Product",
 sub: "Course Purchase",
 amount: (p.amount_cents ?? 0) / 100,
 date: p.created_at,
 })),
 ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

 return (
 <div className="p-6 md:p-8 max-w-7xl mx-auto">

 {/* Header */}
 <div className="flex items-center justify-between mb-6">
 <div>
 <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
 <p className="text-gray-500 text-sm mt-1">Welcome back, Stenita.</p>
 </div>
 <div className="flex gap-3">
 <Link href="/admin/availability">
 <Button variant="outline" size="sm"><Clock className="w-4 h-4 mr-2" />Availability</Button>
 </Link>
 <Link href="/admin/reports/new">
 <Button size="sm"><Plus className="w-4 h-4 mr-2" />New Report</Button>
 </Link>
 </div>
 </div>

 {/* Needs Attention */}
 {attentionItems.length > 0 && (
 <div className="mb-6">
 <div className="flex items-center gap-2 mb-3">
 <AlertCircle className="w-4 h-4 text-amber-500" />
 <span className="text-sm font-semibold text-gray-700">Needs your attention</span>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 {attentionItems.map((item) => (
 <Link key={item.label} href={item.href}>
 <div className="bg-white border border-gray-200 hover:border-amber-300 hover:shadow-sm rounded-xl p-4 flex items-center gap-3 transition-all">
 <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
 <item.icon className={`w-4 h-4 ${item.color}`} />
 </div>
 <div>
 <p className="text-sm font-semibold text-gray-900">{item.label}</p>
 <p className="text-xs text-gray-400">{item.sub}</p>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* Quick Links */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
 {[
 { label: "Gift a Session", href: "/gift", icon: Gift, color: "text-pink-600", bg: "bg-pink-50" },
 { label: "Free Diagnostic", href: "/diagnostic", icon: Stethoscope, color: "text-blue-600", bg: "bg-blue-50" },
 { label: "Group Waitlist", href: "/groups", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
 ].map((item) => (
 <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
 <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-violet-200 hover:shadow-sm transition-all flex items-center gap-3">
 <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
 <item.icon className={`w-4 h-4 ${item.color}`} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-gray-900 truncate">{item.label}</p>
 <p className="text-xs text-gray-400">Live page</p>
 </div>
 <ExternalLink className="w-3 h-3 text-gray-300 flex-shrink-0" />
 </div>
 </Link>
 ))}
 </div>

 {/* Stats Row */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
 {[
 { label: "Total Sessions", value: allSessions.length, icon: Calendar, color: "text-violet-600", bg: "bg-violet-50" },
 { label: "Active Clients", value: clients.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
 { label: "Total Revenue", value: `$${totalRevenueDollars.toFixed(0)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
 { label: "Upcoming", value: upcoming.length, icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
 ].map((stat) => (
 <Card key={stat.label}>
 <CardContent className="p-5">
 <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
 <stat.icon className={`w-5 h-5 ${stat.color}`} />
 </div>
 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
 <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
 </CardContent>
 </Card>
 ))}
 </div>

 {/* Revenue Goal + Weekly Chart */}
 <div className="grid md:grid-cols-2 gap-4 mb-6">
 {/* Monthly goal */}
 <Card>
 <CardContent className="p-5">
 <div className="flex items-center justify-between mb-2">
 <div>
 <p className="text-sm font-semibold text-gray-700">November Goal</p>
 <p className="text-xs text-gray-400">${monthRevenue.toFixed(0)} of ${monthGoal.toLocaleString()}</p>
 </div>
 <span className={`text-sm font-bold ${goalPct >= 100 ? "text-green-600" : goalPct >= 70 ? "text-violet-600" : "text-amber-600"}`}>
 {goalPct}%
 </span>
 </div>
 <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
 <div
 className={`h-full rounded-full transition-all ${goalPct >= 100 ? "bg-green-500" : "bg-violet-500"}`}
 style={{ width: `${goalPct}%` }}
 />
 </div>
 <p className="text-xs text-gray-400 mt-2">
 {goalPct >= 100 ? "Goal reached!" : `$${(monthGoal - monthRevenue).toFixed(0)} to go`}
 </p>
 </CardContent>
 </Card>

 {/* Weekly sparkline */}
 <Card>
 <CardContent className="p-5">
 <div className="flex items-center justify-between mb-3">
 <div>
 <p className="text-sm font-semibold text-gray-700">This Week</p>
 <p className="text-xs text-gray-400">
 ${weekDays.reduce((s, d) => s + d.amount, 0).toFixed(0)} earned (7 days)
 </p>
 </div>
 <TrendingUp className="w-4 h-4 text-violet-400" />
 </div>
 <div className="flex items-end gap-1 mt-1">
 {weekDays.map((d, i) => {
 const max = Math.max(...weekDays.map(x => x.amount), 1);
 const h = Math.max(4, (d.amount / max) * 36);
 return (
 <div key={i} className="flex-1 flex flex-col items-center gap-1">
 <div
 className={`w-full rounded-sm ${d.amount > 0 ? "bg-violet-500" : "bg-gray-100"}`}
 style={{ height: `${h}px` }}
 />
 <span className="text-[9px] text-gray-400">{d.day}</span>
 </div>
 );
 })}
 </div>
 </CardContent>
 </Card>
 </div>

 {/* Main Grid */}
 <div className="grid lg:grid-cols-3 gap-6">

 {/* Left column */}
 <div className="lg:col-span-2 space-y-5">

 {/* Today's Sessions */}
 <Card>
 <CardContent className="p-0">
 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
 <h2 className="font-semibold text-gray-900">Today's Sessions</h2>
 <span className="text-xs text-gray-400">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
 </div>
 {todaySessions.length === 0 ? (
 <div className="px-6 py-8 text-center">
 <Calendar className="w-7 h-7 text-gray-200 mx-auto mb-2" />
 <p className="text-sm text-gray-400">No sessions scheduled for today</p>
 </div>
 ) : (
 <div className="divide-y divide-gray-50">
 {todaySessions.map((s) => (
 <div key={s.id} className="flex items-center justify-between px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm">
 {(s.parent_name ?? "?").split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
 </div>
 <div>
 <p className="text-sm font-semibold text-gray-900">{s.parent_name ?? s.parent_email}</p>
 <p className="text-xs text-gray-400">{s.subject} · {s.session_time ?? "Time TBD"}</p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 {s.zoom_join_url ? (
 <a href={s.zoom_join_url} target="_blank" rel="noreferrer">
 <Button size="sm" className="text-xs h-8 bg-violet-600 hover:bg-violet-700 text-white px-4">
 Join Zoom
 </Button>
 </a>
 ) : (
 <Link href="/admin/bookings">
 <Badge variant="destructive" className="text-xs cursor-pointer">No Zoom link</Badge>
 </Link>
 )}
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 {/* Upcoming Sessions */}
 <Card>
 <CardContent className="p-0">
 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
 <h2 className="font-semibold text-gray-900">Upcoming Sessions</h2>
 <Link href="/admin/bookings" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
 View all <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 {upcoming.length === 0 ? (
 <div className="px-6 py-10 text-center">
 <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
 <p className="text-sm text-gray-400">No upcoming sessions booked yet</p>
 </div>
 ) : (
 <div className="divide-y divide-gray-50">
 {upcoming.slice(0, 6).map((s) => (
 <div key={s.id} className="flex items-center justify-between px-6 py-3.5">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-xs">
 {(s.parent_name ?? "?").split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
 </div>
 <div>
 <p className="text-sm font-medium text-gray-900">{s.parent_name ?? s.parent_email}</p>
 <p className="text-xs text-gray-400">
 {s.subject} · {s.session_date ? new Date(s.session_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD"}
 {s.session_time ? ` at ${s.session_time}` : ""}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <Badge variant="default" className="text-xs">Upcoming</Badge>
 {s.zoom_join_url && (
 <a href={s.zoom_join_url} target="_blank" rel="noreferrer">
 <Button size="sm" variant="outline" className="text-xs h-7 px-2">Join</Button>
 </a>
 )}
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 </div>

 {/* Right column */}
 <div className="flex flex-col gap-5">

 {/* Lead Pipeline */}
 <Card>
 <CardContent className="p-0">
 <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
 <h2 className="font-semibold text-gray-900">Lead Pipeline</h2>
 <Link href="/admin/leads" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
 Manage <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 {pipelineTotal === 0 ? (
 <p className="text-sm text-gray-400 text-center py-6">No leads yet</p>
 ) : (
 <div className="p-5 space-y-3">
 {[
 { label: "New", count: pipelineNew, color: "bg-amber-400" },
 { label: "Contacted", count: pipelineContacted, color: "bg-blue-400" },
 { label: "Booked", count: pipelineBooked, color: "bg-green-500" },
 ].map((stage) => (
 <div key={stage.label}>
 <div className="flex items-center justify-between mb-1">
 <span className="text-xs font-medium text-gray-600">{stage.label}</span>
 <span className="text-xs font-bold text-gray-900">{stage.count}</span>
 </div>
 <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
 <div
 className={`h-full rounded-full ${stage.color}`}
 style={{ width: pipelineTotal > 0 ? `${(stage.count / pipelineTotal) * 100}%` : "0%" }}
 />
 </div>
 </div>
 ))}
 <p className="text-xs text-gray-400 pt-1">{pipelineTotal} total leads</p>
 </div>
 )}
 </CardContent>
 </Card>

 {/* Recent Payments */}
 <Card>
 <CardContent className="p-0">
 <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
 <h2 className="font-semibold text-gray-900">Recent Payments</h2>
 <Link href="/admin/payments" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
 All <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 {recentPayments.length === 0 ? (
 <p className="text-sm text-gray-400 text-center py-6">No payments yet</p>
 ) : (
 <div className="divide-y divide-gray-50">
 {recentPayments.map((p) => (
 <div key={p.id} className="flex items-center justify-between px-5 py-3">
 <div>
 <p className="text-sm font-medium text-gray-800">{p.label}</p>
 <p className="text-xs text-gray-400">
 {p.sub} · {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
 </p>
 </div>
 <span className="text-sm font-bold text-green-600">${p.amount.toFixed(0)}</span>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 {/* At-Risk Students */}
 {atRisk.length > 0 && (
 <Card className="border-amber-200">
 <CardContent className="p-0">
 <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-100">
 <AlertTriangle className="w-4 h-4 text-amber-500" />
 <h2 className="font-semibold text-gray-900">At-Risk Students</h2>
 </div>
 <div className="divide-y divide-gray-50">
 {atRisk.map((s) => (
 <div key={s.name} className="flex items-center justify-between px-5 py-3">
 <div>
 <p className="text-sm font-medium text-gray-800">{s.name}</p>
 <p className="text-xs text-amber-600">{s.daysAgo} days since last session</p>
 </div>
 <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
 </div>
 ))}
 </div>
 <div className="px-5 py-3 border-t border-amber-100">
 <p className="text-xs text-gray-400">Consider reaching out to rebook</p>
 </div>
 </CardContent>
 </Card>
 )}

 {/* Clients */}
 <Card>
 <CardContent className="p-0">
 <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
 <h2 className="font-semibold text-gray-900">Clients</h2>
 <Link href="/admin/students" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
 All <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 {clients.length === 0 ? (
 <p className="text-sm text-gray-400 text-center py-6">No clients yet</p>
 ) : (
 <div className="divide-y divide-gray-50">
 {clients.slice(0, 5).map((u) => {
 const name = u.user_metadata?.name ?? u.email ?? "Unknown";
 const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
 return (
 <div key={u.id} className="flex items-center gap-3 px-5 py-3">
 <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-xs flex-shrink-0">
 {initials}
 </div>
 <div className="min-w-0">
 <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
 <p className="text-xs text-gray-400 capitalize">{u.user_metadata?.role}</p>
 </div>
 </div>
 );
 })}
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
