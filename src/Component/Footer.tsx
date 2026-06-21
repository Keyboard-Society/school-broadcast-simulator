// src/Component/Footer.tsx
import React from "react";
import { Layout, Row, Col, Space, Typography } from "antd";
import { GithubOutlined, ExportOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent: React.FC = () => {
  return (
    <Footer className="footerStyle" style={{ padding: "12px 24px" }}>
      <Row justify="space-between" align="top" style={{ width: "100%" }}>
        {/* 左侧: Author */}
        <Col style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "4px" }}>
            <Text strong style={{ color: "#86868b" }}>
              Author
            </Text>
          </div>
          <a
            href="https://github.com/AngusWG"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0071E3" }}
          >
            AngusWG (GitHub){" "}
            <ExportOutlined style={{ fontSize: "0.8em", marginLeft: "2px" }} />
          </a>
          <div style={{ marginTop: "8px" }}>
            <a
              href="https://github.com/Keyboard-Society/school-broadcast-simulator"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0071E3" }}
            >
              <GithubOutlined style={{ marginRight: "4px" }} />
              源码{" "}
              <ExportOutlined style={{ fontSize: "0.8em", marginLeft: "2px" }} />
            </a>
          </div>
          {/* 功能说明 */}
          <div style={{ marginTop: "12px", fontSize: "0.85em", color: "#aeaeb2", maxWidth: "200px" }}>
            <Text style={{ fontSize: "0.85em", color: "#aeaeb2" }}>
              屏幕常亮：点击顶端🔌防止手机休眠
            </Text>
          </div>
        </Col>

        {/* 中间: Copyright */}
        <Col>
          <Text style={{ fontSize: "0.9em", color: "#86868b" }}>
            Copyright © 2025 School Simulator
            <br />
            MIT License
          </Text>
        </Col>

        {/* 右侧: Support Links */}
        <Col style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "4px" }}>
            <Text strong style={{ color: "#86868b" }}>
              Support by
            </Text>
          </div>
          <Space direction="vertical" align="end" size={4}>
            {/* Ant Design Link */}
            <a
              href="https://ant-design.antgroup.com/index-cn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0071E3" }}
            >
              Ant Design{" "}
              <ExportOutlined
                style={{ fontSize: "0.8em", marginLeft: "2px" }}
              />
            </a>
            {/* React Link */}
            <a
              href="https://zh-hans.react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0071E3" }}
            >
              react{" "}
              <ExportOutlined
                style={{ fontSize: "0.8em", marginLeft: "2px" }}
              />
            </a>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
