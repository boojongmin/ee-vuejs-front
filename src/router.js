import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '',
      name: '메인',
      redirect: '/dashboard',
      component: load('Full'),
      children: [
        {
          name: '대시보드',
          path: 'dashboard',
          component: load('dashboard/dashboard')
        },
        {
          name: '인터뷰셋',
          path: 'interviewset',
          redirect: '/interviewset/list',
          component: load('sub-layout'),
          children: [
            {
              name: '목록',
              path: 'list',
              component: load('interviewset/list')
            },
            {
              name: '인터뷰셋 ',
              path: 'form',
              component: load('interviewset/form')
            },
            {
              name: '인터뷰셋 ',
              path: 'form-step2/:key',
              component: load('interviewset/form-step2')
            },
            {
              name: '인터뷰 요청',
              path: 'request-interview',
              component: load('interviewset/request-interview')
            }
          ]
        },
        {
          name: 'interview-status',
          path: 'interview-status',
          component: load('interviewset/interview-status-list')
        }
      ]
    },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
