import * as aType from '../action-types'
import * as mType from '../mutation-types'
import api from '../../api/question'
// DB붙이면 없어질 state
const state = {
  jobQuestions: [],
  // {id: 1,jobName: 'hello', questions: ['1', '2']}
  jobQuestion: {},
  questionDetails: []
}

const mutations = {
  [mType.QM_LIST] (state, list) {
    state.jobQuestions = list
  },
  [mType.QM_DETAILS] (state, {jobQuestion, details}) {
    console.error('jq', jobQuestion)
    console.error('dd', details)
    state.jobQuestion = jobQuestion
    state.questionDetails = details
  }
}

const actions = {
  [aType.QM_LIST] ({commit, state}) {
    const list = api.list()
    list.then(x => {
      console.error('list', x)
      commit(mType.QM_LIST, x)
    })
  },
  async [aType.QM_DETAILS] ({commit, state}, jobQuestionId) {
    commit(mType.QM_DETAILS, {jobQuestion: state.jobQuestions.filter(x => x.id === jobQuestionId)[0], details: await api.details(jobQuestionId)})
  }
}

export default {
  state,
  // getters,
  mutations,
  actions
}
