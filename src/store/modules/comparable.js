import convertFileToText from '@/utils/convertFileToText'

export default {
  state: {
    file1: [],
    file2: [],
    currentIndex: 0,
    currentStatus: ''
  },
  mutations: {
    setFile1 (state, payload) {
      state.file1 = payload
    },
    setFile2 (state, payload) {
      state.file2 = payload
    },
    setCurrentIndex (state, payload) {
      state.currentIndex = payload
    },
    resetState (state) {
      state.file1 = []
      state.file2 = []
      state.currentIndex = 0
    }
  },
  actions: {
    setFile1 ({ commit }, payload) {
      convertFileToText(payload)
        .then(value => commit('setFile1', value.split('\n')))
        .catch(err => console.log(err))
    },
    setFile2 ({ commit }, payload) {
      convertFileToText(payload)
        .then(value => commit('setFile2', value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
