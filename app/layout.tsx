import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TawkChat } from "@/components/TawkChat";
import { MetaPixelBase } from "@/components/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mshoracetutoring.com"),
  title: {
    default: "MsHorace Tutoring | Pre-Algebra & Algebra 1 Tutor Online",
    template: "%s | MsHorace Tutoring",
  },
  description:
    "Expert 1-on-1 Pre-Algebra and Algebra 1 tutoring online via Zoom for grades 6–9. Stenita Horace — 6+ years experience, 900+ students helped. Serving White Plains, MD and students nationwide. Book a session from $40.",
  keywords: [
    // Brand
    "MsHorace tutoring",
    "Stenita Horace tutor",
    "MsHorace math tutor",
    "Ms Horace tutoring",
    // Subject + grade
    "Pre-Algebra tutor",
    "Algebra 1 tutor",
    "online Pre-Algebra tutor",
    "online Algebra 1 tutor",
    "middle school math tutor",
    "math tutor 6th grade",
    "math tutor 7th grade",
    "math tutor 8th grade",
    "math tutor 9th grade",
    "Pre-Algebra help online",
    "Algebra 1 help online",
    "math tutoring for middle school students",
    "improve math grades",
    "math tutor for struggling students",
    "online math tutor for kids",
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
    "math tutor St. Mary's County Maryland",
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
    "math help online",
    "one on one math tutor",
    "private math tutor",
    "math tutoring sessions online",
    // Intent
    "book math tutor online",
    "hire math tutor",
    "find math tutor near me",
    "best online math tutor",
    "math tutor payment plan",
    "math tutoring packages",
  ],
  authors: [{ name: "Stenita Horace", url: "https://mshoracetutoring.com/about" }],
  creator: "Stenita Horace",
  publisher: "MsHorace Tutoring",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mshoracetutoring.com",
    siteName: "MsHorace Tutoring",
    title: "MsHorace Tutoring | Pre-Algebra & Algebra 1 Tutor Online",
    description:
      "Expert 1-on-1 Pre-Algebra and Algebra 1 tutoring online via Zoom for grades 6–9. Stenita Horace — 6+ years, 900+ students. Book from $40.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MsHorace Tutoring — Pre-Algebra & Algebra 1 Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MsHorace Tutoring | Pre-Algebra & Algebra 1 Tutor Online",
    description:
      "Expert 1-on-1 Pre-Algebra & Algebra 1 tutoring via Zoom. Grades 6–9. White Plains, MD and nationwide. Book from $40.",
    images: ["/og-image.png"],
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
  category: "Education",
};

// Structured data graph — LocalBusiness + Person + multiple Service entities
// Readable by Google, Bing, Perplexity, ChatGPT, and other AI search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": "https://mshoracetutoring.com/#organization",
      name: "MsHorace Tutoring",
      alternateName: ["Ms Horace Tutoring", "MsHorace Math Tutoring"],
      description:
        "Expert 1-on-1 Pre-Algebra and Algebra 1 tutoring online via Zoom for grades 6–9. Founded by Stenita Horace, a math educator with 6+ years of experience and 900+ students helped. Serving White Plains, Maryland and students nationwide.",
      url: "https://mshoracetutoring.com",
      logo: {
        "@type": "ImageObject",
        url: "https://mshoracetutoring.com/Logo.png",
        width: 400,
        height: 400,
      },
      image: "https://mshoracetutoring.com/og-image.png",
      founder: { "@id": "https://mshoracetutoring.com/#stenita-horace" },
      employee: { "@id": "https://mshoracetutoring.com/#stenita-horace" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "White Plains",
        addressRegion: "MD",
        addressCountry: "US",
        addressArea: "Charles County",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.6214,
        longitude: -76.9105,
      },
      areaServed: [
        "White Plains, MD",
        "Waldorf, MD",
        "La Plata, MD",
        "Clinton, MD",
        "Fort Washington, MD",
        "Accokeek, MD",
        "Brandywine, MD",
        "Upper Marlboro, MD",
        "Bowie, MD",
        "Largo, MD",
        "Prince George's County, MD",
        "Charles County, MD",
        "St. Mary's County, MD",
        "Alexandria, VA",
        "Arlington, VA",
        "Woodbridge, VA",
        "Manassas, VA",
        "Fairfax, VA",
        "Dale City, VA",
        "Springfield, VA",
        "Washington, DC",
        "United States",
      ],
      serviceType: [
        "Pre-Algebra Tutoring",
        "Algebra 1 Tutoring",
        "Online Math Tutoring",
        "Virtual Tutoring via Zoom",
        "Group Math Classes",
        "Math Homework Help",
      ],
      knowsAbout: ["Pre-Algebra", "Algebra 1", "Middle School Mathematics", "Online Education"],
      priceRange: "$25–$600",
      currenciesAccepted: "USD",
      paymentAccepted: "Credit Card, Debit Card, Apple Pay, Google Pay, Afterpay, Klarna, Affirm",
      telephone: "+12272206227",
      email: "MsHoraceTutoring06@gmail.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+12272206227",
        email: "MsHoraceTutoring06@gmail.com",
        contactType: "customer service",
        availableLanguage: "English",
        url: "https://mshoracetutoring.com/contact",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:00",
        },
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.google.com/maps/place/MsHoraceTutoring/@38.6214401,-76.9105131,17z",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Math Tutoring Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "30-Minute 1-on-1 Session",
            description: "Live 1-on-1 math tutoring via Zoom — 30 minutes. Great for quick help on a single topic.",
            price: "40",
            priceCurrency: "USD",
            url: "https://mshoracetutoring.com/book",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "60-Minute 1-on-1 Session",
            description: "Live 1-on-1 math tutoring via Zoom — 60 minutes. Deep dive into concepts with practice problems and a written session report.",
            price: "75",
            priceCurrency: "USD",
            url: "https://mshoracetutoring.com/book",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Group Math Class",
            description: "Small-group live math class via Zoom. Up to 10 students, 90 minutes. Pre-Algebra and Algebra 1.",
            price: "25",
            priceCurrency: "USD",
            url: "https://mshoracetutoring.com/groups",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "8-Session Pack",
            description: "8 live 1-on-1 sessions valid for 90 days. Most popular bundle. Payment plan available: 2 x $300.",
            price: "600",
            priceCurrency: "USD",
            url: "https://mshoracetutoring.com/pricing",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Free 15-Minute Consultation",
            description: "A free 15-minute Zoom call to meet Ms. Horace and see if tutoring is a good fit — no charge.",
            price: "0",
            priceCurrency: "USD",
            url: "https://mshoracetutoring.com/book",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": "https://mshoracetutoring.com/#stenita-horace",
      name: "Stenita Horace",
      givenName: "Stenita",
      familyName: "Horace",
      jobTitle: "Math Tutor",
      description:
        "Stenita Horace is a math educator with 6+ years of experience and 900+ students helped. She specializes in Pre-Algebra and Algebra 1 for grades 6–9, with a focus on building confidence and closing skill gaps before report cards.",
      url: "https://mshoracetutoring.com/about",
      image: "https://mshoracetutoring.com/stenita-horace.jpg",
      worksFor: { "@id": "https://mshoracetutoring.com/#organization" },
      knowsAbout: ["Pre-Algebra", "Algebra 1", "Middle School Mathematics", "Math Education"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Math Tutor",
        occupationLocation: {
          "@type": "City",
          name: "White Plains",
          containedInPlace: { "@type": "State", name: "Maryland" },
        },
        skills: "Pre-Algebra, Algebra 1, 1-on-1 instruction, online tutoring via Zoom",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mshoracetutoring.com/#website",
      url: "https://mshoracetutoring.com",
      name: "MsHorace Tutoring",
      publisher: { "@id": "https://mshoracetutoring.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://mshoracetutoring.com/faq?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* llms.txt — helps AI search engines (Perplexity, ChatGPT, Gemini, etc.) understand the site */}
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
