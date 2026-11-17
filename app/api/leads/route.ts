import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

const EMAIL_FOOTER = `
 <div style="background:#f5f3ff;padding:20px 32px;text-align:center;">
 <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="90" style="display:block;margin:0 auto 10px;" />
 <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring · White Plains, Maryland · <a href="https://mshoracetutoring.com" style="color:#7c3aed;">mshoracetutoring.com</a></p>
 </div>
`;

function sanitize(str: string): string {
 return str.replace(/<[^>]*>/g, "").trim().slice(0, 500);
}

export async function POST(req: NextRequest) {
 try {
 const body = await req.json();

 // Honeypot — bots fill this
 if (body.website) return NextResponse.json({ success: true });

 const name = sanitize(body.name ?? "");
 const email = sanitize(body.email ?? "");
 const phone = sanitize(body.phone ?? "");
 const grade = sanitize(body.grade ?? "");
 const subject = sanitize(body.subject ?? "");
 const source = sanitize(body.source ?? "website");

 if (!name || !email) {
 return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
 }
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
 }

 const admin = createAdminClient();

 // Save lead to database
 const { data: lead, error: dbError } = await admin
 .from("leads")
 .insert({
 name, email, phone, grade, subject, source,
 status: "new",
 follow_up_1_sent_at: new Date().toISOString(),
 })
 .select()
 .single();

 if (dbError) {
 console.error("Lead insert error:", dbError);
 // Don't fail the user — still send the email
 }

 // Email 1: Welcome + free resource (sent immediately)
 const firstName = name.split(" ")[0];
 const subjectLine = grade || subject
 ? `${grade ? `${grade} ` : ""}${subject || "Math"} help for ${firstName} - here's what to do next`
 : `Thanks for reaching out, ${firstName}!`;

 await resend.emails.send({
 from: "Stenita at MsHorace Tutoring <hello@mshoracetutoring.com>",
 to: [email],
 replyTo: "MsHoraceTutoring06@gmail.com",
 subject: subjectLine,
 html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
 <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
 <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
 <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">You're in the right place </p>
 </div>
 <div style="padding:28px 32px;">
 <p style="margin:0 0 16px;font-size:16px;color:#111827;">Hi <strong>${firstName}</strong>,</p>
 <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">Thanks for reaching out! I'm Stenita - Ms. Horace - and I help ${grade ? `${grade} ` : ""}students go from confused to confident in math.</p>
 ${grade || subject ? `<p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">I saw you're looking for help with <strong>${subject || "math"}${grade ? ` (${grade})` : ""}</strong>. That's exactly my specialty.</p>` : ""}
 <div style="background:#f5f3ff;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
 <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.08em;">Here's what happens next</p>
 <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2;">
 <li>Browse available session times and book whenever you're ready</li>
 <li>Your child gets a personalized session - no cookie-cutter lessons</li>
 <li>After every session you get a written progress report</li>
 </ol>
 </div>
 <div style="text-align:center;margin-bottom:24px;">
 <a href="https://mshoracetutoring.com/book" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Book a Session →</a>
 </div>
 <p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.7;">Not ready to commit yet? No pressure. You can also check out our <a href="https://mshoracetutoring.com/pricing" style="color:#7c3aed;font-weight:600;">session packages</a> or <a href="https://mshoracetutoring.com/courses" style="color:#7c3aed;font-weight:600;">affordable study resources</a> starting at $7.</p>
 <p style="margin:16px 0 0;font-size:14px;color:#374151;">Questions? Just reply to this email - I read every one.</p>
 <p style="margin:16px 0 0;font-size:14px;color:#374151;">- Stenita (Ms. Horace)</p>
 </div>
 ${EMAIL_FOOTER}
</div>
</body>
</html>`,
 });

 // Notify Ms. Horace of new lead
 await resend.emails.send({
 from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
 to: ["MsHoraceTutoring06@gmail.com"],
 subject: `New Lead: ${name}${grade ? ` · ${grade}` : ""}${subject ? ` · ${subject}` : ""}`,
 html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
 <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;margin-bottom:20px;">
 <h2 style="color:#1d4ed8;margin:0 0 8px;">New Lead Captured</h2>
 <p style="color:#1e40af;margin:0;font-size:14px;">Someone just filled out the interest form on your site.</p>
 </div>
 <table style="width:100%;border-collapse:collapse;font-size:14px;">
 <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:40%;">Name</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">${name}</td></tr>
 <tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${email}</td></tr>
 ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${phone}</td></tr>` : ""}
 ${grade ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Grade</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${grade}</td></tr>` : ""}
 ${subject ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Subject</td><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;">${subject}</td></tr>` : ""}
 <tr><td style="padding:8px 0;color:#6b7280;">Source</td><td style="padding:8px 0;color:#111827;">${source}</td></tr>
 </table>
 <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Welcome email sent automatically. <a href="https://mshoracetutoring.com/admin/leads" style="color:#7c3aed;">View all leads →</a></p>
 </div>`,
 });

 return NextResponse.json({ success: true });
 } catch (error: any) {
 console.error("Lead capture error:", error);
 return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
 }
}
