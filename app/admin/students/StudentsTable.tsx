"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  parentEmail: string;
  totalSessions: number;
  upcomingSessions: number;
  joined: string;
}

export function StudentsTable({ users }: { users: UserRow[] }) {
  const [filter, setFilter] = useState<"all" | "parent" | "student">("all");

  const filtered = filter === "all" ? users : users.filter(u => u.role === filter);

  const tabs = [
    { key: "all", label: "All", count: users.length },
    { key: "parent", label: "Parents", count: users.filter(u => u.role === "parent").length },
    { key: "student", label: "Students", count: users.filter(u => u.role === "student").length },
  ] as const;

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.key
                ? "bg-white text-violet-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.key ? "bg-violet-100 text-violet-600" : "bg-gray-200 text-gray-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No {filter === "all" ? "accounts" : filter + "s"} yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-4 font-medium">Name</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="px-5 py-4 font-medium">Linked To</th>
                  <th className="px-5 py-4 font-medium">Sessions</th>
                  <th className="px-5 py-4 font-medium">Upcoming</th>
                  <th className="px-5 py-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const initials = u.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                  const isParent = u.role === "parent";

                  // For parents: find their linked students
                  const linkedStudents = isParent
                    ? users.filter(s => s.role === "student" && s.parentEmail === u.email)
                    : [];

                  // For students: find their linked parent
                  const linkedParent = !isParent && u.parentEmail
                    ? users.find(p => p.email === u.parentEmail)
                    : null;

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isParent ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"
                          }`}>
                            {initials}
                          </div>
                          <span className="font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{u.email}</td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={isParent ? "outline" : "default"}
                          className="capitalize text-xs"
                        >
                          {u.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        {isParent && linkedStudents.length > 0 ? (
                          <div className="flex flex-col gap-0.5">
                            {linkedStudents.map(s => (
                              <span key={s.id} className="text-xs text-violet-600 font-medium">{s.name}</span>
                            ))}
                          </div>
                        ) : !isParent && linkedParent ? (
                          <span className="text-xs text-blue-600 font-medium">{linkedParent.name}</span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{u.totalSessions}</td>
                      <td className="px-5 py-4">
                        {u.upcomingSessions > 0
                          ? <span className="text-violet-600 font-semibold">{u.upcomingSessions}</span>
                          : <span className="text-gray-300">—</span>
                        }
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        {new Date(u.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
