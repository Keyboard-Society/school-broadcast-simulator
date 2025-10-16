import React, { useState, useEffect } from "react";
import { NodeProps } from "../Node";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

interface Item {
  children?: React.ReactNode;
  label?: React.ReactNode;
  color?: string;
  dot?: React.ReactNode;
}

interface TimelineComponentProps {
  node: NodeProps;
  nodes: NodeProps[];
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({
  node,
  nodes,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const newItems: Item[] = [];

    const currentNodeIndex = nodes.findIndex(
      (i) => i.name === node.name && i.start_time === node.start_time
    );

    for (let index = 0; index < nodes.length; index++) {
      const i = nodes[index];

      const isPast = index < currentNodeIndex;
      const isNext = index === currentNodeIndex;

      const item: Item = {
        label: undefined,
        color: i.color || undefined,
        dot: undefined,
      };

      const timeSpan = (
        <span
          style={{
            color: isPast ? "#999" : "#333",
            marginRight: "8px",
            fontWeight: "bold",
          }}
        >
          {i.start_time}
        </span>
      );

      const nameSpan = (
        <span style={{ color: isPast ? "#999" : "#555" }}>{i.name}</span>
      );

      item.children = (
        <div style={{ display: "flex", alignItems: "center" }}>
          {timeSpan}
          {nameSpan}
        </div>
      );

      if (isNext) {
        item.color = "green";
      } else if (isPast) {
        item.color = "gray";
      }

      newItems.push(item);
    }

    setItems(newItems);
  }, [node, nodes]);

  return (
    <Timeline
      mode={undefined}
      style={{ paddingLeft: "15px", marginTop: "10px" }}
      items={items}
    />
  );
};

export default TimelineComponent;
