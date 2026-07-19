export interface WebSearchRequest {
  query: string;
  limit?: number;
}

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  markdown: string;
}

export interface WebSearchResponse {
  query: string;
  results: SearchResult[];
}