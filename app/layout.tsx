import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TawkChat } from "@/components/TawkChat";
import { MetaPixelBase } from "@/components/MetaPixel";

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
    // Brand
    "MsHorace tutoring",
    "Stenita Horace tutor",
    "MsHorace math tutor",
    // Subject
    "Pre-Algebra tutor",
    "Algebra 1 tutor",
    "online Pre-Algebra tutor",
    "online Algebra 1 tutor",
    "middle school math tutor",
    "math tutor 6th grade",
    "math tutor 7th grade",
    "math tutor 8th grade",
    "math tutor 9th grade",
    // Local — Maryland
    "math tutor White Plains Maryland",
    "math tutor Charles County Maryland",
    "math tutor Southern Maryland",
    "math tutor Waldorf Maryland",
    "math tutor La Plata Maryland",
    "math tutor Clinton Maryland",
    "math tutor Fort Washington Maryland",
    "math tutor Upper Marlboro Maryland",
    "math tutor Prince George's County Maryland",
    "math tutor Bowie Maryland",
    "math tutor Largo Maryland",
    "math tutor Accokeek Maryland",
    "math tutor Brandywine Maryland",
    // Local — Northern Virginia
    "math tutor Alexandria Virginia",
    "math tutor Arlington Virginia",
    "math tutor Woodbridge Virginia",
    "math tutor Manassas Virginia",
    "math tutor Fairfax Virginia",
    "math tutor Dale City Virginia",
    "math tutor Springfield Virginia",
    "math tutor Northern Virginia",
    // Local — DC Metro
    "math tutor Washington DC",
    "math tutor DC Metro area",
    "math tutor near me",
    // Format
    "online math tutor",
    "virtual math tutoring",
    "Zoom math tutoring",
    "affordable math tutor",
    "math help for middle school",
    "improve math grades",
    "math tutoring sessions online",
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
  verification: {
    google: "686b6f8cac3ed765",
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
    { "@type": "City", name: "White Plains", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Waldorf", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "La Plata", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Clinton", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Fort Washington", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Accokeek", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Brandywine", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Upper Marlboro", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Bowie", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Largo", containedInPlace: { "@type": "State", name: "Maryland" } },
    { "@type": "City", name: "Alexandria", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Arlington", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Woodbridge", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Manassas", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Dale City", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Springfield", containedInPlace: { "@type": "State", name: "Virginia" } },
    { "@type": "City", name: "Washington", containedInPlace: { "@type": "State", name: "DC" } },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: ["Pre-Algebra Tutoring", "Algebra 1 Tutoring", "Online Tutoring"],
  priceRange: "$25 - $197",
  telephone: "+12272206227",
  email: "MsHoraceTutoring06@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+12272206227",
    contactType: "customer service",
    email: "MsHoraceTutoring06@gmail.com",
    availableLanguage: "English",
    url: "https://mshoracetutoring.com/contact",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
  },
  sameAs: [
    "https://www.google.com/maps/place/MsHoraceTutoring/@38.6214401,-76.9105131,17z",
  ],
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
        {/* llms.txt — helps AI search engines (Perplexity, ChatGPT, etc.) understand the site */}
        <link rel="llms-txt" href="https://mshoracetutoring.com/llms.txt" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {children}
        <TawkChat />
        <MetaPixelBase />
      </body>
    </html>
  );
}
