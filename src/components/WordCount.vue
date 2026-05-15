<template>
  <span class="hte-word-count">
    {{ chars }} {{ loc.wordCount.chars }} · {{ words }} {{ loc.wordCount.words }}
  </span>
</template>

<script setup lang="ts">
import { useLocale } from '../i18n'

const { locale: loc } = useLocale()

defineProps<{
  chars: number
  words: number
}>()
</script>
