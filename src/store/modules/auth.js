import * as mType from '../mutation-types.js'
import * as aType from '../action-types.js'
import * as gType from '../getter-types.js'
import api from '../../api/auth/auth.js'

const state = {
  isAuthenticated: false
}

const getters = {
  [gType.AUTH_IS_AUTHENTICATED]: state => state.isAuthenticated
}

const actions = {
  [aType.AUTH_CHECK_AUTH] ({commit, state}) {
    api.isValidToken(
      () => commit(mType.AUTH_SUCCESS),
      () => commit(mType.AUTH_FAILURE)
    )
  }
}

const mutations = {
  [mType.AUTH_SUCCESS] (state) {
    state.isAuthenticated = true
  },
  [mType.AUTH_FAILURE] () {
    state.isAuthenticated = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
