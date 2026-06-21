// src/hooks/useMute.ts
import { useState, useEffect, useCallback } from "react";

/**
 * 全局静音状态管理 hook
 * - 静音状态持久化到 localStorage
 * - 提供切换静音的方法
 */
export function useMute(): [boolean, () => void] {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    // 从 localStorage 初始化
    const saved = localStorage.getItem("isMuted");
    return saved === "true";
  });

  // 持久化到 localStorage
  useEffect(() => {
    localStorage.setItem("isMuted", String(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return [isMuted, toggleMute];
}