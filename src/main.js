import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import router from './routes';
import store from './Store/store.js';
import vuelidate from 'vuelidate';

import Button from './components/UI/Button.vue';

import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.component('Button', Button);

Vue.use(MdCard);

Vue.use(VueResource);
Vue.http.options.root = '';

Vue.use(vuelidate);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
