import convertFileToText from '@/utils/convertFileToText'

export const analyzedNames = {
  setFile: 'analyzed/setFile',
  setName: 'analyzed/setName',
  setType: 'analyzed/setType',
  resetSecondaryState: 'analyzed/resetSecondaryState',
  resetState: 'analyzed/resetState'
}

export default {
  state: {
    file: [],
    name: '',
    type: 'unknown'
  },
  mutations: {
    [analyzedNames.setFile] (state, file) {
      state.file = file
    },
    [analyzedNames.setName] (state, name) {
      state.name = name
    },
    [analyzedNames.setType] (state, type) {
      state.type = type
    },
    [analyzedNames.resetSecondaryState] (state) {
      state.name = ''
      state.type = 'unknown'
    },
    [analyzedNames.resetState] (state) {
      state.file = []
      state.name = ''
      state.type = 'unknown'
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
