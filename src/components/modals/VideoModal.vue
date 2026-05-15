<template>
  <Teleport to="body">
    <div v-if="visible" class="hte-modal-overlay" @click.self="$emit('close')">
      <div class="hte-modal">
        <div class="hte-modal__header">
          <span class="hte-modal__title">{{ locale.modals.video.title }}</span>
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
            placeholder="YouTube / Bilibili / video URL"
            @keydown.enter="submit"
          />
          <p class="hte-modal__hint">{{ locale.modals.video.hint }}</p>
        </div>
        <div class="hte-modal__footer">
          <button class="hte-btn hte-btn--primary" @click="submit">{{ locale.modals.video.insert }}</button>
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
  insert: [attrs: { src: string; vtype: string }]
  close: []
}>()

const url = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.visible,
  (v) => {
    if (!v) return
    url.value = ''
    setTimeout(() => inputRef.value?.focus(), 50)
  }
)

function parseVideoUrl(u: string): { src: string; vtype: string } {
  const yt = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (yt) return { src: `https://www.youtube.com/embed/${yt[1]}`, vtype: 'iframe' }
  const bl = u.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/)
  if (bl) return { src: `https://player.bilibili.com/player.html?bvid=${bl[1]}&high_quality=1`, vtype: 'iframe' }
  if (/\.(mp4|webm|ogg)($|\?)/i.test(u)) return { src: u, vtype: 'video' }
  return { src: u, vtype: 'iframe' }
}

function submit() {
  if (url.value) emit('insert', parseVideoUrl(url.value))
}
</script>
