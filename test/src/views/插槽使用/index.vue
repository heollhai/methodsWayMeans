<template>
  <div>
    <children-slot>
      <div slot="header">在具名插槽头部</div>
      <div slot="footer">在具名插槽底部</div>
    </children-slot>
    <childrentSlota :data="data">
      <template slot="actionScope" slot-scope="data">
        我是作用域插槽里面的数据:{{ data.data }}
      </template>
    </childrentSlota>
    <button @click="refsClick">点击使用refs修改子组件里面的值</button>
    <div ref="textDiv" id="boxFixed">{{ txt }}</div>
  </div>
</template>

<script>
import childrentSlota from "./children/actionScope.vue"; //作用域插槽
import childrenSlot from "./children/slot.vue"; //具名插槽
export default {
  components: {
    childrenSlot,
    childrentSlota
  },
  name: "slot-",
  data() {
    return {
      data: "我是传值给子组件，，在显示到父组件",
      txt: [1, 2, 3, 4],
      offsetTop: ""
    };
  },
  mounted() {
    // this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    // console.log(this.offsetTop, " this.offsetTop");
  },
  methods: {
    refsClick() {
      console.log(this.txt[0], " this.txt[0]");
      this.txt[0] = 4;
      this.$set(this.txt, 0, 5);
      // this.data1 = "修改后的文本值";
      this.$nextTick(() => {
        console.log("使用this.$nextTick()：", this.$refs["textDiv"].innerText);
      });
    }
  }
};
</script>

<style></style>
