import axios from 'axios'

export default {
  list () {
    return axios.get('/api/auth/ee/jobquestion', {headers: {Authorization: 'Bearer ' + localStorage.getItem('ee.jwt')}})
      .then((r) => r.data)
      .catch(e => console.error(e))
  },
  details (jobQuestionId) {
    return axios.get(`/api/auth/ee/jobquestion/${jobQuestionId}`, {headers: {Authorization: 'Bearer ' + localStorage.getItem('ee.jwt')}})
      .then((r) => r.data)
      .catch(e => console.error(e))
  }
}
