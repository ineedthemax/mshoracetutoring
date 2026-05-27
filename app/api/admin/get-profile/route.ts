import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("tutor_profile")
    .select("*")
    .single();

  if (error || !data) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({
    id: data.id,
    name: data.name ?? "Stenita Horace",
    title: data.title ?? "Math Tutor | Pre-Algebra & Algebra 1 Specialist",
    experience: data.experience ?? "6+ years",
    hourlyRate: data.hourly_rate ?? 75,
    bio: data.bio ?? "",
    teachingStyle: data.teaching_style ?? "",
    photoUrl: data.profile_photo_url ?? "",
  });
}
