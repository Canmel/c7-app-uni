<template>
	<view class="full">
		<view class="cu-bar search bg-white" style="width: 100%;">
			<zy-search style="width: 100%;" :is-focus="false" :is-block="false" :show-want="true" @showbox="toshow" @search="search"></zy-search>
		</view>
		<mTextList :datas="mData" @handler="optHandler" v-if="isShowIndexPage" option="true" @click="itemClick"></mTextList>

		<view class="uni-loadmore" v-if="isShowIndexPage && showLoadMore">{{ loadMoreText }}</view>
	</view>
</template>

<script>
import mTextList from '@/components/m-text-list/m-text-list.vue';
import zySearch from '@/components/zy-search/zy-search.vue';
export default {
	components: {
		mTextList,
		zySearch
	},
	data() {
		return {
			showLoadMore: false,
			loadMoreText: '加载中...',
			max: 0,
			pageNum: 1,
			totalNum: 0,
			isShowIndexPage: true,
			mData: []
		};
	},
	onPullDownRefresh() {
		this.pageNum = 1;
		this.mData = [];
		this.loadListData();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		if (this.mData.length >= this.totalNum) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.pageNum++;
		this.showLoadMore = true;
		this.loadListData();
	},
	methods: {
		itemClick(item) {
			uni.setStorage({
				key: 'details',
				data: item
			});
			uni.navigateTo({
				url: 'detail/detail'
			});
		},
		optHandler(resp) {
			if (resp.method === 'delete') {
				uni.showModal({
					content: '删除',
					showCancel: false
				});
			}

			if (resp.method === 'details') {
				uni.navigateTo({
					url: 'details/details'
				});
			}
		},
		toshow(isF) {
			this.isShowIndexPage = isF;
		},
		search(text) {
			this.mData = [];
			this.loadListData(text);
		},
		transferData(data) {
			return this.$transfer.commonTransfer(
				data,
				{
					name: 'name',
					image: 'static/img/drawable-xhdpi/project.png'
				},
				{
					code: '项目编号',
					business: '业务描述',
					createdAt: '创建时间',
					'industryType.name': '行业类别',
					'level.name': '项目级别',
					'type.name': '项目类型',
					amount: '投资总额',
					areaSize: '用地面积',
					place: '所在地',
					'creator.username': '推荐人'
				}
			);
		},
		loadListData(text) {
			this.$http
				.get('oa/zsProject', { params: { name: text ? text : '', pageNum: this.pageNum } })
				.then(res => {
					const pageData = res.data;
					this.totalNum = pageData.data.total;
					this.mData = this.mData.concat(this.transferData(pageData.data.list));
				})
				.catch(res => {
					console.log(res);
				});
		}
	},
	onShow() {
		this.mData = [];
		this.loadListData();
	}
};
</script>

<style></style>
