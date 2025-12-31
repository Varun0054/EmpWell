import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { messages, model } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Messages array is required' });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is missing in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.VITE_APP_URL || "https://empwell-theta.vercel.app", // Fallback or env var
                "X-Title": "EmpWell"
            },
            body: JSON.stringify({
                model: model || "allenai/olmo-3.1-32b-think:free",
                messages: messages
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API Error:', response.status, errorText);
            return res.status(response.status).json({ message: `OpenRouter API error: ${response.statusText}` });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
