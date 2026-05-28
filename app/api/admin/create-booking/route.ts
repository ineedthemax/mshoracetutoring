import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendSessionEmails } from "@/lib/sendSessionEmails";

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

const SESSION_PRICES: Record<string, number> = {
  "solo-30": 4000,
  "solo-60": 7500,
  "group":   2500,
};

const SESSION_LABELS: Record<string, string> = {
  "solo-30": "30-Minute 1-on-1 Session",
  "solo-60": "60-Minute 1-on-1 Session",
  "group":   "Group Class Session",
};

const DURATIONS: Record<string, number> = {
  "solo-30": 30,
  "solo-60": 60,
  "group":   90,
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { parentName, parentEmail, subject, gradeLevel, sessionType, sessionDate, sessionTime, notes, sendEmail } = await req.json();

  if (!parentName || !parentEmail || !sessionDate || !sessionTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();
  const zoomUrl = ZOOM_LINKS[sessionType] ?? ZOOM_LINKS["solo-60"];

  // Format time for display (HH:MM → 12hr)
  const [h, m] = sessionTime.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayTime = `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, "0")} ${ampm}`;

  const { error: dbError } = await admin.from("sessions").insert({
    parent_email: parentEmail,
    parent_name: parentName,
    subject,
    grade_level: gradeLevel,
    session_type: sessionType,
    session_date: sessionDate,
    session_time: displayTime,
    zoom_join_url: zoomUrl,
    price_cents: SESSION_PRICES[sessionType] ?? 7500,
    payment_status: "paid",
    status: "upcoming",
    duration_minutes: DURATIONS[sessionType] ?? 60,
    scheduled_at: new Date(`${sessionDate}T${sessionTime}`).toISOString(),
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (sendEmail) {
    await sendSessionEmails({
      parentName,
      parentEmail,
      subject,
      sessionType,
      sessionDate,
      sessionTime: displayTime,
      zoomUrl,
      notes,
    });
  }

  return NextResponse.json({ success: true });
}
