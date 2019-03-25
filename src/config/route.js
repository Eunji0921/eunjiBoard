//메인
import MainRoute from './route/main'
// d3
import d3Route from './route/d3'

//에러페이지
const PageError = () =>
  import( /* webpackChunkName: "PageError" */ 'Component/error/error.vue')
const PageNotFound = () =>
  import( /* webpackChunkName: "PageNotFound" */ 'Component/error/404error.vue')

//css3 샘플
const sample_1 = () =>
  import( /* webpackChunkName: "sampleCss" */ 'Component/contents/css3Sample/responsive/sample_1.vue')


import VueRouter from 'vue-router'

const root = '/eunjiboard';
const routes = [
  {
    name: 'error',
    path: root.concat('/error'),
    component: PageError
  },
  {
    name: 'sample_1',
    path: root.concat('/sample_1'),
    component: sample_1
  }
]
.concat(MainRoute)
.concat(d3Route)
.concat({
  name: '404',
  path: root.concat('*'),
  component: PageNotFound
})


const router = new VueRouter({
  mode: 'history',
  routes: routes,
  //스크롤 이동 시 위치 to, from으로 분기 가능
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router;