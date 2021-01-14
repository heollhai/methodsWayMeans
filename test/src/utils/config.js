import axios from "axios";

//创建axios实例
const service = axios.create({
  //设置请求超时时间
  timeout: 3000
});
//设置请求拦截器
// 添加请求拦截器， 做token的验证
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么  例如：
    // config.headers['token'] = getToken();// 让每个请求携带自定义token 请根据实际情况自行修改
    return config;
  },
  error => {
    console.log(error);
  }
);
service.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  err => {
    console.log(err);
  }
);

export default service;
