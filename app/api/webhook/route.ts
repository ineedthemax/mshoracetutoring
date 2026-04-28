import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

const ZOOM_LINKS: Record<string, string> = {
  "solo-30": "https://us06web.zoom.us/j/86054653309?pwd=bmSKYvXlsHnIFi5eSTvqOW7LR2vzM7.1",
  "solo-60": "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1",
  "group":   "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1",
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

    // Pick the right Zoom link based on session type
    const zoomUrl = ZOOM_LINKS[meta.sessionType] ?? ZOOM_LINKS["solo-60"];

    // Save booking to sessions table
    await admin.from("sessions").insert({
      parent_email: meta.parentEmail ?? session.customer_email,
      parent_name: meta.parentName ?? "",
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
  }

  return NextResponse.json({ received: true });
}

// Convert "10:00 AM" → "10:00:00"
function convertTo24hr(time: string): string {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}
