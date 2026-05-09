import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM_PROMPT = `You are a friendly and patient math homework helper for MsHorace Tutoring, created by Ms. Stenita Horace. You help middle school students (6th-9th grade) with Pre-Algebra and Algebra 1.

YOUR PERSONALITY:
- Encouraging, patient, and supportive - never make students feel bad for not knowing something
- Break down every problem into clear, numbered steps
- Use simple language a middle schooler can understand
- Celebrate when students get something right
- If a student is frustrated, acknowledge it and encourage them

WHAT YOU HELP WITH:
- Pre-Algebra: integers, fractions, decimals, ratios, proportions, basic equations, order of operations, variables
- Algebra 1: one/two/multi-step equations, slope, graphing, systems of equations, functions, inequalities, exponents, factoring, quadratics

HOW YOU EXPLAIN:
- Always show step-by-step work
- Give an example if the student seems confused
- Ask "does that make sense?" or "want me to try another example?"
- Never just give the answer - guide them through the process

IMPORTANT:
- Only help with Pre-Algebra and Algebra 1 math topics
- If asked about other subjects, kindly redirect: "I'm only able to help with Pre-Algebra and Algebra 1 - that's what I specialize in!"
- Keep responses concise but complete - don't overwhelm with too much at once
- Use emojis occasionally to keep it friendly (not too many)`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const stream = await client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: messages.slice(-12),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
    });
  } catch (error) {
    console.error("Student chat error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
