import convertFileToText from '@/utils/convertFileToText'

export const analyzedNames = {
  setFile: 'analyzed/setFile',
  setDisplayedFile: 'analyzed/setDisplayedFile',
  setName: 'analyzed/setName',
  setType: 'analyzed/setType',
  setDuplicatedParts: 'analyzed/setDuplicatedParts',
  resetSecondaryState: 'analyzed/resetSecondaryState',
  resetState: 'analyzed/resetState'
}

export default {
  state: {
    file: [],
    displayedFile: [],
    name: '',
    type: '',
    duplicatedParts: []
  },
  mutations: {
    [analyzedNames.setFile] (state, file) {
      state.file = file
    },
    [analyzedNames.setDisplayedFile] (state, file) {
      state.displayedFile = file
    },
    [analyzedNames.setName] (state, name) {
      state.name = name
    },
    [analyzedNames.setType] (state, type) {
      state.type = type
    },
    [analyzedNames.setDuplicatedParts] (state, duplicatedParts) {
      state.duplicatedParts = duplicatedParts
    },
    [analyzedNames.resetSecondaryState] (state) {
      state.displayedFile = []
      state.name = ''
      state.type = ''
      state.duplicatedParts = []
    },
    [analyzedNames.resetState] (state) {
      state.file = []
      state.displayedFile = []
      state.name = ''
      state.type = ''
      state.duplicatedParts = []
    }
  },
  actions: {
    [analyzedNames.setFile] ({ commit }, file) {
      commit(analyzedNames.setName, file.name)
      convertFileToText(file)
        .then(value => commit(analyzedNames.setFile, value.split('\n')))
        .catch(err => console.log(err))
    }
  }
}
