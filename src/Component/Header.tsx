// src/Component/Header.tsx
import React from "react";
import { Layout, Button, Row, Col } from "antd";
import { ExportOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header className="headerStyle">
      <Row align="middle" style={{ width: "100%", height: "100%" }}>
        <Col flex="auto">
          <div
            style={{
              fontSize: "1.25em",
              fontWeight: 600,
              textAlign: "left",
              color: "#1d1d1f",
            }}
          >
            在校模拟器
          </div>
        </Col>

        <Col flex="none">
          <Button
            type="link"
            href="https://github.com/Keyboard-Society/school-broadcast-simulator"
            target="_blank"
            style={{
              color: "#0071E3",
              padding: 0,
              fontSize: "0.9em",
            }}
          >
            github源码
            <ExportOutlined style={{ marginLeft: "4px" }} />
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
