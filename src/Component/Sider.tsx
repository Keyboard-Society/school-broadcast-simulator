// src/Sider.tsx

import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Divider,
  Layout,
  Upload,
  UploadProps,
  Space,
} from "antd";
import { saveAs } from "file-saver";
import React from "react";
import { NodeProps } from "../Node";
import {
  ScheduleProps,
  getSchedule,
  isScheduleProps,
  resetSchedule,
  setSchedule,
} from "../ScheduleManagement";
import Timeline from "./Timeline";

const { Sider } = Layout;

interface SideProps {
  node: NodeProps;
  nodes: NodeProps[];
}

const fixedLabelStyle = {
  width: "100px",
  minWidth: "100px",
  textAlign: "left" as const,
  paddingRight: "8px",
};

const fixedContentStyle = {
  width: "calc(100% - 100px)",
  textAlign: "left" as const,
};

const SideComponent: React.FC<SideProps> = ({ node, nodes }) => {
  const schedule: ScheduleProps = getSchedule();

  const handleDownload = () => {
    const scheduleeJSON = JSON.stringify(schedule, null, 4);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filename = `${schedule.name}_${timestamp}.json`;
    const blob = new Blob([scheduleeJSON], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, filename);
  };

  const handleReset = () => {
    const confirmed = window.confirm("确定要重置吗？");
    if (confirmed) {
      resetSchedule();
      window.location.reload();
    }
  };

  const handleUpdate = (file: File | undefined) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        console.log("文件内容:", fileContent);
        console.log("文件名:", file?.name);
        console.log("文件类型:", file?.type);
        // 其他文件信息...
        const parsedData = JSON.parse(fileContent);
        if (isScheduleProps(parsedData)) {
          console.log("parsedData", parsedData);
          setSchedule(parsedData);
          window.confirm("上传成功");
          window.location.reload();
        } else {
          window.alert("上传的文件数据不符合 ScheduleProps 类型。");
        }

        // 在这里进行文件处理逻辑
      } catch (error) {
        console.error("文件解析错误:", error);
        window.alert("上传的文件解析错误。");
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    customRequest({ file }) {
      handleUpdate(file as File);
    },
  };

  return (
    // 1. 改变 Sider 宽度为固定像素值，例如 300px
    <Sider width={300} className="siderStyle">
      <Descriptions title="配置表" bordered column={1} layout="horizontal">
        <Descriptions.Item
          label="配置名称:"
          labelStyle={fixedLabelStyle}
          contentStyle={fixedContentStyle}
        >
          {schedule.name}
        </Descriptions.Item>
        <Descriptions.Item
          label="描述:"
          labelStyle={fixedLabelStyle}
          contentStyle={fixedContentStyle}
        >
          {schedule.describe}
        </Descriptions.Item>
        <Descriptions.Item
          label="end time:"
          labelStyle={fixedLabelStyle}
          contentStyle={fixedContentStyle}
        >
          {schedule.end_time}
        </Descriptions.Item>

        <Descriptions.Item label="更新" labelStyle={fixedLabelStyle}>
          <Space direction="vertical" style={{ width: "100%" }} align="start">
            <Button
              onClick={handleDownload}
              type="primary"
              style={{ width: "100%" }}
            >
              下载配置
            </Button>
            <Button onClick={handleReset} danger style={{ width: "100%" }}>
              重置配置
            </Button>
            <Upload {...props} showUploadList={false}>
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                上传配置
              </Button>
            </Upload>
          </Space>
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left"></Divider>
      <Timeline node={node} nodes={nodes} />
    </Sider>
  );
};

export default SideComponent;
