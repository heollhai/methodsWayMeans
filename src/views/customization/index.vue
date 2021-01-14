<template>
  <div>
    我是定制行测试版本回退
    <el-form
      ref="gudBaseInfoForm"
      :model="baseInfo"
      label-width="100px"
      class="edit-view"
    >
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/comments"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="onsuccess"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="baseInfo.fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-form>
  </div>
</template>

<script>
import { EVENT_INFO_FIELD } from "../storedata/datajs.js";
export default {
  data() {
    return {
      baseInfo: EVENT_INFO_FIELD,
      validate: ""
    };
  },
  methods: {
    onsuccess(ile, fileList) {
      console.log(file, fileList);
    },
    primary(ile, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    imageChange() {}
  }
};
</script>

<style></style>
