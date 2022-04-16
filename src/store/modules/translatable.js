import convertFileToText from '@/utils/convertFileToText'

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
    setEn (state, value) {
      state.en = value
    },
    setRu (state, value) {
      state.ru = value
    },
    setPreset (state, value) {
      state.preset = value
    },
    setCurrentIndex (state, value) {
      state.currentIndex = value
    },
    setTranslatedData (state, value) {
      state.translatedData = value
    },
    setBufferTranslatedData (state, value) {
      state.bufferTranslatedData = value
    },
    resetEn (state) {
      state.en = []
    },
    resetRu (state) {
      state.ru = []
    },
    resetPreset (state) {
      state.preset = 'none'
    },
    resetCurrentIndex (state) {
      state.currentIndex = 0
    },
    resetTranslatedData (state) {
      state.translatedData = []
    },
    resetBufferTranslatedData (state) {
      state.bufferTranslatedData = []
    }
  },
  actions: {
    setEn ({ commit }, file) {
      convertFileToText(file)
        .then(value => commit('setEn', value.split('\n')))
        .catch(err => console.log(err))
    },
    setRu ({ commit }, file) {
      if (!file) {
        commit('setRu', [])
        return
      }
      convertFileToText(file)
        .then(value => commit('setRu', value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
