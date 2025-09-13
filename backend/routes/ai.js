import express from 'express';

const router = express.Router();

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBhIBM3FGjmFN0-JTt3GWE0boe5LgzrjgU";

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // 🔍 Debug log: see exactly what Gemini sends back
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0 &&
      data.candidates[0].content.parts[0].text
    ) {
      const completion = data.candidates[0].content.parts[0].text;
      return res.json({ completion });
    }

    // If Gemini returns error or empty candidates
    return res.status(500).json({
      error: 'Unexpected response from Gemini',
      raw: data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;

