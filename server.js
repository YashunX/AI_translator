require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, mode } = req.body;

  const prompt = (mode === 'en-to-ja')
    ? "Translate the following English into natural Japanese."
    : "Translate the following Japanese into natural English.";

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    res.json({ translated: data.choices[0].message.content });
  } catch (error) {
    console.error('APIエラー:', error);
    res.status(500).json({ translated: "翻訳エラーが発生しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`サーバー起動 → http://localhost:${PORT}`);
});

