<template>
  <div>
   <!-- async使用 （1）:
    <el-button @click="ceshi2">点击console.log看结果 方法1使用</el-button>
    <div>
      我第一执行 {{ fun1 }} 我第二执行 {{ fun1_1 }} 我第三执行 {{ fun1_2 }}
    </div>

    <el-button @click="shiyongFun2"
      >第二种点我先去拿数据 在 赋值给下一位</el-button
    > -->

    <!--
			方法3 是先执行了   一个定时器，，后面再执行了axios去拿数据，，然后在吧值赋值给了
			 this.names  在打印结果，，，一切正常；
		 -->
   <!-- 提交到主分支 我修改了主分支里面的内容 等下测试冲突用1我在改一下
    <el-button @click="fun3">第三种点我先去拿数据 在 赋值给下一位</el-button>
    测试版本回退 -->
  </div>
</template>

<!-- <script>
import { comments, liandong } from "@/utils/api";
export default {
  name: "async",
  data() {
    return {
      fun1: "",
      fun1_1: "",
      fun1_2: "",
      //方法2 使用的值
      addrArr: [
        {
          addr: "江门市蓬江区"
        },
        {
          addr: "江门市台山市"
        },
        {
          addr: "深圳"
        },
        {
          addr: "中山"
        },
        {
          addr: "广东"
        }
      ],
      addr: [],

      //方法3  使用的值
      names: []
    };
  },
  mounted() {},
  methods: {
    //使用方法 3:
    setTiomeFun() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(console.log("我先执行，，在拿值setTiomeFun2里面的值"));
        }, 3000);
      });
    },
    setTiomeFun2() {
      return new Promise(resolve => {
        let value = [];
        liandong().then(res => {
          res.data.forEach(ele => {
            value.push(ele.name);
            console.log("我是settimefun2里面的内容");
            resolve(value);
          });
        });
      });
    },
    async fun3() {
      await this.setTiomeFun();
      this.names = await this.setTiomeFun2();
      await console.log(this.names, ";names");
    },

    //使用方法 2:
    async shiyongFun2() {
      console.log(1);
      await this.fun2(this.addr);
      await this.foubleAfter2seconds(99);
    },
    //方法 2:
    fun2(value) {
      return new Promise((resolve, reject) => {
        this.addrArr.forEach(ele => {
          $.ajax({
            url: "https://restapi.amap.com/v3/geocode/geo",
            type: "get",
            dataType: "jsonp",
            data: {
              key: "6e7239cd1f1aaf595bca3753a67986f8",
              address: ele.addr
            },
            success: function(data) {
              resolve(value.push(data.geocodes[0].location));
            }
          });
        });
      });
    },
    //使用方法  1
    async ceshi2() {
      await this.foubleAfter2seconds(99);
      await this.shiyishi(30);
      await this.shiyishi2(30);
    },
    foubleAfter2seconds(num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(this.addr, "this.addr");
          resolve((this.fun1 = num * 2));
        }, 3000);
      });
    },
    shiyishi(num) {
      return (
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve((this.fun1_1 = num * 2));
          }, 2000);
        }).then(res => {
          //成功回调函数
          console.log("我成功了");
        }),
        err => {
          //失败回调函数
          console.log("我失败了");
        }
      );
    },
    shiyishi2(num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve((this.fun1_2 = num * 2));
        }, 1000);
      });
    }
  }
};
</script> -->

<style></style>
