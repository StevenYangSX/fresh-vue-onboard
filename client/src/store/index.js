// https://vuex.vuejs.org/guide/
import Vue from "vue";
import Vuex from "vuex";

// *  javascript  module   ES6 new concept

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    token: "",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
  },
});

export default store;
