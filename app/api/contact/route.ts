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
    subject: `New Message from ${name}: ${subject || "General Inquiry"}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">New Website Message</p>
  </div>

  <div style="padding:28px 32px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;width:100px;">From</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:15px;color:#111827;font-weight:600;">${name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;"><a href="mailto:${email}" style="color:#7c3aed;font-weight:600;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Subject</td>
        <td style="padding:10px 0;font-size:14px;color:#111827;">${subject || "General Inquiry"}</td>
      </tr>
    </table>

    <div style="margin-top:20px;background:#f5f3ff;border-radius:12px;padding:18px 20px;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.8;white-space:pre-wrap;">${message}</p>
    </div>

    <div style="margin-top:24px;text-align:center;">
      <a href="mailto:${email}" style="display:inline-block;background:#7c3aed;color:#fff;padding:13px 32px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Reply to ${name}</a>
    </div>
  </div>

  <div style="background:#f5f3ff;padding:20px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="100" style="display:block;margin:0 auto 10px;" />
    <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring &nbsp;·&nbsp; White Plains, Maryland &nbsp;·&nbsp; <a href="https://mshoracetutoring.com" style="color:#7c3aed;">mshoracetutoring.com</a></p>
  </div>
</div>
</body>
</html>`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
