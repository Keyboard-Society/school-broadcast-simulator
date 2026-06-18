// src/Component/Header.tsx
import React from "react";
import { Layout, Button, Row, Col } from "antd";
import { GithubOutlined, ExportOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header className="headerStyle">
      <Row align="middle" style={{ width: "100%", height: "100%" }}>
        <Col flex="auto">
          <span
            style={{
              fontSize: "1.15em",
              fontWeight: 600,
              color: "#1d1d1f",
            }}
          >
            在校模拟器
          </span>
        </Col>

        <Col flex="none">
          <a
            href="https://github.com/Keyboard-Society/school-broadcast-simulator"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0071E3",
              fontSize: "0.9em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
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
