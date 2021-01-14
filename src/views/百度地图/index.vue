<template>
  <!-- 
		BMAP_ANCHOR_TOP_LEFT 表示控件定位于地图的左上角。
		BMAP_ANCHOR_TOP_RIGHT 表示控件定位于地图的右上角。
		BMAP_ANCHOR_BOTTOM_LEFT 表示控件定位于地图的左下角。
		BMAP_ANCHOR_BOTTOM_RIGHT 表示控件定位于地图的右下角。 
		:offset="{width:220,height:20}"   根据控件的定位更改控件定位的位置
		
		:center="map.center"		//初始定位的位置
		:zoom="map.zoom"			//初始地图放大的级别
		@ready="handler"			//初始时定义的地图方法，以及一些参数
		http://lbsyun.baidu.com/jsdemo.htm#a2_1   百度地图api接口地址  
		
		

	 -->
  <div>
    地址：<input v-model="keyword" />
    <el-button>aaaa</el-button>
    <baidu-map
      class="map"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
      @click="getPoint"
    >
      <!-- 地图搜索功能，绑定上面的input，
			display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，
			zoom是搜索结果的视图比例 -->
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :location="location"
        zoom="12.8"
        style="display: none"
      ></bm-local-search>
      <!-- //添加地图类型  地图 +2D图，混合图 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        :offset="{ width: 100, height: 20 }"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!-- 左上角的移动和放大缩小 -->
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_LEFT"
        style="top:100px"
        :offset="{ width: 20, height: 20 }"
      ></bm-navigation>
      <!-- 获取用户定位，在右下角 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!-- 城市列表搜索 -->
      <bm-city-list
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        :offset="{ width: 20, height: 20 }"
      ></bm-city-list>
      <!--比例尺控件-->
      <bm-scale
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :offset="{ width: 220, height: 20 }"
      ></bm-scale>

      <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
      <!-- <bm-marker :position="postionMap" anchor="BMAP_ANIMATION_BOUNCE" >
			    <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size: 14px">
			      <p>站点：{{ add.siteName }}</p>
			      <p>站点地址：{{ add.site }}</p>
			    </bm-info-window>
			  </bm-marker> -->
    </baidu-map>
    <img :src="Img" alt="" />
  </div>
</template>

<script>
import Img from "@/assets/da.png";
export default {
  name: "demo",
  data: () => ({
    Img: Img,
    map: {
      center: {
        lng: 113.057224,
        lat: 22.634922
      },
      zoom: 16,
      show: true,
      dragging: true
    },
    postionMap: {
      //地图坐标
      lng: 113.057224,
      lat: 22.634922
    },
    show: false,
    location: "",
    keyword: "",
    address: "", //位置详细信息
    add: {
      siteName: "",
      site: "",
      jd: "",
      wd: "",
      desce: "",
      type: "",
      jgName: "",
      jgNum: ""
    },
    organizationData: [],
    jgName: "",
    jgNum: ""
  }),
  methods: {
    buttonjinweidu() {
      $.ajax({
        url: "https://restapi.amap.com/v3/geocode/geo",
        type: "get",
        dataType: "jsonp",
        data: {
          key: "6e7239cd1f1aaf595bca3753a67986f8",
          address: "江门市群星罗东村"
        },
        success: function(data) {
          console.log(data);
        }
      });
    },

    handler({ BMap, map }) {
      console.log("知悉");
      let me = this;
      // 鼠标缩放
      map.enableScrollWheelZoom(true);

      map.addTileLayer(new BMap.PanoramaCoverageLayer()); // 覆盖区域图层测试
      var stCtrl = new BMap.PanoramaControl(); //构造全景控件
      stCtrl.setOffset(new BMap.Size(20, 60)); //窗口位置
      map.addControl(stCtrl); //添加全景控件

      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
        //创建小狐狸
        // var pt = new BMap.Point(e.point.lng, e.point.lat);// 设置图片出现的位置
        // var myIcon = new BMap.Icon(Img, new BMap.Size(100,100));//设置图片、图片宽高
        //  myIcon.setImageSize(new BMap.Size(60,60));//设置图标大小
        // var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        // map.addOverlay(marker2);  //添加海量的标注点
        //百度地图API功能
        var point = new BMap.Point(e.point.lng, e.point.lat); //经纬度
        map.centerAndZoom(point, 15); //显示层级
      });
    },
    getPoint(e) {
      //点击地图获取一些信息，
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      console.log(e, "2+e2");
      geocoder.getLocation(e.Ag, rs => {
        this.add.site = rs.address;
        //地址描述(string)=
        // console.log(rs.address,'1');    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
        // console.log(rs.addressComponents,'2');//结构化的地址描述(object)
        // console.log(rs.addressComponents.province,'3'); //省
        // console.log(rs.addressComponents.city,'4'); //城市
        // console.log(rs.addressComponents.district,'5'); //区县
        // console.log(rs.addressComponents.street,'6'); //街道
        // console.log(rs.addressComponents.streetNumber,'7'); //门牌号
        // console.log(rs.surroundingPois,'8'); //附近的POI点(array)
        // console.log(rs.business,'9'); //商圈字段，代表此点所属的商圈(string)
      });
      // console.log(e,'dkafklds==========')
      this.show = true;
      this.postionMap.lng = e.Ag.lng; //通过  e.point.lng获取经度
      this.postionMap.lat = e.Ag.lat; //通过  e.point.lat获取纬度
      this.add.jd = e.Ag.lng;
      this.add.wd = e.Ag.lat;
      this.zoom = e.target.getZoom();
    },
    infoWindowClose() {
      console.log(1);
      this.show = false;
    },
    infoWindowOpen() {
      // console.log(2)
      //  这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
      //  并且信息窗口点击一次显示，一次消失
      //  于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
      setInterval(() => {
        // console.log(2)
        this.show = true;
      }, 100);
    }
  }
};
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 1000px;

  /deep/.anchorBL {
    //隐藏左下角百度地图logo
    display: none;
  }
}
</style>

<!-- // var point = new BMap.Point(120.211486,30.256576);
				// 	var marker = new BMap.Marker(point);  // 创建标注
				// 	map.addOverlay(marker);              // 将标注添加到地图中
					// map.centerAndZoom(point, 15);
					// 	var opts = {
					// 	  width : 600,     // 信息窗口宽度
					// 	  height: 100,     // 信息窗口高度
					// 	  title : "海底捞王府井店" , // 信息窗口标题
					// 	  enableMessage:true,//设置允许信息窗发送短息
					// 	  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
					// 	}
					// 	var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
					// 	marker.addEventListener("click", function(){          
					// 		map.openInfoWindow(infoWindow,point); //开启信息窗口
					// 	});
					
				//添加地图类型和缩略图,添加默认缩略地图控件,右下角，打开
				 // console.log(map,'-------')
				// var mapType1 = new BMap.MapTypeControl(
				// 	{
				// 		mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
				// 		anchor: BMAP_ANCHOR_TOP_LEFT
				// 	}
				// );
				// var overView = new BMap.OverviewMapControl();
				// var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
				// map.addControl(mapType1);          //2D图，混合图
				// map.addControl(overView);          //添加默认缩略地图控件
				// map.addControl(overViewOpen);      //右下角，打开

				//地图移动
				setTimeout(function(){
					map.panTo(new BMap.Point(113.262232,23.154345));   //两秒后移动到广州
				}, 2000);
				//更改样式风格 https://developer.baidu.com/map/custom/list.htm  可以去看下更多种
				map.setMapStyle({style:'hardedge'});
				//根据城市名设置地图中心点
				map.centerAndZoom("上海",15); 
				 
				 
				 
				// 随机向地图添加25个标注
				// //编写自定义函数,创建标注
				// function addMarker(point){
				//   var marker = new BMap.Marker(point);
				//   map.addOverlay(marker);
				// }
				// var bounds = map.getBounds();
				// console.log(bounds,'bounds')//返回当前视口的西南纬度/经度和东北纬度/经度：
				// var sw = bounds.getSouthWest();//返回的也是一个经纬度(不太明白是啥经纬度)
				// console.log(sw,'sw')
				// var ne = bounds.getNorthEast();//返回的也是一个经纬度(不太明白是啥经纬度)
				// console.log(ne,'ne')
				// var lngSpan = Math.abs(sw.lng - ne.lng);
				// var latSpan = Math.abs(ne.lat - sw.lat);
				// for (var i = 0; i < 25; i ++) {
				// 	var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
				// 	addMarker(point);
				// } 
				 -->
