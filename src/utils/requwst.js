import axios from "axios";
//引入ElementUI MESSAGE
import { Message } from "element-ui";

//创建axios的实例
const service = axios.create({
  baseURL: " http://localhost:3001" //'/api/',//'http://10.10.10.250:8001/',//api的根url地址
  // timeout:1500,//数据响应的过期时间
  //headers:{"Content-Type":"application/x-www-form-urlencoded"}//请求的文件类型的设置
});

// 添加请求拦截器， 做token的验证
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    /*
	 拼接 token 的值，token的验证需要后台支持；为了做后台项目时，防攻击；每次请求数据时需要设置并传递token，在后台进行验证，验证通过后，
	 服务器才会响应；如果验证不通过，后台会抱一个错误，让用户重新登录
	 */
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const res = response;
    if (res.status !== 200) {
      console.log(response);
      Message({
        message: res.msg,
        type: "error",
        duration: 2000
      });
    } else {
      return response;
    }
    return Promise.reject("error");
  },
  function(error) {
    // 对响应错误做点什么
    console.log(error);
    Message({
      message: error.msg,
      type: "error",
      duration: 2000
    });
    return Promise.reject(error);
  }
);

//输出
export default service;
