export default {
  state () {
    return {
      en: [],
      ru: [],
      preset: 'none',
      currentIndex: 0
    }
  },
  getters: {
    en: state => state.en,
    ru: state => state.ru,
    preset: state => state.preset,
    currentIndex: state => state.currentIndex
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
    },
    setPreset ({ commit }, value) {
      commit('setPreset', value)
    },
    setCurrentIndex ({ commit }, value) {
      commit('setCurrentIndex', value)
    }
  }
}
