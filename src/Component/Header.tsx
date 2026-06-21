// src/Component/Header.tsx
import React from "react";
import { Layout, Button, Row, Col, Badge, Space } from "antd";
import { BellOutlined, AudioMutedOutlined, ClockCircleOutlined, HeartOutlined, OrderedListOutlined, MenuOutlined, LeftOutlined } from "@ant-design/icons";
import { TimeDisplayMode } from "../hooks/useTimeDisplayMode";
import { useWakeLock } from "../hooks/useWakeLock";
import { HeaderMode } from "../hooks/useHeaderMode";

const { Header } = Layout;

type Mode = "light" | "dark";

const HeaderComponent: React.FC<{
  themeMode: Mode;
  toggleTheme: () => void;
  timeDisplayMode: TimeDisplayMode;
  toggleTimeDisplayMode: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  headerMode: HeaderMode;
  toggleHeaderMode: () => void;
  isMobile: boolean;
}> = ({
  themeMode, toggleTheme, timeDisplayMode, toggleTimeDisplayMode, isMuted, toggleMute,
  headerMode, toggleHeaderMode, isMobile,
}) => {
  const [wakeLockEnabled, toggleWakeLock, wakeLockSupported] = useWakeLock();

  // 平滑滚动到指定区域（带回弹效果）
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 600;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        const c1 = 1.70158;
        const c3 = c1 + 1;
        const ease = 1 + c3 * Math.pow(percentage - 1, 3) + c1 * Math.pow(percentage - 1, 2);

        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  // 左侧按钮组（切换按钮 + logo + 快速定位）
  const leftButtonGroup = (
    <>
      {/* 快速定位按钮 - 移动端横向模式下隐藏 */}
      {headerMode === "vertical" ? (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-time")}
            style={{ fontSize: 18, color: "inherit", padding: "8px 0" }}
            title="时间"
          >
            <ClockCircleOutlined />
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-pomodoro")}
            style={{ fontSize: 18, color: "inherit", padding: "8px 0" }}
            title="番茄钟"
          >
            <HeartOutlined />
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-timeline")}
            style={{ fontSize: 18, color: "inherit", padding: "8px 0" }}
            title="时间线"
          >
            <OrderedListOutlined />
          </Button>
        </>
      ) : (
        <Space size={4} className="header-quick-nav">
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-time")}
            style={{ fontSize: 13, color: "inherit" }}
            className="header-button-text"
          >
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            <span className="header-button-text-label">时间</span>
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-pomodoro")}
            style={{ fontSize: 13, color: "inherit" }}
            className="header-button-text"
          >
            <HeartOutlined style={{ marginRight: 4 }} />
            <span className="header-button-text-label">番茄钟</span>
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => scrollToSection("section-timeline")}
            style={{ fontSize: 13, color: "inherit" }}
            className="header-button-text"
          >
            <OrderedListOutlined style={{ marginRight: 4 }} />
            <span className="header-button-text-label">时间线</span>
          </Button>
        </Space>
      )}
    </>
  );

  // 右侧功能按钮组（屏幕常亮、时间模式、日夜切换、静音）
  const rightButtonGroup = (
    <>
      {/* 屏幕常亮开关 */}
      {wakeLockSupported && (
        <Button
          type="text"
          size="small"
          onClick={toggleWakeLock}
          style={{ fontSize: 16, color: "inherit" }}
          title={wakeLockEnabled ? "屏幕常亮已开启 - 点击关闭" : "屏幕常亮已关闭 - 点击开启"}
        >
          {wakeLockEnabled ? "💡" : "🔌"}
        </Button>
      )}

      {/* 时间显示模式切换 */}
      <Button
        type="text"
        size="small"
        onClick={toggleTimeDisplayMode}
        style={{ fontSize: 16, color: "inherit" }}
        title={`当前时间显示模式: ${timeDisplayMode}`}
      >
        {timeDisplayMode === "normal" && "🔢"}
        {timeDisplayMode === "flip" && "🎫"}
        {timeDisplayMode === "led" && "📺"}
      </Button>

      {/* 日夜切换 */}
      <Button
        type="text"
        size="small"
        onClick={toggleTheme}
        style={{ fontSize: 16, color: "inherit" }}
      >
        {themeMode === "dark" ? "☀️" : "🌙"}
      </Button>

      {/* 静音开关 */}
      <Button
        type="text"
        size="small"
        onClick={toggleMute}
        style={{ fontSize: 16, color: "inherit" }}
        title={isMuted ? "点击取消静音" : "点击静音"}
      >
        {isMuted ? (
          <Badge status="error" offset={[-2, 2]}>
            <span style={{ fontSize: 16 }}>🔇</span>
          </Badge>
        ) : (
          "🔊"
        )}
      </Button>
    </>
  );

  // 隐藏模式：显示小的唤出按钮
  if (headerMode === "hidden") {
    return (
      <div className={`header-hidden-trigger ${themeMode === "dark" ? "header-dark" : ""}`} onClick={toggleHeaderMode}>
        <MenuOutlined style={{ fontSize: 18, color: "inherit" }} />
      </div>
    );
  }

  // 侧边栏模式（纵向）
  if (headerMode === "vertical") {
    return (
      <div className={`header-vertical ${themeMode === "dark" ? "header-dark" : ""}`}>
        {/* 上部分：切换按钮 + logo + 快速定位 */}
        <div className="header-vertical-top">
          <Button
            type="text"
            size="small"
            icon={<MenuOutlined />}
            onClick={toggleHeaderMode}
            style={{ fontSize: 16, color: "inherit", marginBottom: 8 }}
            title="切换 Header 显示模式"
          />
          <div style={{ fontSize: 20, marginBottom: 8 }}>
            <BellOutlined />
          </div>
          {leftButtonGroup}
        </div>

        {/* 下部分：右侧功能按钮 */}
        <div className="header-vertical-bottom">
          {rightButtonGroup}
        </div>
      </div>
    );
  }

  // 横向模式（默认）
  return (
    <Header className={`headerStyle ${themeMode === "dark" ? "header-dark" : ""}`}>
      <Row align="middle" style={{ width: "100%", height: "100%" }} wrap={false}>
        {/* 左侧：切换按钮 + logo */}
        <Col>
          <span className="header-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button
              type="text"
              size="small"
              icon={<MenuOutlined />}
              onClick={toggleHeaderMode}
              style={{ fontSize: 16, color: "inherit", padding: 0 }}
              title="切换 Header 显示模式"
            />
            <BellOutlined style={{ fontSize: 20 }} />
            校园广播模拟器
          </span>
        </Col>

        {/* 中间：快速定位 */}
        <Col flex="auto" style={{ display: "flex", alignItems: "center", paddingLeft: 16 }}>
          {leftButtonGroup}
        </Col>

        {/* 右侧：功能按钮 */}
        <Col style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rightButtonGroup}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
