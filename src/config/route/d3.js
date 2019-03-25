const BaseContainer = () =>
  import( /* webpackChunkName: "Geo" */ 'Component/contents/southKorea/BaseContainer.vue')

const root = '/eunjiboard';
const d3Route = [
  {
    name: 'geoDashBoard',
    path: root.concat('/geoDashBoard'),
    component: BaseContainer
  }
]

export default d3Route;