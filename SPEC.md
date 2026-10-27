# SPEC.md — AI Mystery Room Specification Sheet

## 1. Project Overview & Problem Statement

### 1.1 Project Overview
**AI Mystery Room** is an immersive, AI-powered interactive mystery web application. Players step into the shoes of a lead detective tasked with solving dynamic, procedurally generated criminal cases powered by Google Gemini. Each case features unique suspects, interrogations, hidden clues, subtle hints, and an airtight whodunit puzzle. Players investigate evidence, evaluate alibis, unlock clues, deduce the truth, and submit their final accusation.

### 1.2 Problem Statement
Traditional digital detective and escape room games are static, pre-scripted, and suffer from zero replayability once solved. AI Mystery Room solves this by leveraging generative AI to author novel, cohesive, and logistically sound murder mysteries on the fly, tailoring complexity and puzzle depth across difficulty levels while ensuring that critical answers remain secure on the backend until an accusation is rendered.

### 1.3 Target Users & Expected User Experience
- **Target Audience:** Mystery enthusiasts, escape-room fans, puzzle solvers, and casual web gamers.
- **Tone & Atmosphere:** Sleek, atmospheric noir / modern investigative thriller featuring dark themes, neon accents, tactile clue inspections, and high-tension accusation reveals.
- **Core Experience:** Intuitive, dramatic, zero-friction mystery generation, high replay value, and fair deductive gameplay where every clue fits together logically.

---

## 2. Technology Stack & Architecture

- **Frontend:**
  - React 18+ (Vite)
  - Tailwind CSS (responsive design, glassmorphism, animations)
  - Lucide React (investigative iconography)
  - Axios (REST client with interceptors)
  - React Router DOM (clean navigation & persistent case routes)
  - Canvas Confetti (victory celebration)
- **Backend:**
  - Node.js & Express.js (REST API architecture)
  - MongoDB & Mongoose (case state, evidence tracking, score computation)
  - In-memory database fallback (for instant zero-config local run)
  - Google Gemini API (`@google/genai` / `@google/generative-ai`)
  - Zod (strict schema validation of LLM generation)
  - CORS, Dotenv, Morgan (logging & security)
- **Deployment:**
  - Frontend: Vercel / Netlify / Render
  - Backend: Render / Railway / Node server
  - Database: MongoDB Atlas

---

## 3. User Flow

```
[1. Home Page]
      │
      ▼
[2. Create Mystery Page] ──── (Choose Premise, Theme & Difficulty)
      │
      ▼ (Gemini AI generates case; validated by backend; solution sealed)
[3. Investigation Room]
      ├── Read Story Briefing & Crime Scene Details
      ├── Interrogate Suspects (Examine Alibis & Motives)
      ├── Search & Discover Clues (+5 pts each)
      └── Request Strategic Hints (-10 pts each)
      │
      ▼
[4. Accusation Lineup] ────── (Select Accused Suspect & State Reasoning)
      │
      ▼ (Backend evaluates verdict, calculates final score)
[5. Results & Resolution] ─── (Verdict Reveal, Culprit Unmasked, Full Solution, Score Breakdown)
      │
      ▼
[6. Play Again / Share Case]
```

---

## 4. UI & Page Specifications

### 4.1 Home Page (`/`)
- **Header:** Atmospheric brand logo with magnifying glass icon, active badge, and quick navigation.
- **Hero Section:** "Unravel the Unseen" headline, compelling synopsis, animated case badge.
- **Action Buttons:** "Start Investigation" (direct call to action) and "Explore Sample Cases".
- **Feature Showcase:** 3-step breakdown ("AI-Generated Narratives", "Evidence Board", "Backend Verified Deducing").
- **Difficulty Preview:** Easy, Medium, and Hard parameter overview.

### 4.2 Create Mystery Page (`/create`)
- **Custom Premise Input:** Freeform text area (e.g., "A stolen prototype at a cyberpunk tech summit" or "A poisoned wine glass in an 1890s Victorian manor").
- **Quick Theme Presets:** 
  - *Victorian Manor Heist*
  - *Cyberpunk Mega-Corp Espionage*
  - *Orient Express Murder*
  - *Luxury Yacht Disappearance*
  - *Art Gallery Diamond Theft*
- **Difficulty Selector:**
  - **Easy:** 3 Suspects, 5 Clues, 2 Hints (Base win: 100 pts)
  - **Medium:** 4 Suspects, 7 Clues, 3 Hints (Base win: 150 pts)
  - **Hard:** 5 Suspects, 9 Clues, 3 Hints (Base win: 200 pts)
- **Loading State:** Detective-themed pulse loader with animated status messages ("Consulting intelligence...", "Fabricating alibis...", "Planting forensic clues...").

### 4.3 Investigation Room Page (`/case/:id`)
- **Case Header:** Case Title, Difficulty Badge, Current Score, Clues Discovered Counter (`x/total`), Hints Remaining.
- **Crime Scene Briefing:** Narrative backstory, victim information, time of incident, and murder weapon / stolen asset.
- **Suspects Dossier:**
  - Visual cards with avatars, name, occupation, relationship to victim.
  - Interactive tabs for Statement, Alibi, and Known Motive.
- **Evidence Board:**
  - Interactive clue cards with "Undiscovered / Hidden" states.
  - Click to inspect/discover: flips card, awards +5 points, reveals forensic description.
- **Hint Terminal:**
  - Expandable hint button with warning dialog ("Revealing a hint costs 10 points!").
  - Unlocked hints are pinned in an investigation ledger.
- **Accusation Trigger:** Floating or fixed action bar leading to the final confrontation.

### 4.4 Accusation Lineup Page (`/case/:id/accuse`)
- **Suspect Lineup:** Visual suspect selection with side-by-side comparison of alibis.
- **Accusation Form:**
  - Primary culprit selection (radio cards).
  - Detective deduction notes (optional player reasoning).
  - "Lock In Accusation" high-impact button with confirmation modal ("Are you certain? Your verdict is final.").

### 4.5 Results & Resolution Page (`/case/:id/result`)
- **Cinematic Verdict:**
  - **Case Solved:** Golden badge, confetti animation, "Master Detective" commendation.
  - **Wrong Accusation:** Cold red banner, "The Real Culprit Got Away", case closed warning.
- **The Culprit Revealed:** Photo, real identity, true motive, and method.
- **The Full Solution Explanation:** Comprehensive AI explanation breaking down how the clues point definitively to the culprit and debunk the other suspects' alibis.
- **Score Breakdown Card:**
  - Base Accusation Score: +100 / +150 / +200 (or 0 if incorrect)
  - Clues Discovered Bonus: `discoveredCount * 5` pts
  - Hint Penalty: `hintsUsedCount * -10` pts
  - Total Detective Score: `max(0, total)`
- **Actions:** "Start New Case" button, "Review Case Files" toggle.

---

## 5. Backend & Database Design

### 5.1 MongoDB Case Schema (`Case.js`)
```javascript
{
  title: { type: String, required: true },
  premise: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  story: {
    synopsis: String,
    victim: String,
    crimeType: String,
    sceneLocation: String,
    timeOfCrime: String
  },
  suspects: [{
    id: String,
    name: String,
    role: String,
    avatar: String,
    description: String,
    alibi: String,
    motive: String,
    isCulprit: { type: Boolean, default: false, select: false } // Hidden from active case query!
  }],
  clues: [{
    id: String,
    title: String,
    description: String,
    location: String,
    discovered: { type: Boolean, default: false }
  }],
  hints: [{
    id: String,
    text: String,
    revealed: { type: Boolean, default: false }
  }],
  // Private backend solution - NEVER exposed until accusation
  solution: {
    culpritId: { type: String, select: false },
    explanation: { type: String, select: false }
  },
  playerProgress: {
    discoveredCluesCount: { type: Number, default: 0 },
    hintsUsedCount: { type: Number, default: 0 },
    accusedSuspectId: { type: String, default: null },
    isSolved: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    completedAt: Date
  },
  createdAt: { type: Date, default: Date.now }
}
```

### 5.2 API Specifications & Endpoints

| Method | Endpoint | Description | Public/Protected |
|---|---|---|---|
| `POST` | `/api/cases` | Generate and store a new mystery | Solution hidden in response |
| `GET` | `/api/cases/:id` | Fetch active case | Solution & `isCulprit` stripped |
| `POST` | `/api/cases/:id/clues/:clueId/discover` | Mark clue discovered | Returns updated clue & progress |
| `POST` | `/api/cases/:id/hints` | Reveal next hint | Applies -10 score penalty |
| `POST` | `/api/cases/:id/accuse` | Submit accusation | Evaluates verdict & computes score |
| `GET` | `/api/cases/:id/result` | Retrieve full result | Returns culprit & full explanation |

#### Security Guarantee:
The fields `isCulprit`, `solution.culpritId`, and `solution.explanation` are excluded in Mongoose projection (`select: false` or explicitly deleted) for all `/api/cases` and `GET /api/cases/:id` responses. They are only queried and returned upon verified submission to `POST /api/cases/:id/accuse` or `GET /api/cases/:id/result` after the case has been completed.

---

## 6. AI Behavior & Scoring Rules

### 6.1 Generation Matrix
| Difficulty | Suspects | Clues | Hints | Base Win Points |
|---|---|---|---|---|
| **Easy** | 3 | 5 | 2 | 100 |
| **Medium** | 4 | 7 | 3 | 150 |
| **Hard** | 5 | 9 | 3 | 200 |

### 6.2 Prompt Engineering & Strict Output Schema
The AI prompt instructs Gemini to output pure JSON adhering to a strict Zod schema:
- Exactly 1 suspect must be designated as `isCulprit: true`.
- Every innocent suspect must have an alibi verifiable by at least 1-2 clues.
- The culprit must have a hidden flaw or contradiction in their alibi that is exposed by discovered clues.
- Clues must be realistic physical, digital, or testimonial evidence.
- Progressive hints must gently guide attention without outright spoiling the culprit.

### 6.3 Scoring Algorithm
```javascript
function calculateScore({ difficulty, isCorrect, discoveredCluesCount, hintsUsedCount }) {
  let basePoints = 0;
  if (isCorrect) {
    if (difficulty === 'easy') basePoints = 100;
    else if (difficulty === 'medium') basePoints = 150;
    else if (difficulty === 'hard') basePoints = 200;
  }
  const clueBonus = discoveredCluesCount * 5;
  const hintPenalty = hintsUsedCount * 10;
  const finalScore = Math.max(0, basePoints + clueBonus - hintPenalty);
  return { basePoints, clueBonus, hintPenalty, finalScore };
}
```

---

## 7. Acceptance Criteria

- [x] **Spec Sheet Completion:** `SPEC.md` authored with complete architecture, user flow, endpoint specs, and scoring logic.
- [x] **Difficulty Support:** Flawless mystery generation for Easy (3/5/2), Medium (4/7/3), and Hard (5/9/3).
- [x] **Solution Security:** Inspecting network tab on `/api/cases/:id` reveals no culprit or solution data until accusation is locked in.
- [x] **Interactive Gameplay:** Clues can be discovered (+5 pts), hints can be unlocked (-10 pts), and suspects can be inspected.
- [x] **Backend Validation:** Accusations and final score calculations are strictly evaluated on the server.
- [x] **Aesthetic Excellence:** Premium dark noir interface with modern typography, glassmorphism, responsive mobile/desktop layout, and smooth animations.
- [x] **Robust Fallbacks:** Graceful error handling for missing API keys or external service timeouts so the app remains 100% playable.
