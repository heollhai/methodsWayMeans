<template>
  <div>
    <el-button @click="dataMsg">点我获取data里面的值</el-button>
    <div></div>
    我是data里面的数据:
    <div>{{ msg }}</div>
  </div>
</template>
<!--
  
  首次进入组件时：beforeRouteEnter > beforeCreate > created > mounted > activated > ... ... > beforeRouteLeave > deactivated
  
  再次进入组件时：beforeRouteEnter > activated > ... ... > beforeRouteLeave > deactivated
  -->
<script>
export default {
  name: "keepAliveUse",
  data() {
    return {
      msg: "",
      route: "",
      activatedType: true
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      //这样可以调用this    此处的vm代表this
      // 获取路由路径
      vm.route = from.path;
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.route === to.path) {
      this.activatedType = true;
    } else {
      this.activatedType = false;
    }
    next();
  },
  methods: {
    dataMsg() {
      let msg = sessionStorage.getItem("msg");
      if (msg !== "") {
        this.msg = msg;
      } else {
        let name = this.$router.options.routes.filter(
          res => res.path == this.route
        );
        this.activatedType === true
          ? (this.msg = `我是-----${name[0].meat.name}------里面的数据，，退回上一个页面我还在`)
          : (this.msg = "");
      }
    }
  },
  activated() {
    let arr1 = [
      { name: "1", age: "1" },
      { name: "2", age: "2" },
      { name: "3", age: "5 " },
      { name: "4", age: "4" }
    ];
    let a;
    for (var i of arr1) {
      console.log(i, "i");
    }
    console.log(a, "a");
  },
  deactivated() {
    if (!this.activatedType) {
      this.msg = "";
    } else {
      sessionStorage.setItem("msg", this.msg);
    }
  }
};
</script>

<style></style>
