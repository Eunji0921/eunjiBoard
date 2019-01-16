const BaseContainer = () =>
  import( /* webpackChunkName: "Search" */ 'Component/southKorea/BaseContainer.vue')

const root = '/eunjiboard';
const d3Route = [
  {
    name: 'geo',
    path: root.concat('/geo'),
    component: BaseContainer
  }
]

export default d3Route;