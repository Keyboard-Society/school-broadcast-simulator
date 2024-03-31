// src/App.tsx

import { Button, Col, Descriptions, Flex, Layout, Row, Slider } from "antd";

import React, { useRef, useState } from "react";
import "./App.css";
import { CalculateRemainingTime, getNow, getNowString } from "./Clock";
import Card from "./Component/Card";
import Header from "./Component/Header";
import SoundPlayer from "./SoundPlayer";

import Markdown from "react-markdown";
import Sider from "./Component/Sider";
import {
  NodeProps,
  check_node,
  defaultNode,
  get_default_nodes,
  next_node,
} from "./Node";
import { getSchedule } from "./ScheduleManagement";

const { Footer, Content } = Layout;

type AppState = {
  soundPlayerRef: React.RefObject<SoundPlayer>;
  nodes: NodeProps[];
};

const App: React.FC = () => {
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [currentTime, setCurrentTime] = useState<string>(
    getNowString(getNow())
  );
  const [countdownTime, setCountdownTime] = useState<string>(
    getNowString(getNow())
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
    setCurrentTime(getNowString(now));
    setCountdownTime(CalculateRemainingTime(now, getSchedule().end_time));
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

  const baseStyle: React.CSSProperties = {
    width: "25%",
  };

  const setSoundInSoundPlayerVolume = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    if (soundPlayerRef.current) {
      soundPlayerRef.current.setVolume(value);
    }
  };

  return (
    <Flex gap="large" wrap="wrap">
      <Layout className="layoutStyle">
        <Header />
        <Layout>
          <Sider node={nextNodeSaver.current} nodes={state.nodes} />
          <Content className="contentStyle">
            <Row>
              <Col span={6}></Col>
              <Col span={12}>
                <h1>在校模拟器</h1>
                <SoundPlayer
                  ref={soundPlayerRef}
                  audioSrc="default.mp3"
                  playCount={1}
                />
                <Markdown></Markdown>
                <Button
                  ref={startButtonRef}
                  type="primary"
                  danger
                  onClick={startSystem}
                >
                  开始
                </Button>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="当前时间">
                    {currentTime}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"[" + getSchedule().end_time + " 下班/放学]-倒计时"}
                  >
                    {countdownTime}
                  </Descriptions.Item>
                </Descriptions>
                <Card
                  node={nextNodeSaver.current}
                  playSound={playSoundInSoundPlayer}
                  stopSound={stopSoundInSoundPlayer}
                  setVolume={setSoundInSoundPlayerVolume}
                />
              </Col>
              <Col span={6}></Col>
            </Row>
          </Content>
        </Layout>
        <Footer className="footerStyle">This is Footer</Footer>
      </Layout>
    </Flex>
  );
};

export default App;
