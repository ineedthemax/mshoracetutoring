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

  const { error } = await admin
    .from("tutor_profile")
    .update({
      name: body.name,
      title: body.title,
      experience: body.experience,
      hourly_rate: Number(body.hourlyRate),
      bio: body.bio,
      teaching_style: body.teachingStyle,
      profile_photo_url: body.photoUrl || null,
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
