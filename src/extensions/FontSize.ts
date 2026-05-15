import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (el) => el.style.fontSize || null,
        renderHTML: (a) => {
          if (!a.fontSize) return {}
          return { style: `font-size: ${a.fontSize}` }
        }
      }
    }
  },

  parseHTML() {
    return [{ tag: 'span[style*="font-size"]', priority: 60 }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontSize: (size: string) => ({ chain }: any) => {
        return chain().setMark(this.name, { fontSize: size }).run()
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain().unsetMark(this.name).run()
      }
    }
  }
})
