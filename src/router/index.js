import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import Home from "../views/home/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    //首页
    path: "/",
    name: "Home",
    component: Home
  },
  {
    //vuex
    path: "/vuexUse",
    name: "vuexUse",
    component: () =>
      import(
        /* webpackChunkName: "vuexUse" */ "../views/vux的基本使用/index.vue"
      )
  },
  {
    //公共方法的使用
    path: "/componentsUse",
    name: "componentsUse",
    component: () =>
      import(
        /* webpackChunkName: "componentsUse" */ "../views/公共方法的使用/index.vue"
      )
  },
  {
    //定制行
    path: "/customization",
    name: "Customization",
    component: () =>
      import(
        /* webpackChunkName: "customization" */ "../views/customization/index.vue"
      )
  },
  {
    //目的地
    path: "/destination",
    name: "Destination",
    component: () =>
      import(
        /* webpackChunkName: "destination" */ "../views/destination/index.vue"
      )
  },
  {
    //发现页
    path: "/discover",
    name: "Discover",
    component: () =>
      import(
        /* webpackChunkName: "discover" */ "../views/动态表格使用/index.vue"
      )
  },
  {
    //我的
    path: "/my",
    name: "My",
    component: () =>
      import(/* webpackChunkName: "my" */ "../views/my/index.vue")
  },
  {
    //正则使用
    path: "/regular",
    name: "Regular",
    component: () =>
      import(/* webpackChunkName: "regular" */ "../views/正则使用/index.vue")
  },
  {
    //element弹框
    path: "/popUp",
    name: "popUp",
    component: () =>
      import(/* webpackChunkName: "popUp" */ "../views/element弹框/index.vue")
  },
  {
    //element上传
    path: "/elementUploading",
    name: "ElementUploading",
    component: () =>
      import(
        /* webpackChunkName: "elementUploading" */ "../views/element上传/index.vue"
      )
  },
  {
    //百度地图
    path: "/baiduMap",
    name: "BaiduMap",
    component: () =>
      import(/* webpackChunkName: "baiduMap" */ "../views/百度地图/index.vue")
  },
  {
    //粤证图
    path: "/GuangdongTheFigure",
    name: "GuangdongTheFigure",
    component: () =>
      import(
        /* webpackChunkName: "GuangdongTheFigure" */ "../views/粤证图/index.vue"
      )
  },
  {
    //粤证图2
    path: "/GuangdongTheFigure2",
    name: "GuangdongTheFigure2",
    component: () =>
      import(
        /* webpackChunkName: "GuangdongTheFigure2" */ "../views/粤证图2/index.vue"
      )
  },
  {
    //单选多选
    path: "/oneMoreSelect",
    name: "oneMoreSelect",
    component: () =>
      import(
        /* webpackChunkName: "oneMoreSelect" */ "../views/单选多选/index.vue"
      )
  },
  {
    //分页
    path: "/fenye",
    name: "fenye",
    component: () =>
      import(/* webpackChunkName: "fenye" */ "../views/分页/index.vue")
  },
  {
    //计算属性，3级联动
    path: "/liangdong",
    name: "liangdong",
    component: () =>
      import(
        /* webpackChunkName: "liangdong" */ "../views/计算属性3级联动/index.vue"
      )
  },
  {
    //计算属性，3级联动
    path: "/async",
    name: "async",
    component: () =>
      import(/* webpackChunkName: "async" */ "../views/async使用/index.vue")
  },
  {
    //弹框实时获取父组件里面的值
    path: "/box",
    name: "box",
    component: () =>
      import(
        /* webpackChunkName: "box" */ "../views/弹框实时获取父组件里面的值/index.vue"
      )
  },
  {
    //表格封装
    path: "/biaoGeFengZhuang",
    name: "biaoGeFengZhuang",
    component: () =>
      import(
        /* webpackChunkName: "biaoGeFengZhuang" */ "../views/表格封装/index.vue"
      )
  },
  {
    //插槽
    path: "/chaChao",
    name: "chaChao",
    component: () =>
      import(/* webpackChunkName: "chaChao" */ "../views/插槽使用/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
