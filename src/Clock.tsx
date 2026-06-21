// src/Clock.tsx

import { RetweetOutlined } from "@ant-design/icons";

export function _convertTimeStringToDate(timeString: string): Date {
  // Get the current date
  const today = new Date();

  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set the time values to the current date
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
}

export function getNow() {
  const now = new Date();
  return now;
}

export function getNowString(now: Date | null | undefined) {
  if (now === null || now === undefined) {
    now = getNow();
  }
  let current = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  if (current.startsWith("24:")) {
    current = current.replace("24:", "00:");
  }

  return current;
}

export function CalculateRemainingTime(now: Date, end_time: string) {
  const endDate = _convertTimeStringToDate(end_time);
  let RemainingTime = endDate.getTime() - now.getTime();

  // 如果当前时间已经超过下班时间，计算到第二天的倒计时
  if (RemainingTime < 0) {
    // 加一天的毫秒数（24小时）
    RemainingTime += 24 * 60 * 60 * 1000;
  }

  // Convert remaining time to hours and minutes
  const hours = Math.floor(RemainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((RemainingTime % (1000 * 60 * 60)) / (1000 * 60));

  // Format hours and minutes with leading zeros if necessary
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
