import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "MsHorace Tutoring <onboarding@resend.dev>",
    to: ["MsHoraceTutoring06@gmail.com"],
    replyTo: email,
    subject: `New Contact Form Message: ${subject || "General Inquiry"}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">New Contact Form Message</h1>
      <p style="color:#ddd6fe;margin:6px 0 0;font-size:13px;">MsHorace Tutoring Website</p>
    </div>

    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#9ca3af;font-weight:600;width:120px;">FROM</td>
          <td style="padding:8px 0;font-size:14px;color:#111827;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#9ca3af;font-weight:600;">EMAIL</td>
          <td style="padding:8px 0;font-size:14px;color:#7c3aed;"><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#9ca3af;font-weight:600;">SUBJECT</td>
          <td style="padding:8px 0;font-size:14px;color:#111827;">${subject || "General Inquiry"}</td>
        </tr>
      </table>

      <div style="margin-top:20px;background:#f5f3ff;border-radius:12px;padding:16px 20px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#5b21b6;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
      </div>

      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${email}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">Reply to ${name}</a>
      </div>
    </div>

    <div style="padding:16px 32px;border-top:1px solid #f3f4f6;text-align:center;">
      <p style="margin:0;color:#d1d5db;font-size:12px;">MsHorace Tutoring · mshoracetutoring.com</p>
    </div>
  </div>
</body>
</html>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
