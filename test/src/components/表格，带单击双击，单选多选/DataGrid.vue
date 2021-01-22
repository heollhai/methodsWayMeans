<template>
  <div style="height: 100%">
    <el-table
      v-loading="options.operates"
      ref="multipleTable"
      :id="id"
      :data="list"
      :row-class-name="tableRowClassName"
      :row-style="listTableRow"
      :row-key="getRowKeys"
      :header-cell-style="listTableHeader"
      :cell-style="listTableCell"
      :height="options.height"
      :highlight-current-row="options.highlightCurrentRow"
      style="width: 100%;"
      border
      @cell-click="handlerCellClick"
      @selection-change="handleSelectionChange"
      @row-dblclick="handelRowdblClick"
      @row-click="handelRowClick"
      @select="checkboxSelectChange"
      @select-all="checkAllChange"
    >
      <!--复选框start-->
      <el-table-column
        v-if="options.multiSelect === true"
        :reserve-selection="reserveSelection"
        type="selection"
        style="width: 55px;"
      />
      <!--复选框end-->
      <!--单选框start-->
      <el-table-column v-if="options.multiSelect === false" label="" width="65">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            @change.native="handleSelectionChange(scope.row)"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <!--单选框end-->

      <!--数据列start-->
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="!column.hidden"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :min-width="column.width"
          :show-overflow-tooltip="true"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <template v-if="column.isOperate">
              <template v-for="(btn, key) in column.items">
                <template v-if="btn.rendererText(scope.row, column)">
                  <el-button
                    v-button
                    :key="btn.id"
                    @click.native.prevent="btn.handler(key, scope)"
                  >
                    {{ btn.rendererText(scope.row, column) }}
                  </el-button>
                </template>
              </template>
            </template>
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom
                :column="column"
                :row="scope.row"
                :render="column.render"
                :index="index"
              />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--数据列end-->
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
                v-button
                v-if="!btn.hidden && !(btn.label === 'radio')"
                :key="btn.id"
                :disabled="btn.disabled"
                @click.native.prevent="btn.method(key, scope)"
                >{{ btn.label }}</el-button
              ><span
                v-if="key < operates.list.length - 1"
                class="segmentation"
              ></span
              ><el-radio
                v-if="!btn.hidden && btn.label === 'radio'"
                :key="btn.id"
                v-model="radio"
                :label="scope.$index"
                class="radio"
                @change.native="btn.method(scope)"
                >&nbsp;</el-radio
              >
            </template>
          </div>
        </template>
      </el-table-column>
      <!--操作列end-->
    </el-table>
    <!--分页start-->
    <el-pagination
      v-if="!tableCurrentPagination.hidden"
      :current-page="tableCurrentPagination.currentPage"
      :page-sizes="tableCurrentPagination.pageSizes"
      :page-size="tableCurrentPagination.pageSize"
      :total="tableCurrentPagination.total"
      layout="total,prev,next ,jumper, sizes"
      @next-click="handleNextClick"
      @prev-click="handlePreClick"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--分页end-->
  </div>
</template>

<script>
import bus from "@/views/layout/bus";
const _pageArray = [10, 20, 30, 40, 50, 100]; // 每页展示条数的控制集合
export default {
  name: "Tables",
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
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
          highlightCurrentRow: true,
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
    // 是否默认选中第一行单选框
    selectedFirstRow: {
      type: Boolean,
      default: () => {}
    },
    // 默认选中第几行
    defaultRow: {
      type: Number,
      default: 0
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
      defaultRowColor: "",
      tableCurrentPagination: {
        hidden: false,
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50, 100],
        pageSize: 10,
        total: 0,
        pageCount: 0
      },
      multipleSelection: [],
      listAll: [],
      radio: "",
      cellStyle: `padding:0px;
                font-size:18px;
                line-height:18px;
                color:#424f57 !important;
                font-weight:normal;
                white-space: nowrap
                text-overflow: ellipsis;`,
      curCellStyle: ""
    };
  },
  mounted() {
    bus.$on("cleanCheckbox", () => {
      this.$refs.multipleTable.clearSelection();
      // delmul.forEach(row => {
      //   this.$refs.multipleTable.toggleRowSelection(row, false);
      //   console.log('delmul', delmul);
      // });
    });
    // 判断是否需要分页
    if (this.pagination && !this.pagination.pageSize) {
      this.pagination.pageArray = _pageArray;
    }
    this.tableCurrentPagination = this.pagination || {
      pageSize: this.tableCurrentPagination.total,
      currentPage: 1
    };
    if (this.selectedFirstRow) {
      this.radio = 0;
    }
    if (this.defaultRow !== 0) {
      this.radio = Number(this.defaultRow);
    }
  },

  methods: {
    // 获取数据列的唯一id
    getRowKeys(row) {
      const id = this.rowid;
      if (row[id]) {
        return row[id];
      }
    },
    // 清理数据列表中单选状态
    clearRadioSelection() {
      this.radio = "";
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = 1;
        this.tableCurrentPagination.pageSize = size;
        this.$emit("handleSizeChange", this.tableCurrentPagination);
        if (typeof this.$parent.reload === "function") {
          this.$parent.reload();
        } else if (typeof this.$parent.$parent.reload === "function") {
          this.$parent.$parent.reload();
        } else if (typeof this.$parent.$parent.$parent.reload === "function") {
          this.$parent.$parent.$parent.reload();
        }
      }
    },
    // 跳转
    handleCurrentChange(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
        this.$emit("handleCurrentChange", this.tableCurrentPagination);
        if (typeof this.$parent.reload === "function") {
          this.$parent.reload();
        } else if (typeof this.$parent.$parent.reload === "function") {
          this.$parent.$parent.reload();
        } else if (typeof this.$parent.$parent.$parent.reload === "function") {
          this.$parent.$parent.$parent.reload();
        }
      }
    },
    // 上一页
    handlePreClick(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
        this.$emit("handlePreClick", this.tableCurrentPagination);
        if (typeof this.$parent.reload === "function") {
          this.radio = "";
          this.$parent.reload();
        } else if (typeof this.$parent.$parent.reload === "function") {
          this.radio = "";
          this.$parent.$parent.reload();
        } else if (typeof this.$parent.$parent.$parent.reload === "function") {
          this.radio = "";
          this.$parent.$parent.$parent.reload();
        }
      }
    },
    // 下一页
    handleNextClick(val) {
      if (this.pagination) {
        this.tableCurrentPagination.currentPage = val;
        this.$emit("handleNextClick", this.tableCurrentPagination);
        if (typeof this.$parent.reload === "function") {
          this.radio = "";
          this.$parent.reload();
        } else if (typeof this.$parent.$parent.reload === "function") {
          this.radio = "";
          this.$parent.$parent.reload();
        } else if (typeof this.$parent.$parent.$parent.reload === "function") {
          this.radio = "";
          this.$parent.$parent.$parent.reload();
        }
      }
    },
    // 多行选中
    handleSelectionChange(val) {
      console.log("val:", val);
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    // 单击某行操作
    handelRowClick(row, event, column) {
      // 单击的列如果是复选框列或者操作列，则不改变复选框状态
      if (
        !column ||
        column.type === "selection" ||
        column.columnKey === "operation"
      ) {
        return;
      } else {
        if (this.options.multiSelect === true) {
          // 单击列的时候改变复选框状态
          this.$refs.multipleTable.toggleRowSelection(row);
        } else if (!this.options.multiSelect) {
          // 单击列改变单选框状态；
          this.radio = this.list.indexOf(row);
        }
        const value = {
          row: row,
          event: event,
          column: column
        };
        this.$emit("row-click", value);
      }
    },
    // 双击某行操作
    handelRowdblClick(row, event, column) {
      if (
        !column ||
        column.type === "selection" ||
        column.columnKey === "operation"
      ) {
        return;
      } else {
        const value = {
          row: row,
          event: event,
          column: column
        };
        this.$emit("row-dblclick", value);
      }
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
    // 显示 筛选弹窗
    showfilterDataDialog() {
      this.$emit("handleFilter");
    },
    // 显示 表格操作弹窗
    showActionTableDialog() {
      this.$emit("handelAction");
    },

    handlerCellClick(row, column) {
      const value = {
        row: row,
        column: column
      };
      this.$emit("handlerCellClick", value);
    },
    listTableHeader({ row, column, rowIndex }) {
      if (rowIndex === 0) {
        return `padding:0px;
                font-size:18px;
                font-weight:normal;
                height:44px;
                text-align:center !important;
                white-space: nowrap;
                text-overflow: ellipsis;`;
      }
    },
    listTableRow({ row, rowIndex }) {
      // 根据某一个字段状态改变某一行的样式
      if (
        this.options.hasOwnProperty("filterOptions") &&
        this.options.filterOptions.length !== 0
      ) {
        const filterOptions = this.options.filterOptions;
        if (Number(row[filterOptions[0]]) === filterOptions[1]) {
          return `font-size: 18px;
                  height:50px;
                  color:#424f57 !important;
                  font-weight:normal;
                  background-color: #ffffcd !important;`;
        }
      }
      if (rowIndex % 2 === 0) {
        return `background-color: #fafafa !important;
                font-size: 18px;
                height:50px;
                color:#424f57 !important;
                font-weight:normal;`;
      } else if (rowIndex % 2 === 1) {
        return `background-color: #e6e6e6 !important;
                font-size: 18px;
                height:50px;
                color:#424f57 !important;
                font-weight:normal;`;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(row,'');
      if (row.eventStatus == "未处理") {
        return "not-finish";
      }
      return "";
    },
    listTableCell({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (
          row.eventStatus == "未处置" ||
          row.eventStatus == "未处理" ||
          row.eventStatus == "待办"
        ) {
          return "font-weight: bold !important; background-color: #fff ;";
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "处理中" &&
          column.label === "事件状态"
        ) {
          return 'color:#2D8CF0 !important;background-color: #fff ;"';
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "完成" &&
          column.label === "事件状态"
        ) {
          return 'color:green !important;background-color: #fff ;"';
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "退报" &&
          column.label === "事件状态"
        ) {
          return 'color:red !important;background-color: #fff ;"';
        } else if (
          columnIndex == 5 &&
          row.eventStatus == "退报" &&
          column.label === "事件状态"
        ) {
          return 'color:red !important;background-color: #fff ;"';
        } else if (
          columnIndex == 5 &&
          row.eventStatus == "处理中" &&
          column.label === "事件状态"
        ) {
          return 'color:#2D8CF0 !important;background-color: #fff ;"';
        }
      } else if (rowIndex % 2 === 1) {
        if (
          row.eventStatus == "未处置" ||
          row.eventStatus == "未处理" ||
          row.eventStatus == "待办"
        ) {
          return "font-weight: bold !important;background-color: #F8F8F9;";
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "处理中" &&
          column.label === "事件状态"
        ) {
          return "color:#2D8CF0 !important;background-color: #F8F8F9;";
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "完成" &&
          column.label === "事件状态"
        ) {
          return "color:green !important;background-color: #F8F8F9;";
        } else if (
          columnIndex == 6 &&
          row.eventStatus == "退报" &&
          column.label === "事件状态"
        ) {
          return "color:red !important;background-color: #F8F8F9;";
        } else if (
          columnIndex == 5 &&
          row.eventStatus == "退报" &&
          column.label === "事件状态"
        ) {
          return "color:red !important;background-color: #F8F8F9;";
        } else if (
          columnIndex == 5 &&
          row.eventStatus == "处理中" &&
          column.label === "事件状态"
        ) {
          return "color:#2D8CF0 !important;background-color: #F8F8F9;";
        }
      }
      if (rowIndex % 2 === 0) {
        return `background-color: #fff ; `;
      } else if (rowIndex % 2 === 1) {
        return `background-color: #F8F8F9; `;
      }
      if (
        this.options.hasOwnProperty("changeCellCss") &&
        this.options.changeCellCss
      ) {
        const changeKeysArr =
          row.changekeys === undefined ||
          row.changekeys === "" ||
          row.changekeys === null
            ? []
            : row.changekeys;
        if (changeKeysArr.length > 0) {
          if (changeKeysArr.includes(column.property)) {
            return `padding:0px;
                    font-size:18px;
                    line-height:18px;
                    font-weight:normal;
                    white-space: nowrap
                    text-overflow: ellipsis;
                    background-color: #04b2bf !important;
                    color:white !important;`;
          }
        }
      } else if (
        this.options.hasOwnProperty("smsManageStyle") &&
        this.options.smsManageStyle
      ) {
        // 消息管理收/发样式
        if (columnIndex === 0 && row.sendType === "1") {
          return `background-color: #addbf5`;
        } else if (columnIndex === 0 && row.sendType === "2") {
          return `background-color: #ffe8a6`;
        } else if (columnIndex === 0 && row.sendType === "3") {
          return `background-color: #cde6be`;
        } else if (row.hiddenFlag === "2") {
          // 隐藏短信加样式区分
          return `color: #d0c8c8`;
        }
      } else if (
        this.options.hasOwnProperty("boldStyle") &&
        this.options.boldStyle.length !== 0
      ) {
        // 未读事件样式
        const boldStyle = this.options.boldStyle;
        if (Number(row[boldStyle[0]]) === boldStyle[1]) {
          /* if (row.originalGudEvnId && row.fromFlag === '1') {
            return `color:#5f89bf; !important;
                    font-weight:bold; !important`;
          } else {
            return `font-weight:bold; !important`;
          }*/
          return `font-weight:bold; !important`;
        }
      } else if (
        this.options.hasOwnProperty("telRecordStyle") &&
        row.hiddenFlag === "2"
      ) {
        // 隐藏通话记录加样式区分
        return `color: #d0c8c8`;
      } else {
        return `padding:0px;
                font-size:18px;
                line-height:18px;
                color:#424f57 !important;
                font-weight:normal;
                white-space: nowrap
                text-overflow: ellipsis;`;
      }
      if (rowIndex % 2 === 0) {
        return `background-color: #fff !important;
	            font-size: 18px;
	            height:50px;
	            color:#424f57 !important;
	            font-weight:normal;`;
      } else if (rowIndex % 2 === 1) {
        return `background-color: #F1F1F1 !important;
	            font-size: 18px;
	            height:50px;
	            color:#424f57 !important;
	            font-weight:normal;`;
      }
    }
  }
};
</script>

<style>
.el-table tr {
  height: 50px;
}
.el-table td {
  text-align: center;
}
.operate-group .el-button {
  background-color: rgba(0, 0, 0, 0) !important;
  border: none;
  font-size: 16px;
  color: #2d8cf0 !important;
}
.cell,
.el-tooltip button {
  background-color: rgba(0, 0, 0, 0) !important;
}
/* .operate-group .el-button {
    background-color: rgba(0,0,0,0) !important;
    border: 0 !important;
    font-size: 18px;
    color: #409eff !important;
    text-decoration:underline;
    padding: 0 5px;
	background-color: none !important;
    border-radius: none !important;
    border: 1px solid #fff !important;
  } */
/* .el-table .delete-row{
    font-size: 18px;
    height:42px;
    color:#424f57 !important;
    font-weight:normal;
    background-color: #ffffcd !important;
  } */
</style>
s
