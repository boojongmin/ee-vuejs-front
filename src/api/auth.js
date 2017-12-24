import axios from 'axios'
import qs from 'query-string'

export default {
  isValidToken (cb, errorCb) {
    axios.post('/api/ee/jwt/validate', qs.stringify({jwt: localStorage.getItem('ee.jwt')})).then((response) => {
      console.error('response', response)
      if (response.data.status) {
        cb()
      }
      else {
        errorCb()
      }
    }, () => {
      errorCb()
    })
  },
  isValidTokenCorutine (jwt) {
    return axios.post('/api/ee/jwt/validate', qs.stringify({jwt: jwt}))
    // return axios.post('/api/ee/jwt/validate', qs.stringify({jwt: jwt})).then(x => x.data.status).catch(x => console.error('error isValidTokenCorutine.'))
  },
  login (email, password, cb, errorCb) {
    axios.post('/api/ee/account/login', { email: email, password: password }).then((response) => {
      if (response.data.status) {
        cb(response.data.message)
      }
      else {
        errorCb()
      }
    }, () => {
      errorCb()
    })
  }
}
