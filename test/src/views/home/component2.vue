<template>
  <div>混入</div>
</template>

<script>
export default {
  name: "second",
  data() {
    return {
      value: "我是混入里面的值----7777"
    };
  },
  methods: {
    secondFunction(num) {
      console.log(num);
      console.log("我是混入里面的方法,调用成功");
    }
  }
};
</script>

<style></style>
