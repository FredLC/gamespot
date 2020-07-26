import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home/index.vue';
import SignIn from './components/SignIn/index.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: SignIn },
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
