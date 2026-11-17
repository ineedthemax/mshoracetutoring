import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Math Tutoring Session Online",
  description:
    "Book a live 1-on-1 math tutoring session with Ms. Horace via Zoom. Choose 30 min ($40), 60 min ($75), group class ($25), or a free 15-minute consultation. Grades 6–9, Pre-Algebra and Algebra 1.",
  alternates: { canonical: "https://mshoracetutoring.com/book" },
  openGraph: {
    title: "Book a Session | MsHorace Tutoring",
    description:
      "Book a live 1-on-1 math tutoring session online. 30 min $40 · 60 min $75 · Group $25. Free consultation available.",
    url: "https://mshoracetutoring.com/book",
  },
};

const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Math Tutoring",
  provider: {
    "@type": "Person",
    name: "Stenita Horace",
    url: "https://mshoracetutoring.com/about",
  },
  serviceType: "Math Tutoring",
  description:
    "Live 1-on-1 and group math tutoring via Zoom for grades 6–9. Specializing in Pre-Algebra and Algebra 1. Sessions include a digital whiteboard and written progress reports.",
  url: "https://mshoracetutoring.com/book",
  areaServed: "United States",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://mshoracetutoring.com/book",
    servicePhone: "+12272206227",
    serviceSmsNumber: "+12272206227",
  },
  offers: [
    {
      "@type": "Offer",
      name: "30-Minute 1-on-1 Session",
      price: "40",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "60-Minute 1-on-1 Session",
      price: "75",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Group Class",
      price: "25",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Free Consultation",
      price: "0",
      priceCurrency: "USD",
    },
  ],
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingSchema) }}
      />
      {children}
    </>
  );
}
