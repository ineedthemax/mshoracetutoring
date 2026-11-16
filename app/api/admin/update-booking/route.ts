import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_PRODUCTS: Record<string, { name: string; slug: string; price: string; description: string }> = {
  "pre-algebra": {
    name: "Pre-Algebra Mastery PDF Course",
    slug: "pre-algebra-mastery",
    price: "$197",
    description: "15 PDF lessons, worked examples, and full answer keys - everything to keep the momentum going independently.",
  },
  "algebra 1": {
    name: "Algebra I Mastery PDF Course",
    slug: "algebra-1-mastery",
    price: "$197",
    description: "15 PDF lessons covering every Algebra I concept with step-by-step walkthroughs and practice problems.",
  },
  "algebra i": {
    name: "Algebra I Mastery PDF Course",
    slug: "algebra-1-mastery",
    price: "$197",
    description: "15 PDF lessons covering every Algebra I concept with step-by-step walkthroughs and practice problems.",
  },
};

function getProductForSubject(subject: string) {
  if (!subject) return null;
  const lower = subject.toLowerCase();
  for (const [key, val] of Object.entries(SUBJECT_PRODUCTS)) {
    if (lower.includes(key)) return val;
  }
  return null;
}

async function sendMidPackUpsell(parentEmail: string, parentName: string, studentName: string, subject: string, completedCount: number) {
  const product = getProductForSubject(subject);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mshoracetutoring.com";
  const firstName = (parentName ?? parentEmail).split(" ")[0];
  const studentFirst = (studentName ?? "your student").split(" ")[0];

  const productBlock = product
    ? `
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:13px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px;">Recommended for ${studentFirst}</p>
        <p style="font-size:18px;font-weight:700;color:#1f2937;margin:0 0 8px;">${product.name}</p>
        <p style="font-size:14px;color:#6b7280;margin:0 0 16px;">${product.description}</p>
        <a href="${baseUrl}/courses/${product.slug}" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
          Get the Course - ${product.price}
        </a>
      </div>`
    : `
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:14px;color:#6b7280;margin:0 0 16px;">Check out our full library of PDF courses designed to help students keep growing between sessions.</p>
        <a href="${baseUrl}/courses" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
          Browse Courses
        </a>
      </div>`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:28px 32px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;">Ms. Horace Tutoring</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;">${studentFirst} is halfway there!</h1>
    </div>

    <div style="padding:28px 32px;">
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        Hi ${firstName},
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        ${studentFirst} just completed session ${completedCount} - and I wanted to reach out because this is exactly the right moment to talk about keeping that progress going.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 20px;">
        One of the biggest things I see is students who do great during sessions but lose ground in between. The right practice material makes all the difference - and I put together a course specifically built around what we work on together.
      </p>

      ${productBlock}

      <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:16px 0 0;">
        Any questions, just reply to this email. I'm always happy to talk through what's best for ${studentFirst}.
      </p>
      <p style="font-size:14px;color:#374151;margin:20px 0 0;font-weight:600;">- Ms. Horace</p>
    </div>

    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
        Ms. Horace Tutoring - Virtual Math &amp; Science Tutoring
      </p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: "Ms. Horace <noreply@mshoracetutoring.com>",
    to: [parentEmail],
    subject: `${studentFirst} just hit session ${completedCount} - keep the momentum going`,
    html,
    text: `Hi ${firstName}, ${studentFirst} just completed session ${completedCount}! This is a great time to look at our digital course resources to keep the progress going between sessions. Visit ${baseUrl}/courses to learn more. - Ms. Horace`,
  });
}

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
};

const DURATIONS: Record<string, number> = {
  "solo-30": 30, "solo-60": 60, "group": 90,
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, parentName, parentEmail, subject, gradeLevel, sessionType, sessionDate, sessionTime, status } = await req.json();

  if (!id) return NextResponse.json({ error: "Missing session ID" }, { status: 400 });

  // Convert HH:MM to 12hr display format
  const [h, m] = sessionTime.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayTime = `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, "0")} ${ampm}`;

  const admin = createAdminClient();

  const { error } = await admin
    .from("sessions")
    .update({
      parent_name: parentName,
      parent_email: parentEmail,
      subject,
      grade_level: gradeLevel,
      session_type: sessionType,
      session_date: sessionDate,
      session_time: displayTime,
      status,
      zoom_join_url: ZOOM_LINKS[sessionType] ?? ZOOM_LINKS["solo-60"],
      duration_minutes: DURATIONS[sessionType] ?? 60,
      scheduled_at: sessionDate && sessionTime
        ? new Date(`${sessionDate}T${sessionTime}`).toISOString()
        : null,
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Mid-pack upsell: fire when a session is marked complete and total is a multiple of 2
  if (status === "completed" && parentEmail) {
    try {
      const { count } = await admin
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("parent_email", parentEmail)
        .eq("status", "completed");

      if (count && count % 2 === 0) {
        // Fetch the session to get student name
        const { data: sessionData } = await admin
          .from("sessions")
          .select("parent_name, subject")
          .eq("id", id)
          .single();

        const studentName = sessionData?.parent_name ?? parentName ?? "";
        const sessionSubject = sessionData?.subject ?? subject ?? "";

        await sendMidPackUpsell(parentEmail, parentName ?? "", studentName, sessionSubject, count);
      }
    } catch (e) {
      // Don't block the booking update if email fails
      console.error("Mid-pack upsell email failed:", e);
    }
  }

  return NextResponse.json({ success: true });
}
