<template>
  <Teleport to="body">
    <div v-if="visible" class="hte-modal-overlay" @click.self="$emit('close')">
      <div class="hte-modal hte-modal--wide">
        <div class="hte-modal__header">
          <span class="hte-modal__title">{{ locale.modals.math.title }}</span>
          <button class="hte-modal__close" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="hte-modal__body">
          <div class="hte-modal__row">
            <label class="hte-checkbox">
              <input v-model="isBlock" type="checkbox" />
              <span>{{ locale.modals.math.displayBlock }}</span>
            </label>
          </div>
          <textarea
            ref="textareaRef"
            v-model="latex"
            class="hte-textarea"
            rows="4"
            placeholder="E = mc^2"
            @keydown.ctrl.enter="submit"
            @input="tryPreview"
          />
          <div class="hte-modal__preview math-preview">
            <div v-if="previewHtml" v-html="previewHtml" />
            <span v-else class="hte-modal__hint">{{ locale.modals.math.hint }}</span>
          </div>
        </div>
        <div class="hte-modal__footer">
          <button class="hte-btn hte-btn--primary" @click="submit">{{ locale.modals.math.insert }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Locale } from '../../i18n/locale'

const props = defineProps<{
  visible: boolean
  locale: Locale
}>()

const emit = defineEmits<{
  insert: [latex: string, isBlock: boolean]
  close: []
}>()

const latex = ref('')
const isBlock = ref(false)
const previewHtml = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

watch(
  () => props.visible,
  (v) => {
    if (!v) return
    latex.value = ''
    isBlock.value = false
    previewHtml.value = ''
    setTimeout(() => textareaRef.value?.focus(), 50)
  }
)

function tryPreview() {
  try {
    const katex = (window as any).katex
    if (katex && latex.value) {
      previewHtml.value = katex.renderToString(latex.value, {
        throwOnError: false,
        displayMode: isBlock.value
      })
    } else {
      previewHtml.value = ''
    }
  } catch { previewHtml.value = '' }
}

function submit() {
  if (latex.value) emit('insert', latex.value, isBlock.value)
}
</script>

<style scoped>
.hte-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--hte-border, #27272a);
  border-radius: 8px;
  background: var(--hte-bg, #09090b);
  color: var(--hte-tx1, #fafafa);
  font-family: var(--hte-mono, monospace);
  font-size: 14px;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: border-color .15s, box-shadow .15s;
}

.hte-textarea:focus {
  border-color: var(--hte-accent, #3b82f6);
  box-shadow: 0 0 0 3px var(--hte-ring, rgba(59,130,246,.35));
}

.hte-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--hte-tx2, #a1a1aa);
  font-size: 13px;
  cursor: pointer;
}

.hte-checkbox input[type="checkbox"] {
  accent-color: var(--hte-accent, #3b82f6);
  width: 16px;
  height: 16px;
}
</style>
