import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { packageType, parentEmail } = await req.json();

    const plans: Record<string, { amountCents: number; label: string }> = {
      "4-session": { amountCents: 30000, label: "4 Sessions - $300" },
      "8-session": { amountCents: 60000, label: "8 Sessions - $600" },
    };

    const plan = plans[packageType];
    if (!plan || !parentEmail) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: parentEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: plan.amountCents,
            product_data: {
              name: "MsHorace Session Package",
              description: plan.label,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/book/success?type=package`,
      cancel_url: `${baseUrl}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
