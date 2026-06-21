// src/theme.ts — Apple 风格主题（亮色 + 暗色）
import type { ThemeConfig } from "antd";

/* ── 共享 token ── */
const shared: ThemeConfig = {
  token: {
    colorPrimary: "#0071E3",
    colorInfo: "#0071E3",
    colorSuccess: "#34C759",
    colorWarning: "#FF9500",
    colorError: "#FF3B30",
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    borderRadiusXS: 6,
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 28,
    fontSizeHeading3: 22,
    lineHeight: 1.5,
    fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif`,
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    padding: 16,
    paddingLG: 24,
    paddingXS: 8,
    margin: 16,
    marginLG: 24,
  },
  components: {
    Button: { borderRadius: 12, borderRadiusLG: 14, controlHeight: 40, controlHeightLG: 48, fontWeight: 500 },
    Card: { borderRadius: 16, paddingLG: 24 },
    Descriptions: { borderRadiusLG: 12 },
    Input: { borderRadius: 10, controlHeight: 40 },
    Select: { borderRadius: 10, controlHeight: 40 },
    Slider: { controlHeight: 40 },
    Progress: { colorSuccess: "#34C759" },
    Tag: { borderRadiusSM: 8 },
  },
};

/* ── 亮色主题 ── */
export const lightTheme: ThemeConfig = {
  ...shared,
  token: {
    ...shared.token,
    colorTextBase: "#1d1d1f",
    colorTextSecondary: "#86868b",
    colorTextDescription: "#aeaeb2",
    colorBgBase: "#ffffff",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f5f7",
    colorBgElevated: "#ffffff",
    colorBorder: "#d2d2d7",
    colorBorderSecondary: "#e5e5ea",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    boxShadowSecondary: "0 4px 16px rgba(0,0,0,0.08)",
  },
};

/* ── 暗色主题 ── */
export const darkTheme: ThemeConfig = {
  ...shared,
  token: {
    ...shared.token,
    colorTextBase: "#f5f5f7",
    colorTextSecondary: "#98989d",
    colorTextDescription: "#86868b",
    colorBgBase: "#000000",
    colorBgContainer: "#1c1c1e",
    colorBgLayout: "#000000",
    colorBgElevated: "#2c2c2e",
    colorBorder: "#3a3a3c",
    colorBorderSecondary: "#2c2c2e",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    boxShadowSecondary: "0 4px 16px rgba(0,0,0,0.4)",
  },
};
