// src/AppRoot.tsx — 主题切换 + ConfigProvider 包裹
import React from "react";
import { ConfigProvider, theme as antTheme } from "antd";
import App from "./App";
import { lightTheme, darkTheme } from "./theme";
import { useDarkMode } from "./useDarkMode";

const AppRoot: React.FC = () => {
  const [mode, toggle] = useDarkMode();
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ConfigProvider theme={{ ...theme, algorithm: mode === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm }}>
      <div className={mode === "dark" ? "dark" : ""}>
        <App themeMode={mode} toggleTheme={toggle} />
      </div>
    </ConfigProvider>
  );
};

export default AppRoot;
