// src/App.tsx
import { Flex, Layout } from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Clock from "./Clock";
import { NodeProps } from "./Node";
import Timeline from "./Timeline";
import default_nodes from "./default_nodes.json";

const { Header, Footer, Sider, Content } = Layout;

const nodes: NodeProps[] = [
  // Add your nodes here
];

// function playMusic()

const App: React.FC = () => {
  const [nextNode, setNextNode] = useState<NodeProps>();

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString()
  );

  const audioRef = useRef(new Audio());

  if (nodes.length === 0) {
    const initialNodes = [...default_nodes.nodes];
    nodes.push(...initialNodes);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString(undefined, {
        hour12: false,
      });
      setCurrentTime(newTime);

      // 判断是否到达下一个节点的开始时间
      if (nextNode && newTime >= nextNode.start_time) {
        // 触发播放音乐的方法
        audioRef.current.pause();
        audioRef.current.src = nextNode.mp3 || "src/default.mp3";
        audioRef.current.play();

        // 找到比 nextNode.start_time 更大的一点的时间的节点作为 nextNode
        const nextNodeIndex = nodes.findIndex(
          (node) => node.start_time > nextNode.start_time
        );
        if (nextNodeIndex !== -1) {
          setNextNode(nodes[nextNodeIndex]);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextNode, nodes]);

  return (
    <Flex gap="large" wrap="wrap">
      <Layout className="layoutStyle">
        <Header className="headerStyle">校铃声模拟器</Header>
        <Layout>
          <Sider width="25%" className="siderStyle">
            <div>
              <Timeline nodes={nodes} />
            </div>
          </Sider>
          <Content className="contentStyle">
            <div>{currentTime}</div>
            {nextNode && (
              <div>
                <div>时间: {nextNode.name} </div>
                <div>时间: {nextNode.start_time} </div>
                <div>播放: {nextNode.mp3 || "default.mp3"} </div>
                <div>描述: {nextNode.note} </div>
              </div>
            )}
          </Content>
        </Layout>
        <Footer className="footerStyle">This is Footer</Footer>
      </Layout>
    </Flex>
  );
};

export default App;
