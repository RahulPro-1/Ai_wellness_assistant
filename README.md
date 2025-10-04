🌱 AI Wellness Coach
A React-based web application that provides personalized wellness recommendations using Google's Gemini AI. Get custom wellness tips tailored to your age, gender, and health goals.

🚀 Quick Start
Prerequisites
Node.js 16+

npm or yarn

Google Gemini API key

Installation & Running
bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_GEMINI_API_KEY to .env

# Start development server
npm run dev

# Build for production
npm run build
The app will open at http://localhost:5173

🎯 Project Overview
Problem: Generic wellness advice often fails to address individual needs, leading to poor adherence and results.

Solution: An AI-powered platform that generates personalized wellness recommendations based on user profiles, making wellness guidance specific, actionable, and relevant.

Key Assumptions:

Users provide accurate demographic and goal information

AI-generated content is appropriate for general wellness guidance

Recommendations focus on evidence-based wellness categories

🤖 AI Integration
Prompt Engineering Journey
Initial Challenges:

Inconsistent JSON responses from AI

Overly generic recommendations

Missing category assignments

Refined Solution:

typescript
// Structured prompts with exact JSON formatting
const prompt = `
You are a wellness expert. Generate exactly 5 wellness tips...
Return ONLY a valid JSON object in this exact format...
`;
AI Service Features
Model: Gemini 2.5 Flash (latest)

Retry Logic: 3 attempts with exponential backoff

Error Handling: Comprehensive error catching and user feedback

JSON Parsing: Robust parsing with regex fallbacks

🏗️ Architecture
text
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── screens/            # Main application screens
├── services/
│   └── aiService.ts    # Gemini AI API integration
├── types.ts            # TypeScript definitions
└── App.tsx             # Main application component
Key Technologies
Frontend: React + TypeScript + Vite

Styling: Tailwind CSS

AI: Google Gemini API

State Management: React Context

Build Tool: Vite

🎨 Features
Core Functionality
✅ Personalized wellness tip generation

✅ Detailed step-by-step guidance

✅ Category-based organization (Physical, Mental, Nutrition, Sleep, Lifestyle)

✅ Visual color-coded tips with emojis

User Experience
✅ Responsive mobile-first design

✅ Smooth loading states

✅ Error handling with retry options

✅ Clean, intuitive interface

📸 Application Screens
[Screenshots to be added]

Profile Setup - Input age, gender, and wellness goals

Tips Dashboard - Grid of personalized wellness recommendations

Tip Details - Expanded view with steps and benefits

Loading States - Beautiful loading animations

🐛 Known Issues & Limitations
Current Limitations
API Constraints - Basic rate limiting, no request queuing

Content Safety - Limited validation of AI-generated content

Offline Usage - No caching or offline functionality

Personalization - Limited user preference learning

Planned Improvements
User feedback system for tip relevance

Favorite tips and progress tracking

Content moderation layer

Advanced rate limiting and caching

Push notifications for daily tips

Social sharing capabilities

✨ Bonus Features
Enhanced UX
Visual Design: Beautiful gradient color coding per tip category

Animations: Smooth transitions and loading states

Responsive: Mobile-optimized interface

Accessibility: Basic a11y features implemented

Technical Excellence
Type Safety: Full TypeScript implementation

Error Resilience: Robust error handling and retry mechanisms

Performance: Optimized API calls and bundle size

Code Quality: ESLint configuration and clean architecture

🔧 Configuration
Environment Variables
env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
API Endpoints
Base URL: https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent

📦 Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
🛠️ Development
Adding New Features
Update types in src/types.ts

Create components in src/components/

Add screens in src/screens/

Extend AI service in src/services/aiService.ts

Code Style
TypeScript strict mode enabled

ESLint for code quality

Functional components with hooks

Tailwind CSS for styling

Built with ❤️ using React, TypeScript, and Gemini AI
