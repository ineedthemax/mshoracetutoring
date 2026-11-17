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
    description: "{lessons} PDF lessons with worked examples and full answer keys - everything to keep the momentum going independently.",
  },
  "algebra 1": {
    name: "Algebra I Mastery PDF Course",
    slug: "algebra-1-mastery",
    price: "$197",
    description: "{lessons} PDF lessons covering every Algebra I concept with step-by-step walkthroughs and practice problems.",
  },
  "algebra i": {
    name: "Algebra I Mastery PDF Course",
    slug: "algebra-1-mastery",
    price: "$197",
    description: "{lessons} PDF lessons covering every Algebra I concept with step-by-step walkthroughs and practice problems.",
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

// Fill in the real lesson count from the courses table so the email never drifts from the course page
async function withLessonCount<T extends { slug: string; description: string }>(product: T | null) {
  if (!product) return null;
  const { data } = await createAdminClient()
    .from("courses")
    .select("total_lessons")
    .eq("slug", product.slug)
    .single();
  const n = data?.total_lessons;
  return {
    ...product,
    description: n
      ? product.description.replace("{lessons}", String(n))
      : product.description.replace("{lessons} ", ""),
  };
}

// EMAIL 1: Sent mid-pack (every 2nd session) — pushes digital/supplemental products
async function sendMidPackEmail(
  parentEmail: string, parentName: string, studentName: string,
  subject: string, completedCount: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mshoracetutoring.com";
  const firstName = (parentName || parentEmail).split(" ")[0];
  const studentFirst = (studentName || "your student").split(" ")[0];
  const product = await withLessonCount(getProductForSubject(subject));

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:28px 32px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;">Ms. Horace Tutoring</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;">${studentFirst} is building real momentum</h1>
    </div>

    <div style="padding:28px 32px;">
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">Hi ${firstName},</p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        ${studentFirst} just completed session ${completedCount} and I can see the progress - I wanted to reach out while the momentum is high.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 20px;">
        One of the best things a student can do between sessions is practice with the right materials. I put together digital resources specifically designed to reinforce what we cover together - so the work doesn't stop when the session ends.
      </p>

      ${product ? `
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:12px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">Perfect for ${studentFirst}</p>
        <p style="font-size:17px;font-weight:700;color:#1f2937;margin:0 0 8px;">${product.name}</p>
        <p style="font-size:14px;color:#6b7280;line-height:1.5;margin:0 0 16px;">${product.description}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="${baseUrl}/courses/${product.slug}" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;font-size:14px;padding:11px 22px;border-radius:8px;text-decoration:none;">
            Get the Course - ${product.price}
          </a>
          <a href="${baseUrl}/courses" style="display:inline-block;background:#fff;color:#7c3aed;font-weight:600;font-size:14px;padding:11px 22px;border-radius:8px;text-decoration:none;border:1px solid #ddd6fe;">
            Browse All
          </a>
        </div>
      </div>` : `
      <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:14px;color:#6b7280;line-height:1.5;margin:0 0 16px;">Browse our library of PDF courses and practice packs - each one built around exactly what students need between sessions.</p>
        <a href="${baseUrl}/courses" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;font-size:14px;padding:11px 22px;border-radius:8px;text-decoration:none;">
          Browse Digital Resources
        </a>
      </div>`}

      <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:16px 0 0;">
        Any questions, just reply here. Happy to recommend what fits ${studentFirst} best.
      </p>
      <p style="font-size:14px;color:#374151;margin:20px 0 0;font-weight:600;">- Ms. Horace</p>
    </div>

    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">Ms. Horace Tutoring - Virtual Math &amp; Science Tutoring</p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: "Ms. Horace <noreply@mshoracetutoring.com>",
    to: [parentEmail],
    subject: `${studentFirst} is ${completedCount} sessions in - resources to keep the momentum`,
    html,
    text: `Hi ${firstName}, ${studentFirst} just completed session ${completedCount}! Check out our digital practice resources to keep the progress going between sessions: ${baseUrl}/courses - Ms. Horace`,
  });
}

// EMAIL 2: Sent after the LAST session (no upcoming sessions remaining) — pushes the full course
async function sendEndOfSessionsEmail(
  parentEmail: string, parentName: string, studentName: string,
  subject: string, completedCount: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mshoracetutoring.com";
  const firstName = (parentName || parentEmail).split(" ")[0];
  const studentFirst = (studentName || "your student").split(" ")[0];
  const product = await withLessonCount(getProductForSubject(subject));

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#059669,#047857);padding:28px 32px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;">Ms. Horace Tutoring</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;">${studentFirst} completed all ${completedCount} sessions!</h1>
    </div>

    <div style="padding:28px 32px;">
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">Hi ${firstName},</p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
        ${studentFirst} just wrapped up their last session - and I'm genuinely proud of the work they put in. It has been a pleasure working with them.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 20px;">
        Now comes the important part: keeping that progress. Students who finish tutoring but don't have a structured way to practice on their own tend to slide back within a few weeks. The full course is built exactly for this - so ${studentFirst} can keep going independently with the same approach we used in our sessions.
      </p>

      ${product ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:12px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">Continue the journey</p>
        <p style="font-size:17px;font-weight:700;color:#1f2937;margin:0 0 8px;">${product.name}</p>
        <p style="font-size:14px;color:#6b7280;line-height:1.5;margin:0 0 16px;">${product.description}</p>
        <a href="${baseUrl}/courses/${product.slug}" style="display:inline-block;background:#059669;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
          Get the Full Course - ${product.price}
        </a>
      </div>` : `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="font-size:14px;color:#6b7280;line-height:1.5;margin:0 0 16px;">Browse our full library of PDF courses to keep the learning going after sessions.</p>
        <a href="${baseUrl}/courses" style="display:inline-block;background:#059669;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
          Browse Courses
        </a>
      </div>`}

      <div style="background:#fafafa;border:1px solid #f3f4f6;border-radius:12px;padding:16px 20px;margin:20px 0;">
        <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 6px;">Want to continue working together?</p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 12px;">Book another package anytime - I'd love to keep working with ${studentFirst}.</p>
        <a href="${baseUrl}/book" style="display:inline-block;background:#fff;color:#7c3aed;font-weight:600;font-size:13px;padding:9px 18px;border-radius:8px;text-decoration:none;border:1px solid #ddd6fe;">
          Book More Sessions
        </a>
      </div>

      <p style="font-size:14px;color:#374151;margin:20px 0 0;font-weight:600;">- Ms. Horace</p>
    </div>

    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">Ms. Horace Tutoring - Virtual Math &amp; Science Tutoring</p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: "Ms. Horace <noreply@mshoracetutoring.com>",
    to: [parentEmail],
    subject: `${studentFirst} finished their sessions - here's how to keep the progress`,
    html,
    text: `Hi ${firstName}, ${studentFirst} just wrapped up their last session - amazing work! To keep the progress going, check out the full course: ${baseUrl}/courses. And if you'd like to book more sessions, we'd love to have them back: ${baseUrl}/book - Ms. Horace`,
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

  // Email triggers — only fire when marking a session as completed
  if (status === "completed" && parentEmail) {
    try {
      // Count total completed sessions for this parent
      const { count: completedCount } = await admin
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("parent_email", parentEmail)
        .eq("status", "completed");

      // Count remaining upcoming sessions for this parent
      const { count: upcomingCount } = await admin
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("parent_email", parentEmail)
        .eq("status", "upcoming");

      const sessionSubject = subject ?? "";
      const studentName = parentName ?? "";

      if (upcomingCount === 0) {
        // No more upcoming sessions — this was the last one → send end-of-sessions email
        await sendEndOfSessionsEmail(parentEmail, parentName ?? "", studentName, sessionSubject, completedCount ?? 0);
      } else if (completedCount && completedCount % 2 === 0) {
        // Mid-pack milestone (every 2nd session) → send digital products email
        await sendMidPackEmail(parentEmail, parentName ?? "", studentName, sessionSubject, completedCount);
      }
    } catch (e) {
      // Never block the booking update if email fails
      console.error("Session email trigger failed:", e);
    }
  }

  return NextResponse.json({ success: true });
}
