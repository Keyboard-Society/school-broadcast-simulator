// src/Clock.tsx

export function getNow() {
  const now = new Date();
  return now;
}

export function getNowString(now: Date | null | undefined) {
  if (now === null || now === undefined) {
    now = getNow();
  }
  let current = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  if (current.startsWith("24:")) {
    current = current.replace("24:", "00:");
  }

  return current;
}
