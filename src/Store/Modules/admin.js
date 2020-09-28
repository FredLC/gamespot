import Vue from "vue";
import router from "../../routes";

const API_KEY = process.env.VUE_APP_API_KEY;
const firebaseAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    authFailed: false,
    refreshLoading: true,
  },
  getters: {
    isAuth(state) {
      if (state.token) {
        return true;
      }
      return false;
    },
    refreshLoading(state) {
      return state.refreshLoading;
    },
  },
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;

      if (authData.type === "signin") {
        router.push("/dashboard");
      }
    },
    authFailed(state, type) {
      if (type === "reset") {
        state.authFailed = false;
      } else {
        state.authFailed = true;
      }
    },
    logoutUser(state) {
      state.token = null;
      state.refresh = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refresh");

      router.push("/");
    },
    refreshLoading(state) {
      state.refreshLoading = false;
    },
  },
  actions: {
    signin({ commit }, payload) {
      Vue.http
        .post(`${firebaseAuth}`, {
          ...payload,
          returnSecureToken: true,
        })
        .then((response) => response.json())
        .then((authData) => {
          commit("authUser", {
            ...authData,
            type: "signin",
          });
          localStorage.setItem("token", authData.idToken);
          localStorage.setItem("refresh", authData.refreshToken);
        })
        .catch(() => {
          commit("authFailed");
        });
    },
    refreshToken({ commit }) {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        Vue.http
          .post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          })
          .then((response) => response.json())
          .then((authData) => {
            commit("authUser", {
              idToken: authData.id_token,
              refreshToken: authData.refresh_token,
              type: "refresh",
            });
            commit("refreshLoading");

            localStorage.setItem("token", authData.id_token);
            localStorage.setItem("refresh", authData.refresh_token);
          });
      } else {
        commit("refreshLoading");
      }
    },
  },
};

export default admin;
