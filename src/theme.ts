import type { ThemeConfig } from "antd";

const appleTheme: ThemeConfig = {
  token: {
    // ── 主色 ──
    colorPrimary: "#0071E3",
    colorInfo: "#0071E3",
    colorSuccess: "#34C759",
    colorWarning: "#FF9500",
    colorError: "#FF3B30",

    // ── 中性色 ──
    colorTextBase: "#1d1d1f",
    colorTextSecondary: "#86868b",
    colorTextDescription: "#aeaeb2",
    colorBgBase: "#ffffff",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f5f7",
    colorBgElevated: "#ffffff",
    colorBorder: "#d2d2d7",
    colorBorderSecondary: "#e5e5ea",

    // ── 圆角 ──
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    borderRadiusXS: 6,

    // ── 字号 ──
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 28,
    fontSizeHeading3: 22,

    // ── 行高 ──
    lineHeight: 1.5,

    // ── 阴影 ──
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.06)",
    boxShadowSecondary:
      "0 4px 16px rgba(0,0,0,0.08)",

    // ── 字体 ──
    fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif`,

    // ── 尺寸 ──
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
    Button: {
      borderRadius: 12,
      borderRadiusLG: 14,
      controlHeight: 40,
      controlHeightLG: 48,
      fontWeight: 500,
    },
    Card: {
      borderRadius: 16,
      paddingLG: 24,
    },
    Descriptions: {
      borderRadiusLG: 12,
    },
    Input: {
      borderRadius: 10,
      controlHeight: 40,
    },
    Select: {
      borderRadius: 10,
      controlHeight: 40,
    },
    Slider: {
      controlHeight: 40,
    },
    Progress: {
      colorSuccess: "#34C759",
    },
    Tag: {
      borderRadiusSM: 8,
    },
  },
};

export default appleTheme;
