import * as gType from '../getter-types'
import * as aType from '../action-types'
import * as mType from '../mutation-types'
import api from '../../api/question'
// DB붙이면 없어질 state
const state = {
  jobQuestions: [],
  // {id: 1,jobName: 'hello'}
  jobQuestionId: 0
}

const getters = {
  [gType.QM_JOB_QUESTION] (state) {
    console.error('T-T', state)
    if (state.jobQuestionId !== 0) {
      const result = state.jobQuestions.filter(x => x.id === state.jobQuestionId)
      if (result.length > 0) {
        return result[0]
      }
      return {}
    }
  }
}

const mutations = {
  [mType.QM_LIST] (state, list) {
    state.jobQuestions = list
  },
  // [mType.QM_DETAILS] (state, {jobQuestion, details}) {
  //   state.jobQuestion = jobQuestion
  //   state.questionDetails = details
  // },
  [mType.QM_JOB_QUESTION_ID] (state, jobQuestionId) {
    state.jobQuestionId = jobQuestionId
  }
}

const actions = {
  [aType.QM_LIST] ({commit, state}) {
    const list = api.list()
    list.then(x => {
      console.error('list ', x)
      commit(mType.QM_LIST, x)
    })
  },
  async [aType.QM_DETAILS] ({commit, state}, jobQuestionId) {
    commit(mType.QM_DETAILS, {jobQuestion: state.jobQuestions.filter(x => x.id === jobQuestionId)[0], details: await api.details(jobQuestionId)})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
