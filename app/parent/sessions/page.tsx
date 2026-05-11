"use client";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Video, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FilterType = "all" | "upcoming" | "completed" | "canceled";

type Session = {
  id: string;
  subject: string;
  session_date: string | null;
  session_time: string;
  duration_minutes: number;
  session_type: string;
  status: string;
  zoom_join_url: string | null;
  parent_name: string;
};

export default function ParentSessionsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("sessions")
        .select("id, subject, session_date, session_time, duration_minutes, session_type, status, zoom_join_url, parent_name")
        .eq("parent_email", user.email ?? "")
        .order("session_date", { ascending: true });

      setSessions(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = sessions.filter(s =>
    filter === "all" ? true : s.status === filter
  );

  return (
    <div className="flex min-h-screen bg-[#f8f8fb]">
      <DashboardSidebar role="parent" />
      <main className="md:ml-64 flex-1 p-4 md:p-6 pt-18 md:pt-6 pb-20 md:pb-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-400 text-xs mt-0.5">All scheduled and past tutoring sessions.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(["all", "upcoming", "completed", "canceled"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors capitalize",
                filter === f
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-sm text-gray-400">Loading sessions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-violet-200 p-12 flex flex-col items-center text-center">
            <Calendar className="w-9 h-9 text-violet-200 mb-3" />
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {filter === "all" ? "No sessions yet" : `No ${filter} sessions`}
            </p>
            <p className="text-xs text-gray-400 mb-4">Book a session to get started.</p>
            <Link href="/book">
              <Button size="sm" className="text-xs">Book Now</Button>
            </Link>
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100">
                  <tr>
                    {["Subject", "Date & Time", "Duration", "Type", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{session.subject}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {session.session_date
                          ? new Date(session.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : "TBD"
                        }
                        {session.session_time ? ` · ${session.session_time}` : ""}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-300" />
                          {session.duration_minutes ?? "--"} min
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant="outline" className="text-xs">{session.session_type}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            session.status === "upcoming" ? "default" :
                            session.status === "completed" ? "success" : "destructive"
                          }
                          className="text-xs"
                        >
                          {session.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        {session.status === "upcoming" && session.zoom_join_url && (
                          <a href={session.zoom_join_url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="text-xs h-7 px-3">
                              <Video className="w-3 h-3 mr-1" /> Join
                            </Button>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
