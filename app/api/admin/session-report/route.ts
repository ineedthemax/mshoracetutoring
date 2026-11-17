import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "MsHorace Tutoring <noreply@mshoracetutoring.com>";

export async function POST(req: NextRequest) {
 try {
 const {
 studentName,
 parentEmail,
 subject,
 sessionDate,
 topicsCovered,
 wins,
 areasToWatch,
 homework,
 nextSteps,
 confidenceScore,
 additionalNotes,
 } = await req.json();

 if (!studentName || !parentEmail || !topicsCovered || !wins) {
 return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
 }

 const formattedDate = new Date(sessionDate + "T12:00:00").toLocaleDateString("en-US", {
 weekday: "long", year: "numeric", month: "long", day: "numeric",
 });

 const confidenceNum = parseInt(confidenceScore || "70");
 const confidenceBar = Math.round(confidenceNum / 10);
 const confidenceColor = confidenceNum >= 70 ? "#7c3aed" : confidenceNum >= 40 ? "#d97706" : "#dc2626";

 await resend.emails.send({
 from: FROM,
 to: parentEmail,
 subject: `${studentName}'s Session Report - ${formattedDate}`,
 html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
 <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
 <tr><td align="center">
 <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

 <!-- Header -->
 <tr><td style="background:#7c3aed;border-radius:16px 16px 0 0;padding:32px 32px 24px;">
 <p style="margin:0 0 4px;color:rgba(255,255,255,0.8);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Session Progress Report</p>
 <h1 style="margin:0 0 4px;color:#fff;font-size:28px;font-weight:800;">${studentName}</h1>
 <p style="margin:0;color:rgba(255,255,255,0.75);font-size:14px;">${subject || "Math"} &middot; ${formattedDate}</p>
 </td></tr>

 <!-- Confidence Score -->
 <tr><td style="background:#fff;padding:28px 32px 20px;">
 <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Confidence Score</p>
 <div style="display:flex;align-items:center;gap:12px;">
 <div style="flex:1;height:12px;background:#f3f4f6;border-radius:6px;overflow:hidden;">
 <div style="width:${confidenceNum}%;height:100%;background:${confidenceColor};border-radius:6px;"></div>
 </div>
 <span style="font-size:28px;font-weight:800;color:${confidenceColor};min-width:52px;text-align:right;">${confidenceNum}</span>
 </div>
 <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">Score reflects ${studentName}&apos;s confidence level at the end of today&apos;s session (0-100)</p>
 </td></tr>

 <!-- Wins -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 12px 12px 0;padding:16px 20px;">
 <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.05em;">What Went Well</p>
 <p style="margin:0;font-size:14px;color:#166534;line-height:1.6;">${wins}</p>
 </div>
 </td></tr>

 <!-- Topics Covered -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Topics Covered</p>
 <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${topicsCovered}</p>
 </td></tr>

 ${areasToWatch ? `
 <!-- Areas to Watch -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <div style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 12px 12px 0;padding:16px 20px;">
 <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Areas to Keep Practicing</p>
 <p style="margin:0;font-size:14px;color:#78350f;line-height:1.6;">${areasToWatch}</p>
 </div>
 </td></tr>` : ""}

 ${homework ? `
 <!-- Homework -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Homework Assigned</p>
 <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${homework}</p>
 </td></tr>` : ""}

 ${nextSteps ? `
 <!-- Next Steps -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <div style="background:#ede9fe;border-left:4px solid #7c3aed;border-radius:0 12px 12px 0;padding:16px 20px;">
 <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#5b21b6;text-transform:uppercase;letter-spacing:0.05em;">Ms. Horace Recommends</p>
 <p style="margin:0;font-size:14px;color:#4c1d95;line-height:1.6;">${nextSteps}</p>
 </div>
 </td></tr>` : ""}

 ${additionalNotes ? `
 <!-- Additional Notes -->
 <tr><td style="background:#fff;padding:0 32px 24px;">
 <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em;">Additional Notes</p>
 <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">${additionalNotes}</p>
 </td></tr>` : ""}

 <!-- Book Next Session CTA -->
 <tr><td style="background:#fff;padding:0 32px 32px;border-radius:0 0 16px 16px;">
 <div style="background:#f5f3ff;border-radius:12px;padding:20px;text-align:center;">
 <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1f2937;">Ready to book the next session?</p>
 <p style="margin:0 0 16px;font-size:13px;color:#6b7280;">Consistency is what moves the grade needle.</p>
 <a href="https://mshoracetutoring.com/book" style="display:inline-block;background:#7c3aed;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;text-decoration:none;">Book Next Session</a>
 </div>
 </td></tr>

 <!-- Footer -->
 <tr><td style="padding:20px 0;text-align:center;">
 <p style="margin:0;font-size:12px;color:#9ca3af;">MsHorace Tutoring &middot; Virtual Math Tutoring for Grades 6-9</p>
 <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;"><a href="https://mshoracetutoring.com" style="color:#7c3aed;text-decoration:none;">mshoracetutoring.com</a></p>
 </td></tr>

 </table>
 </td></tr>
 </table>
</body>
</html>`,
 });

 return NextResponse.json({ ok: true });
 } catch (err: any) {
 console.error("Session report error:", err);
 return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
 }
}
