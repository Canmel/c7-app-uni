<template>
	<view class="full"><mDetails :formData="formData"></mDetails></view>
</template>

<script>
import mDetails from '@/components/m-details/m-details.vue';
export default {
	components: {
		mDetails
	},
	data() {
		return {
			formData: {}
		};
	},
	methods: {},
	onLoad() {
		uni.getStorage({
			key: 'details',
			success: resp => {
				this.formData = resp.data;
			}
		});
	}
};
</script>

<style></style>
