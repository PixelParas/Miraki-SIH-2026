/**
 * Explore – "My Space" page with two swipeable tabs:
 *   1. Trending On IGOT  – horizontal scrollable course cards
 *   2. Featured AI Courses
 *
 * Below the tabs is "The IGOT MarketPlace" with provider cards.
 * BottomNav is rendered by MobileLayout.
 */
import { useNavigate } from "react-router-dom";
import { ChevronRight, Info } from "lucide-react";
import SwipeTabs from "@/components/SwipeTabs";
import CourseCard from "@/components/CourseCard";
import { COURSES, FEATURED_AI_COURSES, PROVIDERS } from "@/data/mockData";
import { useDragScroll } from "@/hooks/useDragScroll";

/** Shared marketplace section rendered below both tabs */
function Marketplace() {
  const navigate = useNavigate();
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <>
      {/* ───── The IGOT MarketPlace ───── */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900">
          The IGOT MarketPlace
        </h2>
        <Info className="w-4 h-4 text-gray-400" />
      </div>

      {/* Provider sub-tab */}
      <div className="px-5 border-b border-gray-200 mb-4">
        <button className="pb-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900">
          Providers
        </button>
      </div>

      {/* Provider cards – horizontal scroll */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide px-5 pb-6 select-none"
        onPointerDownCapture={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.id}
              className="flex-shrink-0 w-[200px] rounded-xl overflow-hidden border border-gray-100 shadow-sm pointer-events-auto"
            >
              {/* Provider banner */}
              <div
                className="h-28 flex items-center justify-center"
                style={{ backgroundColor: provider.bgColor }}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <span
                    className="text-xs font-bold text-center leading-tight px-1"
                    style={{ color: provider.bgColor }}
                  >
                    {provider.logoText}
                  </span>
                </div>
              </div>

              {/* Provider name + link */}
              <div className="p-3 text-center">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {provider.name}
                </p>
                <button
                  onClick={() =>
                    navigate(`/provider/${provider.id}`)
                  }
                  className="text-xs text-[#1b439c] font-semibold mt-1 flex items-center justify-center gap-0.5"
                >
                  View Provider <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Explore() {
  const trendingRef = useDragScroll<HTMLDivElement>();
  const featuredRef = useDragScroll<HTMLDivElement>();

  const tabs = [
    {
      label: "Trending On IGOT",
      content: (
        <div>
          <div 
            ref={trendingRef}
            className="overflow-x-auto scrollbar-hide px-5 py-4 select-none cursor-grab active:cursor-grabbing"
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 pointer-events-auto">
              {COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
          <Marketplace />
        </div>
      ),
    },
    {
      label: "Featured AI Courses",
      content: (
        <div>
          <div 
            ref={featuredRef}
            className="overflow-x-auto scrollbar-hide px-5 py-4 select-none cursor-grab active:cursor-grabbing"
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 pointer-events-auto">
              {FEATURED_AI_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
          <Marketplace />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">My Space</h1>
      </div>

      <SwipeTabs tabs={tabs} />
    </div>
  );
}
