// src/Timeline.tsx
import React, { useEffect, useRef, useState } from "react";
import { NodeProps } from "../Node";
import { Button, Card, Descriptions, Typography, Slider } from "antd";
// import rehypeHighlight from 'rehype-highlight'
import Markdown from "react-markdown";

const { Text, Link } = Typography;

interface CardComponentProps {
  node: NodeProps;
  playSound: () => void;
  stopSound: () => void;
  setVolume: (value: number) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  node,
  playSound,
  stopSound,
  setVolume,
}) => {
  return (
    <Card title={"next: " + node.name}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="事件名称 ">
          {" "}
          <Text>{node.name}</Text>
        </Descriptions.Item>
        {node.note && (
          <Descriptions.Item label="事件描述 ">
            <Markdown>{node.note}</Markdown>
          </Descriptions.Item>
        )}
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
        <Descriptions.Item label="铃声音量 ">
          <Slider
            defaultValue={30}
            tooltip={{ open: true }}
            min={0}
            max={1}
            step={0.01}
            onChange={setVolume}
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CardComponent;
