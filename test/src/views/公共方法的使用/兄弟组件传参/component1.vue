<template>
  <div>我是兄弟组件传参 2 页面 1里面传过来的值是:{{ value }}</div>
</template>

<script>
import bus from "@/components/bus";
export default {
  name: "brother",
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    bus.$on("data", res => {
      this.value = res;
    });
  }
};
</script>

<style></style>
