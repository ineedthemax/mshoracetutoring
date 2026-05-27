import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const admin = createAdminClient();

  // Always fetch the real profile ID — don't trust the client to send it correctly
  const { data: existing } = await admin
    .from("tutor_profile")
    .select("id")
    .single();

  if (!existing?.id) {
    return NextResponse.json({ error: "Profile record not found" }, { status: 404 });
  }

  const rate = Number(body.hourlyRate);

  const { error } = await admin
    .from("tutor_profile")
    .update({
      name: body.name ?? "Stenita Horace",
      title: body.title ?? "",
      experience: body.experience ?? "",
      hourly_rate: isNaN(rate) ? 75 : rate,
      bio: body.bio ?? "",
      teaching_style: body.teachingStyle ?? "",
      profile_photo_url: body.photoUrl || null,
    })
    .eq("id", existing.id);

  if (error) {
    console.error("Save profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
