import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    videoEmbed: {
      setVideo: (attrs: { src: string; vtype: string }) => ReturnType
    }
  }
}

export const VideoEmbed = Node.create({
  name: 'videoEmbed',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      vtype: { default: 'iframe' }
    }
  },

  parseHTML() {
    return [{
      tag: 'div[data-video]',
      getAttrs: (el) => ({
        src: el.getAttribute('data-src') || '',
        vtype: el.getAttribute('data-vtype') || 'iframe'
      })
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-video': '',
      'data-src': HTMLAttributes.src || '',
      'data-vtype': HTMLAttributes.vtype || 'iframe'
    })]
  },

  addNodeView() {
    return ({ node }) => {
      const wrap = document.createElement('div')
      wrap.className = 'hte-video-embed'
      const s = wrap.style
      s.position = 'relative'
      s.width = '100%'
      s.aspectRatio = '16/9'
      s.background = '#000'
      s.borderRadius = 'var(--hte-r, 8px)'
      s.overflow = 'hidden'
      s.margin = '1em 0'

      if (node.attrs.vtype === 'video') {
        const vid = document.createElement('video')
        vid.src = node.attrs.src
        vid.controls = true
        vid.style.cssText = 'width:100%;height:100%'
        wrap.appendChild(vid)
      } else {
        const ifr = document.createElement('iframe')
        ifr.src = node.attrs.src
        ifr.allowFullscreen = true
        ifr.style.cssText = 'width:100%;height:100%;border:none'
        wrap.appendChild(ifr)
      }

      return { dom: wrap }
    }
  },

  addCommands() {
    return {
      setVideo: (attrs: { src: string; vtype: string }) => ({ chain }: any) => {
        return chain().insertContent({
          type: this.name,
          attrs
        }).run()
      }
    }
  }
})
