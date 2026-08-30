/**
 * SearchPage – placeholder search screen.
 *
 * Displays a search bar and some suggested/recent search terms.
 * Will be connected to a real search backend later.
 * BottomNav is rendered by MobileLayout.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COURSES } from "@/data/mockData";

const TRENDING_SEARCHES = [
  "Artificial Intelligence",
  "Data Analytics",
  "Leadership Skills",
  "Cyber Security",
  "Public Policy",
  "Ethics in Governance",
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  /** Simple client-side filter over mock data */
  const results = query.trim()
    ? COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.provider.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search bar */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, providers..."
            className="pl-10 pr-10 h-12 rounded-full border-gray-300 focus-visible:ring-[#1b439c]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {/* If no query, show trending */}
        {!query.trim() && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Trending Searches
            </p>
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="flex items-center gap-3 w-full text-left py-2"
              >
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {term}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Search results */}
        {query.trim() && results.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <SearchIcon className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm">
              No results found for "{query}"
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-gray-500 font-semibold">
              {results.length} result{results.length !== 1 && "s"}
            </p>
            {results.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="flex items-start gap-3 w-full text-left py-3 border-b border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100"
                  style={{ backgroundColor: course.thumbnailColor }}
                >
                  {course.thumbnailImage && (
                    <img
                      src={course.thumbnailImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    By {course.provider}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
