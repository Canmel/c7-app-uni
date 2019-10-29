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
		setData() {
			this.mData.push({
				name: '手提式强光巡检工作灯',
				data: [
					{ name: '登记总数', value: '12', icolor: 'green' },
					{ name: '超期未检', value: '1', icon: 'search', icolor: 'yellow' },
					{ name: '在库', value: '11' },
					{ name: '试验到期', value: '0' },
					{ name: '离枯', value: '1' },
					{ name: '超期服役', value: '3', icolor: 'red' }
				]
			});
		},
		toshow(isF) {
			this.isShowIndexPage = isF;
		},
		search(text) {
			this.mData = [];
			this.loadListData(text);
		},
		transferData(data) {
			const s = this.$transfer.commonTransfer(
				data,
				{ name: 'name' },
				{
					code: '字典代码',
					value: '值',
					gmtCreate: '创建时间',
					status: '状态',
					remark: '备注'
				},
				{ name: 'status' }
			);
			s.forEach(function(item){
				item.image = 'static/img/drawable-xhdpi/using_icon.png';
			})
			return s;
		},
		loadListData(text) {
			this.$http
				.get('system/sysMacro', {params: {name: text ? text: '', pageNum: this.pageNum}})
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
	onLoad() {
		this.loadListData();
	}
};
</script>

<style></style>
