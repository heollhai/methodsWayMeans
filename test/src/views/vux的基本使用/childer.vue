<template>
  <div>
    <div style="color: red;">evn1模块里面的值</div>
    {{ evn1_1 }}直接获取vuex里面的值:{{ evn1_2 }}
    <!-- 同步提交 -->
    <el-button @click="ADDCOUNT(10)">同步提交到vuex</el-button>
    <el-button @click="count1Click_2">同步提交count1到vuex</el-button>
    <el-button @click="$router.push('/')">跳转首页</el-button>
    {{ data }}
    <div>
      {{ items }}
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex"; //创建基于某个命名空间辅助函数
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("evn1"); //方法二 ;
export default {
  name: "vuexChilder",
  computed: {
    //重新命名
    // ...mapState({
    // 	count: state => state.evn1_1,
    // 	count1: state => state.evn1_2
    // }),
    //直接引入
    ...mapState(["evn1_1", "evn1_2", "evnBaseInfo"]),
    ...mapGetters(["geter"])
  },
  mounted() {
    // this.$set(this.items,0,{message:'first',id:'4'}) //$set 可以触发更新视图

    this.$set(this.items[0], "message", "新值"); //$set 可以触发更新视图
    console.log(this.items, this.data, "this.data.");
  },
  methods: {
    ...mapMutations(["ADDCOUNT"]),
    ...mapActions(["setBaseInfo"]),
    count1Click_2() {
      this.evn1_2.a = "我是新值";
      this.evn1_2.c = "我是新字段";
      this.evnBaseInfo.eventName = "新的名称";
    }
  },
  data() {
    return {
      data: {
        name: "简书",
        age: "3",
        info: {
          content: "my name is test"
        }
      },
      items: [
        {
          message: "one",
          id: "1"
        },
        {
          message: "two",
          id: "2"
        },
        {
          message: "three",
          id: "3"
        }
      ]
    };
  }
};
</script>

<style></style>
