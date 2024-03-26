import React, { useState, useEffect } from "react";
import { Flex, Layout, Button, Row, Col } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const HeaderComponent: React.FC = ({}) => {
  return (
    <Header className="headerStyle">
      {/* <Flex justify="space-between" align="center"> */}
      <Row>
        <Col span={18}>
          <div>在校模拟器</div>
        </Col>
        <Col span={2}>
          <a
            style={{ color: "inherit" }}
            href="https://github.com/Keyboard-Society/school-broadcast-simulator"
          >
            github
          </a>
        </Col>
        <Col span={2}>
          <a
            style={{ color: "inherit" }}
            href="https://ant-design.antgroup.com/"
          >
            antd
          </a>
        </Col>
      </Row>
      {/* </Flex> */}
    </Header>
  );
};

export default HeaderComponent;
