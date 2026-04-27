import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const { sessionType, subject, gradeLevel, duration, date, time, parentName, parentEmail } = await request.json();

  const priceMap: Record<string, number> = {
    "30-min": 4000,
    "45-min": 6000,
    "60-min": 7500,
    "group": 2500,
  };

  const amount = priceMap[duration] ?? 7500;

  const label = `${duration === "group" ? "Group Class" : `${duration} 1-on-1 Session`} · ${subject} · ${date} at ${time}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: parentEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: "Mshorace Tutoring Session",
            description: label,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      sessionType,
      subject,
      gradeLevel,
      duration,
      date,
      time,
      parentName,
      parentEmail,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book?cancelled=1`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
