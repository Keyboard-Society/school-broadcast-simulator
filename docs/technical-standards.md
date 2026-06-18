# 技术标准 · Technical Standards

> 适用范围：在校模拟器 (School Broadcast Simulator)
> 最后更新：2026-06-19

---

## 1. 技术栈

| 层 | 技术 | 版本 | 约束 |
|---|---|---|---|
| 框架 | React | ^18.2.0 | 函数组件 + Hooks |
| 类型 | TypeScript | ^4.9.5 | strict mode |
| UI 库 | Ant Design | ^5.13.1 | 必须保留，不可替换 |
| 图标 | @ant-design/icons | ^5.2.6 | — |
| 时间显示 | flipclock | ^1.0.1 | 用于翻牌钟样式 |
| 时间显示依赖 | jquery | ^4.0.0 | flipclock 依赖 |
| Markdown | react-markdown | ^9.0.1 | 仅用于事件描述 |
| 文件下载 | file-saver | ^2.0.5 | — |
| 构建 | react-scripts (CRA) | 5.0.1 | 不可 eject |
| 包管理 | pnpm | — | 不引入 npm/yarn |

## 2. 代码规范

### 2.1 文件命名

```
组件文件：PascalCase（Header.tsx, MainContent.tsx）
样式文件：camelCase 或与组件同名（App.css）
工具/类型文件：camelCase（theme.ts, constantStore.ts）
文档文件：kebab-case（design-spec.md）
```

### 2.2 样式优先级

1. **ConfigProvider theme token**（影响所有 antd 组件）
2. **CSS class**（`App.css` 中的类）
3. **Inline style**（组件 `style={}` prop）— 尽量少用，仅用于动态值
4. 禁止 `!important`

### 2.3 TypeScript

- 所有组件 Props 必须有 interface 定义
- 不出现 `any`（除非确实无法推断）
- Ref 类型使用 `React.RefObject<T>`

### 2.4 组件规范

- 函数组件 + React.FC
- 导出使用 `export default`
- 不在 render 中定义复杂对象（提到组件外部或用 useMemo）

## 3. 不可触碰的约束

| 规则 | 原因 |
|---|---|
| **不改业务逻辑** | 本次仅视觉改造，破坏功能 = 回退 |
| **不删/改组件接口** | Props 保持原样，只改内部渲染 |
| **不动 `SoundPlayer.tsx` 核心逻辑** | 音频播放很脆弱，只改外观不动逻辑 |
| **不 eject CRA** | 保持项目可维护性 |
| **不升级/降级依赖** | 避免引入不相关的兼容性问题 |
| **不动 `default_nodes.json`** | 业务数据文件 |

## 4. 安全操作原则

- 每个 Phase 结束后 **肉眼验收** UI（`pnpm start`）
- 每一步修改前 **先读目标文件**
- 如果 UI 异常，用 `git diff` 检查差异，逐文件回退定位
- CSS 修改时：先加新样式，确认无误后再删旧样式（不贪快一刀切）
- 组件 inline style 改造：先确定 antd token 覆盖后哪些还需要 inline，再动手

## 5. 浏览器兼容

- 目标：现代浏览器（Chrome / Edge / Safari / Firefox 最近 2 个主版本）
- `backdrop-filter` 在 Firefox 需确认支持（Firefox 103+ 已支持）
- `-webkit-backdrop-filter` 保留给旧版 Safari

## 6. 关键文件索引

| 文件 | 角色 |
|---|---|
| `src/theme.ts` | 主题 Token 定义（新建） |
| `src/index.tsx` | App 入口，挂载 ConfigProvider |
| `src/index.css` | 全局样式（body 等） |
| `src/App.css` | 布局样式（Header/Sider/Content/Footer） |
| `src/App.tsx` | 顶层布局组装 |
| `src/Component/Header.tsx` | 顶部栏 |
| `src/Component/Footer.tsx` | 底部栏 |
| `src/Component/Sider.tsx` | 左侧配置面板 |
| `src/Component/MainContent.tsx` | 中央内容区 |
| `src/Component/Card.tsx` | 下一个事件卡片 |
| `src/Component/Countdown.tsx` | 自定义番茄钟 |
| `src/Component/Timeline.tsx` | 时间线 |
| `src/SoundPlayer.tsx` | 音频播放（不改动） |
| `public/index.html` | HTML meta 信息 |
