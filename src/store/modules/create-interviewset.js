import * as mType from '../mutation-types.js'
// import * as aType from '../action-types.js'
import * as gType from '../getter-types.js'
// import Vue from 'vue'
// import api from '../../api/auth/auth.js'

const state = {
  name: '',
  tags: [{ key: 'common', label: '일반 질문', questions: [] }],
  selectedTag: undefined,
  interviewsets: []
}

const getters = {
  [gType.INTERVIEWSET_LIST]: state => state.interviewsets,
  [gType.INTERVIEWSET_NAME]: state => state.name,
  [gType.INTERVIEWSET_TAGS]: state => state.tags,
  [gType.INTERVIEWSET_TAG]: state => {
    let tag = state.tags.filter(x => x.key === state.selectedTag)[0]
    if (tag !== undefined) {
      return tag
    }
    else {
      // console.log('g_tag_error')
      return {}
    }
  },
  [gType.INTERVIEWSET_TAG_QUESTIONS]: state => {
    let tag = state.tags.filter(x => x.key === state.selectedTag)[0]
    if (tag !== undefined) {
      return tag.questions
    }
    else {
      // console.log('error when tag questions')
      return []
    }
  }
}

// const actions = {
//   [aType.INTERVIEWSET_UPDATE_NAME] ({commit, state}) {
//     api.isValidToken(
//       () => commit(mType.AUTH_SUCCESS),
//       () => commit(mType.AUTH_FAILURE)
//     )
//   }
// }
//
const mutations = {
  [mType.INTERVIEWSET_INIT] (state) {
    state.name = ''
    state.tags = [{ key: 'common', label: '일반 질문', questions: [] }]
    state.selectedTag = undefined
  },
  [mType.INTERVIEWSET_UPDATE_NAME] (state, name) {
    state.name = name
  },
  [mType.INTERVIEWSET_ADD_TAG] (state, tag) {
    state.tags.push({ key: tag.key, label: tag.label, questions: [] })
  },
  [mType.INTERVIEWSET_UPDATE_SELECTED_TAG] (state, selectedTag) {
    let tag = state.tags.filter(x => x.key === selectedTag)[0]
    if (tag !== undefined) {
      state.selectedTag = selectedTag
    }
    else {
      state.selectedTag = undefined
    }
  },
  [mType.INTERVIEWSET_UPDATE_TAG_QUESTION] (state, param) {
    let tag = state.tags.filter(x => x.key === param.tag.key)[0]
    if (tag !== undefined) {
      console.log('state>>>> ', state)
    }
    else {
      alert('오류가 발생했습니다.')
    }
  }
}

export default {
  state,
  getters,
  mutations/*,
  actions,
  mutations */
}
