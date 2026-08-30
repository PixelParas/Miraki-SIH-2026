import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import BottomNav, { TABS } from '@/components/BottomNav';
import Dashboard from '@/pages/Dashboard';
import Explore from '@/pages/Explore';
import SearchPage from '@/pages/SearchPage';
import MyLearning from '@/pages/MyLearning';

/** The 4 main tab pages rendered side-by-side */
const TAB_PAGES = [
  <Dashboard key="dashboard" />,
  <Explore key="explore" />,
  <SearchPage key="search" />,
  <MyLearning key="mylearning" />
];

export const MobileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTabIndex = TABS.findIndex(t => location.pathname.startsWith(t.path));
  const showNav = activeTabIndex >= 0;

  // Swiper state - stores PIXELS
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(0);

  // Measure container width for pixel-perfect dragging
  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.offsetWidth);
    
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync motion value with current route using pixels
  useEffect(() => {
    if (showNav && !isDragging && width > 0) {
      animate(x, -activeTabIndex * width, {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.18
      });
    }
  }, [activeTabIndex, showNav, x, isDragging, width]);

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    if (!showNav || width === 0) return;
    
    // Swipe threshold to trigger navigation
    const threshold = width * 0.2; // 20% of screen width to swipe
    let nextIndex = activeTabIndex;

    if (info.offset.x < -threshold && activeTabIndex < TABS.length - 1) {
      nextIndex = activeTabIndex + 1;
    } else if (info.offset.x > threshold && activeTabIndex > 0) {
      nextIndex = activeTabIndex - 1;
    }

    if (nextIndex !== activeTabIndex) {
      navigate(TABS[nextIndex].path);
    } else {
      // Snap back
      animate(x, -activeTabIndex * width, {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.18
      });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-200 flex items-center justify-center overflow-hidden">
      <div
        className="w-full h-[100dvh] sm:h-[90vh] sm:max-h-[850px] sm:w-[400px] sm:rounded-[2rem] bg-white sm:shadow-2xl overflow-hidden relative flex flex-col sm:border-[8px] sm:border-gray-900"
      >
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden" ref={containerRef}>
          {showNav ? (
            // Carousel for main tabs
            <motion.div
              className="flex w-full h-full"
              style={{ x, width: `${TABS.length * 100}%` }}
              drag="x"
              dragConstraints={{ left: -width * (TABS.length - 1), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {TAB_PAGES.map((page, i) => (
                <div key={i} style={{ width: `${100 / TABS.length}%` }} className="h-full shrink-0 flex flex-col overflow-hidden">
                  {page}
                </div>
              ))}
            </motion.div>
          ) : (
            // Normal outlet for other routes
            <Outlet />
          )}
        </div>

        {/* BottomNav rendered outside so it stays fixed */}
        {showNav && <BottomNav activeSwipeIndex={activeTabIndex} swipeX={x} containerWidth={width} />}
      </div>
    </div>
  );
};
