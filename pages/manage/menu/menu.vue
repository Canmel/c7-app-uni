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
			isShowIndexPage: true,
			mData: []
		};
	},
	onPullDownRefresh() {
		this.initData();
		uni.stopPullDownRefresh();
	},
	onReachBottom: function() {
		if (this.mData.length > 1000) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}

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
		searchFilter() {
			uni.showModal({
				content: '打开filter',
				showCancel: false
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
		initData() {
			this.loadListData();
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
			uni.showModal({
				content: text,
				showCancel: false
			});
		},
		transferData(data) {
			this.mData = this.$transfer.usersTransfer(
				data,
				{ name: 'username' },
				{
					username: '用户名',
					nickname: '昵称',
					email: '邮箱',
					status: '状态',
					mobile: '手机',
					age: '年龄',
					gender: '性别',
					orgName: '部门',
					address: '坐标',
					remark: '个性签名'
				},
				{ name: 'status' }
			);
		},
		loadListData() {
			this.$http
				.get('system/sysUser', {})
				.then(res => {
					console.log(res);
					const pageData = res.data;
					this.transferData(pageData.data.list);
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
