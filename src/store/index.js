import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import interviewset from './modules/interviewset'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    interviewset
  }
})

export default store
