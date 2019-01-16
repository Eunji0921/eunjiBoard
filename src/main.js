import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import VueRouter from 'vue-router';


//axios통신
import axios from 'axios';
Vue.prototype.$http = axios;


//라우트설정
import router from 'Config/route';
Vue.use(VueRouter);

//상태관리
Vue.use(Vuex);

let vm = new Vue({
  el: '#app',
  render: h => h(App),
  router
});

window.vueApp = vm;
