<template>
  <div id="app" style="height: 100%;">
    <el-dialog title="菜单页" :visible.sync="BoxType">
      <div style="height: 400px;overflow-y: hidden;overflow-y: scroll;">
        <div
          v-for="(item, key) in options"
          :key="item.name"
          class="boxTypeContent"
          :class="{ clickColor: spanIndex === key }"
          @click="pathClick(item.path, key)"
        >
          {{ item.meat.name }}
        </div>
      </div>
    </el-dialog>
    <div id="nav">
      <el-button @click="BoxType = true">打 开 菜 单</el-button>
    </div>
    <keep-alive include="keepAliveUse">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      refresh: this.refresh
    };
  },
  watch: {},
  created() {
    this.options = this.$router.options.routes;
  },
  data() {
    return {
      spanIndex: -1, //单选（1） 使用
      BoxType: false,
      value: "",
      options: [],
      isRouterAlive: true
    };
  },
  mounted() {
    console.log(document.querySelector("#nav").offsetHeight, "lllll");
    console.log(document.body.offsetHeight, "kkk");
  },
  methods: {
    pathClick(path, key) {
      this.$router.push({
        path: path
      });
      this.spanIndex = key; //把值给到 spanIndex
    },
    // 关闭view 在打开  view 刷新页面
    refresh() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
        console.log("wo刷新了");
      });
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.el-dialog {
  padding: 0;
  margin: 0;
}

.clickColor {
  background-color: #04b2bf;
  color: #fff;
}

.boxTypeContent {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  display: inline-block;
  width: 24%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

* {
  font-size: 20px;
}

body {
  height: 100%;
}

#nav {
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: auto;
  height: 100px;
  box-shadow: 10px 10px 5px #888888;
  margin-top: 30px;
  margin-bottom: 30px;
}

// #nav{
// 	width:10rem;height:1.504rem;display: flex;position: fixed;bottom: 0;left: 0;
// 	a{
// 		flex: 1; display: flex;flex-direction:column ;margin: 0 0.4rem;text-align: center;
// 		text-decoration: none;color: #445356;
// 		div:nth-of-type(1){flex: 3; margin: 0.08rem  0.213333rem 0 0.213333rem;background-size: 155px;}
// 		div:nth-of-type(2){flex: 2;line-height: 24px;}
// 	}
// 	.router-link-exact-active{

// 		.nav_1{
// 			background: url('assets/小图标/底部.png') -0.053333rem -0px no-repeat;
// 			background-size: 155px;
// 		}
// 		.nav_2{
// 			background: url('assets/小图标/底部.png') -0.853333rem  -0px no-repeat;
// 			background-size: 155px;
// 		}
// 		.nav_4{
// 			background: url('assets/小图标/底部.png') -2.48rem 0px no-repeat;
// 			background-size: 155px;
// 		}
// 		.nav_5{
// 			background: url('assets/小图标/底部.png')  -3.36rem -0px no-repeat;
// 			background-size: 155px;
// 		}
// 	}
// 	.nav_1{
// 		background: url('assets/小图标/底部.png') -0.053333rem -0.906666rem no-repeat;
// 	}
// 	 .nav_2{
// 	 	background: url('assets/小图标/底部.png') -0.853333rem -0.906666rem no-repeat;
// 	 }
// 	 .nav_3{
// 	 	background: url('assets/小图标/底部.png') -1.653333rem -0.08rem no-repeat;
// 	 }
// 	 .nav_4{
// 	 	background: url('assets/小图标/底部.png') -2.48rem -0.906666rem no-repeat;
// 	 }
// 	 .nav_5{
// 	 	background: url('assets/小图标/底部.png') -3.36rem -0.906666rem no-repeat;
// 	 }
// }
</style>
