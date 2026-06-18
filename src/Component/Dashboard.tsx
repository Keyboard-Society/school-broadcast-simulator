// src/Component/Dashboard.tsx
import React from "react";
import { Row, Col, Card, Button, Typography, Space } from "antd";
import {
  ClockCircleFilled,
  PlayCircleFilled,
  SoundFilled,
  SettingOutlined,
} from "@ant-design/icons";

import SoundPlayer from "../SoundPlayer";
import NextEventCard from "./Card";
import PomodoroCard from "./Countdown";
import TimelineCard from "./Timeline";
import ConfigBar from "./ConfigBar";
import { NodeProps } from "../Node";
import { getSchedule } from "../ScheduleManagement";

const { Text, Title } = Typography;

interface DashboardProps {
  currentTime: string;
  countdownTime: string;
  soundPlayerRef: React.RefObject<any>;
  startButtonRef: React.RefObject<HTMLButtonElement>;
  nextNode: NodeProps;
  nodes: NodeProps[];
  startSystem: () => void;
  playSound: () => void;
  stopSound: () => void;
  setVolume: (value: number) => void;
}

const dashboardContainerStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px 24px",
};

const panelCardStyle: React.CSSProperties = {
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  border: "none",
  height: "100%",
};

const timeDisplayLargeStyle: React.CSSProperties = {
  fontSize: "48px",
  fontWeight: 600,
  letterSpacing: "-1px",
  color: "#1d1d1f",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.2,
};

const timeDisplayMediumStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: 600,
  letterSpacing: "-0.5px",
  color: "#86868b",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.3,
};

const Dashboard: React.FC<DashboardProps> = ({
  currentTime,
  countdownTime,
  soundPlayerRef,
  startButtonRef,
  nextNode,
  nodes,
  startSystem,
  playSound,
  stopSound,
  setVolume,
}) => {
  return (
    <div style={dashboardContainerStyle} className="dashboard-container">
      {/* 隐藏的全局 SoundPlayer */}
      <SoundPlayer ref={soundPlayerRef} audioSrc="default.mp3" playCount={1} />

      <Row gutter={[20, 20]}>
        {/* ── 左上：当前时间 + 开始按钮 ── */}
        <Col xs={24} sm={12}>
          <Card style={panelCardStyle} bodyStyle={{ padding: "28px 24px", textAlign: "center" }}>
            <Text
              type="secondary"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
                display: "block",
              }}
            >
              <ClockCircleFilled style={{ marginRight: "6px" }} />
              当前时间
            </Text>
            <div style={timeDisplayLargeStyle} className="time-display-lg">{currentTime}</div>
            <Button
              ref={startButtonRef}
              type="primary"
              size="large"
              icon={<PlayCircleFilled />}
              onClick={startSystem}
              style={{
                marginTop: "20px",
                height: "48px",
                paddingLeft: "32px",
                paddingRight: "32px",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              开始模拟
            </Button>
          </Card>
        </Col>

        {/* ── 右上：下一个事件（自身带 Card，不包外层） ── */}
        <Col xs={24} sm={12}>
          <NextEventCard
            node={nextNode}
            playSound={playSound}
            stopSound={stopSound}
            setVolume={setVolume}
          />
        </Col>

        {/* ── 左下：放学倒计时 ── */}
        <Col xs={24} sm={12}>
          <Card style={panelCardStyle} bodyStyle={{ padding: "28px 24px", textAlign: "center" }}>
            <Text
              type="secondary"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                marginBottom: "12px",
                display: "block",
              }}
            >
              {getSchedule().end_time} 下班/放学 · 倒计时
            </Text>
            <div style={timeDisplayMediumStyle} className="time-display-md">
              {countdownTime}
            </div>
          </Card>
        </Col>

        {/* ── 右下：番茄钟（自身带 Card，不包外层） ── */}
        <Col xs={24} sm={12}>
          <PomodoroCard />
        </Col>

        {/* ── 底部通栏：全天时间线 ── */}
        <Col xs={24}>
          <Card style={panelCardStyle} bodyStyle={{ padding: "16px 24px" }} title="📋 全天时间线">
            <TimelineCard node={nextNode} nodes={nodes} />
          </Card>
        </Col>

        {/* ── 底部：配置管理 ── */}
        <Col xs={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              padding: "8px 24px",
            }}
          >
            <Space>
              <SettingOutlined style={{ color: "#86868b" }} />
              <Text type="secondary" style={{ fontSize: "13px" }}>
                配置管理
              </Text>
            </Space>
            <ConfigBar />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
