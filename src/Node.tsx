// src/Node.tsx
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import default_nodes_data from "./default_nodes.json";
import { _convertTimeStringToDate, getNowString } from "./Clock";

export interface NodeProps {
  start_time: string;
  name?: string | null;
  mp3?: string;
  note?: string | null;
  color?: string | null;
}

export const defaultNode: NodeProps = {
  start_time: "00:00",
  name: "默认节点",
  mp3: "default.mp3",
  note: "请点击开始按钮",
};

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
    if (node.name === "test") {
      const currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + 1);
      node.start_time = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      console.log("test node set ", node);
    }
    return node;
  });

  console.log("get_default_nodes", nodesWithDefaultMp3);
  return nodesWithDefaultMp3;
}

export function next_node(nodes: NodeProps[]) {
  let ret_node = nodes[0];
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
  console.log("next_node", ret_node);
  return ret_node;
}

export function check_node(now: Date, node: NodeProps) {
  if (_convertTimeStringToDate(node.start_time).getTime() < now.getTime()) {
    return true;
  }
  return false;
}
