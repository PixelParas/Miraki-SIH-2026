import { useRef, useEffect } from "react";

/**
 * Hook to add mouse click-and-drag scrolling to an overflow-auto container.
 * This bridges the gap for desktop users trying to swipe natively.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const ele = ref.current;
    if (!ele) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      ele.style.cursor = "grabbing";
      startX = e.pageX - ele.offsetLeft;
      scrollLeft = ele.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      ele.style.cursor = "auto";
    };

    const onMouseUp = () => {
      isDown = false;
      ele.style.cursor = "auto";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      ele.scrollLeft = scrollLeft - walk;
    };

    ele.addEventListener("mousedown", onMouseDown);
    ele.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseup", onMouseUp);
    ele.addEventListener("mousemove", onMouseMove);

    return () => {
      ele.removeEventListener("mousedown", onMouseDown);
      ele.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup", onMouseUp);
      ele.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return ref;
}
