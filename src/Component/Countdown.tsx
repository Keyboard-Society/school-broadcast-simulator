// src/Timeline.tsx
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Input,
  InputNumber,
  InputRef,
  Progress,
  ProgressProps,
  Row,
  Select,
  Slider,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
// import rehypeHighlight from 'rehype-highlight'
import { PlusOutlined } from "@ant-design/icons";
import SoundPlayer from "../SoundPlayer";
import { MP3List } from "../ConstantStore";

const { Text, Link } = Typography;

export interface CountdownProps {
  startTime: number;
  countDownMinute: number;
  mp3: string;
  denominator: number;
  numerator: number;
  percent: number;
  isPlayed: boolean;
}

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

interface CountdownComponentProps {}

let index = 0;
const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const countdownType = [0.5, 1, 2, 3, 5, 15, 25, 30];
  const soundPlayerRef = useRef<SoundPlayer>(null);
  const [countdownValue, setCountdownValue] = useState<number>(20);
  const [items, setItems] = useState(MP3List);
  const [soundSource, setSoundSource] = useState(MP3List[0]);

  const [countdownData, setCountdownData] = useState<CountdownProps[]>([]);
  const inputRef = useRef<InputRef>(null);

  const playSoundInSoundPlayer = (soundSource: string) => {
    stopSoundInSoundPlayer(); // 停止先前的声音
    if (soundPlayerRef.current) {
      soundPlayerRef.current.playSound(soundSource, 1);
    }
  };

  const stopSoundInSoundPlayer = () => {
    if (soundPlayerRef.current) {
      soundPlayerRef.current.stopSound();
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSoundSource(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, soundSource || `New item ${index++}`]);
    setSoundSource("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const setSoundInSoundPlayerVolume = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    if (soundPlayerRef.current) {
      soundPlayerRef.current.setVolume(value);
    }
  };

  const Countdown = (value: number) => {
    var startTime = new Date().getTime() / 1000;

    // countdownData
    var data: CountdownProps = {
      startTime: startTime,
      countDownMinute: value,
      mp3: soundSource,
      numerator: 0,
      denominator: value * 60,
      percent: 0,
      isPlayed: false,
    };

    setCountdownData((prevData) => [...prevData, data]);
    return;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownData((prevData) => {
        const currentSeconds = new Date().getTime() / 1000;
        // console.log(prevData);
        return prevData
          .map((data) => {
            if (data.percent == 100) {
              playSoundInSoundPlayer(data.mp3);
              data.isPlayed = true;
            }
            const numerator = Math.round(currentSeconds - data.startTime);
            const percent =
              Math.round((numerator / data.denominator) * 1000) / 10;

            const updatedData = {
              ...data,
              numerator,
              percent: percent > 100 ? 100 : percent,
            };
            return updatedData;
          })
          .filter((data) => !data.isPlayed); // 过滤掉 percent 不满足条件的数据
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="🍅自定义番茄时间">
      <SoundPlayer ref={soundPlayerRef} audioSrc="default.mp3" playCount={1} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="默认番茄钟">
          {countdownType.map((countdownValue) => (
            <Button
              key={countdownValue}
              onClick={() => {
                Countdown(countdownValue);
              }}
            >
              {countdownValue}
            </Button>
          ))}
          <Text> 分钟</Text>
        </Descriptions.Item>
        <Descriptions.Item label="自定义时间">
          <Space direction="horizontal">
            <InputNumber
              placeholder="倒计时(分钟)"
              size="large"
              changeOnWheel
              value={countdownValue}
              defaultValue={20}
              onChange={(value) => setCountdownValue(value as number)}
            />
            <Button
              id="startButton"
              type="primary"
              onClick={() => Countdown(countdownValue)}
            >
              开始倒计时
            </Button>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="播放声音 ">
          <Select
            style={{ width: 300 }}
            defaultValue={soundSource}
            onChange={(value) => setSoundSource(value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={soundSource}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
          />
        </Descriptions.Item>
        <Descriptions.Item label="试播 ">
          <Button
            id="startButton"
            type="primary"
            onClick={() => {
              playSoundInSoundPlayer(soundSource);
            }}
          >
            试播铃声
          </Button>
          <Button onClick={stopSoundInSoundPlayer}>停止铃声</Button>
        </Descriptions.Item>
        <Descriptions.Item label="倒计时音量 ">
          <Slider
            defaultValue={30}
            tooltip={{}}
            min={0}
            max={1}
            step={0.01}
            onChange={setSoundInSoundPlayerVolume}
          />
        </Descriptions.Item>
        <Row id="clockSaver">
          {countdownData.map((data) => (
            <Space
              direction="vertical"
              align="center"
              style={{ border: "0.1px solid #69b1ff", padding: "1px" }}
            >
              <Progress
                key={data.startTime}
                strokeLinecap="butt"
                type="circle"
                size={60}
                percent={data.percent}
                strokeColor={twoColors}
              />
              <Text type="secondary">{data.denominator - data.numerator}s</Text>
              <Text underline>{data.denominator}s</Text>
            </Space>
          ))}
        </Row>
      </Descriptions>
    </Card>
  );
};

export default CountdownComponent;
