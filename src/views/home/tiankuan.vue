<template>
  <div class="tankuan">
    {{ eventInfo.name }}{{ froms.name }}
    <el-button @click="dialog">关闭</el-button>
    <button @click="datass">点我刷新</button>
  </div>
</template>

<script>
export default {
  name: "tankuan",
  props: ["eventInfo"],
  data() {
    return {
      froms: {
        name: ""
      }
    };
  },
  // watch:{
  // 	"eventInfo.name"(xin,jiu){
  // 		console.log(xin,jiu,'------')
  // 		deep: true
  // 	}
  // },
  mounted() {
    this.giabian();
  },
  methods: {
    giabian() {
      console.log(this.eventInfo, "eventInfo");
      if (this.eventInfo.name % 2 == 0) {
        this.froms.name = "wo chulail";
        console.log("我是偶数");
      } else {
        this.froms.name = "heh";
      }
    },
    fuzujian() {
      this.$parent.$parent.$data;
      console.log(this.$parent.$parent.$data2, "				console.log(this.$parent)");
      // this.$parent.$parent.naname();
    },
    dialog() {
      this.$parent.$parent.$data.evnReadDialog = false;
      this.$parent.$parent.refresh();
      console.log(this.$parent.$parent, "data");
    },
    datass() {
      this.$parent.$parent.datass();
    }
  }
};
</script>

<style></style>
