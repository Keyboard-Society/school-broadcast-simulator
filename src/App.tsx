// src/App.tsx
import { Flex, Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SoundPlayer from "./SoundPlayer";
import Timeline from "./Timeline";

import { NodeProps, get_default_nodes, next_node } from "./Node";

const { Header, Footer, Sider, Content } = Layout;

type AppState = {
  soundPlayerRef: React.RefObject<SoundPlayer>;
  nodes: NodeProps[];
  nextNode: NodeProps | null;
};

const App: React.FC = () => {
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [state, setState] = useState<AppState>({
    soundPlayerRef,
    nodes: [],
    nextNode: null,
  });

  useEffect(() => {
    const updateTime = () => {
      const current = new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime("当前时间: " + current);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const findNextNode = () => {
      const nodes = get_default_nodes();
      let closestNode = next_node(nodes);
      setState((prev) => ({ ...prev, nextNode: closestNode }));
      console.log("closestNode", closestNode);
    };

    findNextNode();
  }, []);

  const playSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      // soundPlayerRef.current.playSound("回復.mp3", 3);
      // soundPlayerRef.current.playSound("default.mp3", 3);
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
              <Timeline nodes={get_default_nodes()} />
            </div>
          </Sider>
          <Content className="contentStyle">
            <div>
              <h1>在校模拟器</h1>
              {/* <button onClick={playSoundInSoundPlayer}>Play SoundPlayer</button> */}
              {/* <button onClick={stopSoundInSoundPlayer}>Stop SoundPlayer</button> */}
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
              <button onClick={playSoundInSoundPlayer}>试播铃声</button>
              <button onClick={stopSoundInSoundPlayer}>停止铃声</button>
            </div>
            {state.nextNode && (
              <div>
                <div>下一个声音事件: {state.nextNode.name} </div>
                {/* <div>事件名称: {state.nextNode.name}</div> */}
                <div>开始时间: {state.nextNode.start_time}</div>
                <div>播放声音: {state.nextNode.mp3}</div>
                <div>事件描述: {state.nextNode.note}</div>
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
