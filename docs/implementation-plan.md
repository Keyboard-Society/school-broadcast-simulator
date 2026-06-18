# 执行步骤 · Implementation Plan

> 对应项目：在校模拟器 Apple 风格改造
> 总 Phase：5 个
> 每个 Phase 结束后必须验收（`pnpm start` 肉眼检查）

---

## Phase 1: 基础设施搭建 ✅

- [x] 创建 `docs/` — 设计规范、技术标准、需求文档
- [x] 创建 `dev-logs/` — 每日开发日志
- [x] 创建 `src/theme.ts` — 主题 Token 配置
- [x] 修改 `src/index.tsx` — 包裹 ConfigProvider
- [x] 创建/更新 `CLAUDE.md` — AI 工作指引

---

## Phase 2: 清理 + 主题上线

### 2.1 清理 App.css
- [ ] 删除 CRA 遗留死代码（`.App`, `.App-logo`, `.App-header`, `.App-link`, `@keyframes App-logo-spin`）
- [ ] 合并 `.headerStyle` / `.siderStyle` / `.contentStyle` / `.footerStyle` / `.layoutStyle` 的重复定义
- [ ] 保留当前生效的样式值不变（先不动颜色）
- **验收**：`pnpm start`，UI 与修改前完全一致

### 2.2 创建 `src/theme.ts`
- [ ] 从 `docs/design-spec.md` 提取 Token，编写 antd `theme` 对象
- [ ] 文件放置于 `src/theme.ts`
- **验收**：TypeScript 编译无报错

### 2.3 挂载 ConfigProvider
- [ ] `src/index.tsx` 导入 `ConfigProvider` 和 `theme`
- [ ] 包裹 `<App />`
- [ ] `src/index.css` body 背景改为 `#f5f5f7`
- **验收**：`pnpm start`
  - 页面底色变灰白暖色
  - antd 组件圆角变大（如按钮、Card）
  - 主色调变为 Apple Blue `#0071E3`

---

## Phase 3: Header & Footer 改造

### 3.1 Header | `src/Component/Header.tsx` + `src/App.css`
- [ ] 背景：`rgba(255,255,255,0.72)` + `backdrop-filter: blur(20px)`
- [ ] 文字色：`#1d1d1f`（从白色改）
- [ ] 高度：52px（从 64px 改）
- [ ] 底部：`border-bottom: 1px solid #e5e5ea`
- [ ] GitHub 链接色：品牌蓝（从白色改）
- [ ] `App.css` 中 `.headerStyle` 同步更新
- **验收**：Header 变成白色毛玻璃顶栏，文字清晰可读

### 3.2 Footer | `src/Component/Footer.tsx` + `src/App.css`
- [ ] 背景：`#f5f5f7`（从 `#001529` 改）
- [ ] 文字色：`#86868b`（从白色改）
- [ ] 顶部：`border-top: 1px solid #e5e5ea`
- [ ] 链接色：品牌蓝
- [ ] `App.css` 中 `.footerStyle` 同步更新
- **验收**：Footer 变成浅灰精致底栏

---

## Phase 4: 内容区改造

### 4.1 Sider 微调 | `src/Component/Sider.tsx`
- [ ] 背景保持浅色，添加右侧 `border-right: 1px solid #e5e5ea`
- [ ] 按钮间距统一
- [ ] `App.css` 中 `.siderStyle` 同步更新
- **验收**：侧边栏与主内容区有清晰分界

### 4.2 MainContent | `src/Component/MainContent.tsx`
- [ ] h1 标题：`fontSize: 28px`, `fontWeight: 600`, `letterSpacing: -0.5px`
- [ ] "开始"按钮：去掉 `danger`，改为 `type="primary"`，`size="large"`
- [ ] 当前时间：字号加大为 `20px`，`fontWeight: 500`
- [ ] 整体间距优化
- **验收**：主内容区标题醒目，按钮精致

---

## Phase 5: 子组件收尾 + Meta 更新

### 5.1 Countdown 进度圈 | `src/Component/Countdown.tsx`
- [ ] 进度圈渐变色：`"0%": "#0071E3"`, `"100%": "#34C759"`
- **验收**：番茄钟进度圈颜色改为蓝→绿渐变

### 5.2 Timeline 微调 | `src/Component/Timeline.tsx`
- [ ] past 颜色：`#aeaeb2`（更柔和的灰）
- [ ] 保持 green 为当前节点

### 5.3 Card 微调
- [ ] 检查 Card 是否自动跟主题（圆角、阴影）
- [ ] 如需覆盖则微调

### 5.4 HTML meta 更新 | `public/index.html`
- [ ] `<title>` → "在校模拟器"
- [ ] `<meta name="description">` → 项目描述
- [ ] `<meta name="theme-color">` → `#f5f5f7`
- **验收**：浏览器标签页标题正确

### 5.5 全量复查
- [ ] 从头到尾检查所有组件
- [ ] 确认所有交互可用
- [ ] 确认无白色文字 + 白色背景的阅读性问题
