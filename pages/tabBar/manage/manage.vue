<template>
	<view>
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx;"></navigator></block>
			<block slot="content">管理</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator
					hover-class="none"
					:url="'/pages/manage/' + item.name + '/' + item.name"
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
				// 	title: '借调申请',
				// 	name: 'transfer',
				// 	color: 'cyan',
				// 	cuIcon: 'forward'
				// },
				// {
				// 	title: '报废申请',
				// 	name: 'scrap',
				// 	color: 'blue',
				// 	cuIcon: 'warn'
				// },
				// {
				// 	title: '评价管理',
				// 	name: 'evaluate',
				// 	color: 'purple',
				// 	cuIcon: 'favor'
				// },
				// {
				// 	title: '培训教程查看 ',
				// 	name: 'read-course',
				// 	color: 'mauve',
				// 	cuIcon: 'newshot'
				// },
				// {
				// 	title: '培训教程管理',
				// 	name: 'course',
				// 	color: 'pink',
				// 	cuIcon: 'calendar'
				// },
				// {
				// 	title: '出库管理',
				// 	name: 'out',
				// 	color: 'brown',
				// 	cuIcon: 'repeal'
				// },
				// {
				// 	title: '入库管理',
				// 	name: 'in',
				// 	color: 'red',
				// 	cuIcon: 'deliver'
				// },
				// {
				// 	title: '盘点管理',
				// 	name: 'inventory',
				// 	color: 'green',
				// 	cuIcon: 'list'
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
