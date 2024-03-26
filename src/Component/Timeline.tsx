// src/Timeline.tsx
import React, { useState, useEffect } from "react";
import { NodeProps } from "../Node";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

interface Item {
  children?: string;
  label: string;
  color?: string;
  dot?: any;
}

interface TimelineComponentProps {
  node: NodeProps;
  nodes: NodeProps[];
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({
  node,
  nodes,
}) => {
  // ===
  // useEffect(() => {
  //   // 设置默认节点
  //   console.log(default_nodes);
  //   setNodes(default_nodes.nodes);
  // }, []); // 空数组表示只在组件挂载时执行

  const items: Item[] = [];

  const update = () => {
    items.splice(0, items.length);
    var past = true;

    for (const i of nodes) {
      const item: Item = {
        label: i.start_time,
      };

      if (i.name) {
        item.children = i.name;
      }

      if (i.name == node.name) {
        // FIXME: icon background color error
        // item.dot = (
        //   <ClockCircleOutlined
        //     className="timeline-clock-icon"
        //     style={{ fontSize: "16px" }}
        //     translate="yes"
        //   />
        // );
        past = false;
      }

      if (past == true) {
        item.color = "gray";
      } else {
        if (i.color) {
          item.color = i.color;
        }
      }

      items.push(item);
    }
  };

  useEffect(() => {
    update();
    console.log("TimelineComponent 当前节点:", node);
  }, [node]);

  update();
  return <Timeline items={items} mode="left" />;
};
export default TimelineComponent;
