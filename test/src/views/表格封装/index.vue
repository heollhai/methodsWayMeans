<template>
  <div style="height: calc(100% - 132px);">
    <!-- 
				:options="dataGrid.options"  			全局属性
				:list="dataGrid.list"					数据
				:columns="dataGrid.columns" 			列属性
				:operates="dataGrid.operates"			操作列
				:pagination="dataGrid.pagination"		分页  
		 -->
    <data-grid
      :options="dataGrid.options"
      :list="dataGrid.list"
      :columns="dataGrid.columns"
      :operates="dataGrid.operates"
      :pagination="dataGrid.pagination"
    ></data-grid>
  </div>
</template>

<script>
import DataGrid from "@/components/DataGrid.vue";
import { biaoGe } from "@/utils/api.js";
export default {
  name: "biaoGeFengZhuang",
  components: {
    DataGrid
  },
  created() {
    this.biaoGeList();
  },
  mounted() {},
  methods: {
    showEvnInfo(scope) {
      this.biaoGeList();
      console.log(scope, "kkkkk");
    },
    biaoGeList() {
      biaoGe().then(res => {
		  console.log(res,'resresres');
        this.dataGrid.list = [];
        this.dataGrid.list = res.data;
        this.dataGrid.pagination.total = this.dataGrid.list.length;
      });
    }
  },
  data() {
    return {
      dataGrid: {
        // 全局属性
        options: {
          // table高度，需减去分页栏等
          height: "calc(100% - 40px)",
          loading: true,
          //如果  multiSelect  为  true  n那么表格前端会有 选择框     如果为  1  那么没有多选   如果为 false 那么是单选框
          multiSelect: true,
          boldStyle: ["readFlag", 0]
        },
        // 列表数据
        list: [],
        // 列属性
        columns: [
          {
            align: "center",
            hidden: false,
            label: "姓名",
            prop: "name",
            width: "100px"
          },
          {
            align: "center",
            hidden: false,
            label: "时间",
            prop: "date",
            width: "100px"
          },
          {
            align: "center",
            hidden: false,
            label: "地址",
            prop: "address",
            width: "100px"
          }
        ],
        // 操作列
        operates: {
          label: "操作",
          // 操作列宽度
          width: "100px",
          // 操作列是否隐藏
          hidden: false,
          // 操作列的具体按钮
          list: [
            {
              label: "详情",
              hidden: false,
              method: (scope, index) => {
                this.showEvnInfo(scope,index);
              }
            },
            {
              label: "编辑",
              hidden: false,
              method: (scope, index) => {
                console.log("点击了编辑", scope,index);
              }
            },
            {
              label: "查看",
              hidden: false,
              method: (scope, index) => {
                console.log("点击了查看", scope,index)
              }
            }
          ]
        },
        // 分页
           pagination: {
          hidden: false,
          currentPage: 1,
          pageSizes: [5, 8, 10, 40, 50, 100],
          pageSize: 5,
          total: 0,
          pageCount: 0
        }
      }
    };
  }
};
</script>

<style></style>
