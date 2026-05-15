<template>
  <div class="hte-toolbar">
    <div class="hte-toolbar__left">
      <!-- Undo / Redo / Clear -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.undo" :shortcut="loc.shortcuts.undo" :svg-icon="ICONS.UNDO" @click="$emit('command', 'undo')" />
        <ToolbarButton :title="loc.toolbar.redo" :shortcut="loc.shortcuts.redo" :svg-icon="ICONS.REDO" @click="$emit('command', 'redo')" />
        <ToolbarButton :title="loc.toolbar.clearFormat" :svg-icon="ICONS.REMOVE_FORMAT" @click="$emit('command', 'clearFormat')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Text marks -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.bold" :shortcut="loc.shortcuts.bold" :svg-icon="ICONS.BOLD" :active="state.bold" @click="$emit('command', 'toggleBold')" />
        <ToolbarButton :title="loc.toolbar.italic" :shortcut="loc.shortcuts.italic" :svg-icon="ICONS.ITALIC" :active="state.italic" @click="$emit('command', 'toggleItalic')" />
        <ToolbarButton :title="loc.toolbar.underline" :shortcut="loc.shortcuts.underline" :svg-icon="ICONS.UNDERLINE" :active="state.underline" @click="$emit('command', 'toggleUnderline')" />
        <ToolbarButton :title="loc.toolbar.strikethrough" :shortcut="loc.shortcuts.strikethrough" :svg-icon="ICONS.STRIKETHROUGH" :active="state.strike" @click="$emit('command', 'toggleStrike')" />
        <ToolbarButton :title="loc.toolbar.subscript" :svg-icon="ICONS.SUBSCRIPT" :active="state.subscript" @click="$emit('command', 'toggleSubscript')" />
        <ToolbarButton :title="loc.toolbar.superscript" :svg-icon="ICONS.SUPERSCRIPT" :active="state.superscript" @click="$emit('command', 'toggleSuperscript')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Headings -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.heading1" :shortcut="loc.shortcuts.heading1" :svg-icon="ICONS.HEADING_1" :active="state.h1" @click="$emit('command', 'toggleHeading', { level: 1 })" />
        <ToolbarButton :title="loc.toolbar.heading2" :shortcut="loc.shortcuts.heading2" :svg-icon="ICONS.HEADING_2" :active="state.h2" @click="$emit('command', 'toggleHeading', { level: 2 })" />
        <ToolbarButton :title="loc.toolbar.heading3" :shortcut="loc.shortcuts.heading3" :svg-icon="ICONS.HEADING_3" :active="state.h3" @click="$emit('command', 'toggleHeading', { level: 3 })" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Lists -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.bulletList" :shortcut="loc.shortcuts.bulletList" :svg-icon="ICONS.BULLET_LIST" :active="state.bulletList" @click="$emit('command', 'toggleBulletList')" />
        <ToolbarButton :title="loc.toolbar.orderedList" :shortcut="loc.shortcuts.orderedList" :svg-icon="ICONS.ORDERED_LIST" :active="state.orderedList" @click="$emit('command', 'toggleOrderedList')" />
        <ToolbarButton :title="loc.toolbar.taskList" :svg-icon="ICONS.TASK_LIST" :active="state.taskList" @click="$emit('command', 'toggleTaskList')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Alignment -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.alignLeft" :svg-icon="ICONS.ALIGN_LEFT" :active="state.alignLeft" @click="$emit('command', 'setTextAlign', 'left')" />
        <ToolbarButton :title="loc.toolbar.alignCenter" :svg-icon="ICONS.ALIGN_CENTER" :active="state.alignCenter" @click="$emit('command', 'setTextAlign', 'center')" />
        <ToolbarButton :title="loc.toolbar.alignRight" :svg-icon="ICONS.ALIGN_RIGHT" :active="state.alignRight" @click="$emit('command', 'setTextAlign', 'right')" />
        <ToolbarButton :title="loc.toolbar.alignJustify" :svg-icon="ICONS.ALIGN_JUSTIFY" :active="state.alignJustify" @click="$emit('command', 'setTextAlign', 'justify')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Indent -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.indent" :svg-icon="ICONS.INDENT" @click="$emit('command', 'indent')" />
        <ToolbarButton :title="loc.toolbar.outdent" :svg-icon="ICONS.OUTDENT" @click="$emit('command', 'outdent')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Block -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.blockquote" :shortcut="loc.shortcuts.blockquote" :svg-icon="ICONS.BLOCKQUOTE" :active="state.blockquote" @click="$emit('command', 'toggleBlockquote')" />
        <ToolbarButton :title="loc.toolbar.codeBlock" :shortcut="loc.shortcuts.codeBlock" :svg-icon="ICONS.CODE" :active="state.codeBlock" @click="$emit('command', 'toggleCodeBlock')" />
      </div>

      <div class="hte-tb-sep" />

      <!-- Font size -->
      <div class="hte-tb-group">
        <select
          class="hte-tb-select"
          :value="state.fontSize"
          :title="loc.toolbar.fontSize"
          @change="$emit('command', 'setFontSize', ($event.target as HTMLSelectElement).value + 'px')"
        >
          <option v-for="s in fontSizes" :key="s" :value="s">{{ s }}px</option>
        </select>
      </div>

      <div class="hte-tb-sep" />

      <!-- Colors -->
      <div class="hte-tb-group">
        <ColorPicker
          :model-value="state.color || defaultColor"
          :colors="textColors"
          :title="loc.toolbar.textColor"
          :open="colorOpen"
          @toggle="colorOpen = !colorOpen"
          @select="(c: string) => { emit('command', 'setColor', c); colorOpen = false }"
        />
      </div>
      <div class="hte-tb-group">
        <ColorPicker
          :model-value="state.highlight || 'none'"
          :colors="highlightColors"
          :title="loc.toolbar.highlight"
          :open="hlOpen"
          @toggle="hlOpen = !hlOpen"
          @select="(c: string) => { emit('command', c === 'none' ? 'unsetHighlight' : 'toggleHighlight', { color: c }); hlOpen = false }"
        />
      </div>

      <div class="hte-tb-sep" />

      <!-- Insert -->
      <div class="hte-tb-group">
        <ToolbarButton :title="loc.toolbar.link" :shortcut="loc.shortcuts.link" :svg-icon="ICONS.LINK" :active="state.link" @click="openLink" />
        <ToolbarButton :title="loc.toolbar.image" :svg-icon="ICONS.IMAGE" @click="imgVisible = true" />
        <ToolbarButton :title="loc.toolbar.video" :svg-icon="ICONS.VIDEO" @click="videoVisible = true" />
        <ToolbarButton :title="loc.toolbar.formula" :svg-icon="ICONS.MATH" :active="state.mathInline || state.mathBlock" @click="mathVisible = true" />

        <div
          class="hte-tb-table-wrap"
          @mouseenter="tableEnter"
          @mouseleave="tableLeave"
        >
          <ToolbarButton :title="loc.toolbar.table" :svg-icon="ICONS.TABLE" :active="state.table" />
          <Teleport to="body">
            <div
              v-if="tableHover"
              class="hte-tb-table-dd"
              :style="tableDDStyle"
              @mouseenter="tableEnter"
              @mouseleave="tableLeave"
            >
              <div class="hte-tg__grid">
                <div v-for="r in 8" :key="r" class="hte-tg__row">
                  <div
                    v-for="c in 10"
                    :key="c"
                    class="hte-tg__cell"
                    :class="{ 'is-hovered': r <= tableRow && c <= tableCol }"
                    @mouseenter="tableRow = r; tableCol = c"
                    @click="insertTable(r, c)"
                  />
                </div>
              </div>
              <div class="hte-tg__label">
                <span v-if="tableRow > 0">{{ tableRow }} &times; {{ tableCol }}</span>
                <span v-else>{{ loc.modals.table.hoverHint }}</span>
              </div>
            </div>
          </Teleport>
        </div>
      </div>

      <!-- Table controls -->
      <template v-if="state.table">
        <div class="hte-tb-sep" />
        <div class="hte-tb-group">
          <ToolbarButton :title="loc.toolbar.addColBefore" :svg-icon="ICONS.COL_ADD_BEFORE" @click="$emit('command', 'addColumnBefore')" />
          <ToolbarButton :title="loc.toolbar.addColAfter" :svg-icon="ICONS.COL_ADD_AFTER" @click="$emit('command', 'addColumnAfter')" />
          <ToolbarButton :title="loc.toolbar.deleteCol" :svg-icon="ICONS.COL_DELETE" @click="$emit('command', 'deleteColumn')" />
          <ToolbarButton :title="loc.toolbar.addRowBefore" :svg-icon="ICONS.ROW_ADD_BEFORE" @click="$emit('command', 'addRowBefore')" />
          <ToolbarButton :title="loc.toolbar.addRowAfter" :svg-icon="ICONS.ROW_ADD_AFTER" @click="$emit('command', 'addRowAfter')" />
          <ToolbarButton :title="loc.toolbar.deleteRow" :svg-icon="ICONS.ROW_DELETE" @click="$emit('command', 'deleteRow')" />
          <ToolbarButton :title="loc.toolbar.deleteTable" :svg-icon="ICONS.TRASH" @click="$emit('command', 'deleteTable')" />
        </div>
      </template>
    </div>

    <!-- Language toggle (right side) -->
    <div class="hte-tb-sep" />
    <button class="hte-tb-lang" title="Switch language" @click="toggleLang">{{ localeCode === 'zh' ? 'EN' : '中' }}</button>

    <!-- Modals -->
    <LinkModal
      :visible="linkVisible"
      :link-url="linkUrl || ''"
      :locale="loc"
      @apply="applyLink"
      @remove="removeLink"
      @close="linkVisible = false"
    />
    <ImageModal :visible="imgVisible" :locale="loc" @insert="insertImage" @close="imgVisible = false" />
    <VideoModal :visible="videoVisible" :locale="loc" @insert="insertVideo" @close="videoVisible = false" />
    <MathModal :visible="mathVisible" :locale="loc" @insert="insertMath" @close="mathVisible = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolbarButton from './ToolbarButton.vue'
import ColorPicker from './ColorPicker.vue'
import LinkModal from './modals/LinkModal.vue'
import ImageModal from './modals/ImageModal.vue'
import VideoModal from './modals/VideoModal.vue'
import MathModal from './modals/MathModal.vue'
import { useLocale } from '../i18n'
import type { ToolbarState } from '../types'
import {
  ICON_BOLD, ICON_ITALIC, ICON_UNDERLINE, ICON_STRIKETHROUGH,
  ICON_SUBSCRIPT, ICON_SUPERSCRIPT,
  ICON_HEADING_1, ICON_HEADING_2, ICON_HEADING_3,
  ICON_ALIGN_LEFT, ICON_ALIGN_CENTER, ICON_ALIGN_RIGHT, ICON_ALIGN_JUSTIFY,
  ICON_BULLET_LIST, ICON_ORDERED_LIST, ICON_TASK_LIST,
  ICON_INDENT, ICON_OUTDENT,
  ICON_BLOCKQUOTE, ICON_CODE,
  ICON_LINK, ICON_IMAGE, ICON_VIDEO, ICON_MATH, ICON_TABLE,
  ICON_UNDO, ICON_REDO, ICON_REMOVE_FORMAT,
  ICON_PLUS, ICON_MINUS, ICON_TRASH,
  ICON_ROW_ADD_BEFORE, ICON_ROW_ADD_AFTER, ICON_COL_ADD_BEFORE, ICON_COL_ADD_AFTER,
  ICON_ROW_DELETE, ICON_COL_DELETE
} from '../utils/icons'

const { locale: loc, localeCode, setLocale } = useLocale()

function toggleLang() {
  const next = localeCode.value === 'zh' ? 'en' : 'zh'
  setLocale(next)
}

const ICONS = {
  BOLD: ICON_BOLD, ITALIC: ICON_ITALIC, UNDERLINE: ICON_UNDERLINE,
  STRIKETHROUGH: ICON_STRIKETHROUGH, SUBSCRIPT: ICON_SUBSCRIPT, SUPERSCRIPT: ICON_SUPERSCRIPT,
  HEADING_1: ICON_HEADING_1, HEADING_2: ICON_HEADING_2, HEADING_3: ICON_HEADING_3,
  ALIGN_LEFT: ICON_ALIGN_LEFT, ALIGN_CENTER: ICON_ALIGN_CENTER,
  ALIGN_RIGHT: ICON_ALIGN_RIGHT, ALIGN_JUSTIFY: ICON_ALIGN_JUSTIFY,
  BULLET_LIST: ICON_BULLET_LIST, ORDERED_LIST: ICON_ORDERED_LIST, TASK_LIST: ICON_TASK_LIST,
  INDENT: ICON_INDENT, OUTDENT: ICON_OUTDENT,
  BLOCKQUOTE: ICON_BLOCKQUOTE, CODE: ICON_CODE,
  LINK: ICON_LINK, IMAGE: ICON_IMAGE, VIDEO: ICON_VIDEO, MATH: ICON_MATH, TABLE: ICON_TABLE,
  UNDO: ICON_UNDO, REDO: ICON_REDO, REMOVE_FORMAT: ICON_REMOVE_FORMAT,
  PLUS: ICON_PLUS, MINUS: ICON_MINUS, TRASH: ICON_TRASH,
  ROW_ADD_BEFORE: ICON_ROW_ADD_BEFORE, ROW_ADD_AFTER: ICON_ROW_ADD_AFTER,
  COL_ADD_BEFORE: ICON_COL_ADD_BEFORE, COL_ADD_AFTER: ICON_COL_ADD_AFTER,
  ROW_DELETE: ICON_ROW_DELETE, COL_DELETE: ICON_COL_DELETE
}

defineProps<{
  state: ToolbarState
  linkUrl?: string | null
}>()

const emit = defineEmits<{
  command: [name: string, params?: any]
}>()

const fontSizes = ['10', '12', '14', '15', '16', '18', '20', '24', '28', '32', '36', '48']

const textColors = [
  '#fafafa', '#ffffff', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#78716c',
  '#71717a', '#09090b'
]

const highlightColors = [
  '#3b82f6', '#fde68a', '#bbf7d0', '#bfdbfe', '#fbcfe8',
  '#fecaca', '#ddd6fe', '#fed7aa', '#e4e4e7', 'none'
]

const defaultColor = '#fafafa'
const colorOpen = ref(false)
const hlOpen = ref(false)

const linkVisible = ref(false)
const imgVisible = ref(false)
const videoVisible = ref(false)
const mathVisible = ref(false)

const tableHover = ref(false)
const tableRow = ref(0)
const tableCol = ref(0)
let tableHideTimer: ReturnType<typeof setTimeout> | null = null

function tableEnter() {
  if (tableHideTimer) { clearTimeout(tableHideTimer); tableHideTimer = null }
  tableHover.value = true
}

function tableLeave() {
  tableHideTimer = setTimeout(() => { tableHover.value = false }, 180)
}

const tableDDStyle = computed(() => {
  const btn = document.querySelector('.hte-tb-table-wrap')
  if (!btn) return {}
  const r = btn.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${r.bottom + 4}px`,
    left: `${r.left}px`,
    zIndex: '1001'
  } as Record<string, string>
})

function openLink() { linkVisible.value = true }

function applyLink(url: string) {
  emit('command', url ? 'setLink' : 'unsetLink', url ? { href: url } : undefined)
  linkVisible.value = false
}

function removeLink() {
  emit('command', 'unsetLink')
  linkVisible.value = false
}

function insertImage(src: string) {
  emit('command', 'setImage', { src })
  imgVisible.value = false
}

function insertVideo(attrs: { src: string; vtype: string }) {
  emit('command', 'setVideo', attrs)
  videoVisible.value = false
}

function insertMath(latex: string, isBlock: boolean) {
  emit('command', isBlock ? 'setMathBlock' : 'setMathInline', latex)
  mathVisible.value = false
}

function insertTable(rows: number, cols: number) {
  if (tableHideTimer) { clearTimeout(tableHideTimer); tableHideTimer = null }
  emit('command', 'insertTable', { rows, cols })
  tableHover.value = false
  tableRow.value = 0
  tableCol.value = 0
}
</script>

<style scoped>
.hte-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--hte-bg2, #18181b);
  border-bottom: 1px solid var(--hte-border, #27272a);
  user-select: none;
}

.hte-toolbar__left {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.hte-tb-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.hte-tb-sep {
  width: 1px;
  height: 20px;
  background: var(--hte-border, #27272a);
  margin: 0 4px;
  flex-shrink: 0;
  opacity: .6;
}

.hte-tb-select {
  padding: 4px 8px;
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 6px;
  background: var(--hte-bg, #09090b);
  color: var(--hte-tx2, #a1a1aa);
  font-size: 12px;
  outline: none;
  cursor: pointer;
  height: 32px;
  transition: border-color .15s;
  font-family: inherit;
}

.hte-tb-select:focus {
  border-color: var(--hte-accent, #3b82f6);
  box-shadow: 0 0 0 2px var(--hte-ring, rgba(59,130,246,.3));
}

.hte-tb-lang {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 6px;
  background: transparent;
  color: var(--hte-tx2, #a1a1aa);
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: .04em;
  transition: background .12s, color .12s;
  flex-shrink: 0;
  padding: 0;
}

.hte-tb-lang:hover {
  background: var(--hte-bg3, #27272a);
  color: var(--hte-tx1, #fafafa);
}

.hte-tb-lang:focus-visible {
  outline: 2px solid var(--hte-ring, rgba(59,130,246,.45));
  outline-offset: 1px;
}

@media (max-width: 640px) {
  .hte-toolbar {
    gap: 2px;
    padding: 4px 6px;
  }
  .hte-tb-sep {
    margin: 0 2px;
  }
}
</style>

<style>
.hte-tb-table-wrap {
  position: relative;
  display: inline-flex;
}

.hte-tb-table-dd {
  padding: 12px;
  background: var(--hte-bg2, #18181b);
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  animation: hte-dd-in .12s ease;
}

@keyframes hte-dd-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hte-tg__grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hte-tg__row {
  display: flex;
  gap: 2px;
}

.hte-tg__cell {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--hte-border, #27272a);
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  transition: background .06s, border-color .06s;
}

.hte-tg__cell.is-hovered {
  background: var(--hte-accent, #3b82f6);
  border-color: var(--hte-accent, #3b82f6);
}

.hte-tg__label {
  text-align: center;
  padding: 8px 0 2px;
  font-size: 12px;
  font-weight: 500;
  color: var(--hte-tx2, #a1a1aa);
  min-height: 18px;
  font-family: var(--hte-font, system-ui, sans-serif);
}
</style>
