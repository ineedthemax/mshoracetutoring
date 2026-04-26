import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/student/", "/parent/", "/api/"],
    },
    sitemap: "https://mshoracetutoring.vercel.app/sitemap.xml",
  };
}
