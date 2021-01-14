//引入封装好的axios
import request from "./requwst.js";

//获取  3级联动
export function liandong() {
  return request({
    url: "/liandong",
    method: "get"
  });
}
//获取测试数据
export function comments() {
  return request({
    url: "/comments",
    method: "get"
  });
}
//表格数据
export function biaoGe() {
  return request({
    url: "/biaoGe",
    method: "get"
  });
}
// //轮播
// export function SwiperList(){
//  return request({
//   url:'product/banner/getBySeller/4bc4027c645343f09a964b5c2e9f875b',
//   method:'get',
//  })
// }
//三级联动获取方式

//获取  post方式
// export function addprodutAttrList(data){
//  return request({
//   url:'index/Api/create_product_cate',
//   method:'post',
//   data:data
//  })
// }
