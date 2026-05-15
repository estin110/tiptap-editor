<template>
  <Tooltip :text="title || ''" :shortcut="shortcut">
    <button
      class="hte-tbtn"
      :class="{
        'is-active': active,
        'hte-tbtn--icon': !$slots.default && (icon || svgIcon)
      }"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <span v-if="svgIcon" class="hte-tbtn__icon" v-html="svgIcon" />
      <span v-else-if="icon" class="hte-tbtn__icon">{{ icon }}</span>
      <slot />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from './Tooltip.vue'

defineProps<{
  icon?: string
  svgIcon?: string
  title?: string
  shortcut?: string
  active?: boolean
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.hte-tbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--hte-tx2, #a1a1aa);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: background .12s, color .12s;
  white-space: nowrap;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  font-family: inherit;
}

.hte-tbtn:hover {
  background: var(--hte-bg3, #27272a);
  color: var(--hte-tx1, #fafafa);
}

.hte-tbtn.is-active {
  background: rgba(59, 130, 246, .12);
  color: var(--hte-accent, #3b82f6);
}

.hte-tbtn:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.hte-tbtn:focus-visible {
  outline: 2px solid var(--hte-ring, rgba(59,130,246,.45));
  outline-offset: 1px;
}

.hte-tbtn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.hte-tbtn__icon :deep(svg) {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
