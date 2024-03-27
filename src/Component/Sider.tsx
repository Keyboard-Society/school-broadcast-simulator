// src/App.tsx

import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Layout,
  Space,
  Upload,
  UploadProps
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
    <Sider width="25%" className="siderStyle">
      <Flex vertical>
        <div>配置名称: {schedule.name}</div>
        <div>描述: {schedule.describe}</div>
        <div>end time: {schedule.end_time}</div>
        <div>
          <Space>
            <Button onClick={handleDownload}>下载</Button>
            <Button onClick={handleReset}>重置</Button>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Space>
        </div>
      </Flex>
      <Timeline node={node} nodes={nodes} />
    </Sider>
  );
};

export default SideComponent;
