<template>
  <div>
    这里是父组件
    {{ message }}
  </div>
</template>
<script>
export default {
  name: "extendUse",
  data() {
    return {
      message: "hello Vue",
      sayHello: "我是父组件里面的值"
    };
  },
  created() {},
  methods: {
    showMessage() {
      console.log("我是父组件里面的方法被继承调用");
    }
  }
};
</script>
