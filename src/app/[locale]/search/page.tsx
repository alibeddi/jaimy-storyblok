import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SearchResults from "./SearchResults";

interface SearchPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const t = await getTranslations("search");
  const query = (await searchParams).q || "";
  
  return {
    title: query ? `${t("results-for")} "${query}"` : t("title"),
    description: t("description"),
  };
}

export default async function SearchPage({ searchParams, params }: SearchPageProps) {
  const query = (await searchParams).q || "";
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-[BelfiusMontserrat]">
              {query ? `Search results for "${query}"` : "Search"}
            </h1>
            {query && (
              <p className="text-gray-600 font-[BelfiusMontserrat]">
                Showing results for your search query
              </p>
            )}
          </div>

          <Suspense fallback={<SearchLoadingSkeleton />}>
            <SearchResults query={query} locale={locale} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function SearchLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
