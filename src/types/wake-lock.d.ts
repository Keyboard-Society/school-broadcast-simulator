// src/types/wake-lock.d.ts
// Type definitions for Screen Wake Lock API

export interface WakeLockSentinel extends EventTarget {
  readonly released: boolean;
  readonly type: "screen";
  release(): Promise<void>;
  addEventListener(
    type: "release",
    listener: EventListener,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: "release",
    listener: EventListener,
    options?: boolean | EventListenerOptions
  ): void;
}

export interface WakeLock {
  request(type: "screen"): Promise<WakeLockSentinel>;
}

declare global {
  interface Navigator {
    wakeLock: WakeLock;
  }
}
