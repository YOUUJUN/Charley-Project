import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Request from '@/utils/http.js'


import {Container, Scrollbar, Avatar, Card} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Container,
  Scrollbar,
  Avatar,
  Card
];

components.forEach((component) => {
  Vue.use(component);
})



Vue.config.productionTip = false;

/*---init axios---*/
Vue.prototype.$request = Request;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
