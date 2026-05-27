import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar } from "lucide-react";
import { CreateBookingButton } from "./CreateBookingButton";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const admin = createAdminClient();

  const { data: sessions } = await admin
    .from("sessions")
    .select("*")
    .order("session_date", { ascending: true });

  const allSessions = sessions ?? [];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">{allSessions.length} total sessions on record.</p>
        </div>
        <CreateBookingButton />
      </div>

      {allSessions.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">No bookings yet. Sessions will appear here once parents book.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Parent / Student</th>
                    <th className="px-6 py-4 font-medium">Subject</th>
                    <th className="px-6 py-4 font-medium">Date & Time</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allSessions.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{s.parent_name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{s.parent_email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{s.subject}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {s.session_date ? new Date(s.session_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"}
                        {s.session_time ? ` · ${s.session_time}` : ""}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs capitalize">{s.session_type?.replace("-", " ") ?? "—"}</Badge>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {s.price_cents ? `$${(s.price_cents / 100).toFixed(0)}` : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={s.status === "upcoming" ? "default" : s.status === "completed" ? "success" : "outline"} className="capitalize text-xs">
                          {s.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {s.zoom_join_url ? (
                          <a href={s.zoom_join_url} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline" className="text-xs h-7">
                              <Video className="w-3 h-3 mr-1" /> Join
                            </Button>
                          </a>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
