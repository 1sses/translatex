export default {
  state () {
    return {
      en: [],
      ru: [],
      preset: 'none'
    }
  },
  getters: {
    en: state => state.en,
    geu: state => state.ru,
    preset: state => state.preset
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
      if (!file) return
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
    }
  }
}
