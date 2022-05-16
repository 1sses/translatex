export const yandexNames = {
  setKey: 'yandex/setKey',
  setSourceLang: 'yandex/setSourceLang',
  setTargetLang: 'yandex/setTargetLang',
  setUseTranslation: 'yandex/setUseTranslation'
}

export default {
  state: {
    key: localStorage.getItem('yandex-translate-api-key') || '',
    sourceLang: localStorage.getItem('yandex-translate-source-lang') || '',
    targetLang: localStorage.getItem('yandex-translate-target-lang') || '',
    useTranslation: localStorage.getItem('yandex-translate-use-translation') === 'true'
  },
  mutations: {
    [yandexNames.setKey] (state, key) {
      state.key = key
      localStorage.setItem('yandex-translate-api-key', key)
    },
    [yandexNames.setSourceLang] (state, sourceLang) {
      state.sourceLang = sourceLang
      localStorage.setItem('yandex-translate-source-lang', sourceLang)
    },
    [yandexNames.setTargetLang] (state, targetLang) {
      state.targetLang = targetLang
      localStorage.setItem('yandex-translate-target-lang', targetLang)
    },
    [yandexNames.setUseTranslation] (state, useTranslation) {
      state.useTranslation = useTranslation
      localStorage.setItem('yandex-translate-use-translation', useTranslation)
    }
  }
}
