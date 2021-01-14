<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapseType"
  >
    <el-menu-item
      v-for="item in onAisdeMenuChilider"
      :index="item.path"
      :key="item.path"
      @click="selctMent(item)"
    >
      <i :class="item.icon" :key="item.path"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasAisdeMenuChilider"
      :index="item.label"
      :key="item.path"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          @click.native.stop="selctMent(subItme)"
          :index="item.path"
          v-for="subItme in item.children"
          :key="subItme.path"
        >
          <i :class="subItme.icon"></i>{{ subItme.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { createNamespacedHelpers } from "vuex"; //创建基于某个命名空间辅助函数
const { mapMutations, mapState } = createNamespacedHelpers("Crumbs"); //方法二 ;
export default {
  computed: {
    ...mapState(["collapseType"]),
    onAisdeMenuChilider() {
      return this.asideMenu.filter(item => !item.children);
    },
    hasAisdeMenuChilider() {
      return this.asideMenu.filter(item => item.children);
    }
  },
  mounted() {
    console.log(this.collapseType, "collapseType");
  },
  methods: {
    ...mapMutations(["SELCTMENT"]),
    selctMent(item) {
      this.$router.push(item.path);
      this.SELCTMENT(item);
      console.log(item);
    }
  },
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          label: "首页",
          icon: "iconfont icon-shouye icon"
        },
        {
          path: "/VideoManage",
          label: "视屏管理",
          icon: "iconfont icon-BAI-shiping icon"
        },
        {
          path: "/User",
          label: "用户管理",
          icon: "iconfont icon-yonghu icon"
        },
        {
          label: "其他",
          icon: "iconfont icon-qita icon",
          children: [
            {
              path: "/pageOne",
              label: "页面1",
              icon: "iconfont icon-yemian icon"
            },
            {
              path: "/pageTwo",
              label: "页面2",
              icon: "iconfont icon-yemian1 icon"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped="scoped">
.el-menu {
  height: 100%;
  border: none;
}
.icon {
  margin-right: 5px;
  color: #409eff;
}
</style>
