<template>
  <div>
    默认插槽 头部:
    <header>
      <slot name="header"></slot>
    </header>
    底部:{{ data }}
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "slotChildren",
  data() {
    return {
      data: "data"
    };
  },
  methods: {
    fun() {
      this.data = "使用refs修改";
    }
  }
};
</script>

<style></style>
