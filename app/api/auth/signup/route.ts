import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  const admin = createAdminClient();

  // Create user via admin so no email confirmation needed
  const { data, error } = await admin.auth.admin.createUser({
    email: email.toLowerCase().trim(),
    password,
    email_confirm: true,
    user_metadata: { name, role: role || "parent" },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Profile is created automatically via the DB trigger
  return NextResponse.json({ userId: data.user.id });
}
