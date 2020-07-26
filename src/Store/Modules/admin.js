import Vue from 'vue';

const API_KEY = process.env.VUE_APP_API_KEY;
const firebaseAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    authFailed: false,
  },
  getters: {},
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;
    },
    authFailed(state, type) {
      if (type === 'reset') {
        state.authFailed = false;
      } else {
        state.authFailed = true;
      }
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
          commit('authUser', {
            ...authData,
            type: 'signin',
          });
          localStorage.setItem('token', authData.idToken);
          localStorage.setItem('refresh', authData.refreshToken);
        })
        .catch(() => {
          commit('authFailed');
        });
    },
  },
};

export default admin;
