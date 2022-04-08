import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// import {Container, Scrollbar} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// const components = [
//   Container,
//   Scrollbar
// ];

// components.forEach((component) => {
//   Vue.use(component);
// })

import Element from 'element-ui';

Vue.use(Element);




Vue.config.productionTip = false;

/*---init axios---*/
Vue.prototype.$axios = axios.create({
  baseURL : "http://localhost:3000"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
