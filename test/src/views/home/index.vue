<!-- 
 
	exentd  继承只能继承一个
	   
	mixins  混入可以有多个   如果混入多个 里面的值相同   会取最后一个 注册 混入的 值
 -->

<template>
  <div>
    {{ sayHello }}
    <el-button @click="secondFunction(9)">调用混入里面的方法</el-button>
    {{ value }}
    <div>我是vuex里面的count1{{ cont1 }}</div>
    <div>我是vuex里面的evnBaseInfo :{{ evnBaseInfo.eventName }}</div>
    <template v-for="itme in datas"> {{ itme }}--- </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import parent2 from "./component2.vue";
import parent3 from "./component3.vue";
import parent from "./component.vue";
export default {
  name: "homeUse",
  extends: parent,
  mixins: [parent3, parent2],
  data() {
    return {
      datas: {
        a: "1",
        b: "2",
        c: "3"
      },
      sayHello: "我继承父组件，，改变父组件的值"
    };
  },
  computed: {
    ...mapState({
      cont1: state => state.evn.count1
    }),
    ...mapState("evn1", ["evnBaseInfo"])
  },
  created() {
    this.showMessage(9);
    let data = {
      a: 1,
      b: 2,
      c: 3
    };
    // let List = [1, 2, 9, 4, 5, 6, 7, 8];
    for (var i in data) {
      console.log(i);
    }
    // for(var x of data){
    // 	console.log(x);
    // }
    // for (var i in List) {
    //   console.log(i, "i");
    // }
    // for (var i of List) {
    //   console.log(i, "iiiii");
    // }
    console.log(this.value, "我是混入进来的值");
  }
};
</script>

<style></style>
