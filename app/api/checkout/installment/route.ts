import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { mockCourses, mockBundle } from "@/lib/mock-courses";

// Installment plan configs
const INSTALLMENT_PLANS: Record<string, { installments: number; amountCents: number; label: string }> = {
  // Courses - 2 payments
  "course-2pay": { installments: 2, amountCents: 9900, label: "2 payments of $99" },
  // Bundle - 2 payments
  "bundle-2pay": { installments: 2, amountCents: 19700, label: "2 payments of $197" },
  // Bundle - 3 payments
  "bundle-3pay": { installments: 3, amountCents: 13200, label: "3 payments of $132" },
  // Summer Boost Pack - 2 payments
  "summer-2pay": { installments: 2, amountCents: 26100, label: "2 payments of $261" },
};

export async function POST(req: NextRequest) {
  const { planKey, courseId, bundleId, productName } = await req.json();

  const plan = INSTALLMENT_PLANS[planKey];
  if (!plan) {
    return NextResponse.json({ error: "Invalid installment plan" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Create Stripe subscription checkout for installments
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
            description: plan.label,
          },
          unit_amount: plan.amountCents,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        installment_plan: planKey,
        installments_total: String(plan.installments),
        installments_paid: "0",
        course_id: courseId ?? "",
        bundle_id: bundleId ?? "",
      },
    },
    success_url: `${baseUrl}/student/courses?purchased=1&installment=1`,
    cancel_url: `${baseUrl}/courses`,
  });

  return NextResponse.json({ url: session.url });
}
