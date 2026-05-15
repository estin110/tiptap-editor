import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathInline: {
      setMathInline: (latex: string) => ReturnType
    }
  }
}

export const MathInline = Node.create({
  name: 'mathInline',
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-latex') || '',
        renderHTML: (a) => ({ 'data-latex': a.latex || '' })
      }
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-math-inline]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-math-inline': '' })]
  },

  addNodeView() {
    return ({ node }) => {
      const span = document.createElement('span')
      span.className = 'hte-math-inline'
      span.style.cssText =
        'display:inline;padding:2px 4px;cursor:pointer;border-radius:3px;transition:background .12s'

      try {
        const katex = (window as any).katex
        if (katex) {
          katex.render(node.attrs.latex || '', span, { throwOnError: false })
        } else {
          span.textContent = node.attrs.latex || '?'
        }
      } catch {
        span.textContent = node.attrs.latex || '?'
      }

      return { dom: span }
    }
  },

  addCommands() {
    return {
      setMathInline: (latex: string) => ({ chain }: any) => {
        return chain().insertContent({
          type: this.name,
          attrs: { latex }
        }).run()
      }
    }
  }
})
