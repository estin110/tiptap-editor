import { Extension } from '@tiptap/core'

export const Indent = Extension.create({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      minIndent: 0,
      maxIndent: 8
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const val = element.style.marginLeft || element.getAttribute('data-indent')
              return val ? parseInt(val, 10) || 0 : 0
            },
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent <= 0) return {}
              return {
                style: `margin-left: ${attributes.indent * 24}px`,
                'data-indent': String(attributes.indent)
              }
            }
          }
        }
      }
    ]
  },

  addCommands(): any {
    return {
      indent: () => ({ commands, editor }: any): any => {
        return this.options.types.every((type: string) => {
          const attrs = editor.getAttributes(type)
          const current = attrs.indent || 0
          const next = Math.min(current + 1, this.options.maxIndent)
          return commands.updateAttributes(type, { indent: next })
        })
      },
      outdent: () => ({ commands, editor }: any) => {
        return this.options.types.every((type: string) => {
          const attrs = editor.getAttributes(type)
          const current = attrs.indent || 0
          const next = Math.max(current - 1, this.options.minIndent)
          return commands.updateAttributes(type, { indent: next })
        })
      }
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => (this.editor.commands as any).indent(),
      'Shift-Tab': () => (this.editor.commands as any).outdent()
    }
  }
})
