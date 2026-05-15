# @het/tiptap-editor

基于 [Tiptap](https://tiptap.dev) 的全功能 Vue 3 富文本编辑器组件。开箱即用地提供工具栏、气泡菜单、表格选择器、链接/视频/图片弹窗、@提及、KaTeX 公式、国际化、暗色模式等功能。

## 功能特性

- **工具栏** — 粗体、斜体、下划线、删除线、下标、上标、标题（H1–H3）、字号、字体颜色、高亮、对齐、缩进/减少缩进、列表、引用块、代码块、链接、图片、视频、表格、公式
- **气泡菜单** — 选中文本时弹出浮动格式工具栏（粗体、斜体、下划线、删除线、行内代码、链接）
- **表格** — 可视化网格选择器，添加/删除行列，表头切换
- **弹窗** — 链接、图片（URL + 上传）、视频嵌入（YouTube / Bilibili / 直链）、数学公式（LaTeX）
- **@提及** — 通过 `mentionUsers` 属性自定义用户建议列表
- **任务列表** — 可勾选的待办事项
- **暗色/亮色主题** — CSS 自定义属性，通过 `dark` 属性一键切换
- **国际化** — 内置英文和中文，自动检测浏览器语言
- **可扩展** — 支持传入自定义 Tiptap 扩展，通过插槽覆盖工具栏和页脚
- **字数统计** — 页脚可选的字符和单词计数

## 安装

```bash
npm install @het/tiptap-editor
# 必需的 peer 依赖（需要单独安装）
npm install vue @tiptap/core @tiptap/pm
```

可选依赖（`npm install katex mammoth`）用于：
- `katex` — 行内和块级数学公式渲染
- `mammoth` — Word (.docx) 文档导入（如你的使用场景需要）

## 快速开始

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TiptapEditor } from '@het/tiptap-editor'
import '@het/tiptap-editor/style.css'

const html = ref('<p>你好 <strong>世界</strong></p>')
</script>

<template>
  <TiptapEditor v-model="html" />
</template>
```

## Props 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `modelValue` | `string` | `''` | HTML 内容（v-model） |
| `content` | `string` | `''` | 替代性初始内容（非响应式设置） |
| `placeholder` | `string` | `'Start writing…'` | 编辑器为空时的占位文本 |
| `editable` | `boolean` | `true` | 切换只读模式 |
| `dark` | `boolean` | `true` | 暗色主题（`true`）/ 亮色主题（`false`） |
| `showToolbar` | `boolean` | `true` | 显示/隐藏默认工具栏 |
| `showFooter` | `boolean` | `false` | 显示页脚（含字数统计） |
| `extensions` | `Extension[]` | `[]` | 注册额外的 Tiptap 扩展 |
| `mentionUsers` | `MentionUser[]` | `[]` | @提及建议用户列表 |
| `mentionSuggestion` | `MentionSuggestionRender` | — | 自定义提及弹窗渲染函数 |
| `locale` | `'en' \| 'zh'` | 自动检测 | 覆盖语言设置（默认根据浏览器语言自动检测） |

## Events 事件

| 事件 | 参数 | 说明 |
|---|---|---|
| `update:modelValue` | `html: string` | 内容变化时触发（v-model） |
| `update` | `(html, editor)` | 原始更新事件，包含 HTML 和编辑器实例 |
| `ready` | `editor` | 编辑器初始化完成后触发 |
| `update:locale` | `localeCode` | 语言检测/切换时触发 |

## Slots 插槽

| 插槽 | 属性 | 说明 |
|---|---|---|
| `toolbar` | `{ editor, state, commands }` | 替换整个工具栏区域 |
| `footer` | `{ editor, html, charCount, wordCount }` | 替换或扩展页脚区域 |

## 导出内容

### 组件

```ts
import {
  TiptapEditor,   // 主编辑器组件
  DefaultToolbar, // 独立工具栏组件（内部使用）
  BubbleMenu,     // 浮动格式菜单
  ToolbarButton,  // 单个工具栏按钮
  Tooltip,        // 提示框包装器
  ColorPicker,    // 颜色选择器（内部使用）
  WordCount,      // 字数统计
} from '@het/tiptap-editor'
```

### 弹窗

```ts
import {
  LinkModal,
  ImageModal,
  VideoModal,
  MathModal,
  TableInsertModal,
} from '@het/tiptap-editor'
```

### 组合式函数

```ts
import { useEditor, useToolbar, useMention } from '@het/tiptap-editor'
```

### 自定义扩展

```ts
import { FontSize, VideoEmbed, MathInline, MathBlock, Indent } from '@het/tiptap-editor'
```

### 类型

```ts
import type {
  EditorOptions,
  ToolbarButtonConfig,
  ToolbarState,
  MentionUser,
  MentionSuggestionRender,
  // …
} from '@het/tiptap-editor'
```

## @提及 使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TiptapEditor } from '@het/tiptap-editor'

const users = ref([
  { id: '1', label: '张三' },
  { id: '2', label: '李四' },
])
</script>

<template>
  <TiptapEditor v-model="html" :mention-users="users" />
</template>
```

使用 `createMentionPopup` 构建自定义提及弹窗组件：

```ts
import { createMentionPopup } from '@het/tiptap-editor'
const { render } = createMentionPopup({
  onStart: ({ items, command, query }) => { /* 显示弹窗 */ },
  onUpdate: ({ items, command, query }) => { /* 更新弹窗 */ },
  onKeyDown: ({ event }) => { /* 处理键盘事件 */ },
  onExit: () => { /* 隐藏弹窗 */ },
})
// 通过 mentionSuggestion 属性传入渲染函数
```

## 自定义工具栏

通过 `toolbar` 插槽覆盖默认工具栏：

```vue
<TiptapEditor v-model="html">
  <template #toolbar="{ commands, state }">
    <button @click="commands.bold()" :class="{ active: state.bold }">粗体</button>
    <button @click="commands.italic()" :class="{ active: state.italic }">斜体</button>
  </template>
</TiptapEditor>
```

## 主题定制

编辑器使用以 `--hte-` 为前缀的 CSS 自定义属性。在你的 CSS 中定义这些变量即可自定义外观：

```css
:root {
  --hte-font: 'Inter', system-ui, sans-serif;
  --hte-accent: #3b82f6;
  --hte-border: #e4e4e7;
  --hte-bg: #ffffff;
  --hte-bg2: #f4f4f5;
  --hte-bg3: #e4e4e7;
  --hte-tx1: #18181b;
  --hte-tx2: #71717a;
  --hte-tx3: #a1a1aa;
  --hte-ring: rgba(59, 130, 246, 0.35);
}
```

## Peer 依赖

| 包名 | 版本 |
|---|---|
| vue | ^3.4.0 |
| @tiptap/core | ^2.10.0 |
| @tiptap/pm | ^2.10.0 |

## 开源协议

MIT
