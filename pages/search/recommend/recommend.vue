<template>
	<view class="uni-container full">
		<uni-list><uni-list-item :title="item.name" v-for="(item, key) in elements" :key="key" @click="goDetailPage(item)"></uni-list-item></uni-list>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			elements: [
				{
					url: 'add_merchant',
					name: '企业推荐'
				},
				{
					url: 'add_talenteder',
					name: '人才推荐'
				},
				{
					url: 'add_project',
					name: '项目推荐'
				}
			]
		};
	},
	methods: {
		goDetailPage(e) {
			uni.navigateTo({
				url: '/pages/search/' + e.url + '/' + e.url
			});
		}
	}
};
</script>

<style></style>
