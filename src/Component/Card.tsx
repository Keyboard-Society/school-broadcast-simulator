// src/Timeline.tsx
import React, { useEffect, useRef, useState } from "react";
import { NodeProps } from "../Node";
import { Button, Card } from "antd";

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
      <p>事件名称: {node.name}</p>
      <p>开始时间: {node.start_time}</p>
      <div>
        <p>播放声音: {node.mp3}</p>
        <div>
          <Button id="startButton" type="primary" onClick={playSound}>
            试播铃声
          </Button>
          <Button onClick={stopSound}>停止铃声</Button>
        </div>
      </div>
      {node.note && <p>事件描述: {node.note}</p>}
    </Card>
  );
};

export default CardComponent;
