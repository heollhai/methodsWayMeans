<!-- 

	如果数据不能及时更新  解决方法  
	 一 、引入 子组件的 每次点击  只执行一次子组件的created的方法 :
				可以在引入子组件的地方加一个 v-if 在让子组件显示出来，，这样会把子组件销毁在此渲染   ，，这样每次都会加载  created  的方法了
		
 -->
<template>
  <div>
    {{ data.address }}
    <!-- <el-form :inline="true" :model="data" class="demo-form-inline">
			<el-form-item label="地址">
				<el-input v-model="data.address" placeholder="地址"></el-input>
			</el-form-item>
		</el-form> -->
  </div>
</template>

<script>
import { comments, liandong } from "@/utils/api";
export default {
  name: "zujian",
  created() {
    // console.log(this.data,this.ceshidata, '0klddddddddddddd');
  },
  computed: {
    datas: function() {
      this.funDiaoYong(this.data.id);
    },
    dataa: function() {
      console.log(this.data.id, "this.data.id00000000000000000000000000000o;");
    }
  },
  watch: {
    datas: function() {}, //监听计算里面的变化
    dataa: function() {}
  },
  mounted() {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      whetherNeedType: false,
      ceshidata: ""
    };
  },
  methods: {
    //弹框确定
    ensureClick() {},
    funDiaoYong(id) {
      console.log(id, "我是新来的id");
    }
  }
};
</script>

<style></style>
