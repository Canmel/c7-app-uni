<template>
	<view style="width: 100%;">
		<view class="cu-form-group margin-top">
			<view class="title">外网服务</view>
			<text class="service-ip">192.168.2.135</text>
			<switch @change="SwitchA" :class="switchA ? 'checked' : ''" :checked="switchA ? true : false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">内网服务</view>
			<text class="service-ip">67.182.12.44</text>
			<switch @change="SwitchB" :class="switchB ? 'checked' : ''" :checked="switchB ? true : false"></switch>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			switchA: false,
			switchB: true,
			addrA: '192.168.2.135',
			addrB: '67.182.12.44'
		};
	},
	methods: {
		SwitchA(e) {
			this.switchA = e.detail.value;
			this.switchB = !this.switchA;
			this.updateStorage();
		},
		SwitchB(e) {
			this.switchB = e.detail.value;
			this.switchA = !this.switchB;
			this.updateStorage();
		},
		updateStorage() {
			if(this.switchA) {
				uni.setStorage({
					key: "server_address",
					data: this.addrA
				})
			}
			if(this.switchB) {
				uni.setStorage({
					key: "server_address",
					data: this.addrB
				})
			}
		}
	}
};
</script>

<style>
.service-ip {
	font-size: 20upx;
}
</style>
