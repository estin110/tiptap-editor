import type { Locale } from './locale'

export const zh: Locale = {
  toolbar: {
    undo: '撤销',
    redo: '重做',
    clearFormat: '清除格式',
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    strikethrough: '删除线',
    subscript: '下标',
    superscript: '上标',
    heading1: '标题 1',
    heading2: '标题 2',
    heading3: '标题 3',
    bulletList: '无序列表',
    orderedList: '有序列表',
    taskList: '任务列表',
    alignLeft: '左对齐',
    alignCenter: '居中对齐',
    alignRight: '右对齐',
    alignJustify: '两端对齐',
    indent: '增加缩进',
    outdent: '减少缩进',
    blockquote: '引用',
    codeBlock: '代码块',
    fontSize: '字号',
    textColor: '文字颜色',
    highlight: '高亮',
    link: '插入链接',
    image: '插入图片',
    video: '插入视频',
    formula: '插入公式',
    table: '插入表格',
    addColBefore: '左侧插入列',
    addColAfter: '右侧插入列',
    deleteCol: '删除列',
    addRowBefore: '上方插入行',
    addRowAfter: '下方插入行',
    deleteRow: '删除行',
    deleteTable: '删除表格'
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
    link: { title: '插入链接', apply: '确定', remove: '移除' },
    image: { title: '插入图片', url: 'URL', upload: '上传', insert: '插入', hint: '点击或拖拽上传' },
    video: { title: '插入视频', insert: '插入', hint: '支持 YouTube、B 站和视频直链 (.mp4, .webm, .ogg)' },
    math: { title: '插入数学公式', displayBlock: '显示为块级公式（居中）', insert: '插入', hint: '输入 LaTeX 公式预览' },
    table: { title: '插入表格', insert: '插入', hoverHint: '悬停选择尺寸' }
  },

  bubble: {
    bold: '粗体',
    italic: '斜体',
    underline: '下划线',
    strikethrough: '删除线',
    code: '代码',
    link: '链接',
    linkPrompt: '输入链接:',
    noMatches: '无匹配'
  },

  wordCount: { chars: '字符', words: '单词' },
  placeholder: '在此开始写作…'
}
