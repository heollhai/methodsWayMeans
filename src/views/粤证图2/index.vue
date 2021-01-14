<template>
  <div>
    <iframe
      id="mainIframe"
      ref="mainIframe"
      name="mainIframe"
      src="../../../static/static/indexss.html"
      style="width: 1200px;height: 400px;"
    ></iframe>
    <el-button @click="getData()">点击获取iframe数据</el-button>
    <el-button @click="setData('我是vue数据')">向iframe中发送数据</el-button>
  </div>
</template>
<script>
// 工具类
export default {
  name: "wps-edit",
  props: {},
  mounted() {
    const mapFrame = this.$refs["mainIframe"];
    console.log(mapFrame, "mapFrame");
    if (mapFrame.attachEvent) {
      // 兼容浏览器判断
      mapFrame.attachEvent("onload", function() {
        console.log(iframeWin, "iframeWin");
        const iframeWin = mapFrame.contentWindow;
        iframeWin.postMessage("初始化值", "*");

        // data传递的参数   *写成子页面的域名或者是ip
      });
    } else {
      mapFrame.onload = function() {
        const iframeWin = mapFrame.contentWindow;
        // console.log(iframeWin,"iframeWin")
        iframeWin.postMessage("初始化值", "*");
      };
    }
  },
  methods: {
    loaded() {
      const vm = this.$refs.mainIframe.contentWindow.vm;
      console.log(vm, "lll");
      // vm.func1()
    },
    getData() {
      const obj1 = window.frames["mainIframe"]; // 获得对应iframe的window对象
      alert(obj1.aaaaa);
    },
    getWpsData() {
      return "wps数据";
    },
    setData(data) {
      const obj1 = window.frames["mainIframe"]; // 获得对应iframe的window对象
      console.log(1);
      obj1.wpsData = "设置的数据";
    }
  }
};
</script>

<style lang="scss"></style>
