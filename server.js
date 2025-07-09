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
    
    let content = response.data.candidates[0].content.parts[0].text;
    
    // Clean up the response - remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to parse, if it fails, log the raw content for debugging
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse JSON response:', content);
      throw new Error(`Invalid JSON response: ${error.message}`);
    }
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

Return ONLY valid JSON as an array of objects with fields: userType, feature, benefit, priority (1-5). Do not include any markdown formatting or code blocks.

Example format:
[
  {
    "userType": "business user",
    "feature": "anonymize sensitive data",
    "benefit": "I can safely use AI services",
    "priority": 5
  }
]`;
    
    const userStories = await callAI(apiProvider, apiKey, modelSize, userStoriesPrompt);
    
    // Create different prompts based on model tier
    const getPromptForModel = (modelSize) => {
      if (modelSize === 'nano') {
        return `Based on these user stories: ${JSON.stringify(userStories)}

Create a product roadmap with MVP and 3 iterations. Include different feature types:
- Core/Basic features (essential functionality)
- Enhancement features (improvements, customization)
- Growth features (scaling, advanced capabilities)

Return ONLY valid JSON:
{
  "mvp": {
    "features": ["basic feature 1", "core feature 2", "essential feature 3"],
    "timeline": "Q1 2024"
  },
  "iterations": [
    {
      "features": ["enhancement feature 1", "improvement feature 2"],
      "timeline": "Q2 2024"
    },
    {
      "features": ["growth feature 1", "advanced feature 2"],
      "timeline": "Q3 2024"
    },
    {
      "features": ["scaling feature 1"],
      "timeline": "Q4 2024"
    }
  ],
  "metrics": ["User adoption", "Feature usage"],
  "changeManagement": ["User training", "Rollout plan"]
}`;
      } else {
        return `Based on these user stories: ${JSON.stringify(userStories)}

Create a detailed product roadmap with:
1. MVP definition (3-4 CORE/BASIC features - essential functionality)
2. 3 iterations post-MVP with different feature types:
   - Phase 2: ENHANCEMENT features (improvements, customization, optimization)
   - Phase 3: GROWTH features (scaling, advanced capabilities, expansion)
   - Phase 4: Additional features as needed
3. Timeline estimates for each phase
4. Success metrics for each iteration
5. Change management suggestions

IMPORTANT: Use keywords like "basic", "core", "essential" for MVP features, "enhance", "improve", "customize", "optimize" for enhancement features, and "scale", "expand", "growth", "advanced" for growth features.

Return ONLY valid JSON with fields: mvp, iterations, metrics, changeManagement. Do not include any markdown formatting or code blocks.

Example format:
{
  "mvp": {
    "features": ["basic user authentication", "core data processing", "essential upload functionality"],
    "timeline": "Q1 2024"
  },
  "iterations": [
    {
      "features": ["enhanced user interface", "improved data validation", "customizable settings"],
      "timeline": "Q2 2024"
    },
    {
      "features": ["advanced analytics", "scaling infrastructure", "growth-oriented features"],
      "timeline": "Q3 2024"
    }
  ],
  "metrics": ["User adoption rate", "Feature utilization", "Performance metrics"],
  "changeManagement": ["Stakeholder training", "Phased rollout", "Documentation updates"]
}`;
      }
    };
    
    const roadmapPrompt = getPromptForModel(modelSize);
    
    const roadmap = await callAI(apiProvider, apiKey, modelSize, roadmapPrompt);
    
    res.json({ userStories, roadmap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));