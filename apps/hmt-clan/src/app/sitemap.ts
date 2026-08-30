import type { MetadataRoute } from "next";
import { getAllEventSlugs } from "@/lib/events";
import { crew } from "@/lib/crew";

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://hmt-clan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/crew`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  for (const slug of getAllEventSlugs()) {
    routes.push({
      url: `${baseUrl}/events/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const member of crew) {
    routes.push({
      url: `${baseUrl}/crew/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return routes;
}
