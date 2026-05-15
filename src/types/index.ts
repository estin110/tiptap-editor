import type { Editor } from '@tiptap/core'
import type { Extension } from '@tiptap/core'

export interface MentionUser {
  id: string
  label: string
  [key: string]: any
}

export interface MentionSuggestionRender {
  onStart?: (props: MentionRenderProps) => void
  onUpdate?: (props: MentionRenderProps) => void
  onKeyDown?: (props: MentionKeyDownProps) => void
  onExit?: () => void
}

export interface MentionRenderProps {
  items: MentionUser[]
  command: (item: MentionUser) => void
  clientRect?: (() => DOMRect | null) | DOMRect | null
  query: string
}

export interface MentionKeyDownProps {
  event: KeyboardEvent
}

export interface ToolbarButtonConfig {
  id: string
  type: 'button' | 'dropdown' | 'separator' | 'group'
  icon?: string
  label?: string
  title?: string
  command?: string
  params?: any
  active?: string | string[]
  children?: ToolbarButtonConfig[]
  visible?: boolean
}

export interface ToolbarAction {
  type: string
  payload?: any
}

export interface EditorOptions {
  content?: string
  placeholder?: string
  editable?: boolean
  dark?: boolean
  showToolbar?: boolean
  extensions?: Extension[]
  mentionUsers?: MentionUser[]
  mentionSuggestion?: Partial<MentionSuggestionRender>
  onUpdate?: (html: string, editor: Editor) => void
  onSelectionUpdate?: (editor: Editor) => void
}

import type { Ref } from 'vue'

export interface UseEditorOptions extends EditorOptions {
  elementRef: Ref<HTMLElement | null>
}

export interface ToolbarState {
  bold: boolean
  underline: boolean
  italic: boolean
  strike: boolean
  subscript: boolean
  superscript: boolean
  h1: boolean
  h2: boolean
  h3: boolean
  bulletList: boolean
  orderedList: boolean
  taskList: boolean
  alignLeft: boolean
  alignCenter: boolean
  alignRight: boolean
  alignJustify: boolean
  blockquote: boolean
  codeBlock: boolean
  link: boolean
  table: boolean
  mathInline: boolean
  mathBlock: boolean
  fontSize: string
  color: string
  highlight: string
}

export type ToolbarCommand = (name: string, params?: any) => void

export type EditorCommands = Record<string, (params?: any) => boolean>
