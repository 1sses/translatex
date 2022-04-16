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
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function () {
        commit('setEn', reader.result.split('\n'))
      }
      reader.onerror = function () {
        console.log(reader.error)
      }
    },
    setRu ({ commit }, file) {
      if (!file) {
        commit('setRu', [])
        return
      }
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function () {
        commit('setRu', reader.result.split('\n'))
      }
      reader.onerror = function () {
        console.log(reader.error)
      }
    }
  }
}
