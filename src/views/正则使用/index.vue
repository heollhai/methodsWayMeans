<template>
  <div>
    正则的使用
    <button @click="fenlei">文件后缀名分类</button>
    <button @click="dataClassify">日期分类(对字符串进行分类)</button>
    <div class="dataClassifyclass">
      <template v-for="item in dataClassifyList">
        <div>{{ item.data }}</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "regular",
  data() {
    return {
      dataClassifyList: [
        { data: "2020-10-1", name: "111", age: "11" },
        { data: "2020-10-2", name: "112", age: "12" },
        { data: "2020-10-3", name: "113", age: "13" },
        { data: "2020-10-4", name: "114", age: "14" },
        { data: "2020-10-5", name: "115", age: "15" },
        { data: "2020-10-8", name: "116", age: "18" }
      ],
      img: [],
      text: [],
      vive: [],
      //.doc,.docx,.txt,.DOC,.DOCX,.TXT  文件类型
      //mp4/avi/wmv     视屏
      // jpg/png/gif/jpeg/bmp     图片
      data: [
        //测试.docx:2eef0c332a9539a1eb5f12066b9d9376,测试2.jpg:ec3303eadd1756847474d82149f50347
        {
          attachPath: "2eef0c332a9539a1eb5f12066b9d93761",
          attachType: "测试.doc"
        },
        {
          attachPath: "2eef0c332a9539a1eb5f12066b9d93762",
          attachType: "测试.docx"
        },
        {
          attachPath: "2eef0c332a9539a1eb5f12066b9d93763",
          attachType: "测试.txt"
        },
        {
          attachPath: "ec3303eadd1756847474d82149f503474",
          attachType: "测试2.png"
        },
        {
          attachPath: "ec3303eadd1756847474d82149f503475",
          attachType: "测试2.jpg"
        },
        {
          attachPath: "ec3303eadd1756847474d82149f503476",
          attachType: "测试2.wmv"
        }
      ]
    };
  },
  created() {
    console.log(this.data, "data");
    this.dataClassify();
  },
  methods: {
    //日期分类
    dataClassify() {
      let value = [];
      var fenlei = /(2020-10-1|2020-10-2|2020-10-3|2020-10-4|2020-10-5|2020-10-6)/; //图片类型
      this.dataClassifyList.forEach(ele => {
        if (fenlei.test(ele.data)) {
          ele.data = "▲◆ " + ele.data;
        }
      });
    },
    fenlei() {
      var pattern = /\.(jpg|png|gif|jpeg|bmp|JPEG|JPG)$/; //图片类型
      var file = /\.(doc|docx|txt|DOC|DOCX|TXT)$/; //文件类型
      var video = /\.(mp4|avi|wmv)$/; //视屏类型
      this.data.forEach(ele => {
        if (pattern.test(ele.attachType)) {
          console.log(ele, "图片");
        } else if (file.test(ele.attachType)) {
          console.log(ele, "文件");
        } else if (video.test(ele.attachType)) {
          console.log(ele, "视屏");
        }
      });
      console.log(pattern.test(this.data), "-------------");
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.dataClassifyclass {
  display: flex;
  > div {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    background-color: greenyellow;
  }
}
</style>
