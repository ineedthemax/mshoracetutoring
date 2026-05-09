import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FOOTER = `
  <div style="margin:32px 0 0;background:#f5f3ff;padding:24px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="100" style="margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;" />
    <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Questions? Reply to this email or call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a></p>
    <p style="margin:0;color:#9ca3af;font-size:12px;">MsHorace Tutoring &nbsp;·&nbsp; White Plains, Maryland &nbsp;·&nbsp; <a href="https://mshoracetutoring.com" style="color:#7c3aed;">mshoracetutoring.com</a></p>
  </div>
`;

export async function POST(req: NextRequest) {
  const {
    studentName,
    parentEmail,
    subject,
    sessionType,
    sessionDate,
    topicsCovered,
    wins,
    areasToImprove,
    confidenceScore,
    homeworkAssigned,
    nextStep,
  } = await req.json();

  if (!parentEmail || !studentName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();
  await admin.from("session_reports").insert({
    student_name: studentName,
    parent_email: parentEmail,
    subject,
    session_type: sessionType,
    session_date: sessionDate,
    topics_covered: topicsCovered,
    wins,
    areas_to_improve: areasToImprove,
    confidence_score: confidenceScore,
    homework_assigned: homeworkAssigned,
    recommended_next_step: nextStep,
  });

  const score = parseInt(confidenceScore) || 0;
  const scoreColor = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  const scoreBarColor = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";

  const { error } = await resend.emails.send({
    from: "MsHorace Tutoring <onboarding@resend.dev>",
    to: [parentEmail],
    replyTo: "MsHoraceTutoring06@gmail.com",
    subject: `Session Report - ${studentName} | ${subject} | ${sessionDate}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

  <!-- Header with logo -->
  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="margin-bottom:8px;display:block;margin-left:auto;margin-right:auto;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Session Progress Report</p>
  </div>

  <!-- Tutor intro strip with photo -->
  <div style="background:#faf5ff;padding:16px 32px;display:table;width:100%;box-sizing:border-box;border-bottom:1px solid #ede9fe;">
    <div style="display:table-cell;vertical-align:middle;width:56px;">
      <img src="https://mshoracetutoring.com/stenita-horace.jpg" alt="Ms. Horace" width="48" height="48" style="border-radius:50%;object-fit:cover;border:2px solid #7c3aed;display:block;" />
    </div>
    <div style="display:table-cell;vertical-align:middle;padding-left:12px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#5b21b6;">Ms. Stenita Horace</p>
      <p style="margin:2px 0 0;font-size:12px;color:#7c3aed;">Math Tutor · Pre-Algebra & Algebra 1</p>
    </div>
  </div>

  <!-- Student info -->
  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 4px;font-size:22px;color:#1f2937;font-weight:700;">${studentName}</h2>
    <p style="margin:0;color:#6b7280;font-size:14px;">${subject} &nbsp;·&nbsp; ${sessionType} &nbsp;·&nbsp; ${sessionDate}</p>
  </div>

  <!-- Confidence score with progress bar -->
  <div style="margin:20px 32px 0;background:#f5f3ff;border-radius:12px;padding:16px 20px;">
    <div style="display:table;width:100%;">
      <div style="display:table-cell;vertical-align:middle;">
        <p style="margin:0;color:#5b21b6;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Confidence Score</p>
      </div>
      <div style="display:table-cell;vertical-align:middle;text-align:right;">
        <span style="font-size:30px;font-weight:800;color:${scoreColor};">${confidenceScore}<span style="font-size:16px;">%</span></span>
      </div>
    </div>
    <div style="margin-top:10px;background:#e9d5ff;border-radius:99px;height:8px;overflow:hidden;">
      <div style="width:${score}%;background:${scoreBarColor};height:8px;border-radius:99px;transition:width 0.5s;"></div>
    </div>
  </div>

  <!-- Topics covered -->
  <div style="padding:20px 32px 0;">
    <h3 style="margin:0 0 8px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Topics Covered</h3>
    <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${topicsCovered}</p>
  </div>

  <!-- Win -->
  <div style="margin:16px 32px 0;background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 10px 10px 0;padding:14px 18px;">
    <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em;">Win This Session</p>
    <p style="margin:0;color:#166534;font-size:14px;line-height:1.6;">${wins}</p>
  </div>

  <!-- Areas to improve -->
  <div style="margin:12px 32px 0;background:#fef9f0;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:14px 18px;">
    <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.08em;">Areas to Keep Working On</p>
    <p style="margin:0;color:#78350f;font-size:14px;line-height:1.6;">${areasToImprove}</p>
  </div>

  <!-- Homework -->
  <div style="padding:16px 32px 0;">
    <h3 style="margin:0 0 6px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Homework Assigned</h3>
    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${homeworkAssigned || "None assigned"}</p>
  </div>

  <!-- Next step -->
  <div style="margin:16px 32px 0;background:#f5f3ff;border-radius:12px;padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.08em;">Recommended Next Step</p>
    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${nextStep}</p>
  </div>

  ${FOOTER}
</div>
</body>
</html>`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
