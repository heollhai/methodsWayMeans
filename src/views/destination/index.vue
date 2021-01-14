<template>
  <div>
    目的地
    <button @click="clickClearInfo"></button>

    {{ clearInfo.eventName }}
    <template v-for="item in clearInfo.eventType1">
      {{ item }}
    </template>
  </div>
</template>

<script>
import { EVENT_INFO_FIELD } from "../storedata/datajs.js";
import store from "../../store/index.js";
export default {
  name: "mudidi",
  data() {
    return {
      clearInfo: EVENT_INFO_FIELD
    };
  },
  created() {
    console.log(this.clearInfo.eventName);
  },
  methods: {
    clickClearInfo() {
      this.data++;
      this.clearInfo.eventType1.push(this.data);
      store.dispatch("setBaseInfo", this.clearInfo);
      console.log(this.clearInfo);
    }
  }
};
</script>

<style></style>
