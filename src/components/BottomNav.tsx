/**
 * BottomNav – shared bottom tab bar used on all "logged-in" screens.
 * Includes a sliding indicator pill that follows the swipe gesture.
 */
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Grid, Home } from "lucide-react";
import { motion, MotionValue, useTransform } from "framer-motion";

export const TABS = [
  { label: "Home", icon: Home, path: "/dashboard" },
  { label: "Explore", icon: Grid, path: "/explore" },
  { label: "Search", icon: Search, path: "/search" },
  { label: "My Learning", icon: BookOpen, path: "/my-learning" },
] as const;

interface BottomNavProps {
  activeSwipeIndex: number;
  swipeX: MotionValue<number>;
  containerWidth?: number;
}

export default function BottomNav({ activeSwipeIndex, swipeX, containerWidth = 0 }: BottomNavProps) {
  const navigate = useNavigate();

  // swipeX is in pixels. It goes from 0 to -(containerWidth * 3).
  // We want the indicator to translate from 0% to 300% of its OWN width.
  const indicatorX = useTransform(swipeX, (val) => {
    if (containerWidth === 0) return "0%";
    const percentage = (-val / containerWidth) * 100;
    return `${percentage}%`;
  });

  return (
    <div className="shrink-0 bg-white border-t border-gray-200 flex text-gray-500 z-20 relative">
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 bg-blue-50/50 border-t-2 border-[#1b439c]"
        style={{ width: `${100 / TABS.length}%`, x: indicatorX }}
      />

      {TABS.map((tab, idx) => {
        const isActive = idx === activeSwipeIndex;
        const Icon = tab.icon;

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center pt-2.5 pb-2 gap-0.5 transition-colors relative z-10
              ${isActive ? "text-[#1b439c]" : "hover:text-[#1b439c]"}`}
          >
            <Icon className="w-5 h-5" />
            <span className={`text-[10px] ${isActive ? "font-bold" : "font-semibold"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
