import { reactive, computed, provide, inject, type Ref, type ComputedRef } from 'vue'
import { en } from './en'
import { zh } from './zh'
import type { Locale, LocaleCode } from './locale'

const locales: Record<LocaleCode, Locale> = { en, zh }

export function detectLocale(): LocaleCode {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || ''
    if (lang.toLowerCase().startsWith('zh')) return 'zh'
  }
  return 'en'
}

const LOCALE_KEY = Symbol('hte-locale')
const LOCALE_CODE_KEY = Symbol('hte-locale-code')
const SET_LOCALE_KEY = Symbol('hte-set-locale')

export function provideLocale(initial?: LocaleCode) {
  const code = reactive<{ value: LocaleCode }>({
    value: initial ?? detectLocale()
  })

  const locale = computed<Locale>(() => locales[code.value] || en)
  const localeCode = computed<LocaleCode>(() => code.value)

  provide(LOCALE_KEY, locale)
  provide(LOCALE_CODE_KEY, localeCode)
  provide(SET_LOCALE_KEY, (c: LocaleCode) => { code.value = c })

  return { locale, localeCode, code }
}

export function useLocale(): { locale: ComputedRef<Locale>; localeCode: ComputedRef<LocaleCode>; setLocale: (c: LocaleCode) => void } {
  const locale = inject<ComputedRef<Locale>>(LOCALE_KEY)
  const localeCode = inject<ComputedRef<LocaleCode>>(LOCALE_CODE_KEY)
  const setLocale = inject<(c: LocaleCode) => void>(SET_LOCALE_KEY)

  if (!locale || !localeCode || !setLocale) {
    const fallback = computed(() => en)
    const fallbackCode = computed(() => 'en' as LocaleCode)
    return { locale: fallback, localeCode: fallbackCode, setLocale: () => {} }
  }

  return { locale, localeCode, setLocale }
}

export { type Locale, type LocaleCode } from './locale'
