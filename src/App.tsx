import React, { useRef, useState } from "react";
import "./App.css";
import { CalculateRemainingTime, getNow, getNowString } from "./Clock";
import Header from "./Component/Header";
import FooterComponent from "./Component/Footer";
import SoundPlayer from "./SoundPlayer";
import Dashboard from "./Component/Dashboard";
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

  const setSoundInSoundPlayerVolume = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    if (soundPlayerRef.current) {
      soundPlayerRef.current.setVolume(value);
    }
  };

  return (
    <div className="appRoot">
      <Header />
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
      />
      <FooterComponent />
    </div>
  );
};

export default App;
