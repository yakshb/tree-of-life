import type { MetadataRoute } from "next";
import { SITE_URL, useCases } from "@/lib/discovery";

const lastModified = new Date("2026-08-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/use-cases`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...useCases.map((useCase) => ({
      url: `${SITE_URL}/use-cases/${useCase.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
