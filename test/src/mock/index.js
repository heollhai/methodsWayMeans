import Mock from "mockjs";
import homeApi from "./home.js";

//设置mock延时，请求数据

Mock.setup({
  timeout: "200-600"
});
//首页相关数据
//拦截的是/home/getData
Mock.mock(/\/home\/getData/, "get", homeApi.getHomeData);
