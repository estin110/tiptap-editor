<template>
  <span
    class="hte-tooltip-wrap"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="showFocus"
    @focusout="hide"
  >
    <slot />
    <Teleport to="body">
      <span
        v-if="visible"
        ref="tipRef"
        class="hte-tooltip"
        :style="posStyle"
      >
        {{ text }}
        <kbd v-if="shortcut" class="hte-tooltip__kbd">{{ shortcut }}</kbd>
      </span>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

defineProps<{ text: string; shortcut?: string }>()

const visible = ref(false)
const tipRef = ref<HTMLElement | null>(null)
const posStyle = ref<Record<string, string>>({})

let hideTimer: ReturnType<typeof setTimeout> | null = null

function show(e: MouseEvent) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  visible.value = true
  nextTick(() => {
    const el = tipRef.value
    const anchor = (e.currentTarget as HTMLElement)
    if (!el || !anchor) return
    const r = anchor.getBoundingClientRect()
    el.style.top = `${r.bottom + 6}px`
    el.style.left = `${r.left + r.width / 2}px`
  })
}

function showFocus() {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  visible.value = true
  nextTick(() => {
    const el = tipRef.value
    if (!el) return
    const wrap = el.parentElement?.parentElement
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    el.style.top = `${r.bottom + 6}px`
    el.style.left = `${r.left + r.width / 2}px`
  })
}

function hide() {
  hideTimer = setTimeout(() => { visible.value = false }, 80)
}
</script>

<style>
.hte-tooltip-wrap {
  position: relative;
  display: inline-flex;
}

.hte-tooltip {
  position: fixed;
  z-index: 9999;
  transform: translateX(-50%);
  padding: 5px 10px;
  background: var(--hte-bg, #18181b);
  color: var(--hte-tx1, #fafafa);
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 7px;
  font-size: 12px;
  font-family: var(--hte-font, system-ui, sans-serif);
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 14px rgba(0,0,0,.28);
  animation: hte-tip-in .12s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hte-tooltip__kbd {
  display: inline-block;
  padding: 1px 5px;
  background: var(--hte-bg3, #27272a);
  border: 1px solid var(--hte-border, #3f3f46);
  border-radius: 4px;
  font-family: var(--hte-mono, monospace);
  font-size: 11px;
  color: var(--hte-tx2, #a1a1aa);
  line-height: 1.3;
}

@keyframes hte-tip-in {
  from { opacity: 0; transform: translateX(-50%) translateY(2px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>
