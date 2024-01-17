// src/Clock.tsx
import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(undefined, { hour12: false })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{currentTime}</div>;
};

export default Clock;
