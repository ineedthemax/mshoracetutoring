import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  const { studentName, subject, sessionType, sessionDate, quickNotes } = await req.json();

  if (!studentName || !quickNotes) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = `You are helping Ms. Stenita Horace, a math tutor, write a professional session report for a parent.

Student: ${studentName}
Subject: ${subject}
Session Type: ${sessionType}
Date: ${sessionDate}

Ms. Horace's quick notes from the session:
${quickNotes}

Based on these notes, generate a complete session report with the following sections. Write in a warm, professional tone that parents will appreciate. Be specific and encouraging.

Return ONLY a JSON object with these exact fields:
{
  "topicsCovered": "1-2 sentences describing what was covered",
  "wins": "2-3 sentences about what the student did well and what clicked",
  "areasToImprove": "1-2 sentences about what needs more practice (frame positively)",
  "homeworkAssigned": "specific homework if mentioned, otherwise suggest appropriate practice",
  "nextStep": "1 sentence recommending what to focus on next session"
}`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    const report = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ report });
  } catch (error) {
    console.error("AI report error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
