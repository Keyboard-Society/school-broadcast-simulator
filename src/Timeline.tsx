// src/Timeline.tsx
import React, { useState, useEffect } from "react";
import { NodeProps } from "./Node";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";


interface Item {
  children?: string;
  label: string;
  color?: string;
}

interface TimelineComponentProps {
  nodes: NodeProps[];
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({
  nodes: initialNodes,
}) => {
  const [nodes, setNodes] = useState<NodeProps[]>(initialNodes);

  // ===
  // useEffect(() => {
  //   // 设置默认节点
  //   console.log(default_nodes);
  //   setNodes(default_nodes.nodes);
  // }, []); // 空数组表示只在组件挂载时执行

  const items: Item[] = [];

  for (const i of nodes) {
    const item: Item = {
      label: i.start_time,
    };

    if (i.name) {
      item.children = i.name;
    }

    if (i.color) {
      item.color = i.color;
    }

    items.push(item);
  }

  return <Timeline items={items} mode="left" />;
};
export default TimelineComponent;
