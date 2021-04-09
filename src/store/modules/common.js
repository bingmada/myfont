const app = {
  state: {
    fieldDict: {},
    indexDict: {},
    sourceTypeDict: {},
    indexSelect: [],
    fieldSelect: [],
    sourceSelect: [],
    countrySelect: []
  },
  mutations: {
    SET_FIELD_DICT: (state, data) => {
      state.fieldDict = data
    },
    SET_INDEX_DICT: (state, data) => {
      state.indexDict = data
    },
    SET_SOURCE_TYPE_DICT: (state, data) => {
      state.sourceTypeDict = data
    },
    SET_INDEX_SELECT: (state, data) => {
      state.indexSelect = data
    },
    SET_FIELD_SELECT: (state, data) => {
      state.fieldSelect = data
    },
    SET_SOURCE_SELECT: (state, data) => {
      state.sourceSelect = data
    },
    SET_COUNTRY_SELECT: (state, data) => {
      state.countrySelect = data
    }
  }
}

export default app
