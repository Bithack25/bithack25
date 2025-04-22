// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Only needed for Node.js < 18

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.YOUR_API_KEY; // Make sure this matches your .env variable
    const apiUrl = process.env.CAREER_API_URL || 'https://api.example-career-guidance.com/chat'; // Use .env or default

    if (!apiKey) {
        console.error('API Key not configured in .env (YOUR_API_KEY)');
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            console.error(`API error: ${response.status}`);
            return res.status(response.status).json({ error: `Career API error: ${response.statusText}` });
        }

        const data = await response.json();
        const aiResponse = data.response; // Adjust based on the API's response structure

        res.json({ response: aiResponse }); // Send the AI response back to the frontend

    } catch (error) {
        console.error("Error calling Career Guidance API:", error);
        res.status(500).json({ error: 'Failed to communicate with the career advisor API' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});