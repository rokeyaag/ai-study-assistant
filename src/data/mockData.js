// Mock & Preset Data for AI Study Assistant (Professional English Edition)

export const INITIAL_USER = {
  name: "Rafi Ahmed",
  handle: "@rafischolar",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  grade: "Senior High / Grade 12",
  subjectStream: "STEM & Science Major",
  points: 125,
  streak: 7,
  subscription: {
    tier: "free_trial", // "free_trial" or "pro"
    trialDaysLeft: 5,
    proExpiresAt: null
  },
  subjects: [
    "Physics",
    "Chemistry",
    "Higher Mathematics",
    "Biology",
    "ICT & Computer Science"
  ],
  dailyGoalProgress: 75, // percent
  weeklyStudyHours: [3.5, 4.2, 5.0, 3.8, 6.1, 4.5, 5.8],
  weaknessAreas: [
    { subject: "Organic Chemistry", score: 62, status: "needs_focus" },
    { subject: "Vector Calculus", score: 78, status: "improving" },
    { subject: "Newtonian Mechanics", score: 94, status: "mastered" },
    { subject: "Genetics & Cell Biology", score: 86, status: "strong" }
  ]
};

export const SCAN_PRESETS = [
  {
    id: "physics_1",
    title: "Physics: Newton's Second Law & Momentum Calculation",
    subject: "Physics",
    icon: "Atom",
    previewImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80",
    ocrText: `Question: A constant force of 20 N acts on a stationary object of mass 5 kg for a duration of 5 seconds. Find the final velocity and total distance travelled by the object.

Given Parameters:
Mass (m) = 5 kg
Initial velocity (u) = 0 m/s
Applied force (F) = 20 N
Time interval (t) = 5 s`,
    aiSolution: {
      formula: "F = ma ⟹ a = F / m \nv = u + at \ns = ut + ½at²",
      steps: [
        {
          step: 1,
          title: "Determine Acceleration (a)",
          detail: "Using Newton's Second Law: F = ma. Therefore, acceleration a = F / m = 20 N / 5 kg = 4 m/s²."
        },
        {
          step: 2,
          title: "Calculate Final Velocity (v)",
          detail: "Using kinematics equation v = u + at = 0 + (4 m/s² × 5 s) = 20 m/s."
        },
        {
          step: 3,
          title: "Compute Total Displacement (s)",
          detail: "Using displacement equation s = ut + ½at² = (0 × 5) + ½ × 4 × (5)² = 0 + 2 × 25 = 50 meters."
        }
      ],
      examTips: "Always write standard SI units (m/s², m/s, m). If acceleration is negative, explicitly note it as retardation or deceleration.",
      tags: ["Kinematics", "Newtonian Mechanics", "Physics Board Exam", "High School"]
    }
  },
  {
    id: "math_1",
    title: "Higher Mathematics: Trigonometric Limits & Calculus",
    subject: "Higher Math",
    icon: "Sigma",
    previewImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    ocrText: `Evaluate the limit: lim (x → 0) [(sin 7x - sin 3x) / sin 4x]`,
    aiSolution: {
      formula: "sin C - sin D = 2 cos((C+D)/2) sin((C-D)/2) \nlim (θ→0) (sin θ / θ) = 1",
      steps: [
        {
          step: 1,
          title: "Apply Trigonometric Transformation to Numerator",
          detail: "Numerator: sin 7x - sin 3x = 2 cos((7x + 3x)/2) sin((7x - 3x)/2) = 2 cos(5x) sin(2x)."
        },
        {
          step: 2,
          title: "Decompose Denominator",
          detail: "Denominator: sin 4x = 2 sin(2x) cos(2x)."
        },
        {
          step: 3,
          title: "Simplify and Apply the Limit",
          detail: "Dividing gives: [2 cos(5x) sin(2x)] / [2 sin(2x) cos(2x)] = cos(5x) / cos(2x).\nNow substituting x → 0: cos(0) / cos(0) = 1 / 1 = 1."
        }
      ],
      examTips: "You can quickly cross-verify this using L'Hôpital's Rule: (7 cos 7x - 3 cos 3x) / (4 cos 4x) = (7 - 3) / 4 = 4 / 4 = 1.",
      tags: ["Calculus", "Limits", "Trigonometry", "College Prep"]
    }
  },
  {
    id: "chem_1",
    title: "Chemistry: Benzene Nitration & Electrophilic Substitution",
    subject: "Chemistry",
    icon: "FlaskConical",
    previewImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
    ocrText: `Problem: Benzene is reacted with a mixture of concentrated HNO₃ and concentrated H₂SO₄ at 60°C. Explain the mechanism and structure of the major organic product.`,
    aiSolution: {
      formula: "C₆H₆ + HNO₃  ——[H₂SO₄ / 60°C]——>  C₆H₅NO₂ + H₂O",
      steps: [
        {
          step: 1,
          title: "Generation of the Active Electrophile (NO₂⁺)",
          detail: "HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻. The nitronium ion (NO₂⁺) serves as a potent electrophile."
        },
        {
          step: 2,
          title: "Formation of Arenium Ion (Sigma Complex)",
          detail: "The electrophilic NO₂⁺ attacks the π-electron cloud of the benzene ring, producing a resonance-stabilized carbocation (arenium intermediate)."
        },
        {
          step: 3,
          title: "Deprotonation & Aromaticity Restoration",
          detail: "The base HSO₄⁻ abstracts a proton (H⁺) from the sp³ carbon, re-aromatizing the ring and yielding nitrobenzene while regenerating the H₂SO₄ catalyst."
        }
      ],
      examTips: "Keep temperature strictly controlled around 55°C-60°C. Exceeding 100°C causes multi-substitution yielding m-dinitrobenzene.",
      tags: ["Organic Chemistry", "Aromatic Compounds", "Reaction Mechanism"]
    }
  }
];

export const INITIAL_VAULT_NOTES = [
  {
    id: "note-101",
    title: "Newton's 3 Laws of Motion & Conservation of Linear Momentum",
    subject: "Physics",
    color: "from-blue-500/20 to-cyan-500/20",
    date: "Oct 18, 2026",
    summary: "F = dp/dt = ma. When external net force is zero, total linear momentum is strictly conserved (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂).",
    tags: ["Formulas", "Mechanics", "Final Exam Prep"],
    readTime: "2 min",
    hasPodcast: true,
    podcastDuration: "2:45 min",
    fullContent: `Newton's Laws of Motion:
1st Law (Law of Inertia): An object remains at rest or in uniform straight-line motion unless acted upon by an external net force.
2nd Law (Force & Acceleration): The rate of change of momentum is directly proportional to applied force and occurs in its direction (F = ma).
3rd Law (Action & Reaction): For every action, there is an equal and opposite reaction (F_action = -F_reaction).`
  },
  {
    id: "note-102",
    title: "Organic Chemistry: Lucas Reagent Test for Alcohol Classification",
    subject: "Chemistry",
    color: "from-emerald-500/20 to-teal-500/20",
    date: "Oct 17, 2026",
    summary: "Lucas reagent (conc. HCl + anhydrous ZnCl₂) tests alcohol order: 3° reacts instantly, 2° takes 5 mins, 1° requires heating.",
    tags: ["Organic Lab", "Identification", "Practical Exam"],
    readTime: "3 min",
    hasPodcast: true,
    podcastDuration: "3:10 min",
    fullContent: `Lucas Reagent Test Protocol:
Composition: Solution of concentrated hydrochloric acid (HCl) with anhydrous zinc chloride (ZnCl₂).
• 3° (Tertiary) Alcohol: Produces instantaneous oily turbidity due to rapid carbocation stability.
• 2° (Secondary) Alcohol: Turbidity appears gradually after 5 to 10 minutes at room temperature.
• 1° (Primary) Alcohol: Remains clear at room temperature; requires gentle heating to show any turbidity.`
  },
  {
    id: "note-103",
    title: "Standard Derivatives & Calculus Rules Reference Sheet",
    subject: "Higher Math",
    color: "from-amber-500/20 to-orange-500/20",
    date: "Oct 15, 2026",
    summary: "d/dx(xⁿ) = n·xⁿ⁻¹, d/dx(eˣ) = eˣ, d/dx(ln x) = 1/x, d/dx(sin x) = cos x, d/dx(tan x) = sec² x.",
    tags: ["Calculus", "Cheat Sheet", "Core Formulas"],
    readTime: "1 min",
    hasPodcast: false,
    podcastDuration: "1:30 min",
    fullContent: `Fundamental Calculus Differentiation Rules:
1. Product Rule: d/dx [u·v] = u·(dv/dx) + v·(du/dx)
2. Quotient Rule: d/dx [u/v] = [v·(du/dx) - u·(dv/dx)] / v²
3. Chain Rule: dy/dx = (dy/du) · (du/dx)`
  },
  {
    id: "note-104",
    title: "Cell Division: Mitosis vs. Meiosis Comparative Analysis",
    subject: "Biology",
    color: "from-purple-500/20 to-pink-500/20",
    date: "Oct 12, 2026",
    summary: "Mitosis yields 2 genetically identical diploid (2n) daughter cells. Meiosis generates 4 distinct haploid (n) gametes via crossing over.",
    tags: ["Cell Biology", "Genetics", "Botany"],
    readTime: "4 min",
    hasPodcast: true,
    podcastDuration: "3:40 min",
    fullContent: `Mitosis vs. Meiosis Summary:
• Occurrence: Mitosis takes place in somatic cells; Meiosis occurs exclusively in germline cells.
• Chromosome Count: Mitosis preserves chromosome number (equational division); Meiosis halves the count (reductional division).
• Genetic Diversity: Mitosis creates clones; Meiosis generates genetic variation via crossing over in Pachytene of Prophase I.`
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: "q1",
    subject: "Physics",
    question: "A constant force of 30 N acts on an object of mass 10 kg for 5 seconds. What is the total change in momentum?",
    options: [
      "50 kg·m/s",
      "100 kg·m/s",
      "150 kg·m/s",
      "200 kg·m/s"
    ],
    correctIndex: 2,
    explanation: "Impulse of Force (J) = Force × Time = Change in Momentum (Δp). Hence, Δp = F × t = 30 N × 5 s = 150 kg·m/s (or N·s).",
    pointsReward: 15
  },
  {
    id: "q2",
    subject: "Higher Math",
    question: "What is the correct value of lim (x → 0) [tan 5x / sin 2x]?",
    options: [
      "2 / 5",
      "5 / 2",
      "1",
      "0"
    ],
    correctIndex: 1,
    explanation: "[tan 5x / (5x) × 5x] / [sin 2x / (2x) × 2x] = (1 × 5) / (1 × 2) = 5/2.",
    pointsReward: 10
  },
  {
    id: "q3",
    subject: "Chemistry",
    question: "Which class of alcohol reacts fastest (instant turbidity) with Lucas Reagent at room temperature?",
    options: [
      "1° Primary Alcohol",
      "2° Secondary Alcohol",
      "3° Tertiary Alcohol",
      "Methanol"
    ],
    correctIndex: 2,
    explanation: "3° tertiary carbocations possess the highest hyperconjugative and inductive stability, causing instant oily alkyl chloride precipitation.",
    pointsReward: 15
  },
  {
    id: "q4",
    subject: "Biology",
    question: "During which sub-stage of Prophase I does genetic crossing over take place in Meiosis?",
    options: [
      "Leptotene",
      "Zygotene",
      "Pachytene",
      "Diplotene"
    ],
    correctIndex: 2,
    explanation: "During the Pachytene stage, non-sister chromatids of homologous chromosomes exchange genetic material through chiasmata formation.",
    pointsReward: 10
  },
  {
    id: "q5",
    subject: "Computer Science",
    question: "What is the decimal equivalent of the binary number (1101)₂?",
    options: [
      "11",
      "12",
      "13",
      "14"
    ],
    correctIndex: 2,
    explanation: "(1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 8 + 4 + 0 + 1 = 13.",
    pointsReward: 10
  }
];
