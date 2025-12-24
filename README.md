# 💪 FitGen AI — AI Fitness Coach

FitGen AI is a modern AI-powered fitness assistant that generates **personalized workout plans, diet plans, and motivation tips** based on user inputs.  
It leverages Large Language Models (LLMs) along with voice and image generation to deliver an immersive fitness planning experience.

---

## 🚀 Live Demo
🔗 Live App: https://fitgen-ai.vercel.app 
🎥 Video Demo: (add Loom / Drive link here)

---

## ✨ Features

### 🧍 User Personalization
Users can input:
- Name, age, gender
- Height & weight
- Fitness goal (Weight loss, Muscle gain, etc.)
- Fitness level (Beginner / Intermediate / Advanced)
- Workout location (Home / Gym / Outdoor)
- Dietary preference (Veg / Non-veg / Vegan / Keto)
- Optional medical or lifestyle details

---

### 🧠 AI-Powered Plan Generation
Using an LLM (Gemini):
- 🏋️ **Workout Plan** — 7-day routine with exercises, sets, reps & rest
- 🥗 **Diet Plan** — meals with calories & macros
- 💡 **Tips & Motivation** — lifestyle & consistency advice  
All plans are **fully dynamic**, no hardcoded data.

---

### 🖼️ AI Image Generation
- Generate images for exercises or meals on demand
- Powered via AI image APIs (with fallback support)
- Inline image preview inside plan cards

---

### 🔊 Voice & Export
- 🔈 Listen to your plan using text-to-speech
- 📄 Export the complete plan as a **PDF**
- 🔄 Regenerate plan anytime

---

### 🎨 UI & UX
- Dark / Light mode (Zustand + CSS variables)
- Smooth animations using Framer Motion
- Responsive & accessible design using Shadcn UI

---

## 🛠️ Tech Stack

| Category | Tools |
|--------|------|
| Frontend | Next.js (App Router), React |
| Styling | Tailwind CSS, Shadcn UI, Radix UI |
| State | Zustand (persisted store) |
| AI | Google Gemini / OpenAI (LLM) |
| Images | AI Image APIs / Unsplash fallback |
| Voice | ElevenLabs / TTS |
| Animations | Framer Motion |
| Export | jsPDF, html2canvas |
| Deployment | Vercel |

---

## 🧩 Architecture Highlights
- Centralized theme management using Zustand
- Server actions via API routes
- Optimized image rendering with `next/image`
- Clean component separation & reusable UI primitives
