import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Request from '@/utils/http.js'


// import {Container, Scrollbar, Avatar, Card, PageHeader} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// const components = [
//   Container,
//   Scrollbar,
//   Avatar,
//   Card,
//   PageHeader
// ];

// components.forEach((component) => {
//   Vue.use(component);
// })

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import * as THREE from 'three';

global.THREE = THREE;




Vue.config.productionTip = false;

/*---init axios---*/
Vue.prototype.$request = Request;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
