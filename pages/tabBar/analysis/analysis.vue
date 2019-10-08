<template>
	<view>
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx; margin-left: 20upx;"></navigator></block>
			<block slot="content">统计分析</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="margin-right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator
					hover-class="none"
					:url="'/pages/analysis/' + item.name + '/' + item.name"
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
				// 	title: '工器具台账分析',
				// 	name: 'toolequip',
				// 	color: 'cyan',
				// 	cuIcon: 'send'
				// },
				// {
				// 	title: '备品备件台账分析',
				// 	name: 'spare-parts',
				// 	color: 'blue',
				// 	cuIcon: 'sort'
				// },
				// {
				// 	title: '工器具综合分析',
				// 	name: 'toolequip-comprehensive',
				// 	color: 'purple',
				// 	cuIcon: 'list'
				// },
				// {
				// 	title: '库存情况分析 ',
				// 	name: 'stock',
				// 	color: 'mauve',
				// 	cuIcon: 'squarecheck'
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
