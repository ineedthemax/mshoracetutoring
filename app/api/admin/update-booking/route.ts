import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

const DURATIONS: Record<string, number> = {
  "solo-30": 30, "solo-60": 60, "group": 90,
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, parentName, parentEmail, subject, gradeLevel, sessionType, sessionDate, sessionTime, status } = await req.json();

  if (!id) return NextResponse.json({ error: "Missing session ID" }, { status: 400 });

  // Convert HH:MM to 12hr display format
  const [h, m] = sessionTime.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayTime = `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, "0")} ${ampm}`;

  const admin = createAdminClient();

  const { error } = await admin
    .from("sessions")
    .update({
      parent_name: parentName,
      parent_email: parentEmail,
      subject,
      grade_level: gradeLevel,
      session_type: sessionType,
      session_date: sessionDate,
      session_time: displayTime,
      status,
      zoom_join_url: ZOOM_LINKS[sessionType] ?? ZOOM_LINKS["solo-60"],
      duration_minutes: DURATIONS[sessionType] ?? 60,
      scheduled_at: sessionDate && sessionTime
        ? new Date(`${sessionDate}T${sessionTime}`).toISOString()
        : null,
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
