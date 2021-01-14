<template>
  <div class="header">
    <div class="headerPath">
      <i class="iconfont icon-caidan headerCss" @click="COLLAPSETYPE"></i>
      <el-breadcrumb separator="/" class="crumbs">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="currentMenu"
          :to="{ path: currentMenu.path }"
          >{{ currentMenu.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-dropdown trigger="click" size="mini">
      <span class="el-dropdown-link">
        <i class="iconfont icon-123 headerCss el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex"; //创建基于某个命名空间辅助函数
const { mapState, mapMutations } = createNamespacedHelpers("Crumbs"); //方法二 ;
export default {
  computed: {
    ...mapState(["menu", "currentMenu"])
  },
  methods: {
    ...mapMutations(["COLLAPSETYPE"])
  }
};
</script>

<style lang="scss" scoped="scoped">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .headerCss {
    font-size: 30px;
    color: $theme-bgcolor;
    border: none;
  }
  .headerPath {
    display: flex;
    align-items: center;
    .crumbs {
      margin-left: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
