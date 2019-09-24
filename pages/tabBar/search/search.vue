<template>
	<view>
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx;"></navigator></block>
			<block slot="content">实时查询</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
		</cu-custom>

		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator
					hover-class="none"
					:url="'/pages/search/' + item.name + '/' + item.name"
					class="nav-li"
					navigateTo
					:class="'bg-' + item.color"
					:style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]"
					v-for="(item, index) in elements"
					:key="index"
				>
					<view class="nav-title">{{ item.title }}</view>
					<view class="nav-name">{{ item.name }}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			elements: [
				// {
				// 	title: '库存情况查询',
				// 	name: 'stock',
				// 	color: 'cyan',
				// 	cuIcon: 'shopfill'
				// },
				// {
				// 	title: '出入库查询',
				// 	name: 'io',
				// 	color: 'blue',
				// 	cuIcon: 'order'
				// },
				// {
				// 	title: '盘点查询',
				// 	name: 'inventory',
				// 	color: 'purple',
				// 	cuIcon: 'list'
				// },
				// {
				// 	title: '人员出入查询 ',
				// 	name: 'user-io',
				// 	color: 'mauve',
				// 	cuIcon: 'group_fill'
				// },
				// {
				// 	title: '工器具查询',
				// 	name: 'toolequip',
				// 	color: 'pink',
				// 	cuIcon: 'search'
				// },
				// {
				// 	title: '任务工器具查询',
				// 	name: 'task-toolequip',
				// 	color: 'brown',
				// 	cuIcon: 'shake'
				// },
				// {
				// 	title: '特种车辆查询',
				// 	name: 'special-vehicles',
				// 	color: 'red',
				// 	cuIcon: 'deliver'
				// }
			]
		};
	},
	methods: {}
};
</script>

<style>
.page {
	height: 100vh;
	padding-top: 150upx;
}
</style>
