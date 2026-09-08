import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://gaming.henrymeyer.de");
  const entries = await getCollection("docs");
  const urls = entries.map(({ id }) => {
    const route = id.replace(/(?:^|\/)index$/, "");
    const path = route ? `${route}/` : "";
    return `  <url><loc>${escapeXml(new URL(path, baseUrl).href)}</loc></url>`;
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
