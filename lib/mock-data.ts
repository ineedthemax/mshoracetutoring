export const mockTutor = {
  name: "Stenita Horace",
  title: "Math Tutor | Pre-Algebra & Algebra 1 Specialist",
  bio: "I've helped over 900 students move from confusion to confidence in math. I specialize in breaking down complex concepts into clear, manageable steps. Whether you're struggling with Pre-Algebra or tackling Algebra 1, I'll meet you where you are.",
  photo: "/tutor-photo.jpg",
  subjects: ["Pre-Algebra", "Algebra 1"],
  gradeLevels: ["6th Grade","7th Grade","8th Grade","9th Grade"],
  experience: "6+ years",
  credentials: ["6+ years of teaching experience", "Taught over 900+ students", "Specializes in Pre-Algebra & Algebra 1"],
  hourlyRate: 75,
  teachingStyle: "Patient, step-by-step instruction with real-world examples. I focus on building conceptual understanding, not just memorizing formulas.",
  rating: 4.9,
  reviewCount: 47,
};

export const mockSessions = [
  { id: "s1", student: "Jordan Campbell", subject: "Algebra 2", date: "2026-04-28", time: "4:00 PM", duration: 60, status: "upcoming", type: "1-on-1", price: 75, zoomUrl: "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1" },
  { id: "s2", student: "Aisha Williams", subject: "Geometry", date: "2026-04-29", time: "5:00 PM", duration: 45, status: "upcoming", type: "1-on-1", price: 60, zoomUrl: "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1" },
  { id: "s3", student: "Marcus Jr.", subject: "Pre-Calculus", date: "2026-04-25", time: "3:00 PM", duration: 60, status: "upcoming", type: "1-on-1", price: 75, zoomUrl: "https://us06web.zoom.us/j/83084805570?pwd=oWTi3ifrieiuhsNK8MgMjWxqanocgJ.1" },
  { id: "s4", student: "Jordan Campbell", subject: "Algebra 2", date: "2026-04-21", time: "4:00 PM", duration: 60, status: "completed", type: "1-on-1", price: 75, zoomUrl: "" },
  { id: "s5", student: "Aisha Williams", subject: "Geometry", date: "2026-04-18", time: "5:00 PM", duration: 45, status: "completed", type: "1-on-1", price: 60, zoomUrl: "" },
  { id: "s6", student: "Devon Harris", subject: "SAT Math Prep", date: "2026-04-15", time: "6:00 PM", duration: 60, status: "completed", type: "1-on-1", price: 75, zoomUrl: "" },
  { id: "s7", student: "Multiple", subject: "Algebra 1 Review", date: "2026-04-12", time: "10:00 AM", duration: 90, status: "completed", type: "group", price: 25, zoomUrl: "" },
];

export const mockStudents = [
  { id: "st1", name: "Jordan Campbell", grade: "10th Grade", parent: "Lisa Campbell", subject: "Algebra 2", sessions: 8, lastSession: "2026-04-21", confidence: 72, trend: "up" },
  { id: "st2", name: "Aisha Williams", grade: "9th Grade", parent: "Renee Williams", subject: "Geometry", sessions: 5, lastSession: "2026-04-18", confidence: 65, trend: "up" },
  { id: "st3", name: "Marcus Jr.", grade: "11th Grade", parent: "Tanya Horace", subject: "Pre-Calculus", sessions: 12, lastSession: "2026-04-14", confidence: 80, trend: "up" },
  { id: "st4", name: "Devon Harris", grade: "12th Grade", parent: "James Harris", subject: "SAT Math", sessions: 6, lastSession: "2026-04-15", confidence: 68, trend: "stable" },
  { id: "st5", name: "Kezia Thompson", grade: "8th Grade", parent: "Monica Thompson", subject: "Pre-Algebra", sessions: 3, lastSession: "2026-04-10", confidence: 55, trend: "up" },
];

export const mockGroupClasses = [
  { id: "g1", title: "Pre-Algebra Group Class", subject: "Pre-Algebra", grade: "6th-8th Grade", date: "2026-05-03", time: "10:00 AM", duration: 90, capacity: 10, enrolled: 3, price: 25, description: "Small group session covering key Pre-Algebra concepts - fractions, integers, one-step equations, and more. Great for reinforcement and review.", zoomUrl: "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1", status: "open" },
  { id: "g2", title: "Algebra 1 Group Class", subject: "Algebra 1", grade: "8th-9th Grade", date: "2026-05-10", time: "11:00 AM", duration: 90, capacity: 10, enrolled: 4, price: 25, description: "Small group session focused on Algebra 1 topics - linear equations, inequalities, graphing, and systems. Collaborative problem solving with direct guidance.", zoomUrl: "https://us06web.zoom.us/j/83897527262?pwd=3PK8eBvZaVlzUR8jlmI5jL5BKHvzD2.1", status: "open" },
];

export const mockProgressReports = [
  { id: "r1", sessionId: "s4", student: "Jordan Campbell", subject: "Algebra 2", date: "2026-04-21", topicsCovered: ["Quadratic Formula","Factoring Trinomials","Completing the Square"], skillGaps: ["Negative discriminant cases","Vertex form"], studentConfidence: 72, wins: "Correctly factored 8/10 problems independently. Big improvement from last session.", homeworkAssigned: "Pages 142-144, problems 1-20 odd", recommendedNextStep: "Practice complex roots. Move to polynomial division next session.", attendance: "present" },
  { id: "r2", sessionId: "s5", student: "Aisha Williams", subject: "Geometry", date: "2026-04-18", topicsCovered: ["Triangle Congruence","SSS/SAS/ASA Proofs"], skillGaps: ["Two-column proof structure","CPCTC application"], studentConfidence: 65, wins: "Identified correct congruence postulate on 6/8 problems.", homeworkAssigned: "Worksheet: Triangle Proofs Set B", recommendedNextStep: "More proof practice. Focus on stating reasons clearly.", attendance: "present" },
];

export const mockPayments = [
  { id: "p1", date: "2026-04-21", description: "1-on-1 Session - Jordan Campbell (Algebra 2)", amount: 75, status: "paid", stripeId: "pi_placeholder_001" },
  { id: "p2", date: "2026-04-18", description: "1-on-1 Session - Aisha Williams (Geometry)", amount: 60, status: "paid", stripeId: "pi_placeholder_002" },
  { id: "p3", date: "2026-04-15", description: "1-on-1 Session - Devon Harris (SAT Math)", amount: 75, status: "paid", stripeId: "pi_placeholder_003" },
  { id: "p4", date: "2026-04-12", description: "Group Class - Algebra 1 Review (5 students)", amount: 125, status: "paid", stripeId: "pi_placeholder_004" },
  { id: "p5", date: "2026-04-28", description: "1-on-1 Session - Jordan Campbell (Algebra 2)", amount: 75, status: "pending", stripeId: "" },
];

export const mockAvailability = [
  { day: "Monday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
  { day: "Tuesday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
  { day: "Wednesday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
  { day: "Thursday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
  { day: "Friday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
];

export const mockPricing = [
  { id: "p1", name: "30-Min Session", description: "Quick focused help on one topic", price: 40, type: "single" },
  { id: "p2", name: "60-Min Session", description: "Deep dive into concepts and practice", price: 75, type: "single" },
  { id: "p3", name: "4-Session Pack", description: "4 sessions · Valid 60 days", price: 300, type: "package", sessions: 4 },
  { id: "p4", name: "8-Session Pack", description: "8 sessions · Valid 90 days", price: 600, type: "package", sessions: 8 },
  { id: "p5", name: "Group Class", description: "3-10 students, exam prep and review", price: 25, type: "group" },
];

export const bundles = [
  {
    id: "b1",
    name: "First Grading Period Pack",
    badge: "⭐ Back-to-School Special",
    tagline: "Lock in your fall momentum before the first test hits.",
    price: 300,
    originalPrice: null,
    sessions: 4,
    perSession: "$75/session",
    validity: "Valid 60 days",
    paymentPlan: { splits: 2, amount: 150, interval: "30 days apart" },
    checkoutType: "4-session",
    highlights: [
      "4 one-on-one sessions (60 min each)",
      "Pre-Algebra OR Algebra I",
      "Personalized session notes after each call",
      "WhatsApp check-ins between sessions",
    ],
  },
  {
    id: "b2",
    name: "The 8-Session Pack",
    badge: "🔥 Best Value for One Student",
    tagline: "For the student who's ready to go all in this semester.",
    price: 600,
    originalPrice: null,
    sessions: 8,
    perSession: "$75/session",
    validity: "Valid 90 days",
    paymentPlan: { splits: 2, amount: 300, interval: "30 days apart" },
    checkoutType: "8-session",
    highlights: [
      "8 one-on-one sessions (60 min each)",
      "Pre-Algebra OR Algebra I",
      "Progress recap at session 4",
      "WhatsApp check-ins between sessions",
    ],
  },
  {
    id: "b3",
    name: 'The "Grade Rescue" Pack',
    badge: "🆘 Best Entry-Level Bundle",
    tagline: "For families who need results before the next report card.",
    price: 195,
    originalPrice: null,
    sessions: 3,
    perSession: "$65/session",
    validity: "Valid 45 days",
    paymentPlan: null,
    checkoutType: "grade-rescue",
    highlights: [
      "3 one-on-one sessions (60 min each)",
      "Focus on highest-priority topics",
      "Session notes + action plan",
      "Pre-Algebra OR Algebra I",
    ],
  },
  {
    id: "b4",
    name: 'The "Weekly Rhythm" Monthly Pack',
    badge: "🔥 Most Consistent Results",
    tagline: "Build the habit. Protect the grade all year long.",
    price: 260,
    originalPrice: null,
    sessions: 4,
    perSession: "$65/session",
    validity: "Auto-renews monthly",
    paymentPlan: null,
    checkoutType: "monthly",
    highlights: [
      "4 sessions/month (60 min each)",
      "Weekly session notes",
      "WhatsApp check-ins",
      "Cancel anytime — no contract",
    ],
  },
  {
    id: "b5",
    name: 'The "Two Kids" Family Pack',
    badge: "👨‍👧 Family Bundle — Save $110",
    tagline: "Two kids. One great deal. Zero excuse to skip sessions.",
    price: 490,
    originalPrice: 600,
    sessions: 8,
    perSession: "$61.25/session",
    validity: "8 sessions split between 2 siblings",
    paymentPlan: { splits: 2, amount: 245, interval: "30 days apart" },
    checkoutType: "family-pack",
    highlights: [
      "8 total sessions split however you like",
      "Separate session plans per child",
      "WhatsApp check-ins for both kids",
      "Saves $110 vs. two 4-session packs",
    ],
  },
  {
    id: "b6",
    name: "Group Class Semester Pass",
    badge: "💰 Best Value for Group Learning",
    tagline: "Learn together, grow together — and save doing it.",
    price: 150,
    originalPrice: 175,
    sessions: 6,
    perSession: "$25/session",
    validity: "6 group sessions (75 min each)",
    paymentPlan: null,
    checkoutType: "group-pass",
    highlights: [
      "6 group sessions (75 min each)",
      "Up to 4 students per group",
      "Shared session notes",
      "Saves $25 vs. pay-as-you-go",
    ],
  },
];
