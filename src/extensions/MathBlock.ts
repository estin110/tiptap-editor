import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathBlock: {
      setMathBlock: (latex: string) => ReturnType
    }
  }
}

export const MathBlock = Node.create({
  name: 'mathBlock',
  group: 'block',
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
    return [{ tag: 'div[data-math-block]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-math-block': '' })]
  },

  addNodeView() {
    return ({ node }) => {
      const div = document.createElement('div')
      div.className = 'hte-math-block'
      div.style.cssText =
        'display:block;text-align:center;margin:1em 0;padding:10px;cursor:pointer;border-radius:var(--hte-r, 8px);transition:background .12s'

      try {
        const katex = (window as any).katex
        if (katex) {
          katex.render(node.attrs.latex || '', div, {
            throwOnError: false,
            displayMode: true
          })
        } else {
          div.textContent = node.attrs.latex || '?'
        }
      } catch {
        div.textContent = node.attrs.latex || '?'
      }

      return { dom: div }
    }
  },

  addCommands() {
    return {
      setMathBlock: (latex: string) => ({ chain }: any) => {
        return chain().insertContent({
          type: this.name,
          attrs: { latex }
        }).run()
      }
    }
  }
})
