// src/Timeline.tsx
import React, { useEffect, useRef, useState } from "react";
import { NodeProps } from "../Node";
import { Button, Card, Descriptions } from "antd";
// import rehypeHighlight from 'rehype-highlight'
import Markdown from "react-markdown";

interface CardComponentProps {
  node: NodeProps;
  playSound: () => void;
  stopSound: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  node,
  playSound,
  stopSound,
}) => {
  return (
    <Card title={"next: " + node.name}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="事件名称 ">{node.name}</Descriptions.Item>
        <Descriptions.Item label="开始时间 ">
          {node.start_time}
        </Descriptions.Item>
        <Descriptions.Item label="播放声音 ">{node.mp3}</Descriptions.Item>
        <Descriptions.Item label="试播 ">
          <Button id="startButton" type="primary" onClick={playSound}>
            试播铃声
          </Button>
          <Button onClick={stopSound}>停止铃声</Button>
        </Descriptions.Item>
        {node.note && (
          <Descriptions.Item label="事件描述 ">
            <Markdown>{node.note}</Markdown>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
};

export default CardComponent;
