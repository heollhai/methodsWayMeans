<template>
  <div>
    <div>点击打开弹框组件</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      close-on-click="false"
      title="修改"
      style="top: 24%;"
      :visible.sync="whetherNeedType"
      :close-on-click-modal="false"
      class="dialog1"
    >
      <zujia ref="zujian" :data="data" />
      <div class="whetherNeedTypeClass">
        <el-button @click="whetherNeedType = false">取消</el-button>
        <el-button type="primary" @click="ensureClick"> 确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import zujia from "./组件.vue";
export default {
  name: "box",
  components: {
    zujia
  },
  data() {
    return {
      whetherNeedType: false,
      data: {},
      tableData: [
        {
          id: "1",
          date: "12016-05-02",
          name: "1王小虎",
          address: "1上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          date: "2 2016-05-04",
          name: "2 王小虎",
          address: "2上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "3",
          date: "3 2016-05-01",
          name: "3 王小虎",
          address: "3上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "4",
          date: "4 2016-05-03",
          name: "4王小虎",
          address: "4上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    //弹框确定
    ensureClick() {},
    deleteRow(index, rows) {
      this.whetherNeedType = true;
      this.data = rows;
      if (this.$refs.zujian !== undefined) {
        console.log(this.$refs.zujian.funDiaoYong(), "klklklk");
      }
    }
  }
};
</script>

<style scoped></style>
