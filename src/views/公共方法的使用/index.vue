<template>
  <div style="height: 2000px;" id="box">
    <!-- 自定义指令 -->
    <customInstruction ref="instruction"></customInstruction>
    公共方法的使用: 1: 防抖 2: 节流 3: 自定义指令 4: 创建vue实例兄弟组件传参;
    <!-- 
			防抖的使用:
				点击一秒以后再触发，，一秒内多次点击已最后一次开始计算
		 -->
    <el-button @click="antiShake()">防抖使用</el-button>
    <!--   如果isFixes ==  true  那么 class =  colorRed -->
    <div :class="isFixed ? 'colorRed' : 'color'">节流</div>
    <div>
      <el-button @click="instruction">自定义指令</el-button
      >自定义指令里面的内容: {{ focusValue }}
    </div>
    <div>
      <component1></component1>
      <component2></component2>
    </div>
  </div>
</template>

<script>
import component1 from "./兄弟组件传参/component1.vue";
import component2 from "./兄弟组件传参/component2.vue";
import customInstruction from "@/components/自定义指令";
import { debounce, throttle } from "@/components/公共方法";
export default {
  name: "public",
  components: {
    customInstruction,
    component1,
    component2
  },
  data() {
    return {
      isFixed: false,
      focusValue: "" //自定义指令   弹框里面的内容
    };
  },
  mounted() {
    let object = {};
    console.log(object.toString(), "object.toStrin");
    window.addEventListener("scroll", this.handleScroll); //监听滚动事件
  },
  methods: {
    // 防抖   的使用   在这个方法里面加入了防抖
    /* 
				()=>{console.log(11111222)}   	第一个参数
				1000							第二个参数
			 */
    handleScroll: throttle(function() {
      // 滚动条离头部的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // div距离头部的距离
      let offsetTop = document.querySelector("#box").offsetTop;
      // 如果滚动条
      this.isFixed = scrollTop > offsetTop ? true : false;
    }, 1000),

    // 节流  的使用  正常吸顶应该不需要节流，，只是尝试
    antiShake: debounce(() => {
      console.log(11111222);
    }, 300),
    // 自定义指令
    instruction() {
      this.$refs.instruction.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.color {
  position: relative;
}

.colorRed,
.color {
  width: 100px;
  height: 100px;
  background: red;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.colorRed {
  top: 0;
  position: fixed;
}

#box {
  height: 2000px;
}
</style>
