<template>
	<view>
		<view class="bg-img bg-mask flex align-center" :style="[{ backgroundImage: 'url(' + imageUrl(formData.image) + ')', 'background-color': '#f1f1f1' }]">
			<view class="padding-xl text-white">
				<view class="padding-xs text-xxl text-bold">
					{{formData.name}}
				</view>
				<view class="padding-xs text-lg">
					{{formData.desc}}
				</view>
			</view>
		</view>
		<form>
			<view style="padding: 0 15upx;">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>{{formData.name}}
					</view>
				</view>
				<view class="cu-form-group" v-for="(item, index) in formData.data" :key="index">
					<view class="title">{{item.name}}</view>
					<input placeholder="" name="input" :value="item.value" disabled="true"></input>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue margin-tb-sm lg" @click="back()">确认</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		props: {
			formData: {
				type: Object,
				default: new Array()
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			back(){
				uni.navigateBack({
				})
			},
			imageUrl(url) {
				return url ? url : 'static/img/drawable-xhdpi/no_pic.png';
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>
</style>
