import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const EMAIL_FOOTER = `
 <div style="background:#f5f3ff;padding:24px 32px;text-align:center;">
 <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="100" style="display:block;margin:0 auto 12px;" />
 <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Questions? Call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a> or email <a href="mailto:MsHoraceTutoring06@gmail.com" style="color:#7c3aed;">MsHoraceTutoring06@gmail.com</a></p>
 <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring &nbsp;·&nbsp; White Plains, Maryland &nbsp;·&nbsp; <a href="https://mshoracetutoring.com" style="color:#7c3aed;">mshoracetutoring.com</a></p>
 </div>
`;

function sanitize(str: unknown, max = 200): string {
 return String(str ?? "").replace(/<[^>]*>/g, "").trim().slice(0, max);
}

export async function POST(request: Request) {
 try {
 const body = await request.json();
 const parentName = sanitize(body.parentName);
 const parentEmail = sanitize(body.parentEmail);
 const subject = sanitize(body.subject);
 const gradeLevel = sanitize(body.gradeLevel);
 const date = sanitize(body.date);
 const time = sanitize(body.time);

 if (!parentEmail || !parentName) {
 return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
 }

 const admin = createAdminClient();

 // Create session in DB (free consultation, no payment needed)
 const { error: dbError } = await admin.from("sessions").insert({
 parent_email: parentEmail,
 parent_name: parentName,
 subject: subject || "Free Consultation",
 grade_level: gradeLevel,
 session_type: "free-consultation",
 session_date: date || null,
 session_time: time,
 zoom_join_url: "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
 price_cents: 0,
 payment_status: "free",
 status: "upcoming",
 duration_minutes: 15,
 scheduled_at: date && time ? new Date(`${date}T${convertTo24hr(time)}`).toISOString() : new Date().toISOString(),
 });

 if (dbError) {
 console.error("Free booking DB error:", dbError);
 return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
 }

 // Send confirmation to parent
 if (parentEmail) {
 await resend.emails.send({
 from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
 to: [parentEmail],
 replyTo: "MsHoraceTutoring06@gmail.com",
 subject: `Your Free Consultation is Confirmed! `,
 html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
 <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
 <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
 <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Free Consultation Booked!</p>
 </div>
 <div style="padding:28px 32px 0;">
 <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 18px;margin-bottom:24px;text-align:center;">
 <p style="margin:0;color:#16a34a;font-weight:700;font-size:15px;">Complimentary 15-Minute Consultation</p>
 </div>
 <h2 style="margin:0 0 8px;font-size:16px;color:#374151;">Hi ${parentName.split(" ")[0]},</h2>
 <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.7;">
 I'm looking forward to meeting you! This free 15-minute call is a chance to talk about your student's goals and see if working together is a great fit.
 </p>
 <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1f2937;">Consultation Details</h3>
 <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
 ${date ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:40%;">Date</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${date}</td></tr>` : ""}
 ${time ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Time</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${time} Eastern Time</td></tr>` : ""}
 ${subject ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Subject</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${subject}</td></tr>` : ""}
 <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Duration</td><td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">15 minutes</td></tr>
 </table>
 <div style="background:#f5f3ff;border-radius:12px;padding:20px;margin-bottom:24px;">
 <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.08em;">Zoom Link</p>
 <p style="margin:0 0 14px;color:#374151;font-size:14px;">Click to join at your scheduled time:</p>
 <a href="https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Join Zoom Meeting</a>
 </div>
 <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">
 Have any questions before we meet? Feel free to reply to this email or text me at <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a>.
 </p>
 <p style="font-size:14px;color:#374151;margin:0;font-weight:600;">- Ms. Horace</p>
 </div>
 <div style="padding:24px 32px 0;"></div>
 ${EMAIL_FOOTER}
</div>
</body>
</html>`,
 });
 }

 // Notify Ms. Horace
 await resend.emails.send({
 from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
 to: ["MsHoraceTutoring06@gmail.com"],
 subject: ` New Free Consultation: ${parentName}`,
 html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
 <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin-bottom:20px;">
 <h2 style="color:#5b21b6;margin:0 0 8px;"> New Free Consultation Booked</h2>
 <p style="color:#6d28d9;margin:0;font-size:14px;">A parent just booked a free intro call.</p>
 </div>
 <table style="width:100%;border-collapse:collapse;font-size:14px;">
 <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:40%;">Parent</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">${parentName}</td></tr>
 <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${parentEmail}</td></tr>
 ${subject ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Subject</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${subject}</td></tr>` : ""}
 ${gradeLevel ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Grade</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${gradeLevel}</td></tr>` : ""}
 ${date ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Date</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">${date}</td></tr>` : ""}
 ${time ? `<tr><td style="padding:8px 0;color:#6b7280;">Time</td><td style="padding:8px 0;color:#111827;font-weight:600;">${time} ET</td></tr>` : ""}
 </table>
 <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Confirmation email sent to parent automatically. <a href="https://mshoracetutoring.com/admin" style="color:#7c3aed;">View dashboard →</a></p>
</div>`,
 });

 return NextResponse.json({ success: true });
 } catch (err: any) {
 console.error("Free booking error:", err);
 return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
 }
}

function convertTo24hr(time: string): string {
 const [timePart, modifier] = time.split(" ");
 if (!modifier) return time;
 let [hours, minutes] = timePart.split(":").map(Number);
 if (modifier === "PM" && hours !== 12) hours += 12;
 if (modifier === "AM" && hours === 12) hours = 0;
 return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}
