import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

  // Save report to Supabase
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

  // Send email via Resend
  const { error } = await resend.emails.send({
    from: "MsHorace Tutoring <onboarding@resend.dev>",
    to: [parentEmail],
    replyTo: "sahorace27@gmail.com",
    subject: `Session Report — ${studentName} · ${subject} · ${sessionDate}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:32px 32px 24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">MsHorace Tutoring</h1>
      <p style="color:#ddd6fe;margin:6px 0 0;font-size:14px;">Session Progress Report</p>
    </div>

    <!-- Student info -->
    <div style="padding:28px 32px 0;">
      <h2 style="margin:0 0 4px;font-size:20px;color:#1f2937;">${studentName}</h2>
      <p style="margin:0;color:#6b7280;font-size:14px;">${subject} &nbsp;·&nbsp; ${sessionType} &nbsp;·&nbsp; ${sessionDate}</p>
    </div>

    <!-- Confidence score -->
    <div style="margin:24px 32px 0;background:#f5f3ff;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
      <span style="color:#5b21b6;font-weight:600;font-size:14px;">Confidence Score</span>
      <span style="font-size:28px;font-weight:800;color:#7c3aed;">${confidenceScore}<span style="font-size:16px;">%</span></span>
    </div>

    <!-- Topics covered -->
    <div style="padding:24px 32px 0;">
      <h3 style="margin:0 0 10px;font-size:13px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Topics Covered</h3>
      <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${topicsCovered}</p>
    </div>

    <!-- Win -->
    <div style="margin:20px 32px 0;background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 10px 10px 0;padding:14px 18px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#15803d;text-transform:uppercase;letter-spacing:0.05em;">Win This Session</p>
      <p style="margin:0;color:#166534;font-size:14px;line-height:1.6;">${wins}</p>
    </div>

    <!-- Areas to improve -->
    <div style="margin:16px 32px 0;background:#fef9f0;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:14px 18px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Areas to Keep Working On</p>
      <p style="margin:0;color:#78350f;font-size:14px;line-height:1.6;">${areasToImprove}</p>
    </div>

    <!-- Homework -->
    <div style="padding:20px 32px 0;">
      <h3 style="margin:0 0 6px;font-size:13px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Homework Assigned</h3>
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${homeworkAssigned || "None assigned"}</p>
    </div>

    <!-- Next step -->
    <div style="margin:20px 32px 0;background:#f5f3ff;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#5b21b6;text-transform:uppercase;letter-spacing:0.05em;">Recommended Next Step</p>
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${nextStep}</p>
    </div>

    <!-- Footer -->
    <div style="margin:32px 0 0;padding:24px 32px;border-top:1px solid #f3f4f6;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:13px;">Questions? Reply to this email or reach out at <a href="mailto:sahorace27@gmail.com" style="color:#7c3aed;">sahorace27@gmail.com</a></p>
      <p style="margin:8px 0 0;color:#d1d5db;font-size:12px;">MsHorace Tutoring &nbsp;·&nbsp; White Plains, Maryland &nbsp;·&nbsp; mshoracetutoring.com</p>
    </div>

  </div>
</body>
</html>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
