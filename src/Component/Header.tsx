// src/Component/Header.tsx
import React from "react";
import { Layout, Button, Row, Col } from "antd";
import { GithubOutlined, ExportOutlined } from "@ant-design/icons";

const { Header } = Layout;

type Mode = "light" | "dark";

const HeaderComponent: React.FC<{ themeMode: Mode; toggleTheme: () => void }> = ({
  themeMode, toggleTheme,
}) => {
  return (
    <Header className={`headerStyle ${themeMode === "dark" ? "header-dark" : ""}`}>
      <Row align="middle" style={{ width: "100%", height: "100%" }}>
        <Col flex="auto">
          <span className="header-title">在校模拟器</span>
        </Col>

        <Col flex="none" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* 日夜切换 */}
          <Button
            type="text"
            size="small"
            icon={null}
            onClick={toggleTheme}
            style={{ fontSize: 16, color: "inherit" }}
          >
            {themeMode === "dark" ? "☀️" : "🌙"}
          </Button>

          {/* GitHub */}
          <a
            href="https://github.com/Keyboard-Society/school-broadcast-simulator"
            target="_blank"
            rel="noopener noreferrer"
            className="header-github-link"
          >
            <GithubOutlined />
            <span className="header-link-text">源码</span>
            <ExportOutlined />
          </a>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
