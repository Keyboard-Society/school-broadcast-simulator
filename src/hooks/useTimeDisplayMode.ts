import { useCallback, useEffect, useState } from "react";

export type TimeDisplayMode = "normal" | "flip" | "led";

export function useTimeDisplayMode(): [TimeDisplayMode, () => void] {
  const [mode, setMode] = useState<TimeDisplayMode>(() => {
    const saved = localStorage.getItem("time-display-mode");
    return (saved as TimeDisplayMode) || "normal";
  });

  useEffect(() => {
    localStorage.setItem("time-display-mode", mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode(prev => {
      const modes: TimeDisplayMode[] = ["normal", "flip", "led"];
      const current = modes.indexOf(prev);
      return modes[(current + 1) % 3];
    });
  }, []);

  return [mode, toggle];
}
