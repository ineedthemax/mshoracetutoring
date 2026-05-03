import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const DIGITAL_PRODUCTS: Record<string, { name: string; priceCents: number; desc: string }> = {
  "pre-algebra-practice": {
    name: "Pre-Algebra Practice Packet",
    priceCents: 900,
    desc: "50+ problems covering fractions, decimals, integers, and basic equations with full answer key.",
  },
  "algebra1-practice": {
    name: "Algebra 1 Practice Packet",
    priceCents: 900,
    desc: "50+ problems covering linear equations, inequalities, graphing, and systems with full answer key.",
  },
  "pre-algebra-study-guide": {
    name: "Pre-Algebra Study Guide",
    priceCents: 700,
    desc: "Quick-reference formula sheet and concept breakdown for all major Pre-Algebra topics.",
  },
  "algebra1-study-guide": {
    name: "Algebra 1 Study Guide",
    priceCents: 700,
    desc: "Quick-reference formula sheet and concept breakdown for all major Algebra 1 topics.",
  },
  "pre-algebra-exam-prep": {
    name: "Pre-Algebra Exam Prep",
    priceCents: 1200,
    desc: "Full-length practice test with answer key designed to mirror real classroom assessments.",
  },
  "algebra1-exam-prep": {
    name: "Algebra 1 Exam Prep",
    priceCents: 1200,
    desc: "Full-length practice test with answer key designed to mirror real classroom assessments.",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productKey } = await req.json();

    const product = DIGITAL_PRODUCTS[productKey];
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.name,
              description: product.desc,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "digital_product",
        productKey,
        productName: product.name,
      },
      success_url: `${baseUrl}/courses?purchased=1&product=${encodeURIComponent(product.name)}`,
      cancel_url: `${baseUrl}/courses`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Digital checkout error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create checkout" }, { status: 500 });
  }
}
