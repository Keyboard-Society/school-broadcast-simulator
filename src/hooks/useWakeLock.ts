// src/hooks/useWakeLock.ts

import { useState, useEffect, useRef, useCallback } from "react";
import type { WakeLockSentinel } from "../types/wake-lock";

/**
 * Hook to manage screen wake lock functionality
 * Uses the Screen Wake Lock API to prevent screen from turning off
 */
export function useWakeLock(): [boolean, () => void, boolean] {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("wake-lock-enabled") === "true";
  });

  const isSupported = "wakeLock" in navigator;

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Request wake lock
  const requestWakeLock = useCallback(async () => {
    if (!isSupported) return;

    try {
      const wakeLock = await navigator.wakeLock.request("screen");
      wakeLockRef.current = wakeLock;

      // Handle wake lock release (e.g., when user switches tabs)
      wakeLock.addEventListener("release", () => {
        // Only update state if this wasn't triggered by user toggle
        if (wakeLockRef.current === wakeLock) {
          setEnabled(false);
          localStorage.setItem("wake-lock-enabled", "false");
        }
      });

      setEnabled(true);
      localStorage.setItem("wake-lock-enabled", "true");
    } catch (err) {
      console.warn("Wake Lock request failed:", err);
      setEnabled(false);
      localStorage.setItem("wake-lock-enabled", "false");
    }
  }, [isSupported]);

  // Release wake lock
  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
    setEnabled(false);
    localStorage.setItem("wake-lock-enabled", "false");
  }, []);

  // Toggle wake lock
  const toggle = useCallback(() => {
    if (enabled) {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  }, [enabled, requestWakeLock, releaseWakeLock]);

  // Re-acquire wake lock when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && enabled && !wakeLockRef.current) {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, requestWakeLock]);

  // Initial request if enabled from localStorage + cleanup on unmount
  useEffect(() => {
    if (enabled && isSupported) {
      requestWakeLock();
    }

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  return [enabled, toggle, isSupported];
}