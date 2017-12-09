import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import interviewset from './modules/interviewset'
import question from './modules/question'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    interviewset,
    question
  }
})

export default store
