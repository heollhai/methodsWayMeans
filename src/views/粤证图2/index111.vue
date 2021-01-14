<template>
	<div class="gudMap">
		<div id="gmap" class="gmap"></div>
		<div class='content'>
			<div>
				地图产品类型:<el-select v-model="typeDiv" placeholder="请选择" @change="typeDivType">
					<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				地名地址查询:<el-select v-model="matchingValue" placeholder="请选择" @change="matchingType">
					<el-option v-for="item in matching" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div v-if="wfsType">
				返回数据类型<el-radio v-model="wfs" label="1">XML</el-radio>
				<el-radio v-model="wfs" label="2">GEOJSON</el-radio>
			</div>
			<div>
				{{serverTipName}}
				<el-input v-model="geoCodingUrl" placeholder="请输入地址" class="input"></el-input>
				</el-select>
				<button @click="addGeoCodingUrl">添加</button>
				<div class="serviceTableUrl">
					<div v-for="(item,index) in serviceTableWmtsTr" :key="item.name">
						<div><span>{{item.url}}</span><button @click="deleteGeoCoding(index)">X</button></div>
					</div>
				</div>
			</div>
			<button @click="loadServices">添加到地图</button>
		</div>
	</div>
</template>
<script>
	// import {getproxyHandler} from  "@/api/guard/GudEvnNewForDept"
	// import {getselectRefOrgAll} from  "@/api/guard/GudEasyAnalysis"/
	export default {
		name: 'mapaa',
		data() {
			return {
				option: [{
					value: 'wmts',
					label: '地图服务'
				}, {
					value: 'wfs',
					label: '要素服务'
				}, {
					value: 'geocoding',
					label: '地名地址服务'
				}],
				typeDiv: "地图服务",
				serverTipName: "地图产品服务地址:",
				geoCodingUrl: "",
				paasToken: "paasToken",
				paasId: "zwdsj_jmszsj_zhcs",
				urlType: "gateway",
				serviceTableWmtsTr: [{
					url: "https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/DOMZJ_2000_2015/wmts",
					name: "1"
				}],
				map: {}, //地图初始化方法、参数
				wfs: "1",
				wfsType: false,
				matchingValue: "",
				matching: [{ //
					value: '1',
					label: '正向匹配'
				}, {
					value: '2',
					label: '反向匹配'
				}],
				mapLayerIds: []
			}
		},
		created() {
			//初始化地图

		},
		mounted() {
			this.handler()
		},

		methods: {
			handler() {
				console.log("知悉")
				this.createMap()
			},

			matchingType() {},
			typeDivType(value) {
				if (value === "wfs") {
					this.wfsType = true
				} else {
					this.wfsType = false
				}
			},
			addGeoCodingUrl() { //添加
				this.serviceTableWmtsTr.push({
					naem: this.serviceTableWmtsTr.length + 1,
					url: this.geoCodingUrl
				})
			},
			deleteGeoCoding(index) { //删除
				this.serviceTableWmtsTr.splice(index, 1)
			},
			loadServices() {
				console.log(map)

				// this.clearLayers()
				// this.addWmtsLayers();//使用了这个方法对地址进行发送
				// this.addWfsLayers();

			},
			//初始化图层组
			addWmtsLayers: function() {
				// this.createMap();
				var layerArry;
				console.log(this.map, 'that.map')
				console.log(this.map.addSource, 'that.map')
				var that = this;
				var wmtsConfigs = this.serviceTableWmtsTr
				var wmtsConfig = wmtsConfigs[0]; //获取url
				//需要传参数
				getproxyHandler("paasId=zwdsj_jmszsj_zhcs&paasToken=YGr1V9UzHRdRf11Eqea2p30LnL7CQ6mp&url=" + wmtsConfig.url +
					"?service=wmts&REQUEST=GetCapabilities").then(res => {
					var format = new GeoGlobe.Format.WMTSCapabilities();
					var json = format.read(res.request.responseText); // 版本号赋值
					var layers = json.contents.layers[0];
					console.log(layers, 'layers==layers')
					var tileMatrixSets = json.contents.tileMatrixSets;
					var layerArr = [];
					$(layers).each(function(i, data) {
						var layerObj = {};
						layerObj["name"] = data.identifier;
						layerObj["type"] = "WMTS";
						layerObj["alias"] = data.identifier;
						layerObj["opacity"] = 1;
						layerObj["visibility"] = true;
						layerObj["formats"] = data.formats;
						layerObj["format"] = data.formats[0]; //"image/tile";
						layerObj["style"] = data.styles[0].identifier;
						layerObj["tileFullExtent"] = data.bounds.left + "," + data.bounds.bottom + "," + data.bounds.right + "," +
							data.bounds.top;
						layerObj["matrixSet"] = data.tileMatrixSetLinks[0].tileMatrixSet;
						var matrixIds = [];
						$(tileMatrixSets[data.tileMatrixSetLinks[0].tileMatrixSet].matrixIds).each(function(j, d) {
							var matrixid = {};
							matrixid.identifier = d.identifier;
							matrixid.scaleDenominator = d.scaleDenominator;
							matrixid.tileHeight = d.tileHeight;
							matrixid.tileWidth = d.tileWidth;
							matrixIds.push(matrixid);
						});
						layerObj["matrixIds"] = matrixIds;
						layerArr.push(layerObj);
					});
					var layerInf = this.createLayer(wmtsConfig.url, layerArr);
					that.map.addSource(layerInf.source.id, layerInf.source);
					that.map.addLayer(layerInf.layer);
					that.mapLayerIds.push(layerInf.layer.id);
				});
			},
			//地图初始化
			createMap() {
				alert("初始地图")
				var simple = {
					"version": 8,
					"sources": {},
					"layers": []
				};
				var wgs84_wgs84_mapcrs = {
					topTileExtent: [-180, -270, 180, 90],
					coordtransform: "none",
					tileSize: 256
				};
				var map = new GeoGlobe.Map({
					mapCRS: wgs84_wgs84_mapcrs,
					style: simple,
					container: "gmap",
					zoom: 4,
					center: [112.939, 31.377],
					isIntScrollZoom: true, //缩放级别是否为整数处理模式
					renderWorldCopies: false,
					isAttributionControl: false,
					is3Dpitching: false, //是否到指定层级自动倾斜
					pitch3Dzoom: 16, //自动倾斜的层级，默认16
				});
				this.map = map
				console.log(this.map, "map")
				map.on("style.load", () => {
					console.log(this, 'this')
					this.initControls(map); //初始化控件
					map.setZoom(7);
					map.setCenter([113.272753, 23.139257]);
				});
				console.log(this, 'this')
			},

			initControls(map) {
				//比例尺控件
				var Sca_control = new GeoGlobe.Control.Scale({
					position: 'bottom-right',
					maxWidth: 80,
					unit: 'm'
				});
				map.addControl(Sca_control, Sca_control.options.position);
				//导航控件
				var Na_control = new GeoGlobe.Control.Navigation();
				map.addControl(Na_control, "bottom-right");
			},
			//  getMatchServiceOption (serviceUrl){
			//   var that = this;
			//   var layerArry;
			//   var url;
			//   url = UrlUtil.getUrl(serviceUrl, {service: 'wmts', REQUEST: 'GetCapabilities'})
			//   console.log(url,'我是url')
			//   var format = new GeoGlobe.Format.WMTSCapabilities();
			//   console.log(format,'format')

			//     // GeoGlobe.Request.GET({
			//     //       url: url,
			//     //       async:false,
			//     //       success: function(request){
			//     //         var json = format.read(request.responseText);  // 版本号赋值
			//     //           // layerArry = this.WMTSMatchAnalyzer(json);   // 可能json是
			//     //           //这个json可能是去后
			//     //           console.log(json,'woshi json')
			//     //       }
			//     //   });
			//     // return layerArry;
			// },
			//WMTS类型的服务数据 解析.
			WMTSMatchAnalyzer(json) {
				var layers = json.contents.layers[0];
				console.log(layers, 'layers==layers')
				var tileMatrixSets = json.contents.tileMatrixSets;
				var layerArr = [];
				$(layers).each(function(i, data) {
					var layerObj = {};
					layerObj["name"] = data.identifier;
					layerObj["type"] = "WMTS";
					layerObj["alias"] = data.identifier;
					layerObj["opacity"] = 1;
					layerObj["visibility"] = true;
					layerObj["formats"] = data.formats;
					layerObj["format"] = data.formats[0]; //"image/tile";
					layerObj["style"] = data.styles[0].identifier;
					layerObj["tileFullExtent"] = data.bounds.left + "," + data.bounds.bottom + "," + data.bounds.right + "," + data.bounds
						.top;
					layerObj["matrixSet"] = data.tileMatrixSetLinks[0].tileMatrixSet;
					var matrixIds = [];
					$(tileMatrixSets[data.tileMatrixSetLinks[0].tileMatrixSet].matrixIds).each(function(j, d) {
						var matrixid = {};
						matrixid.identifier = d.identifier;
						matrixid.scaleDenominator = d.scaleDenominator;
						matrixid.tileHeight = d.tileHeight;
						matrixid.tileWidth = d.tileWidth;
						matrixIds.push(matrixid);
					});
					layerObj["matrixIds"] = matrixIds;
					layerArr.push(layerObj);
				});
				return layerArr;
			},
			// ?
			createLayer(url, options) {
				console.log(options[0].formats[0], 'options')
				var layerInf = {};
				var random = TDT.random(4);
				var requestUrl = UrlUtil.getUrl(url, {
					SERVICE: 'WMTS',
					REQUEST: 'GetTile',
					VERSION: '1.0.0',
					LAYER: options.name,
					STYLE: options.style,
					TILEMATRIXSET: options.matrixSet,
					TILEMATRIX: '{z}',
					TILEROW: '{y}',
					TILECOL: '{x}',
					FORMAT: options[0].formats[0]
				});
				var matrixIds = options[0].matrixIds;
				//minzoom
				if (matrixIds[0].islevelhidden == false) {
					var minZoom = matrixIds[0].identifier;
				} else if (matrixIds[0].islevelhidden == true) {
					for (i = 0; i < matrixIds.length - 1; i++) {
						if (matrixIds[i].islevelhidden == true && matrixIds[i + 1].islevelhidden == false) {
							var minZoom = matrixIds[i + 1].identifier;
						}
					}
				} else {
					var minZoom = matrixIds[0].identifier
				};
				//maxzoom
				if (matrixIds[matrixIds.length - 1].islevelhidden == false) {
					var maxZoom = matrixIds[matrixIds.length - 1].identifier;
				} else if (matrixIds[matrixIds.length - 1].islevelhidden == true) {
					for (i = matrixIds.length - 1; i > 0; i--) {
						if (matrixIds[i].islevelhidden == true && matrixIds[i - 1].islevelhidden == false) {
							var maxZoom = matrixIds[i - 1].identifier;
						}
					}
				} else {
					var maxZoom = matrixIds[matrixIds.length - 1].identifier
				};
				var wmtsSource = new GeoGlobe.Source.RasterSource({
					"id": "sourceId_" + options.name + "_" + random,
					"type": "raster",
					"url": [requestUrl],
					"minzoom": parseInt(minZoom),
					"maxzoom": parseInt(maxZoom) + 1,
					"tileSize": 256
				});
				wmtsSource['minzoom'] = parseInt(minZoom);
				wmtsSource['maxzoom'] = parseInt(maxZoom) + 1;
				var visibility = options.visibility;
				if (options.cityName && parseInt(minZoom) > 17) {
					visibility = "false";
				}
				var wmtsLyaer = new GeoGlobe.Layer.RasterLayer({
					"id": "layerId_" + options.name + "_" + random,
					"type": "raster",
					"source": wmtsSource.id,
					"name": options.name,
					"metadata": options,
					"minzoom": parseInt(minZoom),
					"maxzoom": parseInt(maxZoom) + 2,
					"paint": {
						"raster-opacity": 1
					},
					"layout": {
						"visibility": (visibility == true || visibility == "true") ? "visible" : "none"
					}
				});
				layerInf["layer"] = wmtsLyaer;
				layerInf["source"] = wmtsSource;
				return layerInf;
			},
			// getUrl: function(serviceUrl, params){//serviceUrl传过来的Url		params ={service: 'wmts', REQUEST: 'GetCapabilities'}
			//     // var paasId = $('#paasId').val();
			//     // var paasToken = $('#paasToken').val();
			//     var paasParams = "";
			//     // if (paasId && paasToken) {
			//     //     paasParams = "paasId=" + paasId + "&paasToken=" + paasToken;
			//     // }

			//     if(this.urlType === 'gateway'){
			//         if(paasParams.length){
			//             paasParams += '&';
			//         }
			//         var url = TDT.getAppPath("")+ "proxyHandler?" + paasParams + "url=" + serviceUrl;
			//         if(params){
			//             url += (serviceUrl.indexOf('?') > 0 ? '&' : '?') + this.getParamStr(params);
			//         }
			//         return url;
			//     }
			// },
			// clearLayers() {
			// 		console.log('使用了clearLayers方法')
			// 		for (var i = 0; i < this.mapLayerIds.length; i++) {
			// 			var layer = this.map.getLayer(this.mapLayerIds[i]);
			// 			if (layer) {
			// 				this.map.removeLayer(layer.id);
			// 				if (this.map.getSource(layer.source)) {
			// 					this.map.removeSource(layer.source);
			// 				}
			// 			}
			// 		}
			// 		console.log('使用了clearLayers方法完了')
			// 		this.mapLayerIds = [];
			// 		console.log('清空mapLayerIds')
			// 	},
		},
	}
</script>



<style lang="scss">
	// .el-steps {
	//   height:0px;background-color: red;
	// }
	.gmap {
		width: 1000px;
		height: 1000px;
		border: 1px solid red;

	}

	.gudMap {
		.input {
			width: 60%;
		}

		.content {
			width: 700px;
			height: 600px;
			border: 1px solid red;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>
