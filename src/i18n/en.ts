import type { Locale } from './locale'

export const en: Locale = {
  toolbar: {
    undo: 'Undo',
    redo: 'Redo',
    clearFormat: 'Clear formatting',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    bulletList: 'Bullet list',
    orderedList: 'Ordered list',
    taskList: 'Task list',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    alignJustify: 'Justify',
    indent: 'Indent',
    outdent: 'Outdent',
    blockquote: 'Blockquote',
    codeBlock: 'Code block',
    fontSize: 'Font size',
    textColor: 'Text color',
    highlight: 'Highlight',
    link: 'Insert link',
    image: 'Insert image',
    video: 'Insert video',
    formula: 'Insert formula',
    table: 'Insert table',
    addColBefore: 'Add column before',
    addColAfter: 'Add column after',
    deleteCol: 'Delete column',
    addRowBefore: 'Add row before',
    addRowAfter: 'Add row after',
    deleteRow: 'Delete row',
    deleteTable: 'Delete table'
  },

  shortcuts: {
    bold: 'Ctrl+B',
    italic: 'Ctrl+I',
    underline: 'Ctrl+U',
    strikethrough: 'Ctrl+Shift+X',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Shift+Z',
    heading1: 'Ctrl+Alt+1',
    heading2: 'Ctrl+Alt+2',
    heading3: 'Ctrl+Alt+3',
    bulletList: 'Ctrl+Shift+8',
    orderedList: 'Ctrl+Shift+7',
    blockquote: 'Ctrl+Shift+B',
    codeBlock: 'Ctrl+Alt+C',
    link: 'Ctrl+K'
  },

  modals: {
    link: { title: 'Insert Link', apply: 'Apply', remove: 'Remove' },
    image: { title: 'Insert Image', url: 'URL', upload: 'Upload', insert: 'Insert', hint: 'Click or drag to upload' },
    video: { title: 'Insert Video', insert: 'Insert', hint: 'Supports YouTube, Bilibili, and direct video URLs (.mp4, .webm, .ogg)' },
    math: { title: 'Insert Math Formula', displayBlock: 'Display as block (centered)', insert: 'Insert', hint: 'Enter a LaTeX formula to preview' },
    table: { title: 'Insert Table', insert: 'Insert', hoverHint: 'Hover to select' }
  },

  bubble: {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    code: 'Code',
    link: 'Link',
    linkPrompt: 'Enter URL:',
    noMatches: 'No matches'
  },

  wordCount: { chars: 'chars', words: 'words' },
  placeholder: 'Start writing...'
}
