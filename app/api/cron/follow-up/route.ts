import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

const EMAIL_FOOTER = `
  <div style="background:#f5f3ff;padding:20px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="90" style="display:block;margin:0 auto 10px;" />
    <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring · White Plains, Maryland · <a href="https://mshoracetutoring.com" style="color:#7c3aed;">mshoracetutoring.com</a></p>
    <p style="margin:8px 0 0;color:#d1d5db;font-size:11px;"><a href="https://mshoracetutoring.com/unsubscribe" style="color:#d1d5db;">Unsubscribe</a></p>
  </div>
`;

export async function GET(req: NextRequest) {
  // Verify this is called by Vercel Cron (or our secret in dev)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const now = new Date();
  let sent = 0;

  // ── Day-3 follow-up: leads created ≥3 days ago, follow_up_2 not sent ──
  const day3Cutoff = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const { data: day3Leads } = await admin
    .from("leads")
    .select("*")
    .is("follow_up_2_sent_at", null)
    .neq("status", "booked")
    .neq("status", "lost")
    .lte("created_at", day3Cutoff);

  for (const lead of day3Leads ?? []) {
    const firstName = lead.name.split(" ")[0];
    try {
      await resend.emails.send({
        from: "Stenita at MsHorace Tutoring <hello@mshoracetutoring.com>",
        to: [lead.email],
        replyTo: "MsHoraceTutoring06@gmail.com",
        subject: `${firstName}, still looking for math help?`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
  </div>
  <div style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:16px;color:#111827;">Hey <strong>${firstName}</strong>,</p>
    <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">I wanted to follow up and see if you still have questions about getting your student set up with tutoring.</p>
    <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">A lot of parents reach out when they're worried but then hesitate — totally understandable. Here's what I always tell them: <strong>the sooner we address gaps, the easier it is to close them.</strong></p>
    <div style="background:#faf5ff;border-left:4px solid #7c3aed;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;font-style:italic;">"My daughter went from a D to a B+ in one semester. Ms. Horace made everything click."</p>
      <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">— Parent in Waldorf, MD</p>
    </div>
    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://mshoracetutoring.com/book" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Book a Session →</a>
    </div>
    <p style="margin:0 0 8px;font-size:14px;color:#374151;">Not ready to book? Browse our <a href="https://mshoracetutoring.com/pricing" style="color:#7c3aed;font-weight:600;">affordable packages</a> starting at $25/session, or grab a <a href="https://mshoracetutoring.com/courses" style="color:#7c3aed;font-weight:600;">practice packet</a> for $7 to see how I teach.</p>
    <p style="margin:16px 0 0;font-size:14px;color:#374151;">— Stenita (Ms. Horace)</p>
  </div>
  ${EMAIL_FOOTER}
</div>
</body>
</html>`,
      });

      await admin
        .from("leads")
        .update({ follow_up_2_sent_at: now.toISOString() })
        .eq("id", lead.id);

      sent++;
    } catch (err) {
      console.error(`Day-3 email failed for lead ${lead.id}:`, err);
    }
  }

  // ── Day-7 follow-up: leads created ≥7 days ago, follow_up_3 not sent ──
  const day7Cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: day7Leads } = await admin
    .from("leads")
    .select("*")
    .is("follow_up_3_sent_at", null)
    .neq("status", "booked")
    .neq("status", "lost")
    .lte("created_at", day7Cutoff);

  for (const lead of day7Leads ?? []) {
    const firstName = lead.name.split(" ")[0];
    try {
      await resend.emails.send({
        from: "Stenita at MsHorace Tutoring <hello@mshoracetutoring.com>",
        to: [lead.email],
        replyTo: "MsHoraceTutoring06@gmail.com",
        subject: `Last note from Ms. Horace, ${firstName}`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
  </div>
  <div style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:16px;color:#111827;">Hi <strong>${firstName}</strong>,</p>
    <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">I'll keep this short — this is my last follow-up. I don't want to be in your inbox if you're not interested.</p>
    <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">But if math is still a struggle for your student, I want you to know the door is always open. You can book anytime at the link below — no pressure, no sales call.</p>
    <div style="background:#fef3c7;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#92400e;">💡 Before you go — a free resource:</p>
      <p style="margin:0;font-size:14px;color:#78350f;line-height:1.7;">Our digital practice packets ($7) are a great low-commitment way to see how I break down math concepts. Many families start there before booking sessions.</p>
    </div>
    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://mshoracetutoring.com/book" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;margin-right:12px;">Book a Session</a>
      <a href="https://mshoracetutoring.com/courses" style="display:inline-block;background:#f5f3ff;color:#7c3aed;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;border:2px solid #ddd6fe;">Get a Packet</a>
    </div>
    <p style="margin:16px 0 0;font-size:14px;color:#374151;">Wishing your student a great school year. 🎓</p>
    <p style="margin:8px 0 0;font-size:14px;color:#374151;">— Stenita (Ms. Horace)</p>
  </div>
  ${EMAIL_FOOTER}
</div>
</body>
</html>`,
      });

      await admin
        .from("leads")
        .update({ follow_up_3_sent_at: now.toISOString(), status: "contacted" })
        .eq("id", lead.id);

      sent++;
    } catch (err) {
      console.error(`Day-7 email failed for lead ${lead.id}:`, err);
    }
  }

  return NextResponse.json({ ok: true, sent });
}
