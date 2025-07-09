const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const models = {
  nano: {
    openai: 'gpt-4.1-nano-2025-04-14',
    google: 'gemini-1.5-flash-8b'
  },
  mini: {
    openai: 'o4-mini-2025-04-16',
    google: 'gemini-1.5-flash'
  },
  standard: {
    openai: 'gpt-4.1-2025-04-14',
    google: 'gemini-1.5-pro'
  }
};

async function callAI(provider, apiKey, modelSize, prompt) {
  const model = models[modelSize][provider];
  
  if (provider === 'openai') {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return JSON.parse(response.data.choices[0].message.content);
  } else {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.data.candidates[0].content.parts[0].text);
  }
}

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate-roadmap', async (req, res) => {
  const { apiProvider, apiKey, modelSize, productIdea, targetAudience } = req.body;
  
  try {
    const userStoriesPrompt = `Product: ${productIdea}
Target Audience: ${targetAudience}

Generate 5-7 user stories in the format:
"As a [user type], I want [feature] so that [benefit]"

Return as JSON array of objects with fields: userType, feature, benefit, priority (1-5)`;
    
    const userStories = await callAI(apiProvider, apiKey, modelSize, userStoriesPrompt);
    
    const roadmapPrompt = `Based on these user stories: ${JSON.stringify(userStories)}

Create a product roadmap with:
1. MVP definition (3-4 core features from the user stories)
2. 3 iterations post-MVP (group remaining features)
3. Timeline estimates for each phase
4. Success metrics for each iteration
5. Change management suggestions

Return as JSON with fields: mvp, iterations, metrics, changeManagement`;
    
    const roadmap = await callAI(apiProvider, apiKey, modelSize, roadmapPrompt);
    
    res.json({ userStories, roadmap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));