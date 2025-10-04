import { UserProfile, WellnessTip, TipDetail } from '../types';

// ✅ Use the latest Gemini 2.5 Flash model (v1 endpoint)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function callGeminiAPI(prompt: string, retries = 0): Promise<string> {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No response text from API');
    }

    return text;
  } catch (error) {
    console.error(`Gemini API error: ${error}`);
    if (retries < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (retries + 1)));
      return callGeminiAPI(prompt, retries + 1);
    }
    throw error;
  }
}

function parseJSONFromText(text: string): any {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return JSON.parse(text);
}

const tipColors = [
  { bg: 'bg-gradient-to-br from-purple-400 to-purple-600', text: 'text-purple-900' },
  { bg: 'bg-gradient-to-br from-blue-400 to-blue-600', text: 'text-blue-900' },
  { bg: 'bg-gradient-to-br from-green-400 to-green-600', text: 'text-green-900' },
  { bg: 'bg-gradient-to-br from-orange-400 to-orange-600', text: 'text-orange-900' },
  { bg: 'bg-gradient-to-br from-pink-400 to-pink-600', text: 'text-pink-900' },
  { bg: 'bg-gradient-to-br from-teal-400 to-teal-600', text: 'text-teal-900' },
  { bg: 'bg-gradient-to-br from-cyan-400 to-cyan-600', text: 'text-cyan-900' },
  { bg: 'bg-gradient-to-br from-indigo-400 to-indigo-600', text: 'text-indigo-900' },
];

export async function generateWellnessTips(profile: UserProfile): Promise<WellnessTip[]> {
  const prompt = `
You are a wellness expert. Generate exactly 5 wellness tips for someone who is ${profile.age} years old, ${profile.gender}, with a goal of "${profile.goal}".

Return ONLY a valid JSON object in this exact format (no markdown, no extra text):
{
  "tips": [
    {
      "id": "1",
      "title": "Morning Routine",
      "short": "Brief one-line description",
      "icon": "☀️",
      "category": "Physical"
    }
  ]
}

Make tips specific, actionable, and relevant to their goal. Use diverse emoji icons that match each tip.
Categories can be: Physical, Mental, Nutrition, Sleep, or Lifestyle.
`;

  try {
    const responseText = await callGeminiAPI(prompt);
    const parsed = parseJSONFromText(responseText);

    const tips = parsed.tips.map((tip: any, index: number) => ({
      id: tip.id || String(index + 1),
      title: tip.title,
      short: tip.short,
      icon: tip.icon || '✨',
      category: tip.category || 'Wellness',
      color: tipColors[index % tipColors.length].bg,
    }));

    return tips;
  } catch (error) {
    console.error('Error generating wellness tips:', error);
    throw new Error('Failed to generate wellness tips. Please try again.');
  }
}

export async function generateTipDetails(tip: WellnessTip, profile: UserProfile): Promise<TipDetail> {
  const prompt = `
You are a wellness expert. Provide detailed guidance for this wellness tip:
Title: ${tip.title}
Description: ${tip.short}
User Profile: ${profile.age} years old, ${profile.gender}, goal: ${profile.goal}

Return ONLY a valid JSON object in this exact format (no markdown, no extra text):
{
  "title": "${tip.title}",
  "explanation": "Detailed 2-3 sentence explanation of why this tip is important and how it helps achieve their goal",
  "steps": [
    "Step 1: Specific actionable instruction",
    "Step 2: Another specific actionable instruction",
    "Step 3: Another specific actionable instruction"
  ],
  "benefits": [
    "Specific benefit 1",
    "Specific benefit 2",
    "Specific benefit 3"
  ]
}

Make it personal, actionable, and encouraging. Provide 3-5 clear steps and 3-4 key benefits.
`;

  try {
    const responseText = await callGeminiAPI(prompt);
    const parsed = parseJSONFromText(responseText);

    return {
      title: parsed.title || tip.title,
      explanation: parsed.explanation,
      steps: parsed.steps || [],
      benefits: parsed.benefits || [],
    };
  } catch (error) {
    console.error('Error generating tip details:', error);
    throw new Error('Failed to generate tip details. Please try again.');
  }
}
