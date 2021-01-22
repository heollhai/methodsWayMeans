<!-- 

	.slice((pagination.currentPage-1)*pagination.pageSize,pagination.currentPage*pagination.pageSize)
	:row-class-name     	以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
	:row-style 				element-ui 改变一行的样式row-style
	:header-cell-style 		头部样式
	:height 				列表高度
	border 					边框
	@cell-click 			表格单击事件
	@selection-change 		多行选中
	@select-all 			表格全选时触发
	@row-click  			单击某行操作
 -->
<template>
  <div style="height: 100%">
    <el-table
      :data="
        list.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :row-class-name="tableRowClassName"
      :row-key="getRowKeys"
      :row-style="listTableRow"
      ref="multipleTable"
      :header-cell-style="listTableHeader"
      :cell-style="listTableCell"
      :height="options.height"
      style="width: 100%;"
      border
      @cell-click="handlerCellClick"
      @selection-change="handleSelectionChange"
      @select="checkboxSelectChange"
      @select-all="checkAllChange"
      @row-click="handelRowClick"
    >
      <!--复选框start-->
      <!--
			  :reserve-selection="reserveSelection"  当用户切换分页时保留选中的信息 		这个暂时不用，，，，
			  -->
      <el-table-column
        v-if="options.multiSelect === true"
        type="selection"
        style="width: 55px;"
      />
      <!--数据列start-->
      <template v-for="column in columns">
        <el-table-column
          v-if="!column.hidden"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :min-width="column.width"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <template>
              <span>{{ scope.row[column.prop] }}</span>
              <!-- 在某一行增加  某些提示时可以使用  暂时不使用 -->
              <!-- <span v-if="column.label === '时间'" style="color:red;">我是提醒字段</span> -->
            </template>
          </template>
        </el-table-column>
      </template>
      <!-- 操作栏按钮 -->
      <el-table-column
        v-if="!operates.hidden"
        ref="fixedColumn"
        :min-width="operates.width"
        :label="operates.label"
        column-key="operation"
        align="center"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <el-button
                :key="btn.id"
                :disabled="btn.disabled"
                @click.native.prevent.stop="btn.method(scope, key)"
                >{{ btn.label }}</el-button
              >
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页start-->
    <el-pagination
      v-if="!tableCurrentPagination.hidden"
      :current-page="tableCurrentPagination.currentPage"
      :page-sizes="tableCurrentPagination.pageSizes"
      :page-size="tableCurrentPagination.pageSize"
      :total="tableCurrentPagination.total"
      layout="total,prev,next ,jumper, sizes"
      @current-change="handleCurrentChange"
    />
    <!--分页end-->
  </div>
</template>

<script>
const _pageArray = [10, 20, 30, 40, 50, 100]; // 每页展示条数的控制集合
export default {
  name: "Tables",
  props: {
    id: {
      type: String,
      default: ""
    },
    // 列表全局属性
    options: {
      type: Object,
      default: () => {
        return {
          height: "calc(100% - 40px)",
          loading: false,
          multiSelect: true,
          filterOptions: []
        };
      }
    },
    // 列表数据
    list: {
      type: Array,
      default: () => [] // prop:表头绑定的字段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
    },
    // 列表列
    columns: {
      type: Array,
      default: () => [] // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽  fixed：是否固定（left,right）formatter 格式化数据
    },
    // 操作列，如按钮
    operates: {
      type: Object,
      default: () => {} // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，show：是否显示，icon：按钮图标，disabled：是否禁用，method：回调方法
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    rowid: {
      type: String,
      default: "rowId"
    },
    reserveSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 如果没有传分页，，那么使用这个分页
      tableCurrentPagination: {
        hidden: false,
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50, 100],
        pageSize: 10,
        total: 0,
        pageCount: 0
      },
      multipleSelection: [] //选中的多选框里面的内容，，，，
    };
  },
  mounted() {
    // 判断是否需要分页
    if (this.pagination && !this.pagination.pageSize) {
      this.pagination.pageArray = _pageArray;
    }
    this.tableCurrentPagination = this.pagination || {
      pageSize: this.tableCurrentPagination.total,
      currentPage: 1
    };
  },

  methods: {
    // 获取数据列的唯一id
    getRowKeys(row) {
      const id = this.rowid;
      if (row[id]) {
        return row[id];
      }
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = 1;
        this.tableCurrentPagination.pageSize = size;
      }
    },
    // 跳转
    handleCurrentChange(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
      }
    },
    // 上一页
    handlePreClick(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
      }
    },
    // 下一页
    handleNextClick(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
      }
    },
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("val:", this.multipleSelection);
    },
    // 单击某行操作	row, event, column   有3个参数可以使用
    handelRowClick() {
      // console.log(row, event, column, "我只点击了一次");
    },
    // 手动勾选复选框；
    checkboxSelectChange(selection, row) {
      const value = {
        selection: selection,
        row: row
      };
      this.$emit("select", value);
    },
    // 全选；
    checkAllChange(selection) {
      this.$emit("select-all", selection);
    },
    //表格点击事件
    handlerCellClick(row, column) {
      const value = {
        row: row,
        column: column
      };
      this.$emit("handlerCellClick", value);
    },
    // 头部样式			{ row, column, rowIndex }
    listTableHeader() {
      return `padding:0px;
      font-size:18px;
      font-weight:normal;
      height:44px;
      background:#123563;
      text-align:center ;
      white-space: nowrap;
      color:#fff;
      text-overflow: ellipsis;`;
    },
    //  改变某一行样式			设置 style的样式
    listTableRow({ rowIndex }) {
      // 定义公共样式
      let styleJson = {
        "font-size": "18px",
        height: "50px",
        color: "#424f57 ",
        "font-weight": "normal"
      };
      if (rowIndex % 2 === 0) {
        // 单数行背景颜色为			#fafafa
        let styleJson1 = { "background-color": "#fafafa" };
        styleJson = { ...styleJson1, ...styleJson };
        return styleJson;
      } else if (rowIndex % 2 === 1) {
        // 双行背景颜色为			#f2f2f2
        let styleJson2 = { "background-Color": "#f2f2f2" };
        styleJson = { ...styleJson2, ...styleJson };
        return styleJson;
      }
    },
    // 设置某行样式		设置 class名字  在定义的样式			可以设置 {row,rowIndex}两个参数
    tableRowClassName() {
      // console.log(rowIndex, "row, rowIndex");
      return "newColor";
    },
    // 可以设置某一个单元格里面的样式		{ row, column, rowIndex, columnIndex }   参数
    listTableCell() {
      // console.log(row, column, rowIndex, columnIndex);
      // if (rowIndex === 0 && columnIndex === 1) {
      //   return `font-size:12px;`;
      // } else {
      //   return "";
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 鼠标放上效果 */
/* .el-table tbody tr:hover>td {
		background-color: #ccc !important;
	} */
// 操作栏    按钮样式

.operate-group .el-button {
  background-color: rgba(0, 0, 0, 0) !important;
  border: none;
  font-size: 16px;
  color: #2d8cf0 !important;
}
</style>
<style lang="scss">
// .el-table .newColor {
//   color: red !important;
// }
</style>
