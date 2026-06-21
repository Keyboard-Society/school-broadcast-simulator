import React, { useEffect, useState } from "react";
import { TimeDisplayMode } from "../hooks/useTimeDisplayMode";
import "flipclock/themes/flipclock";
import "../styles/led-display.css";

interface TimeDisplayProps {
  time: string;
  mode: TimeDisplayMode;
  size?: "lg" | "md";
}

const NormalDisplay: React.FC<{ time: string; size: string }> = ({ time, size }) => {
  const style: React.CSSProperties = {
    fontSize: size === "lg" ? 48 : 36,
    fontWeight: 600,
    letterSpacing: size === "lg" ? "-1px" : "-0.5px",
    fontVariantNumeric: "tabular-nums",
    lineHeight: size === "lg" ? 1.2 : 1.3,
  };
  return <div style={style}>{time}</div>;
};

const FlipClockDisplay: React.FC<{ time: string; size: string }> = ({ time, size }) => {
  const [displayDigits, setDisplayDigits] = useState(time.split(""));
  const [prevDigits, setPrevDigits] = useState(time.split(""));
  const [flippingIndex, setFlippingIndex] = useState(-1);

  useEffect(() => {
    const newDigits = time.split("");
    const firstDiff = newDigits.findIndex((d, i) => d !== displayDigits[i]);

    if (firstDiff !== -1) {
      setPrevDigits(displayDigits);
      setFlippingIndex(firstDiff);
      setTimeout(() => {
        setDisplayDigits(newDigits);
        setFlippingIndex(-1);
      }, 300);
    }
  }, [time, displayDigits]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      margin: "16px 0",
      overflow: "hidden",
      maxWidth: "100%"
    }}>
      <div
        className="flip-clock"
        style={{
          fontSize: size === "lg" ? 48 : 36,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
      >
        {displayDigits.map((digit, idx) => {
          if (digit === ":") {
            return (
              <div key={idx} className="flip-clock-divider">
                <div className="flip-clock-divider-inner">{digit}</div>
              </div>
            );
          }

          const isFlipping = flippingIndex === idx;
          const oldDigit = prevDigits[idx];
          const newDigit = digit;

          return (
            <div
              key={idx}
              className={`flip-clock-card ${isFlipping ? "animate" : ""}`}
            >
              {isFlipping && (
                <div className="flip-clock-card-item-inner before">
                  <div className="flip-clock-card-item-face top">
                    <span>{oldDigit}</span>
                  </div>
                  <div className="flip-clock-card-item-face bottom">
                    <span>{oldDigit}</span>
                  </div>
                </div>
              )}
              <div className="flip-clock-card-item-inner active">
                <div className="flip-clock-card-item-face top">
                  <span>{newDigit}</span>
                </div>
                <div className="flip-clock-card-item-face bottom">
                  <span>{newDigit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LEDDisplay: React.FC<{ time: string; size: string }> = ({ time, size }) => {
  const className = size === "lg" ? "led-display-lg" : "led-display-md";

  return (
    <div className={`led-display ${className}`}>
      {time}
    </div>
  );
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, mode, size = "lg" }) => {
  switch (mode) {
    case "flip":
      return <FlipClockDisplay time={time} size={size} />;
    case "led":
      return <LEDDisplay time={time} size={size} />;
    default:
      return <NormalDisplay time={time} size={size} />;
  }
};
