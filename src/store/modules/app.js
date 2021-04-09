const app = {
  state: {
    searchHistory: [],
    requestLoading: 0,
    importStep: 1,
    firstForm: '',
    secondList: [],
    thirdData: [],
    thirdFiled: [],
    fourthData: [],
    fifthForm: {},
    secondData: []
  },
  mutations: {
    SET_LOADING: (state, status) => {
      // error 的时候直接重置
      if (status === 0) {
        state.requestLoading = 0
        return
      }
      state.requestLoading = status ? ++state.requestLoading : --state.requestLoading
    },
    SET_SEARCH_HISTORY: (state, content) => {
      const type = content.type
      const data = content.data
      if (type === 'add') {
        const index = state.searchHistory.indexOf(data)
        if (index !== -1) {
          state.searchHistory.splice(index, 1)
        }
        state.searchHistory.unshift(data)
      } else if (type === 'deleteOne') {
        const index = state.searchHistory.indexOf(data)
        if (index !== -1) {
          state.searchHistory.splice(index, 1)
        }
      } else if (type === 'deleteAll') {
        state.searchHistory = []
      }
    },
    SET_IMPORT_STEP: (state, data) => {
      state.importStep = data
    },
    SET_FIRST_FORM: (state, data) => {
      state.firstForm = data
    },
    SET_SECOND_LIST: (state, data) => {
      state.secondList = data
    },
    SET_THIRD_DATA: (state, data) => {
      state.thirdData = data
    },
    SET_THIRD_FILED: (state, data) => {
      state.thirdFiled = data
    },
    SET_FOURTH_DATA: (state, data) => {
      state.fourthData = data
    },
    SET_FIFTH_FORM: (state, data) => {
      state.fifthForm = data
    },
    SET_SECOND_DATA: (state, data) => {
      state.secondData = data
    }
  },
  actions: {
    SetLoading ({ commit }, status) {
      commit('SET_LOADING', status)
    }
  }
}

export default app
