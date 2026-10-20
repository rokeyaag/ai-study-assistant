# 🏆 DevPost Hackathon Submission Guide: AI Study Assistant

Use the exact contents below to fill in your DevPost submission form.

---

## 📌 Project Overview
- **Project Title**: **AI Study Assistant**
- **Tagline**: *Gamified Socratic AI Study Companion & Textbook Solver empowering STEM students to master complex concepts and unlock Pro learning for free.*
- **Built With**: `React`, `Vite`, `Tailwind CSS`, `Google Gemini 1.5 Flash Vision`, `Web Audio API`, `Canvas Confetti`, `JavaScript`, `HTML5`, `CSS3`
- **Category**: Education, AI / Machine Learning, Social Good

---

## 📝 DevPost Story (Copy & Paste to DevPost Form)

### 💡 Inspiration
Late at night, STEM students studying Physics, Chemistry, or Higher Math frequently run into insurmountable roadblocks with textbook equations or homework problems. In developing regions and low-income households, private tutors are prohibitively expensive, costing hundreds of dollars a month. 

While general-purpose AI chat apps exist, they have two major flaws:
1. They simply spit out the final answer, depriving students of the critical thinking process needed for competitive and board exams.
2. They gate their best features behind high subscription paywalls.

We were inspired to build **AI Study Assistant**—a democratized, 24/7 Socratic learning companion that doesn't just give answers, but guides students through reasoning steps, offers audio revision podcasts, and features a **gamified points economy where students earn Pro access completely for free through consistent study.**

---

### 🚀 What It Does
AI Study Assistant is a complete, mobile-responsive learning ecosystem:

1. **Textbook Page OCR & Multimodal Solver**:
   Students snap a photo of any printed textbook page or handwritten homework problem. Powered by Google Gemini 1.5 Flash Vision, the system transcribes the equations, provides step-by-step mathematical logic, extracts key formulas, highlights common exam pitfalls, and saves notes directly to the student's notebook with a single click.

2. **Adaptive Socratic AI Tutor**:
   Rather than giving away answers, our AI tutor employs the Socratic method with switchable personas (*Friendly Mentor*, *Exam Coach*, *Curious Guide*). It asks guided questions, probes student understanding, and provides progressive hints.

3. **Gamified MCQ Practice Arena**:
   Interactive, timed quizzes across core STEM subjects. Completing quizzes rewards students with **Zen Coins**, streak multipliers, and instant confetti animations.

4. **Knowledge Vault ("ডিজিটাল খাতা")**:
   A digital repository for all scanned and AI-generated notes. Includes:
   - **AI Audio Podcast Simulator**: Generates a 3-minute spoken revision recap of formulas and concepts before tests.
   - **Printable Cheat Sheets**: Formats quick-reference revision cards ready to print or review on mobile.

5. **Inclusive Points-to-Subscription Economy**:
   Students earn Zen Coins by completing Pomodoro focus sessions (+20 pts), daily quizzes (+15 pts), and referring classmates (+25 pts). When they reach **100 Coins**, they can redeem them to unlock **1 Full Month of Pro Scholar Membership** without spending a single penny!

---

### 🛠️ How We Built It
- **Frontend Architecture**: Built using **React 19** and **Vite 6** for blazing-fast performance, sub-second HMR, and smooth client transitions.
- **Styling & Aesthetics**: Hand-crafted with **Tailwind CSS v4**, featuring a modern glassmorphism design system, crisp typography, and an interactive mobile-device simulation frame toggle.
- **Multimodal AI Vision & Reasoning**: Integrated **Google Gemini 1.5 Flash** for high-precision OCR of handwritten and printed STEM formulas, with fallback contextual knowledge bases for zero-latency testing.
- **Audio & Haptic Feedback**: Utilized the browser's native **Web Audio API** to synthesize rewarding sound effects (scans, clicks, success chimes) without external asset bloat.
- **Gamification Mechanics**: Real-time state management for streaks, Pomodoro timers, points balance, and redemption modals with **Canvas Confetti**.

---

### 🧗 Challenges We Ran Into
1. **Mathematical Notation & OCR Accuracy**: Textbook images often contain subscript indices, Greek letters, and fractional equations. We engineered structured JSON schemas and robust prompt engineering in Gemini to ensure formulas render cleanly.
2. **Pedagogical Balance (Socratic Prompting)**: Standard LLMs tend to blurt out complete solutions immediately. We fine-tuned the Socratic system prompt to enforce guided inquiry, hints, and concept validation first.
3. **Responsive Mobile Shell**: Creating an interface that feels equally native on both mobile smartphones and wide desktop displays required building a dynamic container with a 1-click device frame preview toggle.

---

### 🏆 Accomplishments That We're Proud Of
- **Zero-Paywall Pro Tier**: Successfully implementing a points economy that truly allows hardworking students to earn 100% free Pro subscriptions through study activity.
- **Built-in Audio Revision Experience**: Giving students an interactive audio podcast recap modal that transforms static notes into spoken revision audio.
- **Zero Setup Friction**: Providing pre-loaded high-yield textbook sample problems so judges and users can test every feature instantly without even needing an API key.

---

### 📚 What We Learned
- How to structure multimodal vision prompts for high-precision STEM document analysis.
- The psychological impact of micro-gamification (confetti, streak flames, synthesized audio rewards) in sustaining student motivation.
- Leveraging modern React 19 patterns with context providers for lightweight, reactive state management.

---

### 🔮 What's Next for AI Study Assistant
- **Voice-to-Voice Socratic Dialogue**: Integrating WebRTC and Gemini Live Audio for natural, spoken conversational tutoring.
- **Bengali & Regional Language Dubbing**: Full native Bengali audio explanation for rural students preparing for SSC/HSC board examinations.
- **Offline Progressive Web App (PWA)**: Enabling local note caching and offline practice in low-connectivity areas.

---

## 🎬 2-3 Minute Video Demo Script (Step-by-Step Recording Guide)

| Timestamp | Screen / Visual Action | Voiceover Script (What to Say) |
| :--- | :--- | :--- |
| **0:00 - 0:25** | **Dashboard View**: Show student name, 7-day streak flame, 125 Zen Coins, and click the **Pomodoro Timer** start button. | *"Welcome to AI Study Assistant, the Socratic study companion that makes mastering STEM subjects accessible, engaging, and rewarding for every student. Here on the Dashboard, students track their daily study streaks, manage their Zen Coins, and stay disciplined with our built-in Pomodoro focus timer."* |
| **0:25 - 0:55** | **AI Tutor Tab**: Show textbook problem scanner. Click a preset (e.g. *Physics: Gravitational Potential*), then show the step-by-step breakdown and exam tips. Click **"Save to My Knowledge Vault"**. | *"Let's look at our AI Book Scanner. A student can snap a photo of any textbook page or homework equation. Powered by Gemini 1.5 Flash Vision, AI Study Assistant breaks down the problem into intuitive logical steps, formulas, and critical exam tips. With one click, it saves directly into their personal digital vault."* |
| **0:55 - 1:20** | **AI Tutor Chat**: Type a question in the chat box (e.g., *"Why is escape velocity independent of the object's mass?"*) and show the Socratic mentor persona replying. | *"If a student gets stuck on any step, they don't get spoon-fed answers. Our Socratic AI Tutor acts as a personal mentor, asking guided questions that spark genuine conceptual understanding."* |
| **1:20 - 1:45** | **Quiz Arena**: Start a quick MCQ challenge, pick answers, show instant explanation cards, and celebrate the confetti animation with point rewards! | *"Students can test their knowledge in the Quiz Arena. Instant feedback, clear explanations, and coin rewards turn stressful exam prep into an exciting challenge."* |
| **1:45 - 2:10** | **Knowledge Vault**: Filter notes by subject, open the **"🎧 3-Min Audio Podcast"** modal and play audio, then open the **"📄 Cheat Sheet"** preview. | *"All solved problems live inside the Knowledge Vault. Students can listen to a 3-minute AI audio podcast recap before exams or generate a 1-click printable formula cheat sheet."* |
| **2:10 - 2:35** | **Store & Pro Redemption**: Navigate to Store, show 125 Coins balance, click **"Redeem 100 Points for 1 Month Pro"**, and watch the **Redemption Modal** celebrate! | *"Best of all, AI Study Assistant has no unfair paywall. Students can redeem 100 earned coins to unlock a full month of Pro Scholar membership for free. AI Study Assistant: learn smarter, stay motivated, and achieve academic excellence. Thank you!"* |
