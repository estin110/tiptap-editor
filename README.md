# @het/tiptap-editor

Full-featured Vue 3 rich text editor component based on [Tiptap](https://tiptap.dev). Provides a ready-to-use toolbar, bubble menu, table picker, link/video/image modals, @mention, KaTeX math, i18n, dark mode, and more.

## Features

- **Toolbar** — bold, italic, underline, strikethrough, subscript, superscript, headings (H1–H3), font size, text color, highlight, alignment, indent/outdent, lists, blockquote, code block, link, image, video, table, formulas
- **Bubble menu** — floating formatting bar on text selection (bold, italic, underline, strikethrough, code, link)
- **Tables** — visual grid picker, add/delete rows & columns, header toggle
- **Modals** — link, image (URL + upload), video embed (YouTube/Bilibili/direct), math formula (LaTeX)
- **@Mention** — customizable user suggestions via `mentionUsers` prop
- **Task list** — checkable todo items
- **Dark / light themes** — CSS custom properties, single `dark` prop
- **i18n** — built-in English & Chinese, auto-detected from browser
- **Extensible** — pass custom Tiptap extensions, slot overrides for toolbar and footer
- **Word count** — optional character & word counter in footer

## Installation

```bash
npm install @het/tiptap-editor
# peer dependencies (required)
npm install vue @tiptap/core @tiptap/pm
```

Optional dependencies (`npm install katex mammoth`) enable:
- `katex` — inline & block math formula rendering
- `mammoth` — Word (.docx) import (if supported in your usage)

## Quick Start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TiptapEditor } from '@het/tiptap-editor'
import '@het/tiptap-editor/style.css'

const html = ref('<p>Hello <strong>world</strong></p>')
</script>

<template>
  <TiptapEditor v-model="html" />
</template>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `''` | HTML content (v-model) |
| `content` | `string` | `''` | Alternative initial content (non-reactive setter) |
| `placeholder` | `string` | `'Start writing…'` | Placeholder text when editor is empty |
| `editable` | `boolean` | `true` | Toggle read-only mode |
| `dark` | `boolean` | `true` | Dark theme (`true`) / light theme (`false`) |
| `showToolbar` | `boolean` | `true` | Show/hide the default toolbar |
| `showFooter` | `boolean` | `false` | Show footer with word/char count |
| `extensions` | `Extension[]` | `[]` | Additional Tiptap extensions to register |
| `mentionUsers` | `MentionUser[]` | `[]` | Users for @mention suggestions |
| `mentionSuggestion` | `MentionSuggestionRender` | — | Custom render functions for mention popup |
| `locale` | `'en' \| 'zh'` | auto | Override locale (defaults to browser detection) |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `html: string` | Emitted when content changes (v-model) |
| `update` | `(html, editor)` | Raw update event with HTML and editor instance |
| `ready` | `editor` | Emitted once the editor is fully initialized |
| `update:locale` | `localeCode` | Emitted when locale is detected / changed |

## Slots

| Slot | Props | Description |
|---|---|---|
| `toolbar` | `{ editor, state, commands }` | Replace the entire toolbar area |
| `footer` | `{ editor, html, charCount, wordCount }` | Replace or extend the footer area |

## Exports

### Components

```ts
import {
  TiptapEditor,   // main editor component
  DefaultToolbar, // standalone toolbar (used internally)
  BubbleMenu,     // floating formatting menu
  ToolbarButton,  // individual toolbar button
  Tooltip,        // tooltip wrapper
  ColorPicker,    // color picker (used internally)
  WordCount,      // character & word counter
} from '@het/tiptap-editor'
```

### Modals

```ts
import {
  LinkModal,
  ImageModal,
  VideoModal,
  MathModal,
  TableInsertModal,
} from '@het/tiptap-editor'
```

### Composables

```ts
import { useEditor, useToolbar, useMention } from '@het/tiptap-editor'
```

### Custom Extensions

```ts
import { FontSize, VideoEmbed, MathInline, MathBlock, Indent } from '@het/tiptap-editor'
```

### Types

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

## @Mention Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TiptapEditor } from '@het/tiptap-editor'

const users = ref([
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
])
</script>

<template>
  <TiptapEditor v-model="html" :mention-users="users" />
</template>
```

Use `createMentionPopup` to build a custom mention popup component:

```ts
import { createMentionPopup } from '@het/tiptap-editor'
const { render } = createMentionPopup({
  onStart: ({ items, command, query }) => { /* show popup */ },
  onUpdate: ({ items, command, query }) => { /* update popup */ },
  onKeyDown: ({ event }) => { /* handle keyboard */ },
  onExit: () => { /* hide popup */ },
})
// Pass render functions via mentionSuggestion prop
```

## Custom Toolbar

Override the default toolbar via the `toolbar` slot:

```vue
<TiptapEditor v-model="html">
  <template #toolbar="{ commands, state }">
    <button @click="commands.bold()" :class="{ active: state.bold }">B</button>
    <button @click="commands.italic()" :class="{ active: state.italic }">I</button>
  </template>
</TiptapEditor>
```

## Theming

The editor uses CSS custom properties prefixed with `--hte-`. Define these in your CSS to customize the appearance:

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

## Peer Dependencies

| Package | Version |
|---|---|
| vue | ^3.4.0 |
| @tiptap/core | ^2.10.0 |
| @tiptap/pm | ^2.10.0 |

## License

MIT
