import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    //首页
    path: "/",
    name: "home",
    meat: {
      name: "首页"
    },
    component: Home
  },
  {
    //vuex
    path: "/vuexUse",
    name: "vuexUse",
    meat: {
      name: "vuex"
    },
    component: () =>
      import(
        /* webpackChunkName: "vuexUse" */
        "../views/vux的基本使用/index.vue"
      )
  },
  {
    //公共方法的使用
    path: "/componentsUse",
    name: "componentsUse",
    meat: {
      name: "公共方法的使用"
    },
    component: () =>
      import(
        /* webpackChunkName: "componentsUse" */
        "../views/公共方法的使用/index.vue"
      )
  },
  {
    //定制行
    path: "/customization",
    name: "Customization",
    meat: {
      name: "定制行"
    },
    component: () =>
      import(
        /* webpackChunkName: "customization" */
        "../views/customization/index.vue"
      )
  },
  {
    //目的地
    path: "/destination",
    name: "Destination",
    meat: {
      name: "目的地"
    },
    component: () =>
      import(
        /* webpackChunkName: "destination" */
        "../views/destination/index.vue"
      )
  },
  {
    //发现页
    path: "/discover",
    name: "Discover",
    meat: {
      name: "发现页"
    },
    component: () =>
      import(
        /* webpackChunkName: "discover" */
        "../views/动态表格使用/index.vue"
      )
  },
  {
    //我的
    path: "/my",
    name: "My",
    meat: {
      name: "我的"
    },
    component: () =>
      import(/* webpackChunkName: "my" */ "../views/my/index.vue")
  },
  {
    //正则使用
    path: "/regular",
    name: "Regular",
    meat: {
      name: "正则使用"
    },
    component: () =>
      import(/* webpackChunkName: "regular" */ "../views/正则使用/index.vue")
  },
  {
    //element弹框
    path: "/popUp",
    name: "popUp",
    meat: {
      name: "element弹框"
    },
    component: () =>
      import(/* webpackChunkName: "popUp" */ "../views/element弹框/index.vue")
  },
  {
    //element上传
    path: "/elementUploading",
    name: "ElementUploading",
    meat: {
      name: "element上传"
    },
    component: () =>
      import(
        /* webpackChunkName: "elementUploading" */
        "../views/element上传/index.vue"
      )
  },
  {
    //百度地图
    path: "/baiduMap",
    name: "BaiduMap",
    meat: {
      name: "百度地图"
    },
    component: () =>
      import(/* webpackChunkName: "baiduMap" */ "../views/百度地图/index.vue")
  },
  {
    //单选多选
    path: "/oneMoreSelect",
    name: "oneMoreSelect",
    meat: {
      name: "单选多选"
    },
    component: () =>
      import(
        /* webpackChunkName: "oneMoreSelect" */
        "../views/单选多选/index.vue"
      )
  },
  {
    //分页
    path: "/fenye",
    name: "fenye",
    meat: {
      name: "分页"
    },
    component: () =>
      import(/* webpackChunkName: "fenye" */ "../views/分页/index.vue")
  },
  {
    //计算属性，3级联动
    path: "/liangdong",
    name: "liangdong",
    meat: {
      name: "计算属性3级联动"
    },
    component: () =>
      import(
        /* webpackChunkName: "liangdong" */
        "../views/计算属性3级联动/index.vue"
      )
  },
  {
    //async
    path: "/async",
    name: "async",
    meat: {
      name: "async"
    },
    component: () =>
      import(/* webpackChunkName: "async" */ "../views/async使用/index.vue")
  },
  {
    //弹框实时获取父组件里面的值
    path: "/box",
    name: "box",
    meat: {
      name: "弹框实时获取父组件里面的值"
    },
    component: () =>
      import(
        /* webpackChunkName: "box" */
        "../views/弹框实时获取父组件里面的值/index.vue"
      )
  },
  {
    //表格封装
    path: "/biaoGeFengZhuang",
    name: "biaoGeFengZhuang",
    meat: {
      name: "表格封装"
    },
    component: () =>
      import(
        /* webpackChunkName: "biaoGeFengZhuang" */
        "../views/表格封装/index.vue"
      )
  },
  {
    //插槽
    path: "/chaChao",
    name: "chaChao",
    meat: {
      name: "插槽"
    },
    component: () =>
      import(/* webpackChunkName: "chaChao" */ "../views/插槽使用/index.vue")
  },
  {
    //keep-alive的使用
    path: "/keepAlive",
    name: "KeepAlive",
    meat: {
      name: "keep-alive"
    },
    component: () =>
      import(
        /* webpackChunkName: "chaChao" */
        "../views/keep-alive的使用/index.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
