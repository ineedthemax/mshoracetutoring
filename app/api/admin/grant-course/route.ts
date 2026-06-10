import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { studentId, courseSlug } = await req.json();

  if (!studentId || !courseSlug) {
    return NextResponse.json({ error: "Missing studentId or courseSlug" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Get course ID from slug
  const { data: course } = await admin
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .single();

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // Check if purchase already exists
  const { data: existing } = await admin
    .from("course_purchases")
    .select("id")
    .eq("student_id", studentId)
    .eq("course_id", course.id)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Student already has access to this course" }, { status: 400 });
  }

  // Insert course purchase
  const { error } = await admin
    .from("course_purchases")
    .insert({
      student_id: studentId,
      course_id: course.id,
      amount_cents: 0, // Mark as admin-granted
      purchased_at: new Date().toISOString(),
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
