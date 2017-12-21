import * as mType from '../mutation-types.js'
import * as aType from '../action-types.js'
import * as gType from '../getter-types.js'
import api from '../../api/auth.js'

const state = {
  isAuthenticated: false
}

const getters = {
  [gType.AUTH_IS_AUTHENTICATED]: state => state.isAuthenticated
}

const actions = {
  [aType.AUTH_LOGIN] ({commit, state}, param) {
    let cb = param.cb
    let errorCb = param.errorCb
    api.login(param.email, param.password,
      // 이렇게가지 미련하게 파라메터를 던져서 token을 돌려야하는거면... 흠... 코드 리팩토링이 필요할듯. 지쳐서 오늘은 GG
      (token) => {
        commit(mType.AUTH_LOGIN_SUCCESS)
        cb(token)
      },
      () => {
        commit(mType.AUTH_LOGIN_FAILURE)
        errorCb()
      }
    )
  },
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
  },
  [mType.AUTH_LOGIN_SUCCESS] (state) {
    state.isAuthenticated = true
  },
  [mType.AUTH_LOGIN_FAILURE] () {
    state.isAuthenticated = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
