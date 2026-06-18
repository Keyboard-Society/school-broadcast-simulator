import React from "react";
import { Button, Col, Row, Descriptions } from "antd";
import Markdown from "react-markdown";

import SoundPlayer from "../SoundPlayer";
import Card from "./Card";
import { usePomodoro, PomodoroControls, PomodoroRings } from "./Countdown";
import { NodeProps } from "../Node";
import { getSchedule } from "../ScheduleManagement";

interface MainContentProps {
  currentTime: string;
  countdownTime: string;
  soundPlayerRef: React.RefObject<any>;
  startButtonRef: React.RefObject<HTMLButtonElement>;

  nextNode: NodeProps;

  startSystem: () => void;
  playSound: () => void;
  stopSound: () => void;
  setVolume: (value: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentTime,
  countdownTime,
  soundPlayerRef,
  startButtonRef,
  startSystem,
  nextNode,
  playSound,
  stopSound,
  setVolume,
}) => {
  return (
    <Row justify="center">
      <Col span={6}></Col>
      <Col span={12} style={{ maxWidth: "1200px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
            color: "#1d1d1f",
            marginBottom: "24px",
          }}
        >
          在校模拟器
        </h1>
        <SoundPlayer
          ref={soundPlayerRef}
          audioSrc="default.mp3"
          playCount={1}
        />
        <Markdown></Markdown>
        <Button
          ref={startButtonRef}
          type="primary"
          size="large"
          onClick={startSystem}
          style={{ marginBottom: "24px" }}
        >
          开始
        </Button>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="当前时间">{currentTime}</Descriptions.Item>
          <Descriptions.Item
            label={"[" + getSchedule().end_time + " 下班/放学]-倒计时"}
          >
            {countdownTime}
          </Descriptions.Item>
        </Descriptions>
        <Card
          node={nextNode}
          playSound={playSound}
          stopSound={stopSound}
          setVolume={setVolume}
        />
        {(() => {
          const hook = usePomodoro();
          return (
            <>
              <PomodoroControls hook={hook} />
              <PomodoroRings data={hook.data} />
            </>
          );
        })()}
      </Col>
      <Col span={6}></Col>
    </Row>
  );
};

export default MainContent;
