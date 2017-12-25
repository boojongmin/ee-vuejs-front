import * as gType from '../getter-types'
import * as aType from '../action-types'
import * as mType from '../mutation-types'
import api from '../../api/question'
// DB붙이면 없어질 state
const state = {
  jobQuestions: [],
  // {id: 1,jobName: 'hello'}
  jobQuestionId: 0,
  jobQuestion: {},
  questions: []
}

const getters = {
  [gType.QM_JOB_QUESTION] (state) {
    console.error('QM_JOB_QUESTION')
    return state.jobQuestion
  },
  [gType.QM_QUESTION_LIST] (state) {
    console.error('QM_QUESTION_LIST')
    return state.questions
  }
}

const mutations = {
  [mType.QM_LIST] (state, list) {
    state.jobQuestions = list
  },
  [mType.QM_JOB_QUESTION_ID] (state, jobQuestionId) {
    state.jobQuestionId = jobQuestionId
  },
  [mType.QM_DETAILS] (state, {jobQuestion, questions}) {
    console.error('QM_DETAILS', jobQuestion, questions)
    state.jobQuestion = jobQuestion
    state.questions = questions
  }
}

const actions = {
  [aType.QM_LIST] ({commit, state}) {
    const list = api.list()
    list.then(x => {
      commit(mType.QM_LIST, x)
    })
  },
  async [aType.QM_DETAILS] ({commit, state}, jobQuestionId) {
    commit(mType.QM_DETAILS, {
      jobQuestion: state.jobQuestions.filter(x => x.id === jobQuestionId)[0],
      questions: await api.details(jobQuestionId)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
