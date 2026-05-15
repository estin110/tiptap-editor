<template>
  <Teleport to="body">
    <div v-if="visible" class="hte-modal-overlay" @click.self="$emit('close')">
      <div class="hte-modal" style="width:auto;padding:0;">
        <div class="hte-tg">
          <div
            class="hte-tg__grid"
            @mouseleave="resetHover"
          >
            <div
              v-for="r in maxRows"
              :key="r"
              class="hte-tg__row"
            >
              <div
                v-for="c in maxCols"
                :key="c"
                class="hte-tg__cell"
                :class="{ 'is-hovered': r <= hoverRow && c <= hoverCol }"
                @mouseenter="hover(r, c)"
                @click="submit(r, c)"
              />
            </div>
          </div>
          <div class="hte-tg__label">
            <span v-if="hoverRow > 0">{{ hoverRow }} &times; {{ hoverCol }}</span>
            <span v-else>Hover to select size</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  insert: [rows: number, cols: number]
  close: []
}>()

const maxRows = 8
const maxCols = 10
const hoverRow = ref(0)
const hoverCol = ref(0)

function hover(r: number, c: number) {
  hoverRow.value = r
  hoverCol.value = c
}

function resetHover() {
  hoverRow.value = 0
  hoverCol.value = 0
}

function submit(rows: number, cols: number) {
  emit('insert', rows, cols)
}
</script>

<style scoped>
.hte-tg {
  padding: 14px;
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
  width: 22px;
  height: 22px;
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
  padding: 10px 0 2px;
  font-size: 13px;
  font-weight: 500;
  color: var(--hte-tx2, #a1a1aa);
  min-height: 20px;
}
</style>
