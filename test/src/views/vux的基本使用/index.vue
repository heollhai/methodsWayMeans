<template>
  <!-- 
	   获取vuex里面的值方式   : 	先引入   mapState 
			在 computed 里面拿到 vuex 里面的值 然后就可以直接使用了 
			
			
			调用 模块  Longin 里面的 ADDMENU  传值  router   过去
			store.commit("Longin/ADDMENU", router); 
	 -->
  <div>
    <div>vuex的一些基本使用</div>
    <div>
      <div style="color: red;">evn模块里面的值</div>
      {{ count1 }}直接获取vuex里面的值:{{ count }}
      <!-- 同步提交 -->
      <el-button @click="ADDCOUNT(10)">同步提交到vuex</el-button>{{ geter }}
      <el-button @click="count1Click">同步提交count1到vuex</el-button>
      <el-button @click="toHome"
        >去首页查看vuex更改后的值(先点击:同步提交count1到vuex,更改值)</el-button
      >
      <el-input v-model="count1.a" @keyup.enter.native="toHome" />
    </div>
    <div>
      <childer></childer>
    </div>
  </div>
</template>

<script>
// import store from "@/store/index.js";
import { mapState, mapMutations, mapGetters } from "vuex"; //方法一

import childer from "./childer.vue"; //方法二
export default {
  name: "vuex",
  components: {
    childer
  },
  created() {},
  mounted() {
    console.log(this.count, this.geter);
  },
  computed: {
    // 获取 vuex 里面 evn 模块中的两个值；
    // 方法一 :
    ...mapState("evn", ["count", "count1"]),
    ...mapGetters("evn", ["geter"])
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    //方法一 :
    // 获取  模块 evn 里面的  mutations 里面的方法   使用的时候直接用   ADDCOUNT  就行    ADDCOUNT(10) 可以带括号传参
    ...mapMutations("evn", ["ADDCOUNT", "ADDCOUNT1"]),

    // 直接更改  vuex 里面的值   直接同步生效
    count1Click() {
      this.count1.a = "我是更改后的值";
      this.count1.c = "我是新增的字段";
    },
    toHome() {
      this.$router.push("/");
    },
    // 测试 修饰符  （回车键）；
    enter() {
      console.log("点击了input框，，或者回车键出来了");
    }
  }
};
</script>

<style></style>
