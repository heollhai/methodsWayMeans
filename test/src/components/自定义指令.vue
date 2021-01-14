<template>
  <div>
    自定义指令
    <el-dialog :visible.sync="dialogFormVisible" title="自动获取光标">
      <el-input
        v-focus
        v-model="value"
        :autosize="{ minRows: 7, maxRows: 14 }"
        type="textarea"
        style="min-height: 200px;"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="focusConten">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "customInstruction",
  data() {
    return {
      dialogFormVisible: false,
      value: ""
    };
  },
  created() {
    console.log(1);
    this.$nextTick(() => {
      console.log(2);
    });
  },
  mounted() {
    console.log(3);
  },
  methods: {
    focusConten() {
      this.dialogFormVisible = false;
      this.$parent.$data.focusValue = this.value;
    }
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        el.getElementsByTagName("textarea")[0].focus();
      },
      update: function(el, { value }) {
        el.getElementsByTagName("textarea")[0].focus();
      }
    }
  }
};
</script>

<style></style>
