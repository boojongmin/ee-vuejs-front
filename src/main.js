// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import store from './store'
import { auth } from './api'

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: All,
  directives: All
})
// TODO ALL 컴포넌트는 성능에 영향을 미친다고한다. 테스트 필요
// Install Quasar Framework

All.Toast.setDefaults({
  // props from above
  color: '#eee',
  timeout: 1000
})

Vue.use(Vuelidate)

Vue.prototype.$http = axios

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

async function validateJwt () {
  let jwt = localStorage.getItem('ee.jwt')
  if (jwt) {
    try {
      const result = await auth.isValidTokenCorutine(jwt)
      return result.data.status
    }
    catch (e) {
      console.error('error validateJwt')
    }
  }
  return false
}

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/join') {
    next()
    return
  }

  if (store.state.auth.isAuthenticated) {
    next()
    return
  }
  validateJwt().then(x => {
    if (x) {
      store.state.auth.isAuthenticated = true
      next()
    }
    else {
      localStorage.removeItem('ee.jwt')
      alert('로그인 세션이 만되되었거나 잘못된 인증 시도입니다. 로그인페이지로 이동합니다.')
      next('/')
    }
  })
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})
