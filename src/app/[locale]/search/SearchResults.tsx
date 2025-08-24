"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: "page" | "blog" | "content";
}

interface SearchResultsProps {
  query: string;
  locale: string;
}

export default function SearchResults({ query, locale }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate search API call
      // In a real implementation, this would call your search API or Storyblok search
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock search results for demonstration
      const mockResults = [
        {
          id: "1",
          title: "Getting Started with Jaimy",
          excerpt: "Learn how to get started with Jaimy platform and discover all the features available to help you manage your finances.",
          url: `/${locale}/getting-started`,
          type: "page"
        },
        {
          id: "2", 
          title: "Financial Planning Tips",
          excerpt: "Discover expert tips and strategies for effective financial planning that will help you achieve your long-term goals.",
          url: `/${locale}/blog/financial-planning-tips`,
          type: "blog"
        },
        {
          id: "3",
          title: "Investment Opportunities",
          excerpt: "Explore various investment opportunities available through the Jaimy platform and start building your portfolio today.",
          url: `/${locale}/investments`,
          type: "page"
        }
      ].filter(result => 
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setResults(mockResults as SearchResult[]);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleNewSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for content, articles, and more..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF1B3C] focus:border-transparent font-[BelfiusMontserrat]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#AF1B3C] text-white rounded-lg hover:bg-[#961E34] transition-colors disabled:opacity-50 font-[BelfiusMontserrat] font-medium"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          <p className="text-gray-600 font-[BelfiusMontserrat]">
            Found {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          {results.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <Link 
                  href={result.url}
                  className="text-xl font-semibold text-[#AF1B3C] hover:text-[#961E34] transition-colors font-[BelfiusMontserrat]"
                >
                  {result.title}
                </Link>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded font-[BelfiusMontserrat]">
                  {result.type}
                </span>
              </div>
              <p className="text-gray-700 mb-2 font-[BelfiusMontserrat]">
                {result.excerpt}
              </p>
              <Link 
                href={result.url}
                className="text-sm text-[#AF1B3C] hover:text-[#961E34] transition-colors font-[BelfiusMontserrat]"
              >
                {result.url}
              </Link>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-[BelfiusMontserrat]">
            No results found
          </h3>
          <p className="text-gray-600 font-[BelfiusMontserrat]">
            Try adjusting your search terms or browse our content categories.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-[BelfiusMontserrat]">
            Enter a search term
          </h3>
          <p className="text-gray-600 font-[BelfiusMontserrat]">
            Start typing to search for content, articles, and more.
          </p>
        </div>
      )}
    </div>
  );
}
