import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Vuex from "vuex";
import store from "./store/index";
import router from "./router/index";
Vue.use(ViewUI);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
