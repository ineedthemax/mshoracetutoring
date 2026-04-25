import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

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
    const meta = session.metadata;

    const admin = createAdminClient();

    await admin.from("payments").insert({
      amount_cents: session.amount_total,
      status: "succeeded",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
    });
  }

  return NextResponse.json({ received: true });
}

export const config = { api: { bodyParser: false } };
