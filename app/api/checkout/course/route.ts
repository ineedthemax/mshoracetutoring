import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { mockCourses, mockBundle } from "@/lib/mock-courses";

export async function POST(req: NextRequest) {
  const { courseId, bundleId } = await req.json();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let lineItems: { price_data: { currency: string; product_data: { name: string; description?: string }; unit_amount: number }; quantity: number }[] = [];
  let metadata: Record<string, string> = {};

  if (bundleId) {
    lineItems = [{
      price_data: {
        currency: "usd",
        product_data: {
          name: mockBundle.title,
          description: mockBundle.description,
        },
        unit_amount: mockBundle.priceCents,
      },
      quantity: 1,
    }];
    metadata = { type: "bundle", bundleId };
  } else if (courseId) {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    lineItems = [{
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
          description: course.shortDescription,
        },
        unit_amount: course.priceCents,
      },
      quantity: 1,
    }];
    metadata = { type: "course", courseId };
  } else {
    return NextResponse.json({ error: "courseId or bundleId required" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${baseUrl}/student/courses?purchased=1`,
    cancel_url: `${baseUrl}/courses`,
    metadata,
  });

  return NextResponse.json({ url: session.url });
}
