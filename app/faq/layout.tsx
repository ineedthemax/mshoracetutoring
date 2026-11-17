import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Math Tutoring Questions Answered",
  description:
    "Answers to the most common questions about MsHorace Tutoring — booking, pricing, cancellation, session format, Zoom requirements, payment plans, and progress reports.",
  alternates: { canonical: "https://mshoracetutoring.com/faq" },
  openGraph: {
    title: "FAQ | MsHorace Tutoring",
    description:
      "Everything parents and students need to know about booking, pricing, and sessions with Ms. Horace.",
    url: "https://mshoracetutoring.com/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a math tutoring session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to mshoracetutoring.com/book, select your grade level, subject (Pre-Algebra or Algebra 1), session type (30 min, 60 min, group class, or free consultation), and a date and time. Complete payment and you will receive a Zoom link by email immediately.",
      },
    },
    {
      "@type": "Question",
      name: "How much does math tutoring cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "30-minute 1-on-1 sessions are $40. 60-minute sessions are $75. Group classes are $25 per student. Bundle packages start at $150 for a Group Class Semester Pass (6 sessions) up to $600 for the 8-Session Pack. Payment plans are available on select packages.",
      },
    },
    {
      "@type": "Question",
      name: "What subjects does Ms. Horace tutor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ms. Horace currently specializes in Pre-Algebra (grades 6–8) and Algebra 1 (grades 8–9). Additional subjects including Geometry and Algebra 2 are coming soon.",
      },
    },
    {
      "@type": "Question",
      name: "What grade levels does MsHorace Tutoring serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MsHorace Tutoring works with students in 6th through 9th grade, primarily in Pre-Algebra and Algebra 1.",
      },
    },
    {
      "@type": "Question",
      name: "How do online tutoring sessions work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All sessions are live via Zoom. After booking, you receive a Zoom link by email. Sessions include a digital whiteboard, screen sharing, and direct interaction with Ms. Horace. 60-minute sessions include a written progress report sent after each session.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free consultation available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ms. Horace offers a free 15-minute consultation via Zoom. Book it at mshoracetutoring.com/book by selecting 'Free Consultation' — no payment required.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cancellation policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free cancellation with a full refund is available up to 24 hours before the session. Cancellations within 24 hours incur a $15 rescheduling fee. No-shows are non-refundable.",
      },
    },
    {
      "@type": "Question",
      name: "Are payment plans available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Payment plans are available on the First Grading Period Pack, the 8-Session Pack, and the Two Kids Family Pack — split into 2 payments charged 30 days apart. All sessions are released immediately on the first payment. Afterpay, Klarna, and Affirm are also accepted at checkout.",
      },
    },
    {
      "@type": "Question",
      name: "How will I know my child is improving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After every 60-minute 1-on-1 session, parents receive a written progress report covering topics covered, wins, skill gaps, homework assigned, a confidence score (0–100), and next-step recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "Does Ms. Horace tutor in person or online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All sessions are online via Zoom. Ms. Horace is based in White Plains, Maryland and serves students in the DC/MD/VA metro area and nationwide.",
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
