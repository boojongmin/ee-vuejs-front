import axios from 'axios'
import qs from 'query-string'

export default {
  isValidToken (cb, errorCb) {
    axios.post('/ee/api/jwt/validate', qs.stringify({jwt: localStorage.getItem('ee.jwt')})).then((response) => {
      console.log(response)
      if (response.data.status) {
        cb()
      }
      else {
        errorCb()
      }
    }, () => {
      errorCb()
    })
  }
}
