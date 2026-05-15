<template>
  <Teleport to="body">
    <div
      v-if="visible && editor"
      ref="menuRef"
      class="hte-bubble"
      :style="posStyle"
    >
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('bold') }"
        :title="loc.bubble.bold + ' (Ctrl+B)'"
        @mousedown.prevent="cmd('toggleBold')"
      >
        <span v-html="ICONS.BOLD" />
      </button>
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('italic') }"
        :title="loc.bubble.italic + ' (Ctrl+I)'"
        @mousedown.prevent="cmd('toggleItalic')"
      >
        <span v-html="ICONS.ITALIC" />
      </button>
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('underline') }"
        :title="loc.bubble.underline + ' (Ctrl+U)'"
        @mousedown.prevent="cmd('toggleUnderline')"
      >
        <span v-html="ICONS.UNDERLINE" />
      </button>
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('strike') }"
        :title="loc.bubble.strikethrough"
        @mousedown.prevent="cmd('toggleStrike')"
      >
        <span v-html="ICONS.STRIKETHROUGH" />
      </button>
      <div class="hte-bubble__sep" />
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('code') }"
        :title="loc.bubble.code"
        @mousedown.prevent="cmd('toggleCode')"
      >
        <span v-html="ICONS.CODE" />
      </button>
      <button
        class="hte-bubble__btn"
        :class="{ 'is-active': editor.isActive('link') }"
        :title="loc.bubble.link + ' (Ctrl+K)'"
        @mousedown.prevent="openLink"
      >
        <span v-html="ICONS.LINK" />
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { Editor } from '@tiptap/core'
import { useLocale } from '../i18n'
import {
  ICON_BOLD, ICON_ITALIC, ICON_UNDERLINE, ICON_STRIKETHROUGH,
  ICON_CODE, ICON_LINK
} from '../utils/icons'

const { locale: loc } = useLocale()

const ICONS = {
  BOLD: ICON_BOLD, ITALIC: ICON_ITALIC, UNDERLINE: ICON_UNDERLINE,
  STRIKETHROUGH: ICON_STRIKETHROUGH, CODE: ICON_CODE, LINK: ICON_LINK
}

const props = defineProps<{
  editor: Editor | null
}>()

const visible = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const posStyle = ref<Record<string, string>>({})

function cmd(name: string) {
  if (!props.editor) return
  const chain = props.editor.chain().focus()
  if (typeof (chain as any)[name] === 'function') {
    ;(chain as any)[name]().run()
  }
}

function openLink() {
  if (!props.editor) return
  const url = window.prompt(loc.value.bubble.linkPrompt, props.editor.getAttributes('link').href || 'https://')
  if (url) {
    props.editor.chain().focus().setLink({ href: url }).run()
  }
}

function updatePosition() {
  const ed = props.editor
  if (!ed) { visible.value = false; return }

  const { from, to, empty } = ed.state.selection
  if (empty || from === to) {
    visible.value = false
    return
  }

  const view = ed.view
  const startCoords = view.coordsAtPos(from)
  const endCoords = view.coordsAtPos(to)

  const top = Math.min(startCoords.top, endCoords.top)
  const left = Math.min(startCoords.left, endCoords.left)
  const right = Math.max(startCoords.right, endCoords.right)
  const centerX = (left + right) / 2

  posStyle.value = {
    top: `${top - 8}px`,
    left: `${centerX}px`,
    transform: 'translate(-50%, -100%)'
  }

  visible.value = true
}

let rafId: number | null = null

function scheduleUpdate() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    updatePosition()
    rafId = null
  })
}

onMounted(() => {
  const ed = props.editor
  if (!ed) return

  ed.on('selectionUpdate', scheduleUpdate)
  ed.on('blur', () => { visible.value = false })

  document.addEventListener('mousedown', handleOutsideClick, true)
})

onUnmounted(() => {
  const ed = props.editor
  if (ed) {
    ed.off('selectionUpdate', scheduleUpdate)
  }
  document.removeEventListener('mousedown', handleOutsideClick, true)
  if (rafId) cancelAnimationFrame(rafId)
})

function handleOutsideClick(e: MouseEvent) {
  if (!visible.value) return
  const el = menuRef.value
  if (el && !el.contains(e.target as Node)) {
    visible.value = false
  }
}

watch(
  () => props.editor,
  (ed, oldEd) => {
    if (oldEd) {
      oldEd.off('selectionUpdate', scheduleUpdate)
    }
    if (ed) {
      ed.on('selectionUpdate', scheduleUpdate)
      ed.on('blur', () => { visible.value = false })
    }
  }
)
</script>

<style>
.hte-bubble {
  position: fixed;
  z-index: 1002;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: var(--hte-bg2, #18181b);
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .3);
  animation: hte-bubble-in .12s ease;
  pointer-events: auto;
}

@keyframes hte-bubble-in {
  from { opacity: 0; transform: translate(-50%, -100%) scale(.95); }
  to   { opacity: 1; transform: translate(-50%, -100%) scale(1); }
}

.hte-bubble__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--hte-tx2, #a1a1aa);
  cursor: pointer;
  transition: background .1s, color .1s;
  padding: 0;
}

.hte-bubble__btn:hover {
  background: var(--hte-bg3, #27272a);
  color: var(--hte-tx1, #fafafa);
}

.hte-bubble__btn.is-active {
  background: rgba(59, 130, 246, .12);
  color: var(--hte-accent, #3b82f6);
}

.hte-bubble__btn span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hte-bubble__btn span svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hte-bubble__sep {
  width: 1px;
  height: 18px;
  background: var(--hte-border, #27272a);
  margin: 0 2px;
}
</style>
