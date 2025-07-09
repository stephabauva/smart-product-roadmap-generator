const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

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
  },
  // Google-specific model names
  lite: {
    openai: 'gpt-4.1-nano-2025-04-14',
    google: 'gemini-1.5-flash-8b'
  },
  flash: {
    openai: 'o4-mini-2025-04-16',
    google: 'gemini-1.5-flash'
  },
  pro: {
    openai: 'gpt-4.1-2025-04-14',
    google: 'gemini-1.5-pro'
  }
};

async function callAI(provider, apiKey, modelSize, prompt) {
  const model = models[modelSize][provider];
  
  try {
    if (provider === 'openai') {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      }, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        timeout: 45000, // 45 seconds timeout for Vercel
        validateStatus: (status) => status < 500 // Don't throw on 4xx errors
      });
      
      // Validate OpenAI response structure
      if (!response.data || !response.data.choices || !response.data.choices[0] || !response.data.choices[0].message) {
        console.error('Invalid OpenAI response structure:', JSON.stringify(response.data, null, 2));
        throw new Error('Invalid response structure from OpenAI API');
      }
      
      return JSON.parse(response.data.choices[0].message.content);
    } else {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      }, {
        timeout: 45000, // 45 seconds timeout for Vercel
        validateStatus: (status) => status < 500 // Don't throw on 4xx errors
      });
      
      // Validate Google AI response structure
      if (!response.data || !response.data.candidates || !response.data.candidates[0] || 
          !response.data.candidates[0].content || !response.data.candidates[0].content.parts || 
          !response.data.candidates[0].content.parts[0]) {
        console.error('Invalid Google AI response structure:', JSON.stringify(response.data, null, 2));
        throw new Error('Invalid response structure from Google AI API');
      }
      
      let content = response.data.candidates[0].content.parts[0].text;
      
      // Enhanced JSON parsing for Vercel deployment
      function parseAIResponse(rawContent) {
        // Log the raw response for debugging
        console.log('Raw AI response:', rawContent);
        console.log('Response length:', rawContent.length);
        
        // Multiple cleanup strategies
        let cleanedContent = rawContent;
        
        // Remove various markdown code block formats
        cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        cleanedContent = cleanedContent.replace(/^```[\w]*\s*/g, '').replace(/\s*```$/g, '').trim();
        
        // Remove common prefixes and suffixes
        cleanedContent = cleanedContent.replace(/^Here's?\s+.*?:\s*/i, '').trim();
        cleanedContent = cleanedContent.replace(/^Response:\s*/i, '').trim();
        
        // Try direct parsing first
        try {
          return JSON.parse(cleanedContent);
        } catch (error) {
          console.log('Direct parsing failed:', error.message);
        }
        
        // Try to extract JSON objects with multiple regex patterns
        const jsonPatterns = [
          /\{[\s\S]*\}/,  // Object
          /\[[\s\S]*\]/,  // Array
          /\{[\s\S]*?\}(?=\s*$)/,  // Object at end
          /\[[\s\S]*?\](?=\s*$)/,  // Array at end
        ];
        
        for (const pattern of jsonPatterns) {
          const match = cleanedContent.match(pattern);
          if (match) {
            try {
              const parsed = JSON.parse(match[0]);
              console.log('Successfully parsed with pattern:', pattern);
              return parsed;
            } catch (error) {
              console.log('Pattern failed:', pattern, error.message);
            }
          }
        }
        
        // Try to fix common JSON issues
        let fixedContent = cleanedContent;
        
        // Fix trailing commas
        fixedContent = fixedContent.replace(/,(\s*[}\]])/g, '$1');
        
        // Fix unescaped quotes
        fixedContent = fixedContent.replace(/([^\\])"/g, '$1\\"');
        
        // Try parsing the fixed content
        try {
          return JSON.parse(fixedContent);
        } catch (error) {
          console.log('Fixed content parsing failed:', error.message);
        }
        
        // Last resort: try to extract any JSON-like structure
        const lastResortMatch = cleanedContent.match(/[\{\[][\s\S]*[\}\]]/);
        if (lastResortMatch) {
          try {
            return JSON.parse(lastResortMatch[0]);
          } catch (error) {
            console.log('Last resort parsing failed:', error.message);
          }
        }
        
        // If all else fails, log detailed error info
        console.error('Complete JSON parsing failure');
        console.error('Original content:', rawContent);
        console.error('Cleaned content:', cleanedContent);
        console.error('Content preview:', cleanedContent.substring(0, 200));
        
        throw new Error('Could not parse AI response as JSON. Response may be malformed or contain unexpected format.');
      }
      
      return parseAIResponse(content);
    }
  } catch (error) {
    console.error('AI API Error:', error.response?.status, error.response?.data);
    console.error('Full error object:', error);
    
    // Handle specific HTTP errors
    if (error.response?.status === 401) {
      throw new Error(`Authentication failed: Invalid API key for ${provider}. Please check your API key and try again.`);
    } else if (error.response?.status === 403) {
      throw new Error(`Access forbidden: Your API key may not have the required permissions for ${provider}.`);
    } else if (error.response?.status === 429) {
      throw new Error(`Rate limit exceeded: Too many requests to ${provider} API. Please try again later.`);
    } else if (error.response?.status === 500) {
      throw new Error(`${provider} API server error. Please try again later.`);
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new Error(`Network error: Could not connect to ${provider} API. Please check your internet connection.`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(`Request timeout: ${provider} API took too long to respond. Please try again.`);
    } else if (error.message.includes('Invalid response structure')) {
      throw new Error(`${provider} API returned an unexpected response format. Please try again.`);
    } else {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate-roadmap', async (req, res) => {
  const { apiProvider, apiKey, modelSize, productIdea, targetAudience, language = 'en' } = req.body;
  
  try {
    console.log(`Starting roadmap generation for ${language} language with ${apiProvider} provider`);
    
    const languageInstruction = language === 'fr' ? 'Respond entirely in French. ' : '';
    const userStoriesPrompt = `Product: ${productIdea}
Target Audience: ${targetAudience}

${languageInstruction}Generate 5-7 user stories in the format:
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
    
    console.log('Calling AI for user stories...');
    const userStories = await callAI(apiProvider, apiKey, modelSize, userStoriesPrompt);
    console.log('User stories generated successfully');
    
    // Create different prompts based on model tier
    const getPromptForModel = (modelSize) => {
      if (modelSize === 'nano') {
        return `${languageInstruction}Based on these user stories: ${JSON.stringify(userStories)}

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
        return `${languageInstruction}Based on these user stories: ${JSON.stringify(userStories)}

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
    
    console.log('Calling AI for roadmap...');
    const roadmap = await callAI(apiProvider, apiKey, modelSize, roadmapPrompt);
    console.log('Roadmap generated successfully');
    
    res.json({ userStories, roadmap });
  } catch (error) {
    console.error('Error in generate-roadmap endpoint:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));