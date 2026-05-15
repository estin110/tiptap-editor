export interface Locale {
  // ===== Toolbar =====
  toolbar: {
    undo: string
    redo: string
    clearFormat: string
    bold: string
    italic: string
    underline: string
    strikethrough: string
    subscript: string
    superscript: string
    heading1: string
    heading2: string
    heading3: string
    bulletList: string
    orderedList: string
    taskList: string
    alignLeft: string
    alignCenter: string
    alignRight: string
    alignJustify: string
    indent: string
    outdent: string
    blockquote: string
    codeBlock: string
    fontSize: string
    textColor: string
    highlight: string
    link: string
    image: string
    video: string
    formula: string
    table: string
    addColBefore: string
    addColAfter: string
    deleteCol: string
    addRowBefore: string
    addRowAfter: string
    deleteRow: string
    deleteTable: string
  }

  // ===== Shortcuts (shown in tooltip) =====
  shortcuts: {
    bold: string
    italic: string
    underline: string
    strikethrough: string
    undo: string
    redo: string
    heading1: string
    heading2: string
    heading3: string
    bulletList: string
    orderedList: string
    blockquote: string
    codeBlock: string
    link: string
  }

  // ===== Modals =====
  modals: {
    link: { title: string; apply: string; remove: string }
    image: { title: string; url: string; upload: string; insert: string; hint: string }
    video: { title: string; insert: string; hint: string }
    math: { title: string; displayBlock: string; insert: string; hint: string }
    table: { title: string; insert: string; hoverHint: string }
  }

  // ===== Bubble Menu =====
  bubble: {
    bold: string
    italic: string
    underline: string
    strikethrough: string
    code: string
    link: string
    linkPrompt: string
    noMatches: string
  }

  // ===== Misc =====
  wordCount: { chars: string; words: string }
  placeholder: string
}

export type LocaleCode = 'en' | 'zh'
