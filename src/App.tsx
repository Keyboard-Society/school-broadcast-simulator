import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { CalculateRemainingTime, getNow, getNowString } from "./Clock";
import Header from "./Component/Header";
import FooterComponent from "./Component/Footer";
import SoundPlayer from "./SoundPlayer";
import Dashboard from "./Component/Dashboard";
import { useTimeDisplayMode } from "./hooks/useTimeDisplayMode";
import { useMute } from "./hooks/useMute";
import { useHeaderMode } from "./hooks/useHeaderMode";
import { useWindowSize } from "./hooks/useWindowSize";
import {
  NodeProps,
  check_node,
  defaultNode,
  get_default_nodes,
  next_node,
} from "./Node";
import { getSchedule } from "./ScheduleManagement";

type AppState = {
  soundPlayerRef: React.RefObject<SoundPlayer>;
  nodes: NodeProps[];
};

type Mode = "light" | "dark";

const App: React.FC<{ themeMode: Mode; toggleTheme: () => void }> = ({
  themeMode,
  toggleTheme,
}) => {
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [timeDisplayMode, toggleTimeDisplayMode] = useTimeDisplayMode();
  const [isMuted, toggleMute] = useMute();
  const { headerMode, toggleHeaderMode, autoMode, setModeByWidth } = useHeaderMode();
  const { isMobile } = useWindowSize();
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
  const lastTriggeredNodeRef = useRef<string | null>(null); // 记录上次触发的节点时间
  const startButtonRef = useRef<HTMLButtonElement>(null);

  // 自动根据屏幕宽度切换 Header 模式
  useEffect(() => {
    setModeByWidth(isMobile);
  }, [isMobile, setModeByWidth]);

  const findNextNode = () => {
    var closestNode2 = next_node(state.nodes);
    nextNodeSaver.current = closestNode2;
    return closestNode2;
  };

  const startSystem = () => {
    if (startButtonRef.current) {
      if (startButtonRef.current.innerText === "已开始") {
        console.log("已点过按钮，不能重复点击");
        return;
      }
      startButtonRef.current.innerText = "已开始";
      startButtonRef.current.disabled = true;
      startButtonRef.current.style.display = "none";
    }
    lastTriggeredNodeRef.current = null; // 重置触发记录
    findNextNode();

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
    const currentNode = nextNodeSaver.current;

    // 检查节点是否应该触发：时间已到 且 未被触发过
    if (
      check_node(now, currentNode) &&
      currentNode.start_time !== lastTriggeredNodeRef.current
    ) {
      console.log("开始事件", currentNode);
      lastTriggeredNodeRef.current = currentNode.start_time; // 标记为已触发
      playSoundInSoundPlayer();
      findNextNode();
    }
  };

  const playSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      // 静音时不播放
      if (!isMuted) {
        soundPlayerRef.current.playSound(
          nextNodeSaver.current?.mp3?.toString(),
          1
        );
      }
    }
  };

  const stopSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.stopSound();
    }
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
    <div className={`appRoot ${themeMode === "dark" ? "dark" : ""}`}>
      <Header
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        timeDisplayMode={timeDisplayMode}
        toggleTimeDisplayMode={toggleTimeDisplayMode}
        isMuted={isMuted}
        toggleMute={toggleMute}
        headerMode={headerMode}
        toggleHeaderMode={toggleHeaderMode}
        isMobile={isMobile}
      />
      <Dashboard
        currentTime={currentTime}
        countdownTime={countdownTime}
        soundPlayerRef={soundPlayerRef}
        startButtonRef={startButtonRef}
        startSystem={startSystem}
        nextNode={nextNodeSaver.current}
        nodes={state.nodes}
        playSound={playSoundInSoundPlayer}
        stopSound={stopSoundInSoundPlayer}
        setVolume={setSoundInSoundPlayerVolume}
        timeDisplayMode={timeDisplayMode}
        isMuted={isMuted}
        headerMode={headerMode}
      />
      <FooterComponent />
    </div>
  );
};

export default App;
