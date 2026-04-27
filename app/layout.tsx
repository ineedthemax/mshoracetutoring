import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TawkChat } from "@/components/TawkChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mshoracetutoring.com"),
  title: {
    default: "MsHorace Tutoring | Math Tutor in White Plains, Maryland",
    template: "%s | MsHorace Tutoring",
  },
  description:
    "Expert 1-on-1 math tutoring for Pre-Algebra and Algebra 1 students in White Plains, Maryland and online via Zoom. 6+ years experience, 900+ students helped. Book a session today.",
  keywords: [
    "math tutor White Plains Maryland",
    "math tutor Maryland",
    "Pre-Algebra tutor",
    "Algebra 1 tutor",
    "online math tutor",
    "middle school math tutor",
    "high school math tutor",
    "virtual math tutoring",
    "Zoom math tutoring",
    "MsHorace tutoring",
    "Stenita Horace tutor",
    "Charles County math tutor",
  ],
  authors: [{ name: "Stenita Horace" }],
  creator: "Stenita Horace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mshoracetutoring.com",
    siteName: "MsHorace Tutoring",
    title: "MsHorace Tutoring | Math Tutor in White Plains, Maryland",
    description:
      "Expert 1-on-1 math tutoring for Pre-Algebra and Algebra 1 students. Online via Zoom, serving White Plains, MD and beyond. 900+ students helped.",
    images: [
      {
        url: "/Logo.png",
        width: 400,
        height: 400,
        alt: "MsHorace Tutoring Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MsHorace Tutoring | Math Tutor in White Plains, Maryland",
    description:
      "Expert 1-on-1 Pre-Algebra & Algebra 1 tutoring via Zoom. Serving White Plains, MD and students nationwide.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mshoracetutoring.com",
  },
};

// Local business structured data for Google & AI search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "MsHorace Tutoring",
  description:
    "Expert math tutoring for Pre-Algebra and Algebra 1 students. Live 1-on-1 and group sessions via Zoom. Serving White Plains, Maryland and students nationwide.",
  url: "https://mshoracetutoring.com",
  logo: "https://mshoracetutoring.com/Logo.png",
  image: "https://mshoracetutoring.com/Logo.png",
  founder: {
    "@type": "Person",
    name: "Stenita Horace",
    jobTitle: "Math Tutor",
    description:
      "Math tutor with 6+ years of experience and 900+ students helped, specializing in Pre-Algebra and Algebra 1.",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "White Plains",
    addressRegion: "MD",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Maryland" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: ["Pre-Algebra Tutoring", "Algebra 1 Tutoring", "Online Tutoring"],
  priceRange: "$25 - $197",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://mshoracetutoring.com/contact",
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tutoring Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "1-on-1 Live Tutoring Session",
          description: "Live 1-on-1 math tutoring via Zoom for Pre-Algebra and Algebra 1",
        },
        price: "40",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pre-Algebra Mastery Course",
          description: "Self-paced PDF course covering all Pre-Algebra concepts",
        },
        price: "197",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Algebra 1 Mastery Course",
          description: "Self-paced PDF course covering all Algebra 1 concepts",
        },
        price: "197",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
