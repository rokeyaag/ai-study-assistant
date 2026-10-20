# 🎓 EduGenius AI - Socratic AI Study Companion & Gamified Learning Platform

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash_Vision-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized_FX-FF5722?style=for-the-badge&logo=w3c&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **EduGenius AI** is an intelligent, gamified study assistant built for STEM students. It bridges the gap between static textbooks and active comprehension through **Textbook Page OCR + Step-by-Step AI Problem Solving**, an interactive **Socratic Voice & Chat Tutor**, a **Gamified MCQ Arena**, a **Personalized Knowledge Vault ("ডিজিটাল খাতা")**, and an inclusive **Points-to-Subscription Reward Economy**.

---

## 🌟 The Problem & Our Solution

- **The Problem**: Students studying rigorous STEM subjects (Physics, Chemistry, Higher Mathematics, Biology) often get stuck on complex textbook problems late at night without an accessible teacher. Traditional private tutors are expensive, and generic AI chatbots simply regurgitate final answers without fostering true conceptual understanding.
- **Our Solution**: **EduGenius AI** acts as a personal 24/7 Socratic mentor. It doesn't just hand over answers; it deconstructs complex equations step-by-step, highlights common exam traps, lets students ask clarifying questions, and rewards daily study consistency with redeemable points so that even students who cannot afford paid subscriptions can unlock Pro access for free.

---

## 🚀 Key Features

### 1. 📸 Textbook Page OCR & Step-by-Step Solver
- **Instant Camera & Image Upload**: Snap a photo or upload an image of any textbook page or handwritten homework problem.
- **Multimodal AI Analysis**: Powered by Google Gemini 1.5 Flash Vision to extract equations, recognize diagrams, and format step-by-step explanations.
- **Exam Tips & Formulas**: Automatically generates key formulas, exam cautions, and shortcut validation tips.
- **1-Click Vault Sync**: Save any solved problem straight into your digital notebook.

### 2. 🤖 Interactive Socratic AI Tutor
- **Adaptive Personas**: Switch between **Friendly Mentor** (encouraging & patient), **Exam Coach** (rigorous & shortcut-focused), and **Curious Socratic Guide** (guided inquiry).
- **Step-by-Step Guidance**: Encourages critical thinking by asking guiding questions rather than spoiling the answer.
- **Configurable API Key**: Use our seamless built-in educational engine or paste your personal Google Gemini API key for unlimited live AI inference.

### 3. 🎯 Gamified MCQ Quiz Arena
- **Timed Challenges**: Practice curated STEM questions under exam simulation pressure.
- **Instant Points & Confetti**: Earn +10 to +25 Zen Coins per quiz completion.
- **Smart Explanations**: Immediate rationale cards explaining why an option is right or wrong.

### 4. 🗂️ Knowledge Vault ("ডিজিটাল খাতা")
- **Organized by Subject**: Instant filtering for Physics, Chemistry, Higher Math, and Biology.
- **🎧 AI Audio Podcast Recap**: Synthesized 3-minute revision podcasts simulating an audio review session before exams.
- **📄 Printable Cheat Sheets**: 1-click modal to preview and print formula sheets for quick revision.

### 5. 💎 Points-to-Subscription Economy (Zero Paywall)
- **Earn While You Learn**: Gain coins through Pomodoro study blocks (+20), quiz completions (+15), and referral invites (+25).
- **Pro Scholar Redemption**: **100 Zen Coins** can be redeemed to unlock **1 Full Month of Pro Scholar Membership** without spending real money!

---

## 🏛️ System Architecture

```mermaid
graph TD
    User([Student / Learner]) --> UI[EduGenius UI - React 19 + Tailwind v4]
    
    subgraph Core Features
        UI --> Scanner[AI Book Page Scanner]
        UI --> Tutor[Socratic AI Tutor]
        UI --> Arena[Quiz Arena]
        UI --> Vault[Knowledge Vault]
        UI --> Store[Reward Store]
    end

    subgraph Intelligence & Services
        Scanner --> GeminiVision[Google Gemini 1.5 Flash Multimodal Vision]
        Tutor --> GeminiSocratic[Gemini 1.5 Flash Pedagogical Engine]
        Vault --> PodcastEngine[Web Audio Synthesizer & Cheat Sheet Generator]
        Arena --> Confetti[Canvas Confetti & Sound Manager]
    end

    subgraph Gamified State Engine
        Arena -->|Earn Points| Wallet[(Zen Points Wallet)]
        Scanner -->|Auto-Save| VaultNotes[(Vault Database)]
        Wallet -->|100 Coins = 1 Month Pro| Store
        Store -->|Unlock Unlimited Pro Tier| User
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven modern reactive UI |
| **Vite 6** | Ultra-fast build tool and local dev server |
| **Tailwind CSS v4** | Clean, responsive design with mobile frame preview |
| **Google Gemini API** | Multimodal OCR image analysis & Socratic conversational reasoning |
| **Lucide Icons** | Crisp, scalable UI iconography |
| **Canvas Confetti** | Celebration visual effects for completed milestones |
| **Web Audio API** | Zero-dependency, real-time synthesized audio feedback |

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/edugenius-ai.git
cd edugenius-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch local development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔑 Optional Gemini API Key Configuration
EduGenius AI includes built-in smart educational presets that work out of the box with zero setup. To test custom live images and textbook scans:
1. Open the **AI Tutor** tab.
2. Click the **API Key** button in the top right.
3. Paste your free Google AI Studio key (`AIzaSy...`).
4. All textbook scans will now be processed directly through Gemini 1.5 Flash Vision in real-time!

---

## 🚀 Deployment to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `edugenius-ai` repository.
4. Framework preset: **Vite** (auto-detected).
5. Click **"Deploy"** — your live link will be ready in under 60 seconds!

---

## 👥 Hackathon Submission Details
- **Project Name**: EduGenius AI
- **Category**: Education, AI for Social Good, Gamification
- **License**: MIT License
