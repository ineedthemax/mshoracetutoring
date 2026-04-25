"use client";
import { useState } from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSessions } from "@/lib/mock-data";
import { Video, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "upcoming" | "completed" | "canceled";

export default function ParentSessionsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = mockSessions.filter(s => filter === "all" ? true : s.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-500 text-sm mt-1">All scheduled and past tutoring sessions.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "upcoming", "completed", "canceled"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize",
                filter === f
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100">
                <tr>
                  {["Student", "Subject", "Date", "Duration", "Type", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{session.student}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{session.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {session.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {session.duration} min
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{session.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={session.status === "upcoming" ? "default" : session.status === "completed" ? "success" : "destructive"}>
                        {session.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {session.status === "upcoming" && session.zoomUrl && (
                        <a href={session.zoomUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">
                            <Video className="w-3 h-3 mr-1" /> Join
                          </Button>
                        </a>
                      )}
                      {session.status === "upcoming" && (
                        <Button size="sm" variant="ghost" className="ml-1 text-xs">Reschedule</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>No sessions found.</p>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
