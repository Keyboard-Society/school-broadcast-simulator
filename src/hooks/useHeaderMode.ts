// src/hooks/useHeaderMode.ts — Header 显示模式管理
import { useState, useEffect } from "react";

export type HeaderMode = "horizontal" | "vertical" | "hidden";

// 0: horizontal, 1: vertical, 2: hidden
const MODE_MAP: HeaderMode[] = ["horizontal", "vertical", "hidden"];

export function useHeaderMode() {
  const [modeIndex, setModeIndex] = useState<number>(() => {
    const saved = localStorage.getItem("headerMode");
    if (saved === "vertical") return 1;
    if (saved === "hidden") return 2;
    return 0; // 默认横向
  });

  const [autoMode, setAutoMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("headerAutoMode");
    return saved !== "false"; // 默认启用自动模式
  });

  const headerMode = MODE_MAP[modeIndex];

  useEffect(() => {
    localStorage.setItem("headerMode", headerMode);
  }, [headerMode]);

  useEffect(() => {
    localStorage.setItem("headerAutoMode", String(autoMode));
  }, [autoMode]);

  // 循环切换：0 -> 1 -> 2 -> 0 -> ...
  const toggleHeaderMode = () => {
    setModeIndex((prev) => (prev + 1) % 3);
    setAutoMode(false); // 用户手动切换后，关闭自动模式
  };

  // 根据屏幕宽度自动设置模式
  const setModeByWidth = (isMobile: boolean) => {
    if (autoMode) {
      setModeIndex(isMobile ? 1 : 0); // 移动端用侧边栏，桌面端用横向
    }
  };

  // 启用自动模式（刷新页面后恢复）
  const enableAutoMode = () => {
    setAutoMode(true);
  };

  return {
    headerMode,
    modeIndex,
    toggleHeaderMode,
    autoMode,
    setAutoMode,
    setModeByWidth,
    enableAutoMode
  };
}


