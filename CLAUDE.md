# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Smart Product Roadmap Generator - a web application that generates AI-powered product roadmaps from user input. The project is designed as a rapid prototype with minimal dependencies and no build step.

## Architecture

### Tech Stack
- **Frontend**: HTML + Tailwind CSS + Vanilla JavaScript (no build step)
- **Backend**: Node.js + Express (simple API server)
- **Visualization**: Chart.js for roadmap charts
- **AI Integration**: Supports both OpenAI and Google AI APIs with user-provided keys
- **Deployment**: Vercel

### Core Components
- `server.js`: Express backend with API endpoints
- `index.html`: Main UI with form and results display
- `app.js`: Frontend logic for form handling and visualization
- `style.css`: Custom styles (when created)

### API Architecture
- `/api/health`: Health check endpoint
- `/api/generate-roadmap`: Main AI processing endpoint that:
  1. Accepts user input (product idea, target audience, API credentials)
  2. Generates user stories via AI
  3. Creates product roadmap with MVP and iterations
  4. Returns structured data for frontend visualization

### AI Integration Pattern
The application supports multiple AI providers through a unified interface:
- Model size selection (nano/mini/standard) maps to specific models per provider
- OpenAI: Uses chat completions API with JSON response format
- Google AI: Uses Gemini API with JSON MIME type
- User provides their own API keys (not stored server-side)

## Development Commands

```bash
# Start development server
npm start

# Install dependencies
npm install express cors dotenv axios

# Test server health
curl http://localhost:3000/api/health
```

## Key Implementation Details

### Model Mappings
The server maps model sizes to specific AI models:
- `nano`: Fast, minimal quality (OpenAI: gpt-4.1-nano-2025-04-14, Google: gemini-1.5-flash-8b)
- `mini`: Balanced performance (OpenAI: o4-mini-2025-04-16, Google: gemini-1.5-flash)
- `standard`: Best quality (OpenAI: gpt-4.1-2025-04-14, Google: gemini-1.5-pro)

### Data Flow
1. User fills form with product idea, target audience, and API credentials
2. Frontend sends POST to `/api/generate-roadmap`
3. Backend calls AI twice: once for user stories, once for roadmap structure
4. Results are formatted and displayed with Chart.js visualization

### File Structure (Target)
```
/
├── index.html          # Main UI
├── app.js              # Frontend logic
├── server.js           # Express backend
├── package.json        # Dependencies
├── .env.example        # API key template
└── .gitignore         # Git ignore rules
```

## Project Status
Currently in Task 1 of 5 - basic Express server setup is complete. Remaining tasks include frontend UI, AI integration, visualization, and deployment setup.

## Important Notes
- No build step required - serves static files directly
- API keys are provided by users, not stored server-side
- Designed for rapid deployment to Vercel
- Uses minimal dependencies for faster development