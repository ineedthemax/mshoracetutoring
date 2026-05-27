import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { name, email, password, role, parent_email } = await request.json();

  const admin = createAdminClient();

  const metadata: Record<string, string> = { name, role: role || "parent" };
  if (parent_email) metadata.parent_email = parent_email;

  const { data, error } = await admin.auth.admin.createUser({
    email: email.toLowerCase().trim(),
    password,
    email_confirm: true,
    user_metadata: metadata,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ userId: data.user.id });
}
