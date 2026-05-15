import { ref } from 'vue'
import type { MentionUser, MentionSuggestionRender, MentionRenderProps, MentionKeyDownProps } from '../types'

export function useMention(users: MentionUser[]) {
  const filteredUsers = ref<MentionUser[]>([])
  const selectedIndex = ref(0)

  function filterUsers(query: string): MentionUser[] {
    const q = (query || '').toLowerCase()
    return users.filter((u) => u.label.toLowerCase().includes(q)).slice(0, 8)
  }

  const mentionSuggestion: MentionSuggestionRender = {
    onStart: (props: MentionRenderProps) => {
      selectedIndex.value = 0
      filteredUsers.value = props.items
    },
    onUpdate: (props: MentionRenderProps) => {
      selectedIndex.value = 0
      filteredUsers.value = props.items
    },
    onKeyDown: (props: MentionKeyDownProps) => {
      if (props.event.key === 'ArrowUp') {
        selectedIndex.value = Math.max(0, selectedIndex.value - 1)
        return true
      }
      if (props.event.key === 'ArrowDown') {
        selectedIndex.value = Math.min(
          filteredUsers.value.length - 1,
          selectedIndex.value + 1
        )
        return true
      }
      return false
    },
    onExit: () => {
      filteredUsers.value = []
      selectedIndex.value = 0
    }
  }

  function items(query: string) {
    return filterUsers(query)
  }

  return {
    mentionSuggestion,
    items,
    filteredUsers,
    selectedIndex
  }
}
