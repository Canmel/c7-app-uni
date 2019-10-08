<template>
	<view class="full">
		<view class="bg-img bg-mask flex align-center" :style="[{ backgroundImage: 'url(' + imageUrl(formData.image) + ')', 'background-color': '#f1f1f1', 'min-height': '300upx' }]">
			<view class="padding-xl text-white">
				<view class="padding-xs text-xxl text-bold">
					{{formData.name}}
				</view>
				<view class="padding-xs text-lg">
					{{formData.desc ? formData.desc : '' }}
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
					<view class="title" v-if="item.name !== '通知内容'">{{item.name}}</view>
					<input name="input" :value="getValue(item)" disabled="true" v-if="item.name !== '通知内容'"></input>
					<text maxlength="-1" disabled="true" v-if="item.name === '通知内容'" style="text-align: right;">{{getValue(item)}}</text>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue margin-tb-sm lg" @click="back()">确认</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
import mDetails from '@/components/m-details/m-details.vue';
export default {
	components: {
		mDetails
	},
	data() {
		return {
			formData: {},
			content: ""
		};
	},
	methods: {
		getValue(v) {
			return (v.value === null || v.value === 'null') ? '未知' : v.value;
		},
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
		uni.getStorage({
			key: 'details',
			success: resp => {
				this.formData = resp.data;
				this.content = this.formData.content;
				console.log(this.formData);
				delete this.formData.content;
				
			}
		});
	}
};
</script>

<style></style>
