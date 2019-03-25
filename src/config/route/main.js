const MainContainer = () =>
  import( /* webpackChunkName: "Main" */ 'Component/MainContainer.vue')

const GeoContainer = () =>
import( /* webpackChunkName: "Geo" */ 'Component/contents/southKorea/BaseContainer.vue')


const root = '/eunjiboard';
const MainRoute = [
  {
    name: 'main',
    path: '/main',
    component: MainContainer,
    props : (route) => ({query: route.query}),
    children: [
      { path: 'index', component: GeoContainer },
      { path: 'geoDashBoard', component: GeoContainer },
    ]
  }
]

export default MainRoute;