<template>
  <div class="hte-editor" :class="{ 'hte-dark': dark, 'hte-light': !dark }">
    <slot name="toolbar" :editor="editor" :state="toolbarState" :commands="editorCommands">
      <DefaultToolbar
        v-if="showToolbar && editor"
        :state="toolbarState"
        @command="toolbarCommand"
      />
    </slot>

    <BubbleMenu v-if="editor && editable" :editor="editor" />

    <div class="hte-content-wrapper">
      <div ref="editorRef" class="hte-content" />
    </div>

    <div v-if="$slots.footer || showFooter" class="hte-footer">
      <slot name="footer" :editor="editor" :html="html" :char-count="charCount" :word-count="wordCount">
        <WordCount v-if="showFooter" :chars="charCount" :words="wordCount" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Extension } from '@tiptap/core'
import { useEditor } from '../composables/useEditor'
import { provideLocale, useLocale } from '../i18n'
import DefaultToolbar from './DefaultToolbar.vue'
import BubbleMenu from './BubbleMenu.vue'
import WordCount from './WordCount.vue'
import type { MentionUser, MentionSuggestionRender } from '../types'
import type { LocaleCode } from '../i18n'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    content?: string
    placeholder?: string
    editable?: boolean
    dark?: boolean
    showToolbar?: boolean
    showFooter?: boolean
    extensions?: Extension[]
    mentionUsers?: MentionUser[]
    mentionSuggestion?: MentionSuggestionRender
    locale?: LocaleCode
  }>(),
  {
    modelValue: '',
    content: '',
    placeholder: '',
    editable: true,
    dark: true,
    showToolbar: true,
    showFooter: false,
    extensions: () => [],
    mentionUsers: () => [],
    mentionSuggestion: undefined,
    locale: undefined
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:locale': [value: LocaleCode]
  update: [html: string, editor: any]
  ready: [editor: any]
}>()

provideLocale(props.locale)
const { locale, localeCode } = useLocale()

const editorRef = ref<HTMLElement | null>(null)

const placeholder = computed(() => props.placeholder || locale.value.placeholder)

watch(localeCode, (val) => emit('update:locale', val))

const {
  editor,
  html,
  charCount,
  wordCount,
  toolbarState,
  toolbarCommand,
  editorCommands
} = useEditor({
  elementRef: editorRef,
  content: props.modelValue || props.content,
  placeholder: placeholder.value,
  editable: props.editable,
  extensions: props.extensions,
  mentionUsers: props.mentionUsers,
  mentionSuggestion: props.mentionSuggestion,
  onUpdate: (val, ed) => {
    emit('update:modelValue', val)
    emit('update', val, ed)
  },
  onSelectionUpdate: () => {}
})

watch(
  () => editor.value,
  (ed) => {
    if (ed) emit('ready', ed)
  }
)

watch(
  () => props.modelValue,
  (val) => {
    const ed = editor.value
    if (ed && val !== html.value) {
      ed.commands.setContent(val || '', false)
    }
  }
)
</script>

<style scoped>
.hte-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  border-radius: var(--hte-r, 8px);
  overflow: hidden;
  font-family: var(--hte-font, system-ui, -apple-system, sans-serif);
  border: 1px solid var(--hte-border, #27272a);
  transition: border-color .15s, box-shadow .15s;
}

.hte-editor:focus-within {
  border-color: var(--hte-accent, #3b82f6);
  box-shadow: 0 0 0 3px var(--hte-ring, rgba(59,130,246,.35));
}

.hte-content-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hte-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
  outline: none;
}

.hte-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--hte-border, #27272a);
  font-size: 12px;
  color: var(--hte-tx3, #52525b);
}
</style>
