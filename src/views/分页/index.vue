<template>
  <div style="height: calc(100% - 130px);">
    <!-- currentPage 页码 
		  pagesize每页显示数量
		  
		  tableData.slice((currentPage-1)*pagesize,currentPage*pagesize
		  数据显示  从 当前页面减去 1 * 当前页面数量 开始切割 到 当前页面 * 页面数量 位数结束、
		  （目前第一页数据就是   (1-1)*10,1*10   
		   结果就是   从第0位开始切割 到底10为结束）
		  -->
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      tooltip-effect="dark"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :row-style="listTableRow"
      :header-cell-style="listTableHeader"
      :cell-style="listTableCell"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
		 @current-change    改变现在是第几页
		 @size-change 	 	改变现在一页有多少
		 :current-page     	现在第几页
		 :page-sizes 		页面显示多少页
		 :page-size        一个显示多少
		 layout  			页面分页条需要展示哪些
		 -->
    <el-pagination
      background
      @current-change="current_change"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-sizes="[4, 8, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>
<script>
import { againsTsortKey } from "@/components/公共方法";
export default {
  name: "dataList",
  mounted() {
    let bb = [1, 2, 3, 4];
    let dd = {
      a: "1"
    };
    let cv = bb && 3;

    console.log(Array.isArray(dd), "c", Object.prototype.toString.call(dd));

    let aa = [
      {
        a: "1"
      },
      {
        a: "2"
      },
      {
        a: "4"
      },
      {
        a: "3"
      }
    ];
    let b = JSON.parse(JSON.stringify(againsTsortKey(aa, "a")));
    let a = [1, 2, 3, 4];
    //循环给表格30条数据
    let value = {};
    for (var i = 0; i < 31; i++) {
      value = {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      };
      this.tableData.push(value);
    }
    console.log(
      this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      ),
      "tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    );
  },
  data() {
    return {
      height: "calc(100% - 40px)",
      currentPage: 1, //当前页数
      pagesize: 4, //当前分页显示多少数量
      tableData: [], //表格数据
      multipleSelection: [],
      highlightCurrentRow: true
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    mounted: function() {
      this.addUser();
    },
    listTableCell() {
      return "";
    },
    tableRowClassName() {
      return "";
    },
    listTableRow() {
      return `
					height:400px;color:red;
				`;
    },
    listTableHeader() {
      return "";
    }
  }
};
</script>
