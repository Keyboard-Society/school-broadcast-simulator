# 执行步骤 · Implementation Plan

> 对应项目：在校模拟器 Apple 风格改造
> 总 Phase：13 个（5 原有 + 8 新增）
> 每个 Phase 结束后必须验收（`pnpm start` 肉眼检查）

---

## Phase 1: 基础设施搭建 ✅

- [x] 创建 `docs/` — 设计规范、技术标准、需求文档
- [x] 创建 `dev-logs/` — 每日开发日志
- [x] 创建 `src/theme.ts` — 主题 Token 配置
- [x] 修改 `src/index.tsx` — 包裹 ConfigProvider
- [x] 创建/更新 `CLAUDE.md` — AI 工作指引

---

## Phase 2: 清理 + 主题上线 ✅

### 2.1 清理 App.css
- [x] 删除 CRA 遗留死代码（`.App`, `.App-logo`, `.App-header`, `.App-link`, `@keyframes App-logo-spin`）
- [x] 合并 `.headerStyle` / `.siderStyle` / `.contentStyle` / `.footerStyle` / `.layoutStyle` 的重复定义
- [x] 保留当前生效的样式值不变（先不动颜色）

### 2.2 创建 `src/theme.ts`
- [x] 从 `docs/design-spec.md` 提取 Token，编写 antd `theme` 对象
- [x] 文件放置于 `src/theme.ts`

### 2.3 挂载 ConfigProvider
- [x] `src/index.tsx` 导入 `ConfigProvider` 和 `theme`
- [x] 包裹 `<App />`
- [x] `src/index.css` body 背景改为 `#f5f5f7`

---

## Phase 3: Header & Footer 改造 ✅

### 3.1 Header | `src/Component/Header.tsx` + `src/App.css`
- [x] 背景：`rgba(255,255,255,0.72)` + `backdrop-filter: blur(20px)`
- [x] 文字色：`#1d1d1f`
- [x] 高度：52px
- [x] 底部：`border-bottom: 1px solid #e5e5ea`
- [x] GitHub 链接色：品牌蓝，改用 `<a>` 标签替代 Button

### 3.2 Footer | `src/Component/Footer.tsx` + `src/App.css`
- [x] 背景：`#f5f5f7`
- [x] 文字色：`#86868b`
- [x] 顶部：`border-top: 1px solid #e5e5ea`
- [x] 链接色：品牌蓝 `#0071E3`

---

## Phase 4: 内容区改造 ✅

### 4.1 Sider 微调 | `src/Component/Sider.tsx`
- [x] 背景 `#ffffff`，加右侧 `border-right`
- [x] 按钮间距统一

### 4.2 MainContent | `src/Component/MainContent.tsx`
- [x] h1 标题：`fontSize: 28px`, `fontWeight: 600`, `letterSpacing: -0.5px`
- [x] "开始"按钮：去掉 `danger`，改为 `type="primary" size="large"`
- [x] 当前时间：字号加大

---

## Phase 5: 子组件收尾 + Meta 更新 ✅

### 5.1 Countdown 进度圈 | `src/Component/Countdown.tsx`
- [x] 进度圈渐变色：`"0%": "#0071E3"`, `"100%": "#34C759"`

### 5.2 Timeline 微调 | `src/Component/Timeline.tsx`
- [x] past 颜色：`#aeaeb2`，文字：`#1d1d1f` / `#86868b`

### 5.3 Card 微调
- [x] 跟随主题自动生效

### 5.4 HTML meta 更新 | `public/index.html`
- [x] `<title>` → "在校模拟器"
- [x] `<meta name="description">` → 项目描述
- [x] `<meta name="theme-color">` → `#f5f5f7`

---

## Phase 6: 布局重设计 — Dashboard ✅

- [x] **新建** `src/Component/Dashboard.tsx` — 卡片网格布局容器
- [x] 卡片拆分：时间+倒计时(合并)、下一个事件、番茄钟(左右分栏)、时间线、配置管理
- [x] **新建** `src/Component/ConfigBar.tsx` — 配置管理栏（从 Sider 提取）

---

## Phase 7: 改造 App.tsx ✅

- [x] 删除 `<Sider>` 的渲染（Sider 组件不再使用）
- [x] 删除 `<MainContent>` 的渲染（MainContent 组件不再使用）
- [x] 用 `<Dashboard>` 替代原来的布局
- [x] 布局从 antd Layout 改为 `div.appRoot > Header + Dashboard + Footer`
- [x] 修复 `end_time` 引用（用 `getSchedule().end_time`）

---

## Phase 8: 更新 App.css ✅

- [x] 新增 `.appRoot` 容器样式
- [x] 新增 `.dashboard-container` 样式（max-width + 居中 + padding）
- [x] 删除不再需要的 `.siderStyle`、`.contentStyle`、`.layoutStyle`
- [x] 新增 `@media (max-width: 768px)` 响应式断点
  - [x] Header 高度 48px、padding 16px
  - [x] 时间字号缩小（48→36, 36→28）
  - [x] GitHub 链接文字隐藏仅留图标

---

## Phase 9: Header 移动端适配 ✅

- [x] 移动端：高度 48px、padding 16px
- [x] GitHub 链接：桌面 `图标+"源码"` / 移动端 仅图标

---

## Phase 10: Countdown.tsx 重构 — 拆成复合组件 ✅

- [x] 导出 `usePomodoro` hook（共享状态）
- [x] 导出 `PomodoroControls`（控件面板）
- [x] 导出 `PomodoroRings`（进度圈面板）
- [x] Select 宽度 `100%` 适配卡片宽度
- [x] 预设时长按钮改圆角 `10px`

---

## Phase 11: Dashboard 时间卡片合并 + 番茄钟分栏 ✅

- [x] 当前时间 + 下班倒计时 合并为一张卡片
- [x] 番茄钟左侧 `PomodoroControls` + 右侧 `PomodoroRings`
- [x] 中间用 `<div>` 分割线分隔

---

## Phase 12: 更新文档 ✅

- [x] `CLAUDE.md` 更新源码索引（新组件、废弃标注）
- [x] `docs/implementation-plan.md` 更新 Phase 6-13
- [x] `dev-logs/2026-06-19.md` 更新至最新状态

---

## Phase 13: 验收

- [ ] 桌面：`pnpm start` 检查网格布局
- [ ] 平板：768-1023px 检查 2 列不溢出
- [ ] 手机：<768px 检查单列堆叠
- [ ] 功能：开始模拟、试播、番茄钟、配置管理
- [ ] 时间线折叠

## 验证方式

每个 Phase 结束时：
1. `pnpm start` 启动
2. 肉眼检查改动的 UI 部分
3. 确认所有功能正常
4. 如果某一步出错，`git diff` 定位回退
