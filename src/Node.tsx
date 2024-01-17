// src/Node.tsx
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export interface NodeProps {
  start_time: string;
  name?: string | null;
  mp3?: string | null;
  note?: string | null;
  color?: string | null;
}
