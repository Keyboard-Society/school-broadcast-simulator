// src/App.tsx

import { Flex, Layout, Button, Card, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SoundPlayer from "./SoundPlayer";
import Timeline from "./Timeline";

import { NodeProps, check_node, get_default_nodes, next_node } from "./Node";
import { DataSourceItemObject } from "antd/es/auto-complete";

const { Header, Footer, Sider, Content } = Layout;

type AppState = {
  soundPlayerRef: React.RefObject<SoundPlayer>;
  nodes: NodeProps[];
  nextNode: NodeProps;
};

const App: React.FC = () => {
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [state, setState] = useState<AppState>(() => {
    const nodes = get_default_nodes();
    const closestNode = next_node(nodes);
    return {
      soundPlayerRef,
      nodes,
      nextNode: closestNode,
    };
  });

  const findNextNode = () => {
    const closestNode = next_node(state.nodes);
    setState((prev) => ({ ...prev, nextNode: closestNode }));
    console.log("closestNode", closestNode);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const current = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime("当前时间: " + current);
      if (check_node(now, state.nextNode)) {
        console.log("开始事件", state.nextNode);
        playSoundInSoundPlayer();
        findNextNode();
      }
    };

    updateTime();
    // 每隔 1000 毫秒（即 1 秒）执行一次 updateTime 函数
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    findNextNode();
  }, [state.nodes]);

  const playSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(state.nextNode?.mp3?.toString(), 3);
    }
  };

  const stopSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.stopSound();
    }
  };

  return (
    <Flex gap="large" wrap="wrap">
      <Layout className="layoutStyle">
        <Header className="headerStyle">校铃声模拟器</Header>
        <Layout>
          <Sider width="25%" className="siderStyle">
            <div>
              <Timeline nodes={state.nodes} />
            </div>
          </Sider>
          <Content className="contentStyle">
            <div>
              <h1>在校模拟器</h1>
              <SoundPlayer
                ref={soundPlayerRef}
                audioSrc="default.mp3"
                playCount={3}
              />
            </div>
            <div>
              <h1>{currentTime}</h1>
            </div>

            <div>
              <Card title={"next: " + state.nextNode.name}>
                <p>事件名称: {state.nextNode.name}</p>
                <p>开始时间: {state.nextNode.start_time}</p>
                <div>
                  <p>播放声音: {state.nextNode.mp3}</p>
                  <div>
                    <Button type="primary" onClick={playSoundInSoundPlayer}>
                      试播铃声
                    </Button>
                    <Button onClick={stopSoundInSoundPlayer}>停止铃声</Button>
                  </div>
                </div>
                {state.nextNode.note && <p>事件描述: {state.nextNode.note}</p>}
              </Card>
            </div>
          </Content>
        </Layout>
        <Footer className="footerStyle">This is Footer</Footer>
      </Layout>
    </Flex>
  );
};

export default App;
