import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  // Admin only
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, password, role } = await req.json();

  const dashboardUrl = role === "student"
    ? "https://mshoracetutoring.com/student"
    : "https://mshoracetutoring.com/parent";

  const roleLabel = role === "student" ? "Student" : "Parent";

  const { error } = await resend.emails.send({
    from: "MsHorace Tutoring <onboarding@resend.dev>",
    to: [email],
    replyTo: "MsHoraceTutoring06@gmail.com",
    subject: `Welcome to MsHorace Tutoring — Your Login is Ready`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Welcome to MsHorace Tutoring!</p>
  </div>

  <div style="padding:28px 32px;">
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1f2937;">Hi ${name}! 👋</h2>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
      Your ${roleLabel} account has been created. Here are your login details — please keep these safe.
    </p>

    <div style="background:#f5f3ff;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #ede9fe;color:#6b7280;font-size:14px;width:35%;">Login URL</td>
          <td style="padding:8px 0;border-bottom:1px solid #ede9fe;font-size:14px;">
            <a href="https://mshoracetutoring.com/login" style="color:#7c3aed;font-weight:600;">mshoracetutoring.com/login</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #ede9fe;color:#6b7280;font-size:14px;">Email</td>
          <td style="padding:8px 0;border-bottom:1px solid #ede9fe;color:#111827;font-size:14px;font-weight:600;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Password</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;font-family:monospace;letter-spacing:0.05em;">${password}</td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;margin-bottom:24px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">
        Go to My Dashboard
      </a>
    </div>

    <div style="background:#fef9f0;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:12px 16px;">
      <p style="margin:0;color:#78350f;font-size:13px;">
        <strong>Tip:</strong> You can change your password after logging in from your account settings.
      </p>
    </div>
  </div>

  <div style="background:#f5f3ff;padding:24px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" width="100" style="display:block;margin:0 auto 12px;" />
    <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Questions? Call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a> or email <a href="mailto:MsHoraceTutoring06@gmail.com" style="color:#7c3aed;">MsHoraceTutoring06@gmail.com</a></p>
    <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring &nbsp;·&nbsp; White Plains, Maryland</p>
  </div>
</div>
</body>
</html>`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
