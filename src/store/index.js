import Vue from "vue";
import Vuex from "vuex";
import evn from "./modules/datajs.js";
import evn1 from "./modules/datajs-2.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    evn,
    evn1
  }
});
