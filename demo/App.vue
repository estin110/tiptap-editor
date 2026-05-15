<template>
  <div :class="{ 'hte-light': !dark }" class="demo-root">
    <div class="demo-wrap">
      <header class="demo-header">
        <div class="demo-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--hte-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span>@het/tiptap-editor</span>
        </div>
        <div class="demo-actions">
          <span class="demo-badge">v0.1.0</span>
          <button class="demo-theme-btn" @click="dark = !dark">
            <svg v-if="dark" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            {{ dark ? 'Light' : 'Dark' }}
          </button>
        </div>
      </header>

      <div class="demo-features">
        <span class="demo-tag">Bold</span>
        <span class="demo-tag">Italic</span>
        <span class="demo-tag">Underline</span>
        <span class="demo-tag">Headings</span>
        <span class="demo-tag">Lists</span>
        <span class="demo-tag">Tables</span>
        <span class="demo-tag">Links</span>
        <span class="demo-tag">Images</span>
        <span class="demo-tag">Video</span>
        <span class="demo-tag">KaTeX</span>
        <span class="demo-tag">@Mention</span>
        <span class="demo-tag">Bubble Menu</span>
      </div>

      <TiptapEditor v-model="content" :dark="dark" :show-footer="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TiptapEditor } from '../src/index'

const dark = ref(true)
const content = ref(`<h1>Rich Text Editor</h1>
<p>A modern, full-featured rich text editor built with <strong>Tiptap</strong> and <strong>Vue 3</strong>.</p>
<h2>Features</h2>
<ul>
  <li><strong>Text formatting</strong>: bold, italic, underline, strikethrough, subscript, superscript, font-size, color, highlight</li>
  <li><strong>Layout</strong>: headings H1–H3, text alignment, indent / outdent</li>
  <li><strong>Lists</strong>: bullet list, ordered list, task list with checkboxes</li>
  <li><strong>Insert</strong>: hyperlinks, image upload, video embeds (YouTube / Bilibili), KaTeX math formulas, tables</li>
  <li><strong>Tables</strong>: visual grid picker, add / delete rows &amp; columns, header toggle</li>
  <li><strong>Bubble menu</strong>: select text to see the floating formatting toolbar</li>
  <li><strong>@ Mention</strong>: type <code>@</code> to trigger user selection</li>
  <li><strong>Themes</strong>: dark and light mode with CSS custom properties</li>
</ul>
<h3>Try it out</h3>
<blockquote><p>Select some text to see the <strong>bubble menu</strong>. Try keyboard shortcuts like <code>Ctrl+B</code> for bold.</p></blockquote>
<p>Inline formula: <span data-math-inline="" data-latex="E = mc^2"></span></p>
<p>Block formula:</p>
<div data-math-block="" data-latex="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"></div>
<h3>Task List</h3>
<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><p>SVG icon system</p></label></li><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><p>Bubble menu</p></label></li><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><p>Keyboard shortcut hints</p></label></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"><p>More features coming…</p></label></li></ul>`)
</script>

<style>
.demo-root {
  min-height: 100vh;
  background: var(--hte-bg, #09090b);
  padding: 20px 16px 40px;
  transition: background .2s;
}

.demo-wrap {
  max-width: 900px;
  margin: 0 auto;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.demo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--hte-font, system-ui, sans-serif);
  color: var(--hte-tx1, #fafafa);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -.02em;
}

.demo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.demo-badge {
  padding: 3px 10px;
  background: var(--hte-bg3, #27272a);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  color: var(--hte-tx3, #52525b);
  font-family: var(--hte-mono, monospace);
}

.demo-theme-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 8px;
  background: var(--hte-bg2, #18181b);
  color: var(--hte-tx2, #a1a1aa);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  transition: all .15s;
}

.demo-theme-btn:hover {
  background: var(--hte-bg3, #27272a);
  color: var(--hte-tx1, #fafafa);
}

.demo-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.demo-tag {
  padding: 3px 10px;
  background: var(--hte-bg2, #18181b);
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  color: var(--hte-tx2, #a1a1aa);
  font-family: var(--hte-font, system-ui, sans-serif);
}
</style>
