import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRICE_MAP: Record<string, { label: string; price: number; priceId?: string }> = {
  "solo-30": { label: "30-Min Tutoring Session", price: 40 },
  "solo-60": { label: "60-Min Tutoring Session", price: 75 },
  "pack-4": { label: "4-Session Pack", price: 240 },
};

export async function POST(req: NextRequest) {
  try {
    const { gifterName, gifterEmail, recipientName, recipientEmail, message, sessionType } = await req.json();

    if (!gifterName || !gifterEmail || !recipientName || !recipientEmail || !sessionType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const option = PRICE_MAP[sessionType];
    if (!option) {
      return NextResponse.json({ error: "Invalid session type" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mshoracetutoring.com";

    // Create Stripe checkout session with gift metadata
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Gift: ${option.label}`,
              description: `A tutoring gift for ${recipientName} from ${gifterName}`,
            },
            unit_amount: option.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "gift",
        gifter_name: gifterName,
        gifter_email: gifterEmail,
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        message: message || "",
        session_type: sessionType,
      },
      customer_email: gifterEmail,
      success_url: `${baseUrl}/gift/success?recipient=${encodeURIComponent(recipientName)}`,
      cancel_url: `${baseUrl}/gift`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err: any) {
    console.error("Gift API error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
