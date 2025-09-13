import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Gemini API endpoint and key (replace with your actual Gemini API key)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/chat', async (req, res) => {
	const { prompt } = req.body;
	if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

	try {
		const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }]
			})
		});
		const data = await response.json();
		if (data.candidates && data.candidates.length > 0) {
			const completion = data.candidates[0].content.parts[0].text;
			res.json({ completion });
		} else {
			res.status(500).json({ error: 'No completion returned from Gemini' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
