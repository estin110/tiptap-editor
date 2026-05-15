import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Mention from '@tiptap/extension-mention'
import { ref, shallowRef, computed, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { FontSize, VideoEmbed, MathInline, MathBlock, Indent } from '../extensions'
import { useMention } from './useMention'
import type {
  UseEditorOptions,
  ToolbarState,
  ToolbarCommand,
  EditorCommands
} from '../types'

export function useEditor(options: UseEditorOptions & { elementRef: Ref<HTMLElement | null> }) {
  const editor = shallowRef<Editor | null>(null)
  const html = ref(options.content || '')
  const charCount = computed(() => html.value.replace(/<[^>]*>/g, '').length)
  const wordCount = computed(() => {
    const t = html.value.replace(/<[^>]*>/g, '').trim()
    if (!t) return 0
    const cjk = (t.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length
    const latin = (t.match(/[a-zA-Z0-9]+/g) || []).length
    return cjk + latin
  })

  const toolbarState = ref<ToolbarState>({
    bold: false,
    underline: false,
    italic: false,
    strike: false,
    subscript: false,
    superscript: false,
    h1: false,
    h2: false,
    h3: false,
    bulletList: false,
    orderedList: false,
    taskList: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
    blockquote: false,
    codeBlock: false,
    link: false,
    table: false,
    mathInline: false,
    mathBlock: false,
    fontSize: '16',
    color: '',
    highlight: ''
  })

  function syncState(ed: Editor) {
    if (!ed) return
    html.value = ed.getHTML() || ''

    const s = toolbarState.value
    s.bold = ed.isActive('bold')
    s.underline = ed.isActive('underline')
    s.italic = ed.isActive('italic')
    s.strike = ed.isActive('strike')
    s.subscript = ed.isActive('subscript')
    s.superscript = ed.isActive('superscript')
    s.h1 = ed.isActive('heading', { level: 1 })
    s.h2 = ed.isActive('heading', { level: 2 })
    s.h3 = ed.isActive('heading', { level: 3 })
    s.bulletList = ed.isActive('bulletList')
    s.orderedList = ed.isActive('orderedList')
    s.taskList = ed.isActive('taskList')
    s.alignLeft = ed.isActive({ textAlign: 'left' })
    s.alignCenter = ed.isActive({ textAlign: 'center' })
    s.alignRight = ed.isActive({ textAlign: 'right' })
    s.alignJustify = ed.isActive({ textAlign: 'justify' })
    s.blockquote = ed.isActive('blockquote')
    s.codeBlock = ed.isActive('codeBlock')
    s.link = ed.isActive('link')
    s.table = ed.isActive('table')
    s.mathInline = ed.isActive('mathInline')
    s.mathBlock = ed.isActive('mathBlock')

    const fs = ed.getAttributes('fontSize').fontSize
    s.fontSize = fs ? String(parseInt(String(fs))) : '16'

    const color = ed.getAttributes('textStyle').color
    s.color = String(color || '')

    const hl = ed.getAttributes('highlight') as any
    s.highlight = hl?.color ? String(hl.color) : ''
  }

  const toolbarCommand: ToolbarCommand = (name, params) => {
    const ed = editor.value
    if (!ed) return
    const chain = ed.chain().focus()
    if (typeof (chain as any)[name] === 'function') {
      ;(chain as any)[name](params).run()
    }
  }

  const editorCommands: EditorCommands = {}

  function buildCommands(ed: Editor) {
    editorCommands.undo = () => { ed.chain().focus().undo().run(); return true }
    editorCommands.redo = () => { ed.chain().focus().redo().run(); return true }
    editorCommands.toggleBold = () => { ed.chain().focus().toggleBold().run(); return true }
    editorCommands.toggleUnderline = () => { ed.chain().focus().toggleUnderline().run(); return true }
    editorCommands.toggleItalic = () => { ed.chain().focus().toggleItalic().run(); return true }
    editorCommands.toggleStrike = () => { ed.chain().focus().toggleStrike().run(); return true }
    editorCommands.toggleSubscript = () => { ed.chain().focus().toggleSubscript().run(); return true }
    editorCommands.toggleSuperscript = () => { ed.chain().focus().toggleSuperscript().run(); return true }

    editorCommands.toggleHeading = (params?: any) => {
      const level = params?.level || 1
      ed.chain().focus().toggleHeading({ level } as any).run()
      return true
    }

    editorCommands.toggleBulletList = () => { ed.chain().focus().toggleBulletList().run(); return true }
    editorCommands.toggleOrderedList = () => { ed.chain().focus().toggleOrderedList().run(); return true }
    editorCommands.toggleTaskList = () => { ed.chain().focus().toggleTaskList().run(); return true }

    editorCommands.setTextAlign = (alignment?: any) => {
      ed.chain().focus().setTextAlign(alignment || 'left').run()
      return true
    }

    editorCommands.toggleBlockquote = () => { ed.chain().focus().toggleBlockquote().run(); return true }
    editorCommands.toggleCodeBlock = () => { ed.chain().focus().toggleCodeBlock().run(); return true }

    editorCommands.setFontSize = (size?: string) => {
      ed.chain().focus().setMark('fontSize', { fontSize: size || '16px' }).run()
      return true
    }

    editorCommands.setColor = (color?: string) => {
      ed.chain().focus().setColor(color || '').run()
      return true
    }

    editorCommands.unsetColor = () => { ed.chain().focus().unsetColor().run(); return true }

    editorCommands.toggleHighlight = (params?: any) => {
      ed.chain().focus().toggleHighlight(params).run()
      return true
    }

    editorCommands.unsetHighlight = () => { ed.chain().focus().unsetHighlight().run(); return true }
    editorCommands.unsetLink = () => { ed.chain().focus().unsetLink().run(); return true }

    editorCommands.setLink = (params?: any) => {
      if (params?.href) {
        ed.chain().focus().setLink({ href: params.href }).run()
      }
      return true
    }

    editorCommands.setImage = (params?: any) => {
      if (params?.src) {
        ed.chain().focus().setImage({ src: params.src }).run()
      }
      return true
    }

    editorCommands.setVideo = (params?: any) => {
      if (params) {
        ed.chain().focus().insertContent({
          type: 'videoEmbed',
          attrs: params
        }).run()
      }
      return true
    }

    editorCommands.setMathInline = (latex?: string) => {
      if (latex) {
        ed.chain().focus().insertContent({
          type: 'mathInline',
          attrs: { latex }
        }).run()
      }
      return true
    }

    editorCommands.setMathBlock = (latex?: string) => {
      if (latex) {
        ed.chain().focus().insertContent({
          type: 'mathBlock',
          attrs: { latex }
        }).run()
      }
      return true
    }

    editorCommands.insertTable = (opts?: any) => {
      ed.chain().focus().insertTable({
        rows: opts?.rows || 3,
        cols: opts?.cols || 3,
        withHeaderRow: true
      }).run()
      return true
    }

    editorCommands.deleteTable = () => { ed.chain().focus().deleteTable().run(); return true }
    editorCommands.addColumnBefore = () => { ed.chain().focus().addColumnBefore().run(); return true }
    editorCommands.addColumnAfter = () => { ed.chain().focus().addColumnAfter().run(); return true }
    editorCommands.deleteColumn = () => { ed.chain().focus().deleteColumn().run(); return true }
    editorCommands.addRowBefore = () => { ed.chain().focus().addRowBefore().run(); return true }
    editorCommands.addRowAfter = () => { ed.chain().focus().addRowAfter().run(); return true }
    editorCommands.deleteRow = () => { ed.chain().focus().deleteRow().run(); return true }
    editorCommands.toggleHeaderRow = () => { ed.chain().focus().toggleHeaderRow().run(); return true }
    editorCommands.mergeOrSplit = () => { ed.chain().focus().mergeOrSplit().run(); return true }
    editorCommands.indent = () => { (ed.chain().focus() as any).indent().run(); return true }
    editorCommands.outdent = () => { (ed.chain().focus() as any).outdent().run(); return true }
    editorCommands.clearNodes = () => { ed.chain().focus().clearNodes().run(); return true }
    editorCommands.unsetAllMarks = () => { ed.chain().focus().unsetAllMarks().run(); return true }
    editorCommands.clearFormat = () => { ed.chain().focus().clearNodes().unsetAllMarks().run(); return true }
  }

  const { mentionSuggestion } = useMention(options.mentionUsers || [])

  function buildExtensions(): any[] {
    const exts: any[] = []

    exts.push(
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      })
    )

    exts.push(
      Placeholder.configure({
        placeholder: options.placeholder || 'Start writing...'
      })
    )

    exts.push(Underline)
    exts.push(TextAlign.configure({ types: ['heading', 'paragraph'] }))
    exts.push(TextStyle)
    exts.push(Color)
    exts.push(Highlight.configure({ multicolor: true }))
    exts.push(Link.configure({ openOnClick: false }))
    exts.push(Image)
    exts.push(Subscript)
    exts.push(Superscript)
    exts.push(TaskList)
    exts.push(TaskItem.configure({ nested: true }))
    exts.push(Table.configure({ resizable: true }))
    exts.push(TableRow)
    exts.push(TableCell)
    exts.push(TableHeader)
    exts.push(Indent)
    exts.push(FontSize)
    exts.push(VideoEmbed)
    exts.push(MathInline)
    exts.push(MathBlock)

    if (options.mentionUsers && options.mentionUsers.length > 0) {
      exts.push(
        Mention.configure({
          HTMLAttributes: { class: 'mention' },
          suggestion: (options.mentionSuggestion || mentionSuggestion) as any
        })
      )
    }

    if (options.extensions) {
      exts.push(...(options.extensions as any[]))
    }

    return exts
  }

  let stopWatch: (() => void) | null = null

  onMounted(() => {
    stopWatch = watch(
      () => options.elementRef.value,
      (el) => {
        if (!el || editor.value) return

        const ed = new Editor({
          element: el,
          extensions: buildExtensions(),
          content: options.content || '',
          editable: options.editable !== false,
          editorProps: {
            attributes: {
              'data-placeholder': options.placeholder || 'Start writing...'
            }
          },
          onUpdate: (ctx) => {
            syncState(ctx.editor)
            options.onUpdate?.(html.value, ctx.editor)
          },
          onSelectionUpdate: (ctx) => {
            syncState(ctx.editor)
            options.onSelectionUpdate?.(ctx.editor)
          }
        })

        editor.value = ed
        buildCommands(ed)
        syncState(ed)

        if (stopWatch) {
          stopWatch()
          stopWatch = null
        }
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    stopWatch?.()
    editor.value?.destroy()
    editor.value = null
  })

  return {
    editor,
    html,
    charCount,
    wordCount,
    toolbarState,
    toolbarCommand,
    editorCommands
  }
}
