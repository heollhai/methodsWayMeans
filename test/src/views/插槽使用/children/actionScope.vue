<!-- 
	作用域插槽
 -->
<template>
  <div>
    <slot name="actionScope" :data="data"></slot>
  </div>
</template>

<script>
export default {
  name: "actionScope1",
  props: {
    data: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
