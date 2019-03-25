const MainContainer = () =>
  import( /* webpackChunkName: "Main" */ 'Component/MainContainer.vue')

const root = '/eunjiboard';
const MainRoute = [
  {
    name: 'main',
    path: root.concat('/main'),
    component: MainContainer
  }
]

export default MainRoute;