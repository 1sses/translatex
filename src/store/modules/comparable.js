import convertFileToText from '@/utils/convertFileToText'

export const comparableNames = {
  setFile1: 'comparable/setFile1',
  setFile2: 'comparable/setFile2',
  setCurrentIndex: 'comparable/setCurrentIndex',
  setCurrentStatus: 'comparable/setCurrentStatus',
  setNextSuccessLine: 'comparable/setNextSuccessLine',
  setMessages: 'comparable/setMessages',
  resetState: 'comparable/resetState'
}

export default {
  state: {
    file1: [],
    file2: [],
    currentIndex: 0,
    currentStatus: '',
    nextSuccessLine: 0,
    messages: []
  },
  mutations: {
    [comparableNames.setFile1] (state, payload) {
      state.file1 = payload
    },
    [comparableNames.setFile2] (state, payload) {
      state.file2 = payload
    },
    [comparableNames.setCurrentIndex] (state, payload) {
      state.currentIndex = payload
    },
    [comparableNames.setCurrentStatus] (state, payload) {
      state.currentStatus = payload
    },
    [comparableNames.setNextSuccessLine] (state, payload) {
      state.nextSuccessLine = payload
    },
    [comparableNames.setMessages] (state, payload) {
      state.messages = payload
    },
    [comparableNames.resetState] (state) {
      state.file1 = []
      state.file2 = []
      state.currentIndex = 0
      state.currentStatus = ''
      state.nextSuccessLine = 0
      state.messages = []
    }
  },
  actions: {
    [comparableNames.setFile1] ({ commit }, payload) {
      convertFileToText(payload)
        .then(value => commit(comparableNames.setFile1, value.split('\n')))
        .catch(err => console.log(err))
    },
    [comparableNames.setFile2] ({ commit }, payload) {
      convertFileToText(payload)
        .then(value => commit(comparableNames.setFile2, value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
