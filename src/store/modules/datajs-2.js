import { EVENT_INFO_FIELD } from "../../views/storedata/datajs.js";
const evn1 = {
  namespaced: true, //带命名空间的模块    ****不要忘了
  state: {
    evnBaseInfo: EVENT_INFO_FIELD,
    evn1_1: 10,
    evn1_2: {
      a: 10,
      b: 10
    }
  },
  mutations: {
    SETBASEINFO: (state, info) => {
      state.evnBaseInfo = info;
    },
    ADDCOUNT: (state, n) => {
      state.evn1_1 += n;
    },
    ADDCOUNT1: (state, str) => {
      state.evn1_2 = str;
    }
  },
  actions: {
    setBaseInfo({ commit, state }, info) {
      commit("SETBASEINFO", info);
    }
  },
  getters: {
    geter: state => {
      return state.evn1_2 * 10;
    }
  }
};
export default evn1;
