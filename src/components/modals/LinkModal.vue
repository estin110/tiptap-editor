<template>
  <Teleport to="body">
    <div v-if="visible" class="hte-modal-overlay" @click.self="$emit('close')">
      <div class="hte-modal">
        <div class="hte-modal__header">
          <span class="hte-modal__title">{{ locale.modals.link.title }}</span>
          <button class="hte-modal__close" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="hte-modal__body">
          <input
            ref="inputRef"
            v-model="url"
            type="url"
            class="hte-input"
            placeholder="https://example.com"
            @keydown.enter="submit"
          />
        </div>
        <div class="hte-modal__footer">
          <button v-if="linkUrl" class="hte-btn" @click="$emit('remove')">{{ locale.modals.link.remove }}</button>
          <button class="hte-btn hte-btn--primary" @click="submit">{{ locale.modals.link.apply }}</button>
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
  linkUrl: string
  locale: Locale
}>()

const emit = defineEmits<{
  apply: [url: string]
  close: []
  remove: []
}>()

const url = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.visible,
  (v) => {
    if (v) {
      url.value = props.linkUrl || ''
      setTimeout(() => inputRef.value?.focus(), 50)
    }
  }
)

function submit() {
  emit('apply', url.value)
}
</script>
