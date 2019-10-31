<template>
	<view class="full">
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx; margin-left: 20upx;"></navigator></block>
			<block slot="content">实时查询</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="margin-right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
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
				{
					title: '地块信息',
					name: 'ground',
					color: 'brown',
					cuIcon: 'group_fill'
				},{
					title: '项目信息',
					name: 'project',
					color: 'cyan',
					cuIcon: 'shopfill'
				},
				{
					title: '信息推荐',
					name: 'recommend',
					color: 'blue',
					cuIcon: 'order'
				},
				{
					title: '线索管理',
					name: 'clue',
					color: 'blue',
					cuIcon: 'order'
				},
				{
					title: '人才管理',
					name: 'talenteder',
					color: 'purple',
					cuIcon: 'list'
				},
				{
					title: '企业查询 ',
					name: 'merchant',
					color: 'mauve',
					cuIcon: 'group_fill'
				},
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
