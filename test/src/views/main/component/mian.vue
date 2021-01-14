<template>
  <div class="mian">
    <el-tag
      v-for="tag in tageList"
      :key="tag.path"
      :closable="tag.path !== '/'"
      @close="CLOSETAB(tag)"
      @click="tagPath(tag.path)"
      :effect="$route.path === tag.path ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("Crumbs");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["tageList"])
  },
  methods: {
    ...mapMutations(["CLOSETAB"]),
    tagPath(path) {
      console.log(this.$route);
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.mian {
  margin-left: 20px;
  margin-top: 20px;
  .el-tag {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
