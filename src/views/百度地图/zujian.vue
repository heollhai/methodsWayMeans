<template>
  <div>
    百度地图
    <template>
      <div>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item v-if="map.isAdd" label="关键词">
              <a-input v-model="map.keyword" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="map.isAdd" label="地区">
              <a-input v-model="map.location" />
            </el-form-item>
          </el-col>
        </el-row>

        <baidu-map
          class="map"
          :center="map.center"
          :zoom="map.zoom"
          @ready="handler"
        >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
          <bm-local-search
            v-if="map.isAdd"
            class="search"
            :keyword="map.keyword"
            :auto-viewport="true"
            :location="map.location"
          ></bm-local-search>
        </baidu-map>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "simple-map",
  props: {
    map: {
      type: Object
    }
  },
  data: () => ({}),
  methods: {
    handler({ BMap, map }) {
      let me = this;
      console.log(BMap, map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
        me.$emit("select-location", {
          lng: e.point.lng,
          lat: e.point.lat
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.map {
  width: 600px;
  height: 600px;

  .search {
    margin-bottom: 65px;
  }
}
</style>
