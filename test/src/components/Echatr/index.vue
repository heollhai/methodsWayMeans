<template>
  <div class="Echart" style="height: 100%" ref="echart"></div>
</template>

<script>
/* 
props里面的值:
	isAxisChart			是否 需要 坐标   默认为  true（需要）    false （不需要）
	chartData:			值 必须要有
		里面的:	series[]	为数据
				xData[]		x 轴数据   													可以没有
				axisLabel	String 或者 number   类型    								可以没有
							如果为 	axisLabel:twoLine    那么    x轴分两行显示
							如果为	axisLabel:incline 那么	x轴倾斜显示
							如果为	number类型   那么   数字是几 x轴一行多少显示多少个 例如 axisLabel:1 那么1行显示 1 个
				title		标题  													可以没有
	 */
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      }
    },
    //判断  是否需要  坐标
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 是否需要坐标
    options() {
      return this.isAxisChart ? this.axiosOption : this.normalOption;
    }
  },
  watch: {
    //对数据进行监听，，如果数据发生变化  那么重新初始化
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    }
  },
  data() {
    return {
      echart: null,
      //有坐标值
      axiosOption: {
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {}
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      },
      //没有坐标值
      normalOption: {
        series: []
      }
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
    this.resizeChart();
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    //判断没有初始化
    initChart() {
      this.initChartData();
      if (this.echart) {
        //有初始化  使用刚指定的配置项和数据显示图表
        this.echart.setOption(this.options);
      } else {
        //没有初始化 先初始化  在使用
        var echarts = require("echarts");
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    //判断传入的数据有没有  坐标值
    initChartData() {
      if (this.isAxisChart) {
        // 有坐标值
        this.axiosOption.xAxis.data = this.chartData.xData;
        this.axiosOption.series = this.chartData.series;
        this.axiosOption.tooltip = this.chartData.tooltip;
        if (this.chartData.axisLabel !== undefined) {
          // 如果进来的是数字   数字是 1    那么x 轴每行显示  1  个
          var re = /^[0-9]+.?[0-9]*/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
          if (re.test(this.chartData.axisLabel)) {
            let _this = this;
            this.axiosOption.xAxis.axisLabel = {
              interval: 0,
              formatter: function(value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = _this.chartData.axisLabel; //每项显示文字个数
                console.log(maxLength, "maxLength");
                var valLength = value.length; //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于3,
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            };
          }
          switch (this.chartData.axisLabel) {
            case "twoLine":
              // x 轴分两行显示
              this.axiosOption.xAxis.axisLabel = {
                interval: 0,
                formatter: function(value, index) {
                  if (index % 2 != 0) {
                    return "\n\n" + value;
                  } else {
                    return value;
                  }
                }
              };
              break;
            case "incline":
              // x轴倾斜显示
              this.axiosOption.xAxis.axisLabel = {
                interval: 0,
                rotate: 40
              };
              break;
          }
        }
        // 是否显示标题
        this.chartTitle(this.axiosOption);
        // console.log(this.axiosOption.xAxis.axisLabel);
      } else {
        // 没有坐标值
        this.normalOption = this.chartData;
        this.chartTitle(this.normalOption);
      }
    },
    chartTitle(data) {
      if (this.chartData.title !== undefined) {
        data.title = this.chartData.title;
      }
    },
    resizeChart() {
      this.echart ? this.echart.resize() : "";
    }
  }
};
</script>

<style></style>
