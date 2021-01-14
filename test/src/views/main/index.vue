<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <mian></mian>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./component/Aside.vue";
import Header from "./component/header.vue";
import Mian from "./component/mian.vue";
export default {
  name: "mainIndex",
  components: {
    Aside,
    Header,
    Mian
  }
};
</script>

<style lang="scss" scoped="scoped">
.el-header {
  padding: 0 30px;
  background-color: #333;
}
</style>
<style lang="scss">
.el-header {
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #666;
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>
