// src/Component/ConfigBar.tsx
import React from "react";
import { Button, Upload, UploadProps, Space } from "antd";
import { UploadOutlined, DownloadOutlined, UndoOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import {
  getSchedule,
  isScheduleProps,
  resetSchedule,
  setSchedule,
} from "../ScheduleManagement";

const ConfigBar: React.FC = () => {
  const schedule = getSchedule();

  const handleDownload = () => {
    const scheduleJSON = JSON.stringify(schedule, null, 4);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filename = `${schedule.name}_${timestamp}.json`;
    const blob = new Blob([scheduleJSON], {
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

  const handleUpload = (file: File | undefined) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        const parsedData = JSON.parse(fileContent);
        if (isScheduleProps(parsedData)) {
          setSchedule(parsedData);
          window.confirm("上传成功");
          window.location.reload();
        } else {
          window.alert("上传的文件数据不符合 ScheduleProps 类型。");
        }
      } catch (error) {
        console.error("文件解析错误:", error);
        window.alert("上传的文件解析错误。");
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    headers: { authorization: "authorization-text" },
    customRequest({ file }) {
      handleUpload(file as File);
    },
  };

  return (
    <Space wrap>
      <Button
        onClick={handleDownload}
        type="primary"
        ghost
        icon={<DownloadOutlined />}
        size="middle"
      >
        下载配置
      </Button>
      <Upload {...uploadProps} showUploadList={false}>
        <Button icon={<UploadOutlined />} size="middle">
          上传配置
        </Button>
      </Upload>
      <Button
        onClick={handleReset}
        danger
        icon={<UndoOutlined />}
        size="middle"
      >
        重置
      </Button>
    </Space>
  );
};

export default ConfigBar;
