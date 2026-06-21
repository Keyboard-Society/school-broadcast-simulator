// src/hooks/useWindowSize.ts — 窗口尺寸监听 hook
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState(() => {
    // 初始化时使用 window.innerWidth，如果可用
    return typeof window !== "undefined" ? window.innerWidth : 1024;
  });

  useEffect(() => {
    // 防抖处理，避免频繁触发
    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100); // 100ms 防抖
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}