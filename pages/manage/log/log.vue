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
			console.log(resp.method);
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
				{ name: 'operation', image: 'static/img/drawable-xhdpi/log.png' },
				{
					operation: '描述',
					module: '模块',
					gmtCreate: '创建时间',
					username: '用户',
					time: '响应时间'
				}
			);
		},
		loadListData(text) {
			this.$http
				.get('system/sysLog', { params: { operation: text ? text: '', pageNum: this.pageNum } })
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
