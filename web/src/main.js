import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import {Container} from 'element-ui';

const components = [
  Container
];

components.forEach((component) => {
  Vue.use(component);
})






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
