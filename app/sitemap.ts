import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mshoracetutoring.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/pre-algebra-mastery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/courses/algebra-1-mastery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/subjects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/groups`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
