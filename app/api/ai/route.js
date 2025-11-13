// app/api/ai/route.js
import { NextResponse } from "next/server";

/**
 * POST /api/ai
 * Body: { destination: string, days: number, extras?: string }
 * Returns: { ok: true, plan: object } or { ok: false, error: string }
 */

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini"; // pick available model in your account

async function callOpenAI(prompt) {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: "You are an expert travel planner. Output valid JSON ONLY following the schema described by the user." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }
  const data = await res.json();
  // Depending on model, content may be in data.choices[0].message.content
  const content = data?.choices?.[0]?.message?.content ?? "";
  return content;
}

/**
 * Extract JSON substring from text using first { ... } or [ ... ] block.
 * Returns string or null
 */
function extractJsonString(text) {
  if (!text) return null;
  const firstBrace = text.indexOf("{");
  const firstBracket = text.indexOf("[");
  const start = firstBrace === -1 ? firstBracket : (firstBracket === -1 ? firstBrace : Math.min(firstBrace, firstBracket));
  if (start === -1) return null;

  // attempt to find matching bracket (simple approach)
  let stack = [];
  let end = -1;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{" || ch === "[") stack.push(ch);
    if (ch === "}" || ch === "]") {
      const last = stack.pop();
      // if stack empty, we've closed the top-level JSON
      if (stack.length === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return null;
  return text.slice(start, end + 1);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const destination = (body.destination || "").trim();
    const days = Number(body.days) || 3;
    const extras = body.extras ? String(body.extras).trim() : "";

    if (!destination) {
      return NextResponse.json({ ok: false, error: "destination is required" }, { status: 400 });
    }

    // Prompt instructing the model to output strict JSON
    const prompt = `
Create a concise ${days}-day trip itinerary for "${destination}".
Return ONLY valid JSON (no surrounding explanation). The JSON must follow this schema exactly:

{
  "summary": "short one-line summary",
  "days": [
    {
      "day": 1,
      "title": "Short title for day",
      "activities": ["activity 1", "activity 2"]
    }
  ],
  "recommendations": [
    { "type": "restaurant|hotel|attraction", "name": "Name", "short": "one-line reason" }
  ]
}

User notes: ${extras}

Make activities practical (time of day suggestions are optional). Keep strings short. If you cannot produce the schema, still return a JSON object with a "raw" field containing the plan text.
`;

    // call OpenAI
    const aiText = await callOpenAI(prompt);

    // try to parse JSON from model response
    let plan = null;
    const jsonStr = extractJsonString(aiText);
    if (jsonStr) {
      try {
        plan = JSON.parse(jsonStr);
      } catch (e) {
        // if parsing fails, put parsedAttempt as raw and still return raw content
        plan = { raw: aiText };
      }
    } else {
      // fallback: return raw text in 'raw' key
      plan = { raw: aiText };
    }

    return NextResponse.json({ ok: true, plan });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Unknown error" }, { status: 500 });
  }
}
