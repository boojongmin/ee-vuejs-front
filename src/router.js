import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

let router = new VueRouter({
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
      name: '회원',
      path: '/',
      component: load('account/Full'),
      children: [
        {
          name: '로그인',
          path: '/',
          component: load('account/login')
        },
        {
          name: '계정 생성',
          path: '/join',
          component: load('account/join')
        }
      ]
    },
    {
      path: '/',
      name: '메인',
      component: load('Full'),
      children: [
        {
          name: '대시보드',
          path: '/dashboard',
          component: load('dashboard/dashboard'),
          auth: true
        },
        {
          name: '인터뷰셋',
          path: '/interviewset',
          redirect: '/interviewset/list',
          component: load('sub-layout'),
          children: [
            {
              name: '목록',
              path: '/list',
              component: load('interviewset/list')
            },
            {
              name: '인터뷰셋',
              path: '/form',
              component: load('interviewset/form')
            },
            {
              name: '인터뷰셋2',
              path: '/form-step2/:key',
              component: load('interviewset/form-step2')
            },
            {
              name: '인터뷰 요청',
              path: '/request-interview',
              component: load('interviewset/request-interview')
            }
          ]
        },
        {
          name: '직종별 질문 관리',
          path: '/question',
          redirect: '/question/list',
          component: load('sub-layout'),
          children: [
            {
              name: '직종별 질문 목록',
              path: 'list',
              component: load('question/list')
            },
            {
              name: '질문 생성',
              path: 'create',
              component: load('question/create')
            },
            {
              name: '질문 상세',
              path: 'detail',
              component: load('question/detail')
            },
            {
              name: '질문 수정',
              path: 'update',
              component: load('question/update')
            }

          ]
        },
        {
          name: '인터뷰 요청',
          path: '/request',
          redirect: '/request/list',
          component: load('sub-layout'),
          children: [
            {
              name: '목록',
              path: 'list',
              component: load('request/list')
            },
            {
              name: '인터뷰 요청하기',
              path: 'create/:id',
              component: load('request/create')
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

export default router
