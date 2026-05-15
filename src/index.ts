import './styles/index.css'

export { default as TiptapEditor } from './components/TiptapEditor.vue'
export { default as DefaultToolbar } from './components/DefaultToolbar.vue'
export { default as BubbleMenu } from './components/BubbleMenu.vue'
export { default as ToolbarButton } from './components/ToolbarButton.vue'
export { default as Tooltip } from './components/Tooltip.vue'
export { default as ColorPicker } from './components/ColorPicker.vue'
export { default as WordCount } from './components/WordCount.vue'

export { default as LinkModal } from './components/modals/LinkModal.vue'
export { default as ImageModal } from './components/modals/ImageModal.vue'
export { default as VideoModal } from './components/modals/VideoModal.vue'
export { default as MathModal } from './components/modals/MathModal.vue'
export { default as TableInsertModal } from './components/modals/TableInsertModal.vue'

export { useEditor } from './composables/useEditor'
export { useToolbar } from './composables/useToolbar'
export { useMention } from './composables/useMention'

export { createMentionPopup } from './mention'

export { FontSize, VideoEmbed, MathInline, MathBlock, Indent } from './extensions'

export type * from './types'
