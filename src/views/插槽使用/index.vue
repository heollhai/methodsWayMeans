<template>
	<div>
		<children-slot>
			<div slot="header">在具名插槽头部</div>
			<div slot="footer">在具名插槽底部</div>
		</children-slot>
		<childrentSlota :data="data">
			<template slot="actionScope" slot-scope="data">
				我是作用域插槽里面的数据:{{data.data}}
			</template>
		</childrentSlota>
	</div>
</template>


<script>
	import childrentSlota from "./children/actionScope.vue"; //作用域插槽
	import childrenSlot from './children/slot.vue'; //具名插槽
	export default {
		components: {
			childrenSlot,
			childrentSlota
		},
		name: 'slot-',
		data() {
			return {
				data: "我是传值给子组件，，在显示到父组件"
			}
		}
	}
</script>

<style>
</style>
