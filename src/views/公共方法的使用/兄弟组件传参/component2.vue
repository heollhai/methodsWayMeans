<template>
  <div>
    我是兄弟组件传参 1页面
    <el-button @click="brother">点击传值给兄弟组件传参2页面</el-button>
  </div>
</template>

<script>
import bus from "@/components/bus";
export default {
  name: "brother",
  data() {
    return {
      value: "我是传参1里面的  value"
    };
  },
  methods: {
    brother() {
      bus.$emit("data", this.value);
    }
  }
};
</script>

<style></style>
