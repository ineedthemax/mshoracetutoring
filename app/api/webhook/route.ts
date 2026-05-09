import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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

// Map product keys to Supabase Storage file paths
const DIGITAL_PRODUCT_FILES: Record<string, string> = {
  "pre-algebra-practice":   "Practice Problems/PreAlgebra_Practice_Packet.pdf",
  "algebra1-practice":      "Practice Problems/AlgebraI_Practice_Packet.pdf",
  "pre-algebra-study-guide":"Study Guide/PreAlgebra_Study_Guide.pdf",
  "algebra1-study-guide":   "Study Guide/AlgebraI_Study_Guide.pdf",
  "pre-algebra-exam-prep":  "Exam Prep/PreAlgebra_Exam_Prep.pdf",
  "algebra1-exam-prep":     "Exam Prep/AlgebraI_Exam_Prep.pdf",
};

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

const SESSION_LABELS: Record<string, string> = {
  "solo-30": "30-Minute 1-on-1 Session",
  "solo-60": "60-Minute 1-on-1 Session",
  "group":   "Group Class Session",
};

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const meta = session.metadata ?? {};
    const admin = createAdminClient();

    // --- Digital Product Purchase ---
    if (meta.type === "digital_product") {
      const buyerEmail = session.customer_email ?? meta.buyerEmail ?? "";
      const productName = meta.productName ?? "Study Resource";
      const filePath = DIGITAL_PRODUCT_FILES[meta.productKey];

      // Generate a signed download URL valid for 7 days
      let downloadUrl = "";
      if (filePath) {
        const { data: signedData } = await admin.storage
          .from("digital-products")
          .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days
        downloadUrl = signedData?.signedUrl ?? "";
      }

      await admin.from("digital_purchases").insert({
        buyer_email: buyerEmail,
        product_key: meta.productKey,
        product_name: productName,
        amount_cents: session.amount_total,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent,
        status: "paid",
        download_sent: !!downloadUrl,
      });

      await resend.emails.send({
        from: "MsHorace Tutoring <onboarding@resend.dev>",
        to: [buyerEmail],
        replyTo: "MsHoraceTutoring06@gmail.com",
        subject: `Your Download is Ready - ${productName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Your Download is Ready!</p>
  </div>

  <div style="padding:28px 32px;">
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 18px;margin-bottom:24px;text-align:center;">
      <p style="margin:0;color:#16a34a;font-weight:700;font-size:15px;">Payment Received - $${((session.amount_total ?? 0) / 100).toFixed(0)}</p>
    </div>

    <h2 style="margin:0 0 8px;font-size:16px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">You purchased:</h2>
    <div style="background:#f5f3ff;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#5b21b6;">${productName}</p>
    </div>

    ${downloadUrl ? `
    <div style="text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 14px;color:#374151;font-size:14px;line-height:1.6;">Your PDF is ready to download. Click the button below:</p>
      <a href="${downloadUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Download PDF Now</a>
      <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">Link expires in 7 days. Save your PDF after downloading.</p>
    </div>
    ` : `
    <div style="background:#fef9f0;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:14px 18px;margin-bottom:24px;">
      <p style="margin:0;color:#78350f;font-size:14px;">Your download will be sent to <strong>${buyerEmail}</strong> within 1 hour.</p>
    </div>
    `}
  </div>

  ${EMAIL_FOOTER}
</div>
</body>
</html>`,
      });

      return NextResponse.json({ received: true });
    }

    const zoomUrl = ZOOM_LINKS[meta.sessionType] ?? ZOOM_LINKS["solo-60"];
    const sessionLabel = SESSION_LABELS[meta.sessionType] ?? "Tutoring Session";
    const parentEmail = meta.parentEmail ?? session.customer_email;
    const parentName = meta.parentName ?? "Parent";
    const amountDollars = ((session.amount_total ?? 0) / 100).toFixed(0);

    // Save booking to sessions table
    await admin.from("sessions").insert({
      parent_email: parentEmail,
      parent_name: parentName,
      subject: meta.subject ?? "",
      grade_level: meta.gradeLevel ?? "",
      session_type: meta.sessionType ?? "solo-60",
      session_date: meta.date ?? null,
      session_time: meta.time ?? "",
      zoom_join_url: zoomUrl,
      price_cents: session.amount_total,
      payment_status: "paid",
      stripe_payment_id: session.payment_intent,
      stripe_session_id: session.id,
      status: "upcoming",
      scheduled_at: meta.date && meta.time
        ? new Date(`${meta.date}T${convertTo24hr(meta.time)}`).toISOString()
        : new Date().toISOString(),
      duration_minutes:
        meta.sessionType === "solo-30" ? 30 :
        meta.sessionType === "group" ? 90 : 60,
    });

    // Save to payments table
    await admin.from("payments").upsert({
      amount_cents: session.amount_total,
      status: "succeeded",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
    }, { onConflict: "stripe_checkout_session_id" });

    // Send booking confirmation email to parent
    await resend.emails.send({
      from: "MsHorace Tutoring <onboarding@resend.dev>",
      to: [parentEmail],
      replyTo: "MsHoraceTutoring06@gmail.com",
      subject: `Booking Confirmed - ${meta.subject} on ${meta.date}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Booking Confirmed!</p>
  </div>

  <div style="padding:24px 32px 0;text-align:center;">
    <div style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:50px;padding:8px 20px;">
      <span style="color:#16a34a;font-weight:700;font-size:14px;">Payment Received - $${amountDollars}</span>
    </div>
  </div>

  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Session Details</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:40%;">Session Type</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${sessionLabel}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${meta.subject}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Grade Level</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${meta.gradeLevel}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${meta.date}</td></tr>
      <tr><td style="padding:10px 0;color:#6b7280;font-size:14px;">Time</td><td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">${meta.time} Eastern Time</td></tr>
    </table>
  </div>

  <div style="margin:20px 32px 0;background:#f5f3ff;border-radius:12px;padding:20px;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.08em;">Your Zoom Link</p>
    <p style="margin:0 0 14px;color:#374151;font-size:14px;">Click the button at your session time to join:</p>
    <a href="${zoomUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">Join Zoom Meeting</a>
  </div>

  <div style="padding:20px 32px 28px;">
    <h3 style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1f2937;">What to Expect</h3>
    <ul style="margin:0;padding-left:20px;color:#6b7280;font-size:14px;line-height:1.9;">
      <li>Join the Zoom link a few minutes early</li>
      <li>Have any homework, notes, or questions ready</li>
      <li>You will receive a session report by email after the session</li>
      <li>Need to reschedule? Email us 24+ hours before your session</li>
    </ul>
  </div>

  ${EMAIL_FOOTER}

  <div style="padding:0;text-align:center;"><!-- spacer -->
    </div>

  </div>
</body>
</html>
      `,
    });
  }

  return NextResponse.json({ received: true });
}

function convertTo24hr(time: string): string {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}
