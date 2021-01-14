<template>
  <div>
    默认插槽 头部:
    <header>
      <slot name="header"></slot>
    </header>
    底部:
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "slotChildren"
};
</script>

<style></style>
