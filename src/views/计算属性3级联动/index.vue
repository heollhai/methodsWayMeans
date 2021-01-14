<template>
  <div>
    <h3>计算属性3级联动</h3>
    <el-select v-model="type1Name" placeholder="请选择">
      <el-option
        v-for="item in typeList1"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select v-model="type2Name" placeholder="请选择">
      <el-option
        v-for="item in typeList2"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select v-model="type3Name" placeholder="请选择1">
      <el-option
        v-for="item in typeList3"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button @click="type3Click()"></el-button>
  </div>
</template>

<script>
import { liandong } from "@/utils/api.js";
export default {
  name: "liandong",
  data() {
    return {
      liandong: [],
      type1Name: "湖南",
      type2Name: "永州",
      type3Name: "道县"
    };
  },
  created() {
    liandong().then(res => {
      this.liandong = res.data;
    });
  },
  methods: {},
  watch: {},
  computed: {
    //计算属性使用规则  实例
    typeList1: function() {
      //因为created  加载时改变了 this.liandong里面的值,
      //值发生了变化  所以会调用到这个方法    这样typeList1 里面就有值了
      return this.liandong;
    },
    typeList2: function() {
      //同理可得    当 v-model里面的 type1Name 的值发生了变化那么typeList2 方法会得到调用
      // 因为我设置了 type1Name: '湖南',默认值是为  湖南 第一次点击 1级类的时候   会把 type1Name里面的值改为 typeList1.id  所以发生了变化
      let value = [];
      this.typeList1.forEach(ele => {
        if (ele.id == this.type1Name) {
          value = ele.children;
        }
      });
      return value;
    },
    typeList3: function() {
      //同理可得    当 v-model里面的 type2Name 的值发生了变化那么typeList3 方法会得到调用
      let value = [];
      this.typeList2.forEach(ele => {
        if (ele.id == this.type2Name) {
          value = ele.children;
        }
      });
      return value;
    }
  }
};
</script>

<style></style>
