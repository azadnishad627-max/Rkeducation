export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text, chapter, className, subject, numQuestions } = req.body;
    const apiKey = "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";

    const prompt = `You are a senior Indian school educator for RK EDUCATION.
Analyze the following textbook chapter text:
Class: ${className || "Class 8"}
Subject: ${subject || "Social Science"}
Chapter: ${chapter || "Chapter Notes"}

--- SCANNED CHAPTER TEXT ---
${(text || "").slice(0, 8000)}
--- END TEXT ---

Task: Generate exactly ${numQuestions || 20} authentic Multiple Choice Questions (MCQs) in pure Hindi strictly related to the subject ${subject} and chapter text above.

Rules:
1. All questions must belong strictly to ${subject} (e.g. if subject is Social Science, all questions must be History/Geography/Civics based on the text. If Science, all Science. If Maths, all Maths).
2. Never mix other subjects.
3. Provide 4 distinct options (A, B, C, D) in Hindi.
4. Mark correct answer (A, B, C, or D).

Respond ONLY with a valid JSON array of objects in this exact format (no markdown, no backticks):
[
  {
    "num": 1,
    "q": "प्रश्न यहाँ लिखें?",
    "optA": "विकल्प A",
    "optB": "विकल्प B",
    "optC": "विकल्प C",
    "optD": "विकल्प D",
    "ans": "A"
  }
]`;

    const nvidiaRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: "You are a professional Hindi exam paper generator. Output strictly JSON array." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 3500
      })
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      return res.status(nvidiaRes.status).json({ error: errText });
    }

    const data = await nvidiaRes.json();
    let content = data.choices?.[0]?.message?.content || "[]";
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(content);
    return res.status(200).json({ questions: parsed });

  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
