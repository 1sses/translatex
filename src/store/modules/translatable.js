import convertFileToText from '@/utils/convertFileToText'

export const translatableNames = {
  setEn: 'translatable/setEn',
  setRu: 'translatable/setRu',
  setPreset: 'translatable/setPreset',
  setCurrentIndex: 'translatable/setCurrentIndex',
  setTranslatedData: 'translatable/setTranslatedData',
  setBufferTranslatedData: 'translatable/setBufferTranslatedData',
  resetPrimaryState: 'translatable/resetPrimaryState',
  resetSecondaryState: 'translatable/resetSecondaryState',
  resetState: 'translatable/resetState'
}

export default {
  state: {
    en: [],
    ru: [],
    preset: 'none',
    currentIndex: 0,
    translatedData: [],
    bufferTranslatedData: []
  },
  mutations: {
    [translatableNames.setEn] (state, value) {
      state.en = value
    },
    [translatableNames.setRu] (state, value) {
      state.ru = value
    },
    [translatableNames.setPreset] (state, value) {
      state.preset = value
    },
    [translatableNames.setCurrentIndex] (state, value) {
      state.currentIndex = value
    },
    [translatableNames.setTranslatedData] (state, value) {
      state.translatedData = value
    },
    [translatableNames.setBufferTranslatedData] (state, value) {
      state.bufferTranslatedData = value
    },
    [translatableNames.resetPrimaryState] (state) {
      state.en = []
      state.ru = []
    },
    [translatableNames.resetSecondaryState] (state) {
      state.en = []
      state.ru = []
      state.preset = 'none'
      state.currentIndex = 0
      state.translatedData = []
      state.bufferTranslatedData = []
    }
  },
  actions: {
    [translatableNames.setEn] ({ commit }, file) {
      convertFileToText(file)
        .then(value => commit(translatableNames.setEn, value.split('\n')))
        .catch(err => console.log(err))
    },
    [translatableNames.setRu] ({ commit }, file) {
      if (!file) {
        commit(translatableNames.setRu, [])
        return
      }
      convertFileToText(file)
        .then(value => commit(translatableNames.setRu, value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
