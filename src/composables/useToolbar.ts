import { computed, Ref } from 'vue'
import type { ToolbarState } from '../types'

export function useToolbar(state: Ref<ToolbarState>) {
  const activeMarks = computed(() => ({
    bold: state.value.bold,
    italic: state.value.italic,
    underline: state.value.underline,
    strike: state.value.strike,
    subscript: state.value.subscript,
    superscript: state.value.superscript
  }))

  const activeHeading = computed(() => {
    if (state.value.h1) return 1
    if (state.value.h2) return 2
    if (state.value.h3) return 3
    return 0
  })

  const activeList = computed(() => {
    if (state.value.bulletList) return 'bullet'
    if (state.value.orderedList) return 'ordered'
    if (state.value.taskList) return 'task'
    return null
  })

  const activeAlign = computed(() => {
    if (state.value.alignLeft) return 'left'
    if (state.value.alignCenter) return 'center'
    if (state.value.alignRight) return 'right'
    if (state.value.alignJustify) return 'justify'
    return 'left'
  })

  const activeBlock = computed(() => ({
    blockquote: state.value.blockquote,
    codeBlock: state.value.codeBlock
  }))

  const hasTable = computed(() => state.value.table)
  const isLink = computed(() => state.value.link)
  const hasMath = computed(() => state.value.mathInline || state.value.mathBlock)

  return {
    activeMarks,
    activeHeading,
    activeList,
    activeAlign,
    activeBlock,
    hasTable,
    isLink,
    hasMath,
    fontSize: computed(() => state.value.fontSize),
    color: computed(() => state.value.color),
    highlight: computed(() => state.value.highlight)
  }
}
