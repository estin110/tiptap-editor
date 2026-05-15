import type { MentionSuggestionRender } from '../types'

export function createMentionPopup(noMatchText: string = 'No matches'): MentionSuggestionRender {
  let popup: HTMLDivElement | null = null
  let currentItems: any[] = []
  let selectedIndex = 0
  let currentCommand: ((item: any) => void) | null = null

  function getOrCreatePopup(): HTMLDivElement {
    if (!popup) {
      popup = document.createElement('div')
      popup.className = 'hte-mention-popup'
      document.body.appendChild(popup)
    }
    return popup
  }

  function renderItems() {
    const el = getOrCreatePopup()
    el.innerHTML = ''

    if (!currentItems.length) {
      const empty = document.createElement('div')
      empty.className = 'hte-mention-item'
      empty.textContent = noMatchText
      empty.style.color = 'var(--hte-tx3, #6b6966)'
      el.appendChild(empty)
      return
    }

    currentItems.forEach((item, i) => {
      const div = document.createElement('div')
      div.className = `hte-mention-item${i === selectedIndex ? ' is-active' : ''}`
      div.textContent = item.label

      div.addEventListener('mousedown', (e) => {
        e.preventDefault()
        currentCommand?.(item)
      })

      el.appendChild(div)
    })
  }

  function positionPopup(rectOrFn: any) {
    if (!popup) return
    const rect = typeof rectOrFn === 'function' ? rectOrFn() : rectOrFn
    if (!rect) return
    popup.style.top = `${rect.bottom + 4}px`
    popup.style.left = `${rect.left}px`
  }

  function destroy() {
    if (popup) {
      popup.remove()
      popup = null
    }
    currentCommand = null
    currentItems = []
    selectedIndex = 0
  }

  return {
    onStart(props: any) {
      selectedIndex = 0
      currentItems = props.items
      currentCommand = props.command
      renderItems()
      positionPopup(props.clientRect)
    },

    onUpdate(props: any) {
      selectedIndex = 0
      currentItems = props.items
      currentCommand = props.command
      renderItems()
      positionPopup(props.clientRect)
    },

    onKeyDown(props: any) {
      const key = props.event.key

      if (key === 'ArrowUp') {
        selectedIndex = Math.max(0, selectedIndex - 1)
        renderItems()
        return true
      }

      if (key === 'ArrowDown') {
        selectedIndex = Math.min(currentItems.length - 1, selectedIndex + 1)
        renderItems()
        return true
      }

      if (key === 'Enter') {
        if (currentItems[selectedIndex] && currentCommand) {
          currentCommand(currentItems[selectedIndex])
        }
        return true
      }

      if (key === 'Escape') {
        destroy()
        return true
      }

      return false
    },

    onExit() {
      destroy()
    }
  }
}
