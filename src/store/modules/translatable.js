import convertFileToText from '@/utils/convertFileToText'

export const translatableNames = {
  setFile1: 'translatable/setFile1',
  setFile2: 'translatable/setFile2',
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
    file1: [],
    file2: [],
    preset: 'none',
    currentIndex: 0,
    translatedData: [],
    bufferTranslatedData: []
  },
  mutations: {
    [translatableNames.setFile1] (state, value) {
      state.file1 = value
    },
    [translatableNames.setFile2] (state, value) {
      state.file2 = value
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
      state.file1 = []
      state.file2 = []
    },
    [translatableNames.resetSecondaryState] (state) {
      state.currentIndex = 0
      state.translatedData = []
      state.bufferTranslatedData = []
    },
    [translatableNames.resetState] (state) {
      state.file1 = []
      state.file2 = []
      state.preset = 'none'
      state.currentIndex = 0
      state.translatedData = []
      state.bufferTranslatedData = []
    }
  },
  actions: {
    [translatableNames.setFile1] ({ commit }, file) {
      convertFileToText(file)
        .then(value => commit(translatableNames.setFile1, value.split('\n')))
        .catch(err => console.log(err))
    },
    [translatableNames.setFile2] ({ commit }, file) {
      if (!file) {
        commit(translatableNames.setFile2, [])
        return
      }
      convertFileToText(file)
        .then(value => commit(translatableNames.setFile2, value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
