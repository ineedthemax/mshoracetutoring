export const mockTutor = {
  name: "Marcus Horace",
  title: "Math Tutor | MS in Applied Mathematics",
  bio: "I've helped over 200 students move from confusion to confidence in math. I specialize in breaking down complex concepts into clear, manageable steps. Whether you're struggling with fractions or tackling AP Calculus, I'll meet you where you are.",
  photo: "/tutor-photo.jpg",
  subjects: ["Pre-Algebra","Algebra 1","Algebra 2","Geometry","Trigonometry","Pre-Calculus","Calculus","AP Calculus AB","AP Calculus BC","SAT Math","ACT Math"],
  gradeLevels: ["6th Grade","7th Grade","8th Grade","9th Grade","10th Grade","11th Grade","12th Grade"],
  experience: "8 years",
  credentials: ["MS Applied Mathematics, Howard University", "BS Mathematics, Morehouse College", "Certified Math Educator, State of Georgia"],
  hourlyRate: 75,
  teachingStyle: "Patient, step-by-step instruction with real-world examples. I focus on building conceptual understanding, not just memorizing formulas.",
  rating: 4.9,
  reviewCount: 47,
};

export const mockSessions = [
  { id: "s1", student: "Jordan Campbell", subject: "Algebra 2", date: "2026-04-28", time: "4:00 PM", duration: 60, status: "upcoming", type: "1-on-1", price: 75, zoomUrl: "https://zoom.us/j/placeholder" },
  { id: "s2", student: "Aisha Williams", subject: "Geometry", date: "2026-04-29", time: "5:00 PM", duration: 45, status: "upcoming", type: "1-on-1", price: 60, zoomUrl: "https://zoom.us/j/placeholder" },
  { id: "s3", student: "Marcus Jr.", subject: "Pre-Calculus", date: "2026-04-25", time: "3:00 PM", duration: 60, status: "upcoming", type: "1-on-1", price: 75, zoomUrl: "https://zoom.us/j/placeholder" },
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
  { id: "g1", title: "Algebra 1 Review Night", subject: "Algebra 1", grade: "8th-9th Grade", date: "2026-05-02", time: "6:00 PM", duration: 90, capacity: 8, enrolled: 5, price: 25, description: "Focused review of key Algebra 1 concepts before finals. Cover equations, inequalities, and graphing.", zoomUrl: "https://zoom.us/j/placeholder", status: "open" },
  { id: "g2", title: "Geometry Test Prep", subject: "Geometry", grade: "9th-10th Grade", date: "2026-05-09", time: "5:00 PM", duration: 90, capacity: 8, enrolled: 3, price: 25, description: "Proofs, angles, triangles, and circle theorems. Bring your toughest problems.", zoomUrl: "https://zoom.us/j/placeholder", status: "open" },
  { id: "g3", title: "SAT Math Mini Bootcamp", subject: "SAT Math", grade: "10th-12th Grade", date: "2026-05-16", time: "10:00 AM", duration: 120, capacity: 6, enrolled: 6, price: 35, description: "Two-hour intensive covering SAT math strategies, calculator vs. no-calculator sections, and timed practice.", zoomUrl: "https://zoom.us/j/placeholder", status: "full" },
  { id: "g4", title: "Pre-Calculus Problem Solving", subject: "Pre-Calculus", grade: "11th Grade", date: "2026-05-23", time: "4:00 PM", duration: 90, capacity: 6, enrolled: 2, price: 30, description: "Functions, limits intro, and trig identities. Perfect for students preparing for Calculus.", zoomUrl: "https://zoom.us/j/placeholder", status: "open" },
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
  { day: "Monday", slots: ["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"] },
  { day: "Tuesday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
  { day: "Wednesday", slots: ["3:00 PM", "4:00 PM", "5:00 PM"] },
  { day: "Thursday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
  { day: "Friday", slots: ["3:00 PM", "4:00 PM"] },
  { day: "Saturday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"] },
];

export const mockPricing = [
  { id: "p1", name: "30-Min Session", description: "Quick focused help on one topic", price: 40, type: "single" },
  { id: "p2", name: "60-Min Session", description: "Deep dive into concepts and practice", price: 75, type: "single" },
  { id: "p3", name: "4-Session Pack", description: "Save 8% great for ongoing support", price: 276, originalPrice: 300, type: "package", sessions: 4 },
  { id: "p4", name: "8-Session Pack", description: "Save 13% best value for consistent progress", price: 522, originalPrice: 600, type: "package", sessions: 8 },
  { id: "p5", name: "Group Class", description: "3-8 students, exam prep and review", price: 25, type: "group" },
];
