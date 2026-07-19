import "dotenv/config";

import {
  WebSearchRequest,
  WebSearchResponse,
} from "./types";

export async function searchWeb({
  query,
  limit = 5,
}: WebSearchRequest): Promise<WebSearchResponse> {
  const response = await fetch("https://api.firecrawl.dev/v2/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      limit,
      sources: ["web"],
      scrapeOptions: {
        onlyMainContent: true,
        formats: [{ type: "markdown" }],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Firecrawl request failed: ${response.status}`);
  }

  const data = await response.json();
  console.log("📦 Returning results");

  return {
    query,
    results: data.data.web.map((page: any) => ({
      title: page.title,
      description: page.description,
      url: page.url,
      markdown: page.markdown?.slice(0, 3000) ?? "",
    })),
  };
}