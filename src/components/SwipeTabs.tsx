/**
 * SwipeTabs — reusable horizontal-swipe tab container.
 *
 * Renders tab labels at the top with an animated underline indicator,
 * and allows swiping left/right between tab panels with a smooth
 * side-by-side slide transition. Both tap and drag are supported.
 */
import { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface SwipeTabsProps {
  tabs: Tab[];
  /** Extra className on the tab bar wrapper */
  className?: string;
  /** Color of the active underline (Tailwind bg class). Defaults to bg-[#F59E0B] */
  underlineClass?: string;
}

export default function SwipeTabs({
  tabs,
  className = "",
  underlineClass = "bg-[#F59E0B]",
}: SwipeTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const goTo = (idx: number) => {
    if (idx === activeIdx || idx < 0 || idx >= tabs.length) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1 }),
  };

  return (
    <>
      {/* Tab labels */}
      <div className={`flex border-b border-gray-200 px-5 shrink-0 ${className}`}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => goTo(i)}
            className={`pb-2 mr-6 text-sm font-semibold transition-colors relative ${
              i === activeIdx ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {tab.label}
            {i === activeIdx && (
              <motion.div
                layoutId={`swipe-tab-indicator-${id}`}
                className={`absolute bottom-0 left-0 right-0 h-[2px] ${underlineClass}`}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.18 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content with swipe */}
      <div ref={containerRef} className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.18 }}
            className="absolute inset-0 overflow-y-auto"
          >
            {tabs[activeIdx].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
