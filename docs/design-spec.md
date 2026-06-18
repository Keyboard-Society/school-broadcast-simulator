# 设计规范 · Design Spec

> 适用范围：在校模拟器 (School Broadcast Simulator)
> 风格参考：Apple 官网 — 简洁、留白、克制的色彩、柔和的层次感
> 最后更新：2026-06-19

---

## 1. 色彩系统

### 主色调

| Token | 值 | 用途 |
|---|---|---|
| `color-primary` | `#0071E3` | 品牌蓝：主按钮、链接、强调 |
| `color-primary-hover` | `#0077ED` | 品牌蓝 hover |
| `color-primary-active` | `#0068D4` | 品牌蓝 active/press |
| `color-danger` | `#FF3B30` | 危险操作（重置、删除） |

### 中性色

| Token | 值 | 用途 |
|---|---|---|
| `bg-page` | `#f5f5f7` | 页面底色（Apple 暖灰白） |
| `bg-container` | `#ffffff` | 卡片/容器白底 |
| `bg-header` | `rgba(255,255,255,0.8)` | Header 毛玻璃背景 |
| `text-primary` | `#1d1d1f` | 主文字（Apple 近黑色） |
| `text-secondary` | `#86868b` | 辅助文字（Apple 灰） |
| `text-tertiary` | `#aeaeb2` | 更淡的辅助文案 |
| `border-primary` | `#d2d2d7` | 主要分割线 |
| `border-secondary` | `#e5e5ea` | 次要分割线（Header 底边等） |

### 功能色

| Token | 值 | 用途 |
|---|---|---|
| `success` | `#34C759` | 成功/进行中 |
| `warning` | `#FF9500` | 警告 |
| `past` | `#aeaeb2` | Timeline 已过去的事件 |

---

## 2. 字体

### 字体栈

```
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
             "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
```

- 优先使用系统原生字体（macOS 上渲染 SF Pro，Windows 回退到 Segoe UI）
- 中文字体：macOS PingFang SC，Windows Microsoft YaHei

### 字号阶梯

| 层级 | 大小 | 用途 |
|---|---|---|
| Display | `38px` / weight 600 / letter-spacing -0.5px | 页面主标题 |
| Heading 1 | `28px` / weight 600 | 一级标题 |
| Heading 2 | `22px` / weight 600 | 二级标题 / 卡片标题 |
| Heading 3 | `20px` / weight 500 | 三级标题 |
| Body | `16px` / weight 400 | 正文/描述文字 |
| Body-Small | `14px` / weight 400 | 辅助文字/标签 |
| Caption | `12px` / weight 400 | 脚注/时间戳 |

### 行高

- 正文：`1.5`
- 标题：`1.3`
- 密集信息（时间线等）：`1.2`

---

## 3. 间距 (Spacing)

使用 4px 基准网格：

| 名称 | 值 | 用途 |
|---|---|---|
| `spacing-xs` | `4px` | 紧凑间距 |
| `spacing-sm` | `8px` | 元素内间距 |
| `spacing-md` | `16px` | 标准间距 |
| `spacing-lg` | `24px` | 区块间距 |
| `spacing-xl` | `32px` | 大区块间距 |
| `spacing-2xl` | `48px` | 页面级间距 |

---

## 4. 圆角 (Border Radius)

| 层级 | 值 | 用途 |
|---|---|---|
| `radius-sm` | `8px` | 小元素：标签、输入框 |
| `radius-md` | `12px` | 标准：按钮、卡片、Dropdown |
| `radius-lg` | `16px` | 大卡片、Modal |
| `radius-full` | `9999px` | 胶囊按钮、Pill |

---

## 5. 阴影 (Box Shadow)

柔和、大面积、不喧宾夺主：

| 层级 | 值 | 用途 |
|---|---|---|
| `shadow-sm` | `0 1px 4px rgba(0,0,0,0.04)` | 微浮起：输入框 |
| `shadow-md` | `0 2px 8px rgba(0,0,0,0.06)` | 标准：卡片 |
| `shadow-lg` | `0 4px 16px rgba(0,0,0,0.08)` | 浮层：Dropdown、Modal |

---

## 6. 毛玻璃 (Glass Morphism)

Header 使用：

```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
border-bottom: 1px solid rgba(0, 0, 0, 0.08);
```

---

## 7. 动效 (Transition)

- 标准过渡：`all 0.2s ease`
- 按钮 hover：`transform: scale(1.02)` + shadow raise
- 卡片 hover：shadow lift (sm → md)
- 页面加载不做过场动画（纯视觉改造，不加复杂动效）

---

## 8. 组件尺寸约束

| 组件 | 约束 |
|---|---|
| Header 高度 | 52px |
| Footer 高度 | auto（padding 控制，约 80-100px） |
| Sider 宽度 | 300px（维持现状） |
| Content 最大宽度 | 1200px |
| 按钮最小宽度 | 80px |
| 按钮高度(标准) | 40px |
| 按钮高度(大) | 48px |
