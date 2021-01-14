<style lang="scss">
.woshifaxianye {
  .el-checkbox .is-checked {
    border: 5px solid red;
  }
  .el-checkbox__inner {
    border: 5px solid red;
  }
  .el-popper .el-cascader__dropdown {
    border: 1px solid red;
  }
  .el-popper .el-cascader__dropdown {
    background-color: red;
  }
  .el-input__inner {
    width: 300px;
    div {
      width: 300px;
    }
    .el-cascader-node {
      background-color: red;
    }
  }
  .demonstrations {
    background-color: red;
    width: 300px;
    .el-cascader-node {
      width: 3000px;
      display: block;
    }
    .el-cascader-panel {
      background-color: red;
    }
    .el-cascader-node {
      background-color: red;
    }
    .el-cascader-menu__list {
      background-color: red;
    }
  }
  .el-cascader-panel {
    width: 400px;
  }
}
.tableTitleWrap_2 {
  width: 600px;
  height: 400px;
  background-color: greenyellow;
  .tableTitle {
    height: 40px;
    display: flex;
    justify-content: space-around;
  }
  .setInfo {
    display: flex;
    li {
      width: 100px;
      height: 40px;
      background-color: red;
      margin-bottom: 10px;
    }
    .el-input__inner {
      width: 100px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100px;
    }
  }
}
</style>
<template>
  <div class="woshifaxianye">
    我是发现页{{ $store.state.evn.count }}
    <div class="block">
      <!-- 单选和时间选择利用vuex进行页面数据传送。 -->
      <span class="demonstration" @click="SubmitTheForm"
        >多选选择任意一级选项</span
      >
      <el-cascader
        popper-class="demonstrations"
        :options="optionProps"
        :props="{
          value: 'name',
          label: 'name1',
          children: 'chil',
          multiple: true,
          checkStrictly: true
        }"
        @change="change"
      ></el-cascader>
      <el-radio v-model="clearInfo.coordinationType" label="1">备选项</el-radio>
      <el-radio v-model="clearInfo.coordinationType" label="2">备选项</el-radio>
      {{ clearInfo.completionTime | jisuan }}
      <div class="class-case" style="margin-top: 30px;margin-left: 20px">
        <span>事项办结时间:</span>
        <el-date-picker
          v-model="clearInfo.completionTime"
          type="date"
          placeholder="选择日期时间"
        />
      </div>
    </div>

    <!-- 自创表格进行保存传递 -->
    <span class="class-case-title">联动单位信息:</span>
    <div id="app" class="tableTitleWrap_2 ">
      <ul class="tableTitle">
        <li>序号</li>
        <li>联动单位名称</li>
        <li>单位处理结束时间</li>
        <li>单位协助处理内容</li>
        <li>逾期自动督办</li>
      </ul>
      <div class="tableTitleAdd" style="cursor: pointer;" @click="addInfo">
        +
      </div>
      <ul
        v-for="(val, key) in clearInfo.LinkageUnitInformation"
        :key="key"
        class="setInfo"
      >
        <li>
          <input v-model="val.As" type="text" />
        </li>
        <li>
          <select v-model="val.Bs" name="public-choice">
            <option
              v-for="(val, key) in couponList"
              :value="val.id"
              :key="key"
              >{{ val.name }}</option
            >
          </select>
        </li>
        <li class="el-date-pickerValue3">
          <el-date-picker
            v-model="val.Cs"
            type="date"
            @change="changeDatetime"
            placeholder="选择日期时间"
          />
        </li>
        <li class="el-date-pickerValue3">
          <input v-model="val.Ds" type="text" />
        </li>
        <li>
          <select v-model="val.Es" name="public-valBs">
            <option
              v-for="(val, key) in couponList2"
              :value="val.name"
              :key="key"
              >{{ val.name }}</option
            >
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
import { mapState } from "vuex";
import { EVENT_INFO_FIELD } from "../storedata/datajs.js";
export default {
  filters: {
    jisuan: function(value) {
      if (value && value.length > 8) {
        //字符最大长度
        value = value.substring(0, 8); //超过省略
      }
      return value;
    }
  },
  computed: {
    mapState() {}
  },
  created() {
    console.log(store, this.$store, "store");
    this.dataconfig = JSON.parse(sessionStorage.getItem("data"));
    // console.log(aa)
  },
  mounted() {
    this.optionProps.forEach((ele, index) => {
      ele.chil = [...this.options];
    });
  },
  data() {
    return {
      clearInfo: EVENT_INFO_FIELD,
      value1: "",
      radio: "1",
      dataconfig: [],
      couponList: [
        {
          id: "A",
          name: "优惠券1"
        },
        {
          id: "1",
          name: "优惠券2"
        },
        {
          id: "2",
          name: "优惠券3"
        }
      ],
      couponList2: [
        {
          id: "1",
          name: "是"
        },
        {
          id: "2",
          name: "否"
        }
      ],

      optionProps: [
        {
          name: "areaId",
          name1: "reaName",
          chilc: []
        },
        {
          name: "areaId",
          name1: "ame",
          chil: []
        },
        {
          name: "areaId",
          name1: "eaName",
          chil: []
        }
      ],
      options: [
        {
          name: "shejiyuanze",
          name1: "设计原则"
        },
        {
          name: "cexiangdaohang",
          name1: "侧向导航",
          chil: [
            {
              name: "yizhi",
              name1: "一致"
            },
            {
              name: "fankui",
              name1: "反馈"
            },
            {
              name: "xiaolv",
              name1: "效率"
            },
            {
              name: "kekong",
              name1: "可控"
            }
          ]
        },
        {
          name: "dingbudaohang",
          name1: "顶部导航",
          chil: [
            {
              name: "yizhi",
              name1: "一致",
              chil: [
                {
                  name: "yizhi",
                  name1: "一致"
                },
                {
                  name: "fankui",
                  name1: "反馈"
                },
                {
                  name: "xiaolv",
                  name1: "效率"
                },
                {
                  name: "kekong",
                  name1: "可控"
                }
              ]
            },
            {
              name: "fankui",
              name1: "反馈"
            },
            {
              name: "xiaolv",
              name1: "效率"
            },
            {
              name: "kekong",
              name1: "可控"
            }
          ]
        }
      ]
    };
  },
  methods: {
    //提交
    SubmitTheForm() {
      this.$router.push({
        path: "/"
      });
      store.dispatch("setBaseInfo", this.clearInfo);
    },
    //添加
    addInfo() {
      this.clearInfo.LinkageUnitInformation.push({
        As: this.clearInfo.LinkageUnitInformation.length + 1,
        Bs: "",
        Cs: "",
        Ds: "",
        Es: "是"
      });
      this.radio = this.clearInfo.completionTime.toString();
      console.log(this.clearInfo, "this.clearInfo");
    },
    // SubmitTheForm(){
    // 	store.dispatch('setBaseInfo', this.clearInfo);
    // 	this.$router.push({path:'/discover'})
    // },
    //时间日期选择
    changeDatetime() {
      sessionStorage.setItem("ssss", JSON.stringify(this.value1));
      console.log(this.value1);
    },
    change(value, label) {
      console.log(JSON.parse(localStorage.getItem("swiperArr")), "112");
      if (value.length !== 0) {
        console.log(value, label);
        value.forEach((ele, index) => {
          // console.log(ele[index])
        });
      }
    }
  }
};
</script>
