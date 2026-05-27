import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, BookOpen, ArrowRight, Clock, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = createAdminClient();

  const [
    { data: sessions },
    { data: payments },
    { data: digitalPurchases },
    { data: { users } },
  ] = await Promise.all([
    admin.from("sessions").select("*").order("created_at", { ascending: false }),
    admin.from("payments").select("*").order("created_at", { ascending: false }),
    admin.from("digital_purchases").select("*").order("created_at", { ascending: false }),
    admin.auth.admin.listUsers({ perPage: 200 }),
  ]);

  const allSessions = sessions ?? [];
  const upcoming = allSessions.filter(s => s.status === "upcoming");

  const sessionRevenue = (payments ?? []).reduce((sum, p) => sum + (p.amount_cents ?? 0), 0);
  const digitalRevenue = (digitalPurchases ?? []).reduce((sum, p) => sum + (p.amount_cents ?? 0), 0);
  const totalRevenueDollars = (sessionRevenue + digitalRevenue) / 100;

  const clients = (users ?? []).filter(u =>
    u.user_metadata?.role === "student" || u.user_metadata?.role === "parent"
  );

  const recentPayments = [
    ...(payments ?? []).map(p => ({
      id: p.id, label: "Session Booking",
      amount: (p.amount_cents ?? 0) / 100, date: p.created_at,
    })),
    ...(digitalPurchases ?? []).map(p => ({
      id: p.id, label: p.product_name ?? "Digital Product",
      amount: (p.amount_cents ?? 0) / 100, date: p.created_at,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Upcoming Sessions</h2>
                <Link href="/admin/bookings" className="text-xs text-violet-600 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
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
                          <p className="text-xs text-gray-400">{s.subject} · {s.session_date ? new Date(s.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD"} at {s.session_time}</p>
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
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Payments</h2>
                <Link href="/admin/payments" className="text-xs text-violet-600 hover:underline flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
              </div>
              {recentPayments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No payments yet</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentPayments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{p.label}</p>
                        <p className="text-xs text-gray-400">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">${p.amount.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Clients</h2>
                <Link href="/admin/students" className="text-xs text-violet-600 hover:underline flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
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
