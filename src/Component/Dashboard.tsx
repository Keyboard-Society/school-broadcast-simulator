// src/Component/Dashboard.tsx — 卡片网格布局
import React from "react";
import { Row, Col, Card, Button, Typography, Space } from "antd";
import { ClockCircleFilled, PlayCircleFilled, HourglassOutlined, SettingOutlined } from "@ant-design/icons";

import SoundPlayer from "../SoundPlayer";
import NextEventCard from "./Card";
import { PomodoroControls, PomodoroRings, usePomodoro } from "./Countdown";
import TimelineCard from "./Timeline";
import ConfigBar from "./ConfigBar";
import { NodeProps } from "../Node";
import { getSchedule } from "../ScheduleManagement";

const { Text } = Typography;

/* ── 样式常量 ── */
const CARD: React.CSSProperties  = { borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "none", height: "100%" };
const TXT_S: React.CSSProperties = { fontSize: 14, fontWeight: 500, letterSpacing: 1, display: "block", textTransform: "uppercase" };
const TXT_M: React.CSSProperties = { fontSize: 14, fontWeight: 500, display: "block", marginBottom: 8 };
const TIME_LG: React.CSSProperties = { fontSize: 48, fontWeight: 600, letterSpacing: "-1px", color: "#1d1d1f", fontVariantNumeric: "tabular-nums", lineHeight: 1.2 };
const TIME_MD: React.CSSProperties = { fontSize: 36, fontWeight: 600, letterSpacing: "-0.5px", color: "#86868b", fontVariantNumeric: "tabular-nums", lineHeight: 1.3 };
const DIVIDER: React.CSSProperties   = { height: 1, background: "#e5e5ea", margin: "20px 0" };
const BTN: React.CSSProperties       = { height: 48, paddingLeft: 32, paddingRight: 32, fontSize: 16, fontWeight: 500 };

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

const Dashboard: React.FC<DashboardProps> = (p) => {
  const pom = usePomodoro();
  const endLabel = `${getSchedule().end_time} 下班/放学 · 倒计时`;

  return (
    <div className="dashboard-container" style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
      <SoundPlayer ref={p.soundPlayerRef} audioSrc="default.mp3" playCount={1} />

      <Row gutter={[20, 20]}>
        {/* ─ 第一行左: 时间+倒计时+开始 ─ */}
        <Col xs={24} sm={12}>
          <Card style={CARD} bodyStyle={{ padding: "28px 24px", textAlign: "center" }}>
            <Text type="secondary" style={TXT_S}>
              <ClockCircleFilled style={{ marginRight: 6 }} />当前时间
            </Text>
            <div className="time-display-lg" style={TIME_LG}>{p.currentTime}</div>
            <div style={DIVIDER} />
            <Text type="secondary" style={{ ...TXT_M, marginLeft: -6 }}>
              <HourglassOutlined style={{ marginRight: 6 }} />{endLabel}
            </Text>
            <div className="time-display-md" style={{ ...TIME_MD, marginBottom: 20 }}>{p.countdownTime}</div>
            <Button ref={p.startButtonRef} type="primary" size="large"
              icon={<PlayCircleFilled />} onClick={p.startSystem} style={BTN}>
              开始模拟
            </Button>
          </Card>
        </Col>

        {/* ─ 第一行右: 下一个事件 ─ */}
        <Col xs={24} sm={12}>
          <NextEventCard node={p.nextNode} playSound={p.playSound}
            stopSound={p.stopSound} setVolume={p.setVolume} />
        </Col>

        {/* ─ 第二行左: 番茄钟控件 ─ */}
        <Col xs={24} sm={12}>
          <Card style={CARD} bodyStyle={{ padding: 24 }}
            title={<span style={{ fontSize: 16, fontWeight: 600 }}>🍅 番茄钟</span>}>
            <PomodoroControls hook={pom} />
          </Card>
        </Col>

        {/* ─ 第二行右: 番茄进度圈 ─ */}
        <Col xs={24} sm={12}>
          <Card style={CARD} bodyStyle={{ padding: 24 }}
            title={<span style={{ fontSize: 16, fontWeight: 600 }}>🍅 进行中</span>}>
            <PomodoroRings data={pom.data} />
          </Card>
        </Col>

        {/* ─ 第三行: 时间线 ─ */}
        <Col xs={24}>
          <Card style={CARD} bodyStyle={{ padding: "16px 24px" }} title="📋 全天时间线">
            <TimelineCard node={p.nextNode} nodes={p.nodes} />
          </Card>
        </Col>

        {/* ─ 底部: 配置 ─ */}
        <Col xs={24}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "8px 24px" }}>
            <Space>
              <SettingOutlined style={{ color: "#86868b" }} />
              <Text type="secondary" style={{ fontSize: 13 }}>配置管理</Text>
            </Space>
            <ConfigBar />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
