<template>
  <Teleport to="body">
    <div v-if="visible" class="hte-modal-overlay" @click.self="$emit('close')">
      <div class="hte-modal">
        <div class="hte-modal__header">
          <span class="hte-modal__title">{{ locale.modals.image.title }}</span>
          <button class="hte-modal__close" @click="$emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="hte-modal__body">
          <div class="hte-modal__tabs">
            <button :class="{ active: tab === 'url' }" @click="tab = 'url'">{{ locale.modals.image.url }}</button>
            <button :class="{ active: tab === 'upload' }" @click="tab = 'upload'">{{ locale.modals.image.upload }}</button>
          </div>
          <div v-if="tab === 'url'">
            <input
              ref="urlInput"
              v-model="url"
              type="url"
              class="hte-input"
              placeholder="https://example.com/image.png"
              @keydown.enter="submitUrl"
            />
          </div>
          <div v-else>
            <label class="hte-upload-area">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;margin-bottom:4px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>{{ file ? file.name : locale.modals.image.hint }}</span>
              <input
                type="file"
                accept="image/*"
                class="hte-upload-input"
                @change="handleFile"
              />
            </label>
          </div>
          <div v-if="preview" class="hte-modal__preview">
            <img :src="preview" alt="preview" />
          </div>
        </div>
        <div class="hte-modal__footer">
          <button class="hte-btn hte-btn--primary" :disabled="!url && !file" @click="submit">{{ locale.modals.image.insert }}</button>
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
  insert: [src: string]
  close: []
}>()

const tab = ref<'url' | 'upload'>('url')
const url = ref('')
const file = ref<File | null>(null)
const preview = ref('')
const urlInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.visible,
  (v) => {
    if (!v) return
    url.value = ''
    file.value = null
    preview.value = ''
    tab.value = 'url'
    setTimeout(() => urlInput.value?.focus(), 50)
  }
)

function handleFile(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  file.value = f
  const reader = new FileReader()
  reader.onload = (ev) => { preview.value = ev.target?.result as string }
  reader.readAsDataURL(f)
}

function submitUrl() {
  if (url.value) emit('insert', url.value)
}

function submit() {
  if (tab.value === 'url' && url.value) {
    emit('insert', url.value)
  } else if (tab.value === 'upload' && preview.value) {
    emit('insert', preview.value)
  }
}
</script>
