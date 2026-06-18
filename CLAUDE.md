# CLAUDE.md — 在校模拟器 (School Broadcast Simulator)

## 项目概述

基于 React + Ant Design 的 Web 校园作息铃声模拟器。在浏览器中运行，按预设时间表播放 MP3 铃声。

- **访问地址**：https://keyboard-society.github.io/school-broadcast-simulator/
- **技术栈**：React 18 + TypeScript 4 + Ant Design 5 + CRA (react-scripts 5)
- **包管理**：pnpm

## 标准文件指引

在开始任何开发工作前，先阅读以下文档：

| 文档 | 路径 | 内容 |
|---|---|---|
| **设计规范** | [docs/design-spec.md](docs/design-spec.md) | 色彩、字体、间距、圆角、阴影、毛玻璃参数 |
| **技术标准** | [docs/technical-standards.md](docs/technical-standards.md) | 技术栈、编码规范、不可触碰的约束 |
| **执行步骤** | [docs/implementation-plan.md](docs/implementation-plan.md) | 分 Phase CheckList，每步验收标准 |
| **项目需求** | [docs/project-requirements.md](docs/project-requirements.md) | 功能概述、改造目标、非目标 |

## 开发日志

每日工作结束后，更新当天的开发日志：

```
dev-logs/YYYY-MM-DD.md
```

内容格式：完成事项（勾选）+ 待办事项 + 下一步。

## 工作约定

1. **每次只做一个 Phase**，完成后验收，再进入下一个
2. **验收方式**：`pnpm start` 启动，肉眼检查 UI
3. **出了问题**：`git diff` 定位，逐文件回退
4. **不改业务逻辑** — 本次是纯视觉改造
5. **保留 antd** — 通过 ConfigProvider 定制主题，不替换 UI 库
6. **CSS 修改先加后删** — 新样式生效后再清理旧代码

## 关键源码索引

```
src/
├── index.tsx           ← 入口，挂载 ConfigProvider
├── index.css           ← 全局样式（body 背景等）
├── App.tsx             ← 顶层布局，不改逻辑
├── App.css             ← 布局样式（Header/Sider/Content/Footer）
├── theme.ts            ← 【新建】主题 Token
├── Component/
│   ├── Header.tsx      ← 顶部栏
│   ├── Footer.tsx      ← 底部栏
│   ├── Sider.tsx       ← 左侧配置面板
│   ├── MainContent.tsx ← 中央内容区
│   ├── Card.tsx        ← 下一个事件卡片
│   ├── Countdown.tsx   ← 番茄钟
│   └── Timeline.tsx    ← 时间线
└── public/
    └── index.html      ← HTML meta
```

## 常用命令

```bash
pnpm start      # 启动开发服务器
pnpm build      # 生产构建
pnpm test       # 运行测试
```
