import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

const SESSION_LABELS: Record<string, string> = {
  "solo-30": "30-Minute 1-on-1 Session",
  "solo-60": "60-Minute 1-on-1 Session",
  "group":   "Group Class Session",
};

const FOOTER = `
  <div style="background:#f5f3ff;padding:24px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" width="100" style="display:block;margin:0 auto 12px;" />
    <p style="margin:0;color:#6b7280;font-size:13px;">Questions? Call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a></p>
    <p style="margin:0;color:#9ca3af;font-size:12px;margin-top:4px;">MsHorace Tutoring · White Plains, Maryland</p>
  </div>
`;

interface SessionEmailParams {
  parentName: string;
  parentEmail: string;
  subject: string;
  sessionType: string;
  sessionDate: string;      // "YYYY-MM-DD"
  sessionTime: string;      // "3:00 PM"
  zoomUrl: string;
  notes?: string;
}

function buildEmailHtml({
  recipientName,
  subject,
  sessionType,
  formattedDate,
  sessionTime,
  zoomUrl,
  notes,
  isStudent,
}: {
  recipientName: string;
  subject: string;
  sessionType: string;
  formattedDate: string;
  sessionTime: string;
  zoomUrl: string;
  notes?: string;
  isStudent: boolean;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">
      ${isStudent ? "Your Session is Booked! 🎉" : "Session Confirmed!"}
    </p>
  </div>

  <div style="padding:24px 32px 0;">
    <p style="margin:0 0 20px;font-size:15px;color:#374151;">
      Hi <strong>${recipientName}</strong>,${isStudent
        ? " you have a tutoring session coming up with Ms. Horace. Get ready to level up! 💪"
        : " your session has been confirmed. Here are the details:"
      }
    </p>

    <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Session Details</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:40%;">Type</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${SESSION_LABELS[sessionType] ?? sessionType}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${subject}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${formattedDate}</td></tr>
      <tr><td style="padding:10px 0;color:#6b7280;font-size:14px;">Time</td><td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">${sessionTime} Eastern Time</td></tr>
    </table>
  </div>

  <div style="margin:0 32px 20px;background:#f5f3ff;border-radius:12px;padding:20px;">
    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.05em;">Your Zoom Link</p>
    <p style="margin:0 0 14px;color:#374151;font-size:13px;">Click the button at your session time to join:</p>
    <a href="${zoomUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Join Zoom Meeting</a>
  </div>

  ${isStudent ? `
  <div style="margin:0 32px 20px;background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 10px 10px 0;padding:14px 18px;">
    <p style="margin:0;font-size:13px;font-weight:700;color:#15803d;margin-bottom:4px;">Quick Tips</p>
    <ul style="margin:0;padding-left:18px;color:#166534;font-size:13px;line-height:1.8;">
      <li>Join a few minutes early to test your audio/video</li>
      <li>Have your notes, textbook, or homework ready</li>
      <li>Write down any questions you want to ask</li>
    </ul>
  </div>` : ""}

  ${notes ? `<div style="margin:0 32px 20px;background:#fef9f0;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:0 10px 10px 0;"><p style="margin:0;color:#78350f;font-size:14px;">${notes}</p></div>` : ""}

  ${FOOTER}
</div>
</body>
</html>`;
}

export async function sendSessionEmails(params: SessionEmailParams) {
  const { parentName, parentEmail, subject, sessionType, sessionDate, sessionTime, zoomUrl, notes } = params;
  const admin = createAdminClient();

  const formattedDate = new Date(sessionDate).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  // 1. Send to parent
  await resend.emails.send({
    from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
    to: [parentEmail],
    replyTo: "MsHoraceTutoring06@gmail.com",
    subject: `Session Confirmed - ${subject} on ${formattedDate}`,
    html: buildEmailHtml({ recipientName: parentName, subject, sessionType, formattedDate, sessionTime, zoomUrl, notes, isStudent: false }),
  });

  // 2. Find linked student and send them a student-specific email
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 200 });
  const linkedStudent = users.find(u =>
    u.user_metadata?.role === "student" &&
    u.user_metadata?.parent_email?.toLowerCase() === parentEmail.toLowerCase()
  );

  if (linkedStudent?.email) {
    const studentName = linkedStudent.user_metadata?.name ?? "there";
    await resend.emails.send({
      from: "MsHorace Tutoring <hello@mshoracetutoring.com>",
      to: [linkedStudent.email],
      replyTo: "MsHoraceTutoring06@gmail.com",
      subject: `Your ${subject} Session is Booked! 🎉`,
      html: buildEmailHtml({ recipientName: studentName, subject, sessionType, formattedDate, sessionTime, zoomUrl, notes, isStudent: true }),
    });
  }
}
