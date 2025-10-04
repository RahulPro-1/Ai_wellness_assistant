# 🌱 AI Wellness Coach

A **React + TypeScript** web application that provides **personalized wellness recommendations** powered by **Google's Gemini AI**. Get custom wellness tips tailored to your age, gender, and health goals.

---

## 🚀 Quick Start

### Prerequisites

* Node.js 16+
* npm or yarn
* Google Gemini API key

### Installation & Running

```bash
# Clone repo & navigate
git clone <your-repo-url>
cd ai-wellness-coach

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_GEMINI_API_KEY to .env

# Start development server
npm run dev

# Build for production
npm run build
```

The app will open at **[http://localhost:5173](http://localhost:5173)**

---

## 🎯 Project Overview

**Problem:** Generic wellness advice often fails to address individual needs, leading to poor adherence and results.

**Solution:** An **AI-powered platform** that generates **personalized wellness recommendations** based on user profiles, making wellness guidance **specific, actionable, and relevant**.

### Key Assumptions

* Users provide accurate demographic and goal information
* AI-generated content is for **general wellness guidance only**
* Recommendations focus on **evidence-based wellness categories**

---

## 🤖 AI Integration

### Prompt Engineering Journey

**Initial Challenges**

* Inconsistent JSON responses
* Overly generic recommendations
* Missing category assignments

**Refined Solution**

```ts
// Structured prompts with exact JSON formatting
const prompt = `
You are a wellness expert. Generate exactly 5 wellness tips...
Return ONLY a valid JSON object in this exact format...
`;
```

### AI Service Features

* **Model:** Gemini 2.5 Flash (latest)
* **Retry Logic:** 3 attempts with exponential backoff
* **Error Handling:** Comprehensive error catching & user feedback
* **JSON Parsing:** Robust parsing with regex fallbacks

---

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
├── context/             # React Context for state management
├── screens/             # Main application screens
├── services/
│   └── aiService.ts     # Gemini AI API integration
├── types.ts             # TypeScript definitions
└── App.tsx              # Main application component
```

### Key Technologies

* **Frontend:** React + TypeScript + Vite
* **Styling:** Tailwind CSS
* **AI:** Google Gemini API
* **State Management:** React Context
* **Build Tool:** Vite

---

## 🎨 Features

### Core Functionality

✅ Personalized wellness tip generation
✅ Step-by-step actionable guidance
✅ Organized by categories (Physical, Mental, Nutrition, Sleep, Lifestyle)
✅ Visual color-coded tips with emojis

### User Experience

✅ Responsive mobile-first design
✅ Smooth loading animations
✅ Error handling with retry options
✅ Clean, intuitive interface

---

## 📸 Application Screens

* **Profile Setup** – Input age, gender, wellness goals
* **Tips Dashboard** – Grid of personalized recommendations
* **Tip Details** – Expanded view with steps & benefits
* **Loading States** – Beautiful animations

![WhatsApp Image 2025-10-04 at 23 37 53_79e0995e](https://github.com/user-attachments/assets/735c02d6-ac9a-494d-ab82-eb9f174e465e)
![WhatsApp Image 2025-10-04 at 23 37 54_cf3fb7f5](https://github.com/user-attachments/assets/5bb099f7-0cf8-4df5-a785-61642e5099a2)
![WhatsApp Image 2025-10-04 at 23 37 54_81006bc2](https://github.com/user-attachments/assets/1b9d3ee4-9baf-4d4c-a544-01ceb11df775)
![WhatsApp Image 2025-10-04 at 23 37 54_c600a5d2](https://github.com/user-attachments/assets/e4b2aa0d-8ae5-437a-a056-090389061913)





---

## 🐛 Known Issues & Limitations

* **API Constraints:** Basic rate limiting, no queuing
* **Content Safety:** Limited validation of AI-generated content
* **Offline Usage:** No caching/offline support
* **Personalization:** Limited learning from user preferences

### Planned Improvements

* User feedback system for tip relevance
* Favorite tips & progress tracking
* Content moderation layer
* Advanced rate limiting & caching
* Push notifications for daily tips
* Social sharing features

---

## ✨ Bonus Features

### Enhanced UX

* Gradient color coding by tip category
* Smooth animations & transitions
* Mobile-optimized responsive design
* Basic accessibility features

### Technical Excellence

* Full **TypeScript** type safety
* Robust error handling & retry mechanisms
* Optimized API calls & bundle size
* ESLint for code quality

---

## 🔧 Configuration

### Environment Variables

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### API Endpoints

**Base URL:**

```
https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent
```

---

## 📦 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🛠️ Development

### Adding New Features

1. Update types in `src/types.ts`
2. Create new components in `src/components/`
3. Add new screens in `src/screens/`
4. Extend AI service in `src/services/aiService.ts`

### Code Style

* **TypeScript strict mode** enabled
* **ESLint** for code quality
* Functional components with hooks
* Tailwind CSS for styling

---

## ❤️ Built With

* React
* TypeScript
* Tailwind CSS
* Vite
* Google Gemini AI

---
