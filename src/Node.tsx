// src/Node.tsx
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import default_nodes_data from "./default_nodes.json";

export interface NodeProps {
  start_time: string;
  name?: string | null;
  mp3?: string;
  note?: string | null;
  color?: string | null;
}

function _convertTimeStringToDate(timeString: string) {
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

export function get_default_nodes() {
  const sortedNodes = default_nodes_data.nodes.sort(
    (a: NodeProps, b: NodeProps) =>
      _convertTimeStringToDate(a.start_time).getTime() -
      _convertTimeStringToDate(b.start_time).getTime()
  );

  // 遍历每个节点，给未定义或为空的 mp3 属性赋予默认值
  const nodesWithDefaultMp3 = sortedNodes.map((node: NodeProps) => {
    if (!node.mp3) {
      node.mp3 = "default.mp3";
    }
    return node;
  });

  console.log("get_default_nodes", nodesWithDefaultMp3);
  return nodesWithDefaultMp3;
}

export function next_node(nodes: NodeProps[]) {
  let ret_node = null;
  const current_time = new Date();
  for (const node of nodes) {
    if (
      _convertTimeStringToDate(node.start_time).getTime() >
      current_time.getTime()
    ) {
      ret_node = node;
      break;
    }
  }

  // If no node is found, return the first node
  if (!ret_node) {
    ret_node = nodes[0];
  }

  console.log("next_node", ret_node);
  return ret_node;
}

export function check_node(now: Date, node: NodeProps) {
  if (_convertTimeStringToDate(node.start_time).getTime() < now.getTime()) {
    return true;
  }
  return false;
}
