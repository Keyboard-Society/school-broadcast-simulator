// src/App.tsx

import { Flex, Layout, Button } from "antd";
import React, { useRef, useState } from "react";
import "./App.css";
import SoundPlayer from "./SoundPlayer";
import Timeline from "./Timeline";

import {
  NodeProps,
  check_node,
  defaultNode,
  get_default_nodes,
  next_node,
} from "./Node";
import { getNow, getNowString } from "./Clock";
import Card from "./Card";

const { Header, Footer, Sider, Content } = Layout;

type AppState = {
  soundPlayerRef: React.RefObject<SoundPlayer>;
  nodes: NodeProps[];
};

const App: React.FC = () => {
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [currentTime, setCurrentTime] = useState<string>(
    "当前时间: " + getNowString(getNow())
  );
  const [state] = useState<AppState>(() => {
    const nodes = get_default_nodes();
    return {
      soundPlayerRef,
      nodes,
    };
  });
  const nextNodeSaver = useRef(defaultNode);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const findNextNode = () => {
    var closestNode2 = next_node(state.nodes);
    nextNodeSaver.current = closestNode2;
    console.log("nextNodeSaver.current ", nextNodeSaver.current);
    return closestNode2;
  };

  const startSystem = () => {
    if (startButtonRef.current) {
      if (startButtonRef.current.innerText == "已开始") {
        console.log("已点过按钮，不能重复点击");
        return;
      }
      startButtonRef.current.innerText = "已开始";
      startButtonRef.current.disabled = true;
      startButtonRef.current.removeAttribute("danger");
      startButtonRef.current.style.display = "none"; // 隐藏按钮
    }
    findNextNode();
    // 每隔 1000 毫秒（即 1 秒）执行一次 updateTime 函数
    const interval = setInterval(() => {
      updateTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };

  const updateTime = () => {
    const now = getNow();
    setCurrentTime("当前时间: " + getNowString(now));
    if (check_node(now, nextNodeSaver.current)) {
      console.log("开始事件", nextNodeSaver.current);
      playSoundInSoundPlayer();
      findNextNode();
    }
  };

  const playSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(
        nextNodeSaver.current?.mp3?.toString(),
        1
      );
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
              <Timeline node={nextNodeSaver.current} nodes={state.nodes} />
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
              <Button
                ref={startButtonRef}
                type="primary"
                danger
                onClick={startSystem}
              >
                开始
              </Button>
            </div>
            <div>
              <Card
                node={nextNodeSaver.current}
                playSound={playSoundInSoundPlayer}
                stopSound={stopSoundInSoundPlayer}
              />
            </div>
          </Content>
        </Layout>
        <Footer className="footerStyle">This is Footer</Footer>
      </Layout>
    </Flex>
  );
};

export default App;
