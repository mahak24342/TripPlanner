import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { destination, days } = await req.json();

    if (!destination || !days) {
      return Response.json({ error: "Missing destination or days" }, { status: 400 });
    }

    // --- AI PROMPT ---
    const prompt = `
Generate a clear, structured budget breakdown for a ${days}-day trip to ${destination}.
Include sections:

• Hotels  
• Food  
• Local Transport  
• Activities  
• Misc/Extras  

Give estimated cost for each + total.
Return in clean text format (not JSON).
    `;

    const aiRes = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const budgetText = aiRes.choices[0].message.content;

    return Response.json({
      ok: true,
      budget: budgetText,
    });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to generate budget" },
      { status: 500 }
    );
  }
}
