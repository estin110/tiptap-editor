<template>
  <div class="hte-cp">
    <button
      class="hte-cp__btn"
      :title="title"
      @click="$emit('toggle')"
    >
      <span class="hte-cp__swatch" :style="{ background: modelValue }" />
      <svg class="hte-cp__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <Teleport to="body">
      <div v-if="open" class="hte-cp__dropdown" @click.self="$emit('toggle')">
        <div class="hte-cp__panel">
          <div class="hte-cp__grid">
            <button
              v-for="color in colors"
              :key="color"
              class="hte-cp__item"
              :class="{ 'is-selected': modelValue === color, 'is-none': color === 'none' }"
              :style="color === 'none' ? {} : { background: color }"
              :title="color === 'none' ? 'Remove' : color"
              @click="$emit('select', color)"
            >
              <svg v-if="color === 'none'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="4" x2="20" y2="20"/></svg>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  colors: string[]
  label?: string
  title?: string
  open: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
  select: [value: string]
  toggle: []
}>()
</script>

<style scoped>
.hte-cp {
  position: relative;
}

.hte-cp__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background .12s;
  padding: 0;
  gap: 2px;
  flex-direction: column;
}

.hte-cp__btn:hover {
  background: var(--hte-bg3, #27272a);
}

.hte-cp__btn:focus-visible {
  outline: 2px solid var(--hte-ring, rgba(59,130,246,.45));
  outline-offset: 1px;
}

.hte-cp__swatch {
  display: block;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  border: 1px solid var(--hte-border, #27272a);
}

.hte-cp__chevron {
  width: 10px;
  height: 10px;
  color: var(--hte-tx3, #52525b);
}

.hte-cp__dropdown {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.hte-cp__panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background: var(--hte-bg2, #18181b);
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 10px;
  z-index: 100;
  margin-top: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, .35);
  animation: hte-cp-in .12s ease;
}

@keyframes hte-cp-in {
  from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.hte-cp__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

.hte-cp__item {
  width: 28px;
  height: 28px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: transform .1s, border-color .1s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.hte-cp__item:hover {
  transform: scale(1.12);
  border-color: var(--hte-tx1, #fafafa);
}

.hte-cp__item.is-selected {
  border-color: var(--hte-accent, #3b82f6);
  box-shadow: 0 0 0 1px var(--hte-accent);
}

.hte-cp__item.is-none {
  background: var(--hte-bg, #09090b);
  border: 1px solid var(--hte-border, #27272a);
}

.hte-cp__item.is-none svg {
  width: 14px;
  height: 14px;
  stroke: var(--hte-tx3, #52525b);
}
</style>
