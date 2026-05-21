import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddUserButton } from "./AddUserButton";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const admin = createAdminClient();

  // Pull all auth users
  const { data: { users }, error } = await admin.auth.admin.listUsers({ perPage: 200 });

  if (error) {
    return <div className="p-8 text-red-500">Failed to load users: {error.message}</div>;
  }

  // Pull session counts per parent email
  const { data: sessions } = await admin
    .from("sessions")
    .select("parent_email, status");

  const sessionMap: Record<string, { total: number; upcoming: number }> = {};
  for (const s of sessions ?? []) {
    if (!sessionMap[s.parent_email]) sessionMap[s.parent_email] = { total: 0, upcoming: 0 };
    sessionMap[s.parent_email].total++;
    if (s.status === "upcoming") sessionMap[s.parent_email].upcoming++;
  }

  const students = users.filter(u => u.user_metadata?.role === "student" || u.user_metadata?.role === "parent");
  const admins = users.filter(u => u.user_metadata?.role === "admin");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students & Parents</h1>
          <p className="text-gray-500 text-sm mt-1">{students.length} accounts in the system.</p>
        </div>
        <AddUserButton />
      </div>

      {students.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-gray-400 text-sm">No students or parents added yet.</p>
            <p className="text-gray-400 text-xs mt-1">Click &ldquo;Add Student / Parent&rdquo; to create the first account.</p>
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
                  <th className="px-5 py-4 font-medium">Sessions</th>
                  <th className="px-5 py-4 font-medium">Upcoming</th>
                  <th className="px-5 py-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((u) => {
                  const name = u.user_metadata?.name ?? "—";
                  const email = u.email ?? "—";
                  const role = u.user_metadata?.role ?? "parent";
                  const counts = sessionMap[email] ?? { total: 0, upcoming: 0 };
                  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-xs flex-shrink-0">
                            {initials}
                          </div>
                          <span className="font-medium text-gray-900">{name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{email}</td>
                      <td className="px-5 py-4">
                        <Badge variant={role === "student" ? "default" : "outline"} className="capitalize text-xs">
                          {role}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{counts.total}</td>
                      <td className="px-5 py-4">
                        {counts.upcoming > 0 ? (
                          <span className="text-violet-600 font-semibold">{counts.upcoming}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
