import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

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
    payment_status: "manual",
    status: "upcoming",
    duration_minutes: DURATIONS[sessionType] ?? 60,
    scheduled_at: new Date(`${sessionDate}T${sessionTime}`).toISOString(),
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (sendEmail) {
    const formattedDate = new Date(sessionDate).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric"
    });

    await resend.emails.send({
      from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
      to: [parentEmail],
      replyTo: "MsHoraceTutoring06@gmail.com",
      subject: `Session Confirmed - ${subject} on ${formattedDate}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Session Confirmed!</p>
  </div>
  <div style="padding:24px 32px;">
    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Session Details</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:40%;">Type</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${SESSION_LABELS[sessionType]}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${subject}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${formattedDate}</td></tr>
      <tr><td style="padding:10px 0;color:#6b7280;font-size:14px;">Time</td><td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">${displayTime} Eastern Time</td></tr>
    </table>
  </div>
  <div style="margin:0 32px 20px;background:#f5f3ff;border-radius:12px;padding:20px;">
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.05em;">Your Zoom Link</p>
    <a href="${zoomUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Join Zoom Meeting</a>
  </div>
  ${notes ? `<div style="margin:0 32px 20px;background:#fef9f0;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:0 10px 10px 0;"><p style="margin:0;color:#78350f;font-size:14px;">${notes}</p></div>` : ""}
  <div style="background:#f5f3ff;padding:24px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" width="100" style="display:block;margin:0 auto 12px;" />
    <p style="margin:0;color:#6b7280;font-size:13px;">Questions? Call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a></p>
  </div>
</div>
</body>
</html>`,
    });
  }

  return NextResponse.json({ success: true });
}
