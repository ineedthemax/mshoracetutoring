import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PLANS: Record<string, {
  amountCents: number;
  label: string;
  description: string;
  planAmountCents?: number; // first installment for payment plan
  planLabel?: string;
}> = {
  "4-session":    { amountCents: 30000, label: "First Grading Period Pack",        description: "4 one-on-one sessions · Valid 60 days",             planAmountCents: 15000, planLabel: "First Grading Period Pack — Installment 1 of 2" },
  "8-session":    { amountCents: 60000, label: "8-Session Pack",                   description: "8 one-on-one sessions · Valid 90 days",             planAmountCents: 30000, planLabel: "8-Session Pack — Installment 1 of 2" },
  "grade-rescue": { amountCents: 19500, label: "Grade Rescue Pack",                description: "3 one-on-one sessions · Valid 45 days" },
  "monthly":      { amountCents: 26000, label: "Weekly Rhythm Monthly Pack",       description: "4 sessions/month · Auto-renews monthly" },
  "family-pack":  { amountCents: 49000, label: '"Two Kids" Family Pack',           description: "8 sessions split between 2 siblings",              planAmountCents: 24500, planLabel: '"Two Kids" Family Pack — Installment 1 of 2' },
  "group-pass":   { amountCents: 15000, label: "Group Class Semester Pass",        description: "6 group sessions (75 min each)" },
};

export async function POST(req: NextRequest) {
  try {
    const { packageType, parentEmail, paymentOption } = await req.json();

    const plan = PLANS[packageType];
    if (!plan || !parentEmail) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const usePlan = paymentOption === "plan" && !!plan.planAmountCents;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: parentEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: usePlan ? plan.planAmountCents! : plan.amountCents,
            product_data: {
              name: usePlan ? plan.planLabel! : plan.label,
              description: usePlan
                ? `${plan.description} · Payment 2 of $${(plan.planAmountCents! / 100).toFixed(0)} auto-charges in 30 days.`
                : plan.description,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        description: usePlan
          ? `${plan.label} — installment plan. Second payment auto-charges in 30 days.`
          : plan.label,
      },
      metadata: {
        packageType,
        paymentOption: usePlan ? "plan" : "full",
        installmentNumber: usePlan ? "1" : "0",
        totalInstallments: usePlan ? "2" : "1",
      },
      success_url: `${baseUrl}/book/success?type=package&plan=${usePlan ? "installment" : "full"}`,
      cancel_url: `${baseUrl}/checkout?type=${packageType}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
