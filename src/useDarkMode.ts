// src/useDarkMode.ts — 首次跟随系统，手动切换后以 localStorage 为准
import { useState, useEffect, useCallback } from "react";

type Mode = "light" | "dark";

export function useDarkMode(): [Mode, () => void] {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "light" || saved === "dark") return saved;
    // 无记录时先读系统偏好
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  /* 回写 localStorage，并在无记录时跟随系统变化 */
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved) return; // 用户已手动选过，不覆盖

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setMode(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    setMode(prev => prev === "light" ? "dark" : "light");
  }, []);

  return [mode, toggle];
}
