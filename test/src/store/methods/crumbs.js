export default {
  namespaced: true, //带命名空间的模块    ****不要忘了
  state: {
    currentMenu: null,
    collapseType: false,
    tageList: [
      {
        path: "/",
        label: "首页",
        icon: "home"
      }
    ]
  },
  mutations: {
    // 控制左侧菜单栏的展开和收缩
    COLLAPSETYPE(state) {
      state.collapseType = !state.collapseType;
      console.log(state.collapseType, "state.collapseType");
    },
    // 标签页的添加
    SELCTMENT(state, val) {
      if (val.label !== "首页") {
        state.currentMenu = val;
        let result = state.tageList.findIndex(item => item.path === val.path);
        result === -1 ? state.tageList.push(val) : "";
      } else {
        state.currentMenu = null;
      }
    },
    // 标签页的删除
    CLOSETAB(state, val) {
      let result = state.tageList.findIndex(item => item.path === val.path);
      state.tageList.splice(result, 1);
    }
  }
};
