# Smart Product Roadmap Generator - Rapid Prototype Plan

## Overview
Build a web app that generates AI-powered product roadmaps from user input. Deploy working prototype today.

## Core Features (MVP Only)
1. **Input Form**: Product idea + target audience
2. **AI Processing**: Generate user stories, feature priorities, MVP definition
3. **Visual Output**: Interactive roadmap with iterations
4. **Metrics**: Adoption metrics and change management suggestions
5. **API Flexibility**: Support OpenAI and Google AI with user's own API key

## Tech Stack (Minimal)
- **Frontend**: HTML + Tailwind CSS + Vanilla JS (no build step)
- **Backend**: Node.js + Express (simple API)
- **Visualization**: Chart.js (for roadmap)
- **Deployment**: Vercel (instant deploy)

## File Structure
```
/
├── index.html          # Main UI
├── style.css           # Tailwind + custom styles
├── app.js              # Frontend logic
├── server.js           # Express backend
├── package.json        # Dependencies
└── .env.example        # API key template
```

## Implementation Tasks

### Task 1: Project Setup & Backend Foundation
**Goal**: Get server running with basic structure

1. **Initialize Project**
   - Run: `npm init -y`
   - Install dependencies: `npm install express cors dotenv axios`
   - Create `.gitignore` with: `node_modules/`, `.env`

2. **Create server.js**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const axios = require('axios');
   require('dotenv').config();
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   app.use(express.static('.'));
   
   // Test endpoint
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok' });
   });
   
   // AI endpoint stub
   app.post('/api/generate-roadmap', async (req, res) => {
     // Implementation in Task 3
   });
   
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

3. **Create .env.example**
   ```
   PORT=3001
   # User will add their own keys
   ```

### Task 2: Frontend UI & Form
**Goal**: Complete UI ready for API integration

1. **Create index.html**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Smart Product Roadmap Generator</title>
     <script src="https://cdn.tailwindcss.com"></script>
     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   </head>
   <body class="bg-gray-50">
     <div class="container mx-auto p-8 max-w-6xl">
       <!-- Header -->
       <h1 class="text-3xl font-bold mb-8">Smart Product Roadmap Generator</h1>
       
       <!-- Input Form -->
       <div class="bg-white p-6 rounded-lg shadow mb-8">
         <form id="roadmapForm">
           <!-- API Configuration -->
           <div class="mb-6">
             <label class="block text-sm font-medium mb-2">API Provider</label>
             <select id="apiProvider" class="w-full p-2 border rounded">
               <option value="openai">OpenAI</option>
               <option value="google">Google AI</option>
             </select>
           </div>
           
           <div class="mb-6">
             <label class="block text-sm font-medium mb-2">API Key</label>
             <input type="password" id="apiKey" class="w-full p-2 border rounded" placeholder="Your API key" required>
           </div>
           
           <div class="mb-6">
             <label class="block text-sm font-medium mb-2">Model Size</label>
             <select id="modelSize" class="w-full p-2 border rounded">
               <option value="nano">Nano (Fastest)</option>
               <option value="mini">Mini (Balanced)</option>
               <option value="standard">Standard (Best Quality)</option>
             </select>
           </div>
           
           <!-- Product Info -->
           <div class="mb-6">
             <label class="block text-sm font-medium mb-2">Product Idea</label>
             <textarea id="productIdea" class="w-full p-2 border rounded" rows="3" placeholder="Describe your product idea..." required></textarea>
           </div>
           
           <div class="mb-6">
             <label class="block text-sm font-medium mb-2">Target Audience</label>
             <input type="text" id="targetAudience" class="w-full p-2 border rounded" placeholder="Who is this for?" required>
           </div>
           
           <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
             Generate Roadmap
           </button>
         </form>
       </div>
       
       <!-- Loading State -->
       <div id="loading" class="hidden bg-white p-6 rounded-lg shadow mb-8 text-center">
         <p class="text-gray-600">Generating your roadmap...</p>
       </div>
       
       <!-- Results -->
       <div id="results" class="hidden">
         <!-- User Stories -->
         <div class="bg-white p-6 rounded-lg shadow mb-8">
           <h2 class="text-xl font-semibold mb-4">User Stories</h2>
           <div id="userStories"></div>
         </div>
         
         <!-- Roadmap Visualization -->
         <div class="bg-white p-6 rounded-lg shadow mb-8">
           <h2 class="text-xl font-semibold mb-4">Product Roadmap</h2>
           <canvas id="roadmapChart"></canvas>
         </div>
         
         <!-- Metrics & Change Management -->
         <div class="bg-white p-6 rounded-lg shadow">
           <h2 class="text-xl font-semibold mb-4">Success Metrics & Change Management</h2>
           <div id="metrics"></div>
         </div>
       </div>
     </div>
     
     <script src="app.js"></script>
   </body>
   </html>
   ```

2. **Create app.js**
   ```javascript
   const form = document.getElementById('roadmapForm');
   const loading = document.getElementById('loading');
   const results = document.getElementById('results');
   
   form.addEventListener('submit', async (e) => {
     e.preventDefault();
     
     // Show loading
     loading.classList.remove('hidden');
     results.classList.add('hidden');
     
     const formData = {
       apiProvider: document.getElementById('apiProvider').value,
       apiKey: document.getElementById('apiKey').value,
       modelSize: document.getElementById('modelSize').value,
       productIdea: document.getElementById('productIdea').value,
       targetAudience: document.getElementById('targetAudience').value
     };
     
     try {
       const response = await fetch('/api/generate-roadmap', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });
       
       const data = await response.json();
       displayResults(data);
     } catch (error) {
       alert('Error generating roadmap: ' + error.message);
     } finally {
       loading.classList.add('hidden');
     }
   });
   
   function displayResults(data) {
     // Implementation in Task 4
   }
   ```

### Task 3: AI Integration
**Goal**: Working AI calls for both OpenAI and Google

1. **Update server.js - Add model mappings**
   ```javascript
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
   ```

2. **Implement /api/generate-roadmap endpoint**
   ```javascript
   app.post('/api/generate-roadmap', async (req, res) => {
     const { apiProvider, apiKey, modelSize, productIdea, targetAudience } = req.body;
     
     try {
       // Generate user stories
       const userStoriesPrompt = `Product: ${productIdea}
   Target Audience: ${targetAudience}
   
   Generate 5-7 user stories in the format:
   "As a [user type], I want [feature] so that [benefit]"
   
   Return as JSON array of objects with fields: userType, feature, benefit, priority (1-5)`;
       
       const userStories = await callAI(apiProvider, apiKey, modelSize, userStoriesPrompt);
       
       // Generate roadmap
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
       // Google AI implementation
       const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
         contents: [{ parts: [{ text: prompt }] }],
         generationConfig: { responseMimeType: 'application/json' }
       });
       return JSON.parse(response.data.candidates[0].content.parts[0].text);
     }
   }
   ```

### Task 4: Visualization & Display
**Goal**: Display results with interactive roadmap

1. **Update app.js - Implement displayResults**
   ```javascript
   function displayResults(data) {
     results.classList.remove('hidden');
     
     // Display user stories
     const storiesHtml = data.userStories.map(story => `
       <div class="mb-3 p-3 bg-gray-50 rounded">
         <p class="font-medium">As a ${story.userType}, I want ${story.feature} so that ${story.benefit}</p>
         <span class="text-sm text-gray-500">Priority: ${story.priority}/5</span>
       </div>
     `).join('');
     document.getElementById('userStories').innerHTML = storiesHtml;
     
     // Create roadmap chart
     createRoadmapChart(data.roadmap);
     
     // Display metrics and change management
     const metricsHtml = `
       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <h3 class="font-semibold mb-2">Success Metrics</h3>
           ${data.roadmap.metrics.map(m => `<p class="mb-1">• ${m}</p>`).join('')}
         </div>
         <div>
           <h3 class="font-semibold mb-2">Change Management</h3>
           ${data.roadmap.changeManagement.map(c => `<p class="mb-1">• ${c}</p>`).join('')}
         </div>
       </div>
     `;
     document.getElementById('metrics').innerHTML = metricsHtml;
   }
   
   function createRoadmapChart(roadmap) {
     const ctx = document.getElementById('roadmapChart').getContext('2d');
     
     // Prepare data for timeline chart
     const labels = ['MVP', ...roadmap.iterations.map((_, i) => `Iteration ${i + 1}`)];
     const data = {
       labels: labels,
       datasets: [{
         label: 'Features',
         data: [
           roadmap.mvp.features.length,
           ...roadmap.iterations.map(i => i.features.length)
         ],
         backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
       }]
     };
     
     new Chart(ctx, {
       type: 'bar',
       data: data,
       options: {
         responsive: true,
         plugins: {
           tooltip: {
             callbacks: {
               afterLabel: function(context) {
                 const phase = context.dataIndex === 0 ? roadmap.mvp : roadmap.iterations[context.dataIndex - 1];
                 return phase.features.join('\n');
               }
             }
           }
         }
       }
     });
   }
   ```

### Task 4.2: Enhanced PM-Focused Visualization & Metrics Display
**Goal**: Transform basic visualization into strategic PM-oriented roadmap with proper formatting

1. **Rethink Roadmap Visualization for Product Managers**
   
   Current issues:
   - MVP column shows empty (no features displayed)
   - Only shows feature count per phase (not strategic)
   - Single "Features" legend is not informative
   - Missing timeline, dependencies, business value
   
   What PMs actually want to see:
   - **Timeline View**: Quarters/months for each phase
   - **Feature Details**: Key features per phase (not just count)
   - **Business Impact**: Revenue potential, user growth targets
   - **Risk Indicators**: Technical complexity, dependencies
   - **Progress Tracking**: What's delivered vs planned
   
   Implementation approach:
   ```javascript
   function createRoadmapChart(roadmap) {
     const ctx = document.getElementById('roadmapChart').getContext('2d');
     
     // Extract timeline and features for each phase
     const phases = [
       { 
         name: 'MVP', 
         features: roadmap?.mvp?.features || [],
         timeline: roadmap?.mvp?.timeline || 'Q1',
         priority: 'Critical'
       },
       ...roadmap.iterations.map((iter, i) => ({
         name: `Phase ${i + 2}`,
         features: iter?.features || [],
         timeline: iter?.timeline || `Q${i + 2}`,
         priority: iter?.priority || 'High'
       }))
     ];
     
     // Create stacked bar chart showing feature categories
     const datasets = [
       {
         label: 'Core Features',
         backgroundColor: '#3B82F6',
         data: phases.map(p => p.features.filter(f => f.type === 'core').length)
       },
       {
         label: 'Enhancement Features', 
         backgroundColor: '#10B981',
         data: phases.map(p => p.features.filter(f => f.type === 'enhancement').length)
       },
       {
         label: 'Growth Features',
         backgroundColor: '#F59E0B', 
         data: phases.map(p => p.features.filter(f => f.type === 'growth').length)
       }
     ];
     
     new Chart(ctx, {
       type: 'bar',
       data: {
         labels: phases.map(p => `${p.name}\n${p.timeline}`),
         datasets: datasets
       },
       options: {
         responsive: true,
         scales: {
           x: { stacked: true },
           y: { stacked: true }
         },
         plugins: {
           title: {
             display: true,
             text: 'Product Roadmap - Strategic Feature Distribution'
           },
           tooltip: {
             callbacks: {
               afterLabel: function(context) {
                 const phase = phases[context.dataIndex];
                 return phase.features.join('\n');
               }
             }
           }
         }
       }
     });
   }
   ```

2. **Fix Success Metrics Display**
   
   Current: Shows raw JSON objects
   Target: Clean, formatted metrics with context
   
   ```javascript
   // Better metric formatting
   const formatMetrics = (metrics) => {
     if (!Array.isArray(metrics)) return '';
     
     return metrics.map(metric => {
       // Handle both string and object formats
       if (typeof metric === 'string') {
         return `<div class="mb-2">• ${metric}</div>`;
       }
       
       // Extract meaningful data from metric objects
       const iteration = metric.iteration || metric.phase || '';
       const description = metric.successMetric || metric.metric || metric.description || '';
       const target = metric.target || metric.value || '';
       
       return `
         <div class="mb-3 p-2 bg-gray-50 rounded">
           ${iteration ? `<span class="font-semibold">Phase ${iteration}:</span>` : ''}
           <span>${description}</span>
           ${target ? `<span class="text-blue-600 ml-2">(Target: ${target})</span>` : ''}
         </div>
       `;
     }).join('');
   };
   ```

3. **Populate Change Management Content**
   
   Ensure AI returns actual change management strategies:
   - Update roadmap prompt to explicitly request change management items
   - Format as actionable steps with ownership and timeline
   
   ```javascript
   // Enhanced display for change management
   const formatChangeManagement = (items) => {
     if (!Array.isArray(items) || items.length === 0) {
       // Fallback content if AI doesn't provide
       return `
         <div class="text-gray-600">
           <p>• Stakeholder communication plan needed</p>
           <p>• User training materials to be developed</p>
           <p>• Phased rollout strategy recommended</p>
         </div>
       `;
     }
     
     return items.map(item => {
       const text = typeof item === 'string' ? item : 
                    item.action || item.description || JSON.stringify(item);
       return `<p class="mb-2">• ${text}</p>`;
     }).join('');
   };
   ```

4. **Update app.js Display Logic**
   
   Replace current metrics display with:
   ```javascript
   // Display metrics and change management with better formatting
   const metricsHtml = `
     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div>
         <h3 class="font-semibold mb-3 text-lg">Success Metrics</h3>
         <div class="space-y-2">
           ${formatMetrics(data.roadmap?.metrics || [])}
         </div>
       </div>
       <div>
         <h3 class="font-semibold mb-3 text-lg">Change Management</h3>
         <div class="space-y-2">
           ${formatChangeManagement(data.roadmap?.changeManagement || [])}
         </div>
       </div>
     </div>
   `;
   ```

5. **Testing the Enhanced Display**
   - Verify MVP features are visible
   - Check multi-category legend works
   - Ensure metrics show formatted text, not JSON
   - Confirm change management has content
   - Test with different AI responses

### Task 5: Testing & Deployment
**Goal**: Deploy working prototype

1. **Create package.json scripts**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

2. **Local Testing Checklist**
   - Start server: `npm start`
   - Test with both OpenAI and Google AI
   - Verify roadmap generation works
   - Check visualization displays correctly
   - Test error handling (invalid API key)

3. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Create `vercel.json`:
     ```json
     {
       "builds": [
         { "src": "server.js", "use": "@vercel/node" },
         { "src": "index.html", "use": "@vercel/static" },
         { "src": "app.js", "use": "@vercel/static" }
       ],
       "routes": [
         { "src": "/api/.*", "dest": "server.js" },
         { "src": "/(.*)", "dest": "/$1" }
       ]
     }
     ```
   - Run: `vercel --prod`
   - Test deployed URL

## Success Criteria Checklist
- [ ] User can input product idea and target audience
- [ ] API key and provider selection works
- [ ] AI generates coherent user stories
- [ ] Roadmap visualization displays correctly
- [ ] Works with both OpenAI and Google AI
- [ ] Deploys successfully to Vercel
- [ ] Error handling for invalid inputs/API keys

## Troubleshooting Quick Fixes
1. **CORS Issues**: Ensure `cors()` middleware is before routes
2. **API Errors**: Check API key format and model names
3. **Chart Not Showing**: Verify Chart.js CDN is loaded
4. **Vercel Deploy Fails**: Check `vercel.json` configuration