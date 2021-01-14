<template>
  <div>
    我的
    <vue-ueditor-wrap
      class="ueditorBox"
      v-model="msg"
      :config="myConfig"
    ></vue-ueditor-wrap>
    <el-button @click="dianji">内容</el-button>
  </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  name: "my",
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      msg: "",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口
        serverUrl: "这里自配"
      }
    };
  },
  methods: {
    dianji() {
      console.log("msg", this.msg);
    }
  }
};
</script>

<style>
.aa {
  width: 100px;
  height: 100px;
  background-color: #00ff00;
}

.bb {
  width: 1.851851rem;
  height: 1.851851rem;
  background-color: #00ff00;
}

.cc {
  width: 16.5%;
  height: 16.5%;
  background-color: #00ff00;
}
</style>
