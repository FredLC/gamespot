import Vue from "vue";
import VueRouter from "vue-router";
import store from "./Store/store";

import Home from "./components/Home/index.vue";
import SignIn from "./components/SignIn/index.vue";
import Dashboard from "./components/Dashboard/index.vue";

Vue.use(VueRouter);

const authGuard = {
  beforeEnter: (to, from, next) => {
    if (store.state.admin.token) {
      next();
    } else {
      next("/");
    }
  },
};

const routes = [
  { path: "/", component: Home },
  { path: "/signin", component: SignIn },
  { path: "/dashboard", component: Dashboard, ...authGuard },
];

export default new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
