import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const DIGITAL_PRODUCT_FILES: Record<string, string> = {
  "pre-algebra-practice":    "Practice Problems/PreAlgebra_Practice_Packet.pdf",
  "algebra1-practice":       "Practice Problems/AlgebraI_Practice_Packet.pdf",
  "pre-algebra-study-guide": "Study Guide/PreAlgebra_Study_Guide.pdf",
  "algebra1-study-guide":    "Study Guide/AlgebraI_Study_Guide.pdf",
  "pre-algebra-exam-prep":   "Exam Prep/PreAlgebra_Exam_Prep.pdf",
  "algebra1-exam-prep":      "Exam Prep/AlgebraI_Exam_Prep.pdf",
};

export async function POST(req: NextRequest) {
  // Admin only
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { purchaseId, productKey, productName, buyerEmail } = await req.json();

  if (!buyerEmail || !productKey) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const filePath = DIGITAL_PRODUCT_FILES[productKey];
  if (!filePath) {
    return NextResponse.json({ error: "Unknown product key" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Generate a fresh 7-day signed URL
  const { data: signedData, error: urlError } = await admin.storage
    .from("digital-products")
    .createSignedUrl(filePath, 60 * 60 * 24 * 7);

  if (urlError || !signedData?.signedUrl) {
    return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
  }

  const downloadUrl = signedData.signedUrl;

  const { error: emailError } = await resend.emails.send({
    from: "MsHorace Tutoring <onboarding@resend.dev>",
    to: [buyerEmail],
    replyTo: "MsHoraceTutoring06@gmail.com",
    subject: `Your Download is Ready - ${productName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
  <div style="background:linear-gradient(135deg,#5b21b6,#7c3aed);padding:28px 32px 22px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" alt="MsHorace Tutoring" width="110" style="display:block;margin:0 auto 8px;" />
    <p style="color:#ddd6fe;margin:0;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Your Download is Ready!</p>
  </div>
  <div style="padding:28px 32px;">
    <div style="background:#f5f3ff;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#5b21b6;">${productName}</p>
    </div>
    <div style="text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 14px;color:#374151;font-size:14px;">Your PDF is ready to download:</p>
      <a href="${downloadUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Download PDF Now</a>
      <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">Link expires in 7 days. Save your PDF after downloading.</p>
    </div>
  </div>
  <div style="background:#f5f3ff;padding:24px 32px;text-align:center;">
    <img src="https://mshoracetutoring.com/Logo.png" width="100" style="display:block;margin:0 auto 12px;" />
    <p style="margin:0;color:#6b7280;font-size:13px;">Questions? Call <a href="tel:2272206227" style="color:#7c3aed;">(227) 220-6227</a></p>
  </div>
</div>
</body>
</html>`,
  });

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  // Mark as delivered in DB
  await admin.from("digital_purchases")
    .update({ download_sent: true })
    .eq("id", purchaseId);

  return NextResponse.json({ success: true });
}
