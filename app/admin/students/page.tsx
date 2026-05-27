import { createAdminClient } from "@/lib/supabase/admin";
import { AddUserButton } from "./AddUserButton";
import { StudentsTable } from "./StudentsTable";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const admin = createAdminClient();

  const [
    { data: { users }, error },
    { data: sessions },
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 200 }),
    admin.from("sessions").select("parent_email, status"),
  ]);

  if (error) {
    return <div className="p-8 text-red-500">Failed to load users: {error.message}</div>;
  }

  const sessionMap: Record<string, { total: number; upcoming: number }> = {};
  for (const s of sessions ?? []) {
    if (!sessionMap[s.parent_email]) sessionMap[s.parent_email] = { total: 0, upcoming: 0 };
    sessionMap[s.parent_email].total++;
    if (s.status === "upcoming") sessionMap[s.parent_email].upcoming++;
  }

  const clients = users
    .filter(u => u.user_metadata?.role === "student" || u.user_metadata?.role === "parent")
    .map(u => {
      const email = u.email ?? "";
      const counts = sessionMap[email] ?? { total: 0, upcoming: 0 };
      return {
        id: u.id,
        name: u.user_metadata?.name ?? "—",
        email,
        role: u.user_metadata?.role ?? "parent",
        parentEmail: u.user_metadata?.parent_email ?? "",
        totalSessions: counts.total,
        upcomingSessions: counts.upcoming,
        joined: u.created_at,
      };
    });

  const parentEmails = clients
    .filter(u => u.role === "parent")
    .map(u => ({ name: u.name, email: u.email }));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students & Parents</h1>
          <p className="text-gray-500 text-sm mt-1">{clients.length} accounts in the system.</p>
        </div>
        <AddUserButton parentOptions={parentEmails} />
      </div>

      <StudentsTable users={clients} />
    </div>
  );
}
