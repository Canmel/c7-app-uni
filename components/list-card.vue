<template>
	<view :class="{ 'uni-card--full': isFull === true || isFull === 'true', 'uni-card--shadow': isShadow === true || isShadow === 'true' }" class="uni-card" @click="onClick">
		
		<!-- 内容 -->
		<view class="uni-card__content uni-card__content--pd">
			<view v-if="mode === 'style'" class="uni-card__thumbnailimage">
				<image :src="thumbnail" mode="aspectFill" />
			</view>
			<view v-if="mode === 'style' && extra" class="uni-card__content-extra">{{ extra }}</view>
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniCard',
		props: {
			title: {// 标题
				type: String,
				default: ''
			}, 
			extra: {// 扩展信息
				type: String,
				default: ''
			}, 
			note: { // Tips
				type: String,
				default: ''
			},
			thumbnail: {// 缩略图
				type: String,
				default: ''
			}, 
			mode: {// 卡片模式 ， 可选值 basic：基础卡片 ；style ：图文卡片 ； title ：标题卡片
				type: String,
				default: 'basic'
			},
			isFull: {// 内容区域是否通栏
				type: Boolean,
				default: false
			},
			isShadow: {// 是否开启阴影
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-card {
		margin-bottom: 11upx;/* 下外边距 */
		min-height: 150upx;/* 最小高度 */
		max-height: 250upx;/* 最大高度 */
		margin-left: 24upx;/* 左外边距 */
		margin-right: 24upx;/* 右外边距 */
		background: #fff;/* 背景色 */
		box-shadow: none;/* 阴影 */
		position: relative;/* 位置对象不可重叠 */
		display: flex;/* 弹性布局 */
		/* flex-direction: column; */
		border: 1px #ddd solid;/* 设置边框 */
		border-radius: 6upx;/* 圆角 */
		overflow: hidden
	}

	.uni-card__thumbnailimage {
		position: relative;
		height: 300upx
	}

	.uni-card__thumbnailimage image {
		width: 20%;
		height: 100%
	}

	.uni-card__content {
		width: 100%;
		color: #555
	}

	.uni-card__content--pd {
		padding: 16upx
	}

	.uni-card__content-extra {
		padding-bottom: 20upx;
		color: #999
	}

	.uni-card--shadow {
		border: 1px #ddd solid;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .2)
	}

	.uni-card--shadow:after {
		border: none
	}

	.uni-card--full {
		margin: 0;
		border-left: none;
		border-right: none;
		border-radius: 0
	}
</style>