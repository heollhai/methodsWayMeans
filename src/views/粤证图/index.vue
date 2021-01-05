<template>
	<div class='GuangdongTheFigure'>
		粤证图2s
		<div class='content'>
			<div class="verification">
				<div>paasId:<el-input v-model="paasId" placeholder="paasId" class="input"></el-input>
				</div>
				<div>paasToken:<el-input v-model="paasToken" placeholder="paasToken" class="input"></el-input>
				</div>
			</div>
			<div>
				地图产品接入模式:<el-select v-model="modeType" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				地图产品类型:<el-select v-model="typeDiv" placeholder="请选择">
					<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
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
			<div class="toLoad" @click="loadLayers">
				<div>加载至地图</div>
			</div>
		</div>
		<button @click='dianwocishi'>geoCodingUrl</button>
	</div>
</template>

<script>
	export default {
		name: "GuangdongTheFigure",
		data() {
			return {
				options: [{
					value: 'gateway',
					label: '智能网关'
				}, {
					value: 'bus',
					label: '数据中台'
				}],
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
				modeType: "智能网关",
				typeDiv: "地图服务",
				paasToken: "paasToken",
				paasId: "paasId",
				serverTipName: "地图产品服务地址:",
				geoCodingUrl: "", //地图产品服务地址URL
				serviceTableWmtsTr: [{
					url: "https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GD_2018DLG/wmts",
					name: "1"
				}, {
					url: "https://dc-gateway.gdgov.cn/ebus/zwdsj-dlk/geostar/GD_2018DLGZJ/wmts",
					name: "2"
				}],
			}
		},
		methods: {
			dianwocishi() { //测试
				console.log(this.geoCodingUrl, 'geoCodingUrl')
				console.log(this.serviceTableWmtsTr, 'this.serviceTableWmtsTr')
			},
			addGeoCodingUrl() { //添加
				this.serviceTableWmtsTr.push({
					naem: this.serviceTableWmtsTr.length + 1,
					url: this.geoCodingUrl
				})
			},
			deleteGeoCoding(index) { //删除
				this.serviceTableWmtsTr.splice(index, 1)
				console.log(index)
			},
			loadLayers() { //点击加载至地图
				this.loadLayers()
			}
		}
	}
</script>

<style lang="scss">
	.GuangdongTheFigure {
		.input {
			width: 60%;
		}

		.content {
			width: 600px;
			min-height: 600px;
			border: 1px solid red;
			margin: auto;
			margin-top: 10%;

			.verification {
				display: flex;
				justify-content: space-between;
			}

			.serviceTableUrl {
				width: 100%;

				div {
					position: relative;

					span {
						display: inline-block;
						width: 100%;
					}

					button {
						position: absolute;
						right: 10%;
						top: 5px;
					}
				}
			}

			.toLoad {
				width: 100%;
				height: 100px;
				line-height: 50px;
				display: flex;

				div {
					text-align: center;
					background-color: greenyellow;
					width: 130px;
					margin: auto;
				}
			}
		}
	}
</style>
