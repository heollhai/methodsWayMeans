<template>
  <div class="danxuanDuoxuan">
    <div>
      （1）单选再次点击不会变成无色，，点击不限，或点击无色的可清空选中颜色
    </div>
    <div class="EventAreaClass">
      <span @click="Areaunlimited()">不限</span
      ><template v-for="(item, key) in list1">
        <!-- 判断点击后的下标和data里面的值相等的一个，，哪一个颜色变化 -->
        <span
          :key="key"
          :class="{ clickColor: spanIndex === key }"
          @click="EventAreaClick(item, key)"
          >{{ item }}</span
        >
      </template>
    </div>
    <div>
      （2）单选再次点击会变成无色，，点击不限，或点击无色的可清空选中颜色
    </div>
    <div class="EventAreaClass2">
      <span @click="Areaunlimited2()">不限</span
      ><template v-for="(item, key) in list2">
        <!-- 判断点击后的下标和data里面的值相等的一个，，哪一个颜色变化 -->
        <span
          :key="key"
          :class="{ clickColor2: spanIndex2 === key }"
          @click="EventAreaClick2(item, key)"
          >{{ item }}</span
        >
      </template>
    </div>
    <div class="MapTime">（3）多选</div>
    <div class="EventAreaClass3">
      <span @click="unlimitedCategory3()">不限</span
      ><template v-for="(item, key) in list3">
        <span
          :key="item"
          :class="{ clickColor3: spanIndex3.indexOf(key) > -1 }"
          @click="EventCategoryClick3(item, key)"
          >{{ item }}</span
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "dangXuanDuoXuan",
  data() {
    return {
      //单选（1）使用
      spanIndex: -1, //单选（1）使用
      list1: [1, 2, 3, 4, 5], //单选（1）使用
      form: {
        area: ""
      },

      //单选（2）使用
      spanIndex2: -1, //单选（2）使用
      list2: [1, 2, 3, 4, 5], //单选（2）使用
      form2: {
        area: ""
      },

      //多选（3）使用
      spanIndex3: [], //单选（3）使用
      list3: [1, 2, 3, 4, 5], //单选（3）使用
      form3: {
        category: []
      }
    };
  },
  methods: {
    //单选（1）使用
    Areaunlimited() {
      //单选（1）使用
      this.form.area = "";
      this.spanIndex = -1; //清空选中颜色
      console.log(this.form.area, "this.form.area");
    },
    EventAreaClick(item, key) {
      //单选（1）使用
      this.spanIndex = key; //把值给到 spanIndex
      this.list1.forEach((ele, index) => {
        if (index === this.spanIndex) {
          this.form.area = ele;
        }
      });
      console.log(this.form.area, "this.form.area");
    },

    //单选（2）使用
    Areaunlimited2() {
      //单选（2）使用
      this.form2.area = "";
      this.spanIndex2 = -1; //清空选中颜色
      console.log(this.form2.area, "this.form2.area");
    },
    EventAreaClick2(item, key) {
      //单选（2）使用
      if (this.spanIndex2 === key) {
        //如果下标等于this.spanIndex2   说明点击同一个，，那么把颜色清空，，不然添加颜色
        this.spanIndex2 = -1;
      } else {
        this.spanIndex2 = key; //把值给到 spanIndex
      }
      if (this.spanIndex2 == -1) {
        this.form2.area = "";
      } else {
        this.list2.forEach((ele, index) => {
          if (index === this.spanIndex2) {
            this.form2.area = ele;
          }
        });
      }
      console.log(this.form2.area, "this.form2.area");
    },

    //多选（3）
    unlimitedCategory3() {
      //多选（3）
      this.form3.category = [];
      this.spanIndex3 = []; //清空选中颜色
      console.log(this.form3.category, "this.form3.category");
    },
    EventCategoryClick3(item, key) {
      //区域点击变色
      this.form3.category = this.arrindex(
        this.spanIndex3,
        key,
        item,
        this.form.category,
        this.list3
      );
      console.log(this.form3.category, "this.form3.category");
    },
    arrindex(spanIndex, key, item, form, area) {
      //点击变色封装
      form = [];
      let arrIndex = spanIndex.indexOf(key);
      if (arrIndex > -1) {
        spanIndex.splice(arrIndex, 1);
      } else {
        spanIndex.push(key);
      }
      area.forEach((ele, index) => {
        if (spanIndex.length) {
          spanIndex.forEach(ele1 => {
            if (ele1 == index) {
              form.push(ele);
            }
          });
        }
      });
      return form;
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
@import "./index.scss";
</style>
