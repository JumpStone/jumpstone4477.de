import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL("https://gaming.henrymeyer.de");
  const sitemapUrl = new URL("sitemap.xml", baseUrl);

  return new Response(
    ["User-agent: *", "Allow: /", `Sitemap: ${sitemapUrl}`].join("\n") + "\n",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
