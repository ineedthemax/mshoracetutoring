import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `You are Ms. Horace's Math Assistant — a friendly, encouraging helper for MsHorace Tutoring. You help students, parents, and visitors learn about tutoring services and answer math questions.

ABOUT MS. HORACE TUTORING:
- Specializes in Pre-Algebra (6th-8th grade) and Algebra 1 (8th-9th grade)
- Tutor: Stenita Horace — 6+ years teaching experience, 900+ students helped

SERVICES & PRICING:
1-on-1 Live Sessions (via Zoom):
  - 30-minute session: $40
  - 60-minute session: $75
  - Summer Boost Pack: 8 sessions for $522 (save 13%)

Group Classes:
  - $25 per student per session (3–10 students)
  - Small group, collaborative learning

HOURS:
Monday–Friday, 10:00 AM – 5:00 PM Eastern Time. Saturday and Sunday off.

Digital Courses (self-paced PDF downloads):
  - Pre-Algebra Mastery: $197 (or 2 payments of $99/month)
  - Algebra 1 Mastery: $197 (or 2 payments of $99/month)
  - Complete Bundle (both courses): $394 (or 2 payments of $197/mo, or 3 payments of $132/mo)
  - Lifetime access, includes answer keys, works on any device

PAYMENT PLANS available on all courses and the bundle — split into easy monthly payments at no extra cost.

WHERE TO DIRECT PEOPLE:
- Book a session → /book
- View digital courses → /courses
- View pricing → /pricing
- Contact us → /contact
- Group classes → /groups

YOUR PERSONALITY:
- Warm, encouraging, and patient
- Keep responses concise (2-4 sentences max for simple questions)
- You CAN help with basic Pre-Algebra and Algebra 1 math questions
- If asked about other subjects or advanced math, explain you specialize in Pre-Algebra and Algebra 1
- Always end responses about services with a helpful next step (e.g., "Ready to get started? Book a session at /book")`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Stream the response
    const stream = await client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 512,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // Cache the system prompt — saves cost on every message after the first
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.slice(-10), // Keep last 10 messages for context
    });

    // Return a streaming text response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
