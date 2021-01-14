import { EVENT_INFO_FIELD } from "../../views/storedata/datajs.js";
const evn = {
  namespaced: true, //带命名空间的模块    ****不要忘了
  state: {
    evnBaseInfo: EVENT_INFO_FIELD,
    count: 1,
    count1: {
      a: 1,
      b: 1
    }
  },
  mutations: {
    SETBASEINFO: (state, info) => {
      state.evnBaseInfo = info;
    },
    ADDCOUNT: (state, n) => {
      state.count += n;
    },
    ADDCOUNT1: (state, str) => {
      state.count1 = str;
    }
  },
  actions: {
    setBaseInfo({ commit, state }, info) {
      commit("SETBASEINFO", info);
    }
  },
  getters: {
    geter(state) {
      return state.count * 2;
    }
  }
};
export default evn;
