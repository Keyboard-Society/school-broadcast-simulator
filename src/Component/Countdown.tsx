// src/Component/Countdown.tsx — 番茄钟
// 导出: usePomodoro hook / PomodoroControls / PomodoroRings

import React, { useEffect, useRef, useState } from "react";
import {
  Button, Divider, Input, InputNumber, InputRef,
  Progress, ProgressProps, Select, Slider, Space, Typography, theme,
} from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import SoundPlayer from "../SoundPlayer";
import { MP3List, getRandomMP3 } from "../ConstantStore";
import "./Countdown.css";

const { Text } = Typography;
const RANDOM = "Random(随机音乐)";
const COLORS: ProgressProps["strokeColor"] = { "0%": "#0071E3", "100%": "#34C759" };
const PRESETS = [0.5, 1, 2, 3, 5, 15, 25, 30];

/* ── 类型 ── */
export interface CountdownProps {
  startTime: number;
  countDownMinute: number;
  countDownSeconds: number;
  mp3: string;
  note: string;             // 备注
  numerator: number;
  percent: number;
  isPlayed: boolean;
  isCompleted: boolean;     // 是否已完成计时（等待用户确认）
  needsConfirmation: boolean; // 是否需要用户确认
}

/* ── 共享 Hook ── */
export function usePomodoro() {
  const playerRef = useRef<SoundPlayer>(null);
  const [minutes, setMinutes] = useState(20);
  const [sound, setSound] = useState(RANDOM);
  const [note, setNote] = useState("");      // 备注输入
  const [data, setData] = useState<CountdownProps[]>([]);

  const play = (src?: string) => {
    playerRef.current?.stopSound();
    const mp3 = (!src || src === "Random") ? getRandomMP3() : src;
    playerRef.current?.playSound(mp3, 1);
  };
  const stop = () => playerRef.current?.stopSound();
  const setVol = (v: number) => { if (!isNaN(v)) playerRef.current?.setVolume(v); };

  const add = (m: number) => {
    const src = sound === RANDOM ? getRandomMP3() : sound;
    setData(prev => [...prev, {
      startTime: Date.now() / 1000,
      countDownMinute: m,
      countDownSeconds: m * 60,
      mp3: src,
      note: note.trim(),
      numerator: 0, percent: 0, isPlayed: false,
      isCompleted: false, needsConfirmation: true,
    }]);
  };

  // 确认完成的倒计时
  const confirm = (startTime: number) => {
    setData(prev => prev.filter(d => d.startTime !== startTime));
  };

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now() / 1000;
      setData(prev => prev.map(d => {
        if (d.percent >= 100) {
          if (!d.isPlayed) play(d.mp3);
          return { ...d, percent: 100, isPlayed: true, isCompleted: true };
        }
        const n = Math.round(now - d.startTime);
        const pct = Math.min(Math.round(n / d.countDownSeconds * 1000) / 10, 100);
        return { ...d, numerator: n, percent: pct };
      }).filter(d => !d.isCompleted || d.needsConfirmation));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return {
    playerRef, minutes, setMinutes, sound, setSound, note, setNote,
    data, add, play, stop, setVol, confirm,
  };
}

/* ── 辅助样式 ── */
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 500, marginBottom: 8, display: "block" };

/* ── 控件面板 ── */
export const PomodoroControls: React.FC<{
  hook: ReturnType<typeof usePomodoro>;
}> = ({ hook: p }) => {
  const [items, setItems] = useState([RANDOM].concat(MP3List));
  const [inputVal, setInputVal] = useState(RANDOM);
  const inputRef = useRef<InputRef>(null);

  return (
    <div>
      <SoundPlayer ref={p.playerRef} audioSrc="default.mp3" playCount={1} />

      {/* 预设 */}
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary" style={labelStyle}>预设时长</Text>
        <Space wrap size={[8, 8]}>
          {PRESETS.map(m => (
            <Button key={m} size="middle" onClick={() => p.add(m)} style={{ borderRadius: 10 }}>
              {m} 分钟
            </Button>
          ))}
        </Space>
      </div>

      {/* 自定义 */}
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary" style={labelStyle}>自定义时间</Text>
        <Space.Compact style={{ width: "100%" }}>
          <InputNumber style={{ width: "100%" }} placeholder="分钟" size="large"
            value={p.minutes} min={0.5} max={120} step={1}
            onChange={v => p.setMinutes(v as number)} />
          <Button type="primary" size="large" onClick={() => p.add(p.minutes)}>
            开始倒计时
          </Button>
        </Space.Compact>
      </div>

      {/* 铃声 */}
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ ...labelStyle, marginBottom: 4 }}>播放声音</Text>
        <Select style={{ width: "100%" }} value={p.sound}
          onChange={v => p.setSound(v)}
          options={items.map(s => ({ label: s, value: s }))}
          dropdownRender={menu => (<>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space style={{ padding: "0 8px 4px" }}>
              <Input placeholder="添加铃声" ref={inputRef} value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.stopPropagation()} />
              <Button type="text" icon={<PlusOutlined />} onClick={e => {
                e.preventDefault();
                setItems(prev => [...prev, inputVal || `New ${items.length}`]);
                setInputVal("");
                setTimeout(() => inputRef.current?.focus(), 0);
              }}>Add</Button>
            </Space>
          </>)}
        />
      </div>

      {/* 备注 */}
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ ...labelStyle, marginBottom: 4 }}>备注</Text>
        <Input placeholder="可选" value={p.note} allowClear
          onChange={e => p.setNote(e.target.value)}
          onPressEnter={() => { p.add(p.minutes); p.setNote(""); }} />
      </div>

      {/* 试播 + 音量 */}
      <Space wrap size={[8, 8]}>
        <Button onClick={() => p.play(p.sound)}>🔊 试播</Button>
        <Button onClick={p.stop}>⏹ 停止</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 140 }}>
          <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>音量</Text>
          <Slider style={{ flex: 1, margin: 0 }} defaultValue={0.3}
            min={0} max={1} step={0.01} onChange={v => p.setVol(v)} />
        </div>
      </Space>
    </div>
  );
};

/* ── 进度圈 ── */
export const PomodoroRings: React.FC<{
  data: CountdownProps[];
  onConfirm?: (startTime: number) => void;
}> = ({ data, onConfirm }) => {
  const { token } = theme.useToken();
  const colorBgContainer = token.colorBgContainer;
  if (!data.length) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0", color: "#aeaeb2" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>⏱</div>
        <Text type="secondary">点击左侧预设时长或自定义时间开始</Text>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
      {data.map(d => {
        const remaining = Math.max(0, d.countDownSeconds - d.numerator);
        const mm = Math.floor(remaining / 60);
        const ss = String(remaining % 60).padStart(2, "0");
        const isCompleted = d.isCompleted;
        return (
          <div
            key={d.startTime}
            className={isCompleted ? "pomodoro-ring-completed" : ""}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 6, padding: "12px 16px", borderRadius: 16,
              background: colorBgContainer, minWidth: 80,
              border: `1px solid ${isCompleted ? "#52c41a" : token.colorBorder}`,
              boxShadow: isCompleted
                ? "0 0 0 2px rgba(82, 196, 26, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)"
                : token.boxShadow,
              animation: isCompleted ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
            onClick={() => isCompleted && onConfirm?.(d.startTime)}
          >
            <Progress
              type="circle"
              size={72}
              percent={d.percent}
              strokeLinecap="round"
              strokeColor={isCompleted ? "#52c41a" : COLORS}
              trailColor="#f0f0f0"
              format={() => isCompleted
                ? <CheckOutlined style={{ fontSize: 32, color: "#52c41a" }} />
                : `${mm}:${ss}`}
            />
            <Text style={{
              fontSize: 11,
              color: isCompleted ? "#52c41a" : "#86868b",
              fontWeight: 500
            }}>
              {isCompleted ? "已完成" : `${d.countDownMinute} min`}
            </Text>
            {d.note && (
              <Text style={{ fontSize: 11, color: "#aeaeb2", maxWidth: 90 }}
                ellipsis={{ tooltip: d.note }}>
                {d.note}
              </Text>
            )}
            {isCompleted && (
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                style={{ marginTop: 4, borderRadius: 8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm?.(d.startTime);
                }}
              >
                确认
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
