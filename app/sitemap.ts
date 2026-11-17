import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mshoracetutoring.com";
  const now = new Date();

  return [
    // Core conversion pages — highest priority
    { url: base,                                      lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/book`,                            lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/pricing`,                         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },

    // Subject / service pages
    { url: `${base}/subjects`,                        lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/groups`,                          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/courses`,                         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/courses/pre-algebra-mastery`,     lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/courses/algebra-1-mastery`,       lastModified: now, changeFrequency: "monthly", priority: 0.75 },

    // Trust / info pages
    { url: `${base}/about`,                           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tutor`,                           lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/how-it-works`,                    lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/faq`,                             lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/diagnostic`,                      lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Supporting pages
    { url: `${base}/contact`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/gift`,                            lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/refunds`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,                           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
