<template>
	<view class="full">
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx; margin-left: 20upx;"></navigator></block>
			<block slot="content">系统管理</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="margin-right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
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
				{
					title: '用户管理',
					name: 'user',
					color: 'cyan',
					cuIcon: 'friendadd'
				},
				{
					title: '角色管理',
					name: 'role',
					color: 'blue',
					cuIcon: 'friend'
				},
				{
					title: '菜单管理',
					name: 'menu',
					color: 'purple',
					cuIcon: 'read'
				},
				{
					title: '日志管理',
					name: 'log',
					color: 'brown',
					cuIcon: 'edit'
				},
				{
					title: '通用字典',
					name: 'macros',
					color: 'red',
					cuIcon: 'deliver'
				}
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
