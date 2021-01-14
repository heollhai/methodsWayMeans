<template>
	<div></div>
</template>

<script>
	import {
		quanJu
	} from '@/components/pubilcMethod'
	export default {
		name: "paixu",
		data() {
			return {
				tiem: []
			}
		},
		methods: {
			sortKey(array, key) {
				console.log(1111);
				return array.sort(function(a, b) {
					var x = a[key];
					var y = b[key];
					return x > y ? -1 : x < y ? 1 : 0;
				});
			},
		},
		mounted: {
			this.tiem.push({
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-11-15 15:10:33.0'
			}, {
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-11-08 15:10:33.0'
			}, {
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-12-10 15:10:33.0'
			}, {
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-11-09 15:10:33.0'
			}, {
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-11-09 14:10:33.0'
			}, {
				eventName: 'ssss',
				evevStatue: "未处置",
				occurrenceTime: '2020-10-01 14:10:32.0'
			}),
			this.sortKey(this.tiem, "occurrenceTime");
		}
	}
</script>

<style>
</style>
