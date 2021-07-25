import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utls from "./utils/utils";
import Toast from "./components/global/toastJS";
Vue.prototype.$toast = Toast;
Vue.prototype.$utls = utls;
Vue.prototype.$clientType = utls.isAndroid() ? 1 : 2;

Vue.prototype.$channelNo = utls.GetUrlParam("channelNo")
  ? utls.GetUrlParam("channelNo")
  : "test";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
