<template name="zy-search">
	<view style="width: 100%;">
		<view class="search">
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/zy-search/voice.svg" mode="aspectFit" @click="startRecognize()" class="voice-icon"></image>
			<!-- #endif -->
			<template v-if="isFocus">
				<input
					maxlength="20"
					class="s-input"
					focus
					type="text"
					value=""
					v-on:focus="focusBack()"
					v-on:blur="blurBack()"
					confirm-type="search"
					@confirm="searchStart()"
					placeholder="请输入关键词搜索"
					v-model.trim="searchText"
				/>
			</template>
			<template v-else>
				<input
					maxlength="20"
					type="text"
					class="s-input"
					value=""
					v-on:focus="focusBack()"
					v-on:blur="blurBack()"
					confirm-type="search"
					@confirm="searchStart()"
					placeholder="请输入关键词搜索"
					v-model.trim="searchText"
				/>
			</template>
			<image src="../../../static/zy-search/search.svg" mode="aspectFit" @click="searchStart()" class="search-icon"></image>
			<text class="lg cuIcon-filter search-icon" style="left: 0; font-size: large;" v-if="showFilter" @click="filterClick()"></text>
		</view>
		<template v-if="isF && isBlock">
			<view class="s-block" v-if="hList.length > 0">
				<view class="header">
					历史记录
					<image src="../../static/zy-search/delete.svg" mode="aspectFit" @click="delhistory"></image>
				</view>
				<view class="list">
					<view v-for="(item, index) in hList" :key="index" @click="keywordsClick(item)">{{ item }}</view>
				</view>
			</view>
			<view class="wanted-block" v-if="showWant">
				<view class="header">猜你想搜的</view>
				<view class="list">
					<view v-for="(item, index) in wantList" :key="index" @click="keywordsClick(item)">{{ item }}</view>
				</view>
			</view>
		</template>
		<template v-if="isF && !isBlock">
			<view class="s-circle" v-if="hList.length > 0">
				<view class="header">
					历史记录
					<image src="../../static/zy-search/delete.svg" mode="aspectFit" @click="delhistory"></image>
				</view>
				<view class="list">
					<view v-for="(item, index) in hList" :key="index" @click="keywordsClick(item)">{{ item }}</view>
				</view>
			</view>
			<view class="wanted-circle" v-if="showWant">
				<view class="header">猜你想搜的</view>
				<view class="list">
					<view v-for="(item, index) in wantList" :key="index" @click="keywordsClick(item)">{{ item }}</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import mIcon from '@/components/m-icon/m-icon.vue'
export default {
	name: 'zy-search',
	components: {
		mIcon
	},
	props: {
		isFocus: {
			//是否自动获取焦点
			type: Boolean,
			value: false
		},
		isBlock: {
			//选择块级显示还是圆形显示
			type: Boolean,
			value: true
		},
		showWant: {
			//是否展示推荐菜单
			type: Boolean,
			value: false
		},
		show: {
			type: Boolean,
			value: false
		},
		showFilter: {
			type: Boolean,
			value: false
		}
	},
	computed: {},
	data() {
		return {
			isF: false,
			searchText: '', //搜索关键词
			hList: uni.getStorageSync('search_cache'), //历史记录
			wantList: ['栏目1', '栏目2', '栏目3', '栏目4'] //初始化推荐列表
		};
	},
	methods: {
		filterClick: function() {
			this.$emit("filter", null);
		},
		focusBack: function() {
			this.isF = true;
			this.$emit('showbox', false);
		},
		blurBack: function() {
			this.isF = false;
			this.$emit('showbox', true);
		},
		searchStart: function() {
			//触发搜索
			let _this = this;
			if (_this.searchText == '') {
				uni.showToast({
					title: '请输入关键字',
					icon: 'none',
					duration: 1000
				});
				return false;
			} else {
				uni.getStorage({
					key: 'search_cache',
					success(res) {
						let list = res.data;
						console.log(list);
						if (list.length > 5) {
							for (let item of list) {
								if (item == _this.searchText) {
									return false;
								}
							}
							list.pop();
							list.unshift(_this.searchText);
						} else {
							for (let item of list) {
								if (item == _this.searchText) {
									return false;
								}
							}
							list.unshift(_this.searchText);
						}
						_this.hList = list;
						uni.setStorage({
							key: 'search_cache',
							data: _this.hList
						});
					},
					fail() {
						_this.hList = [];
						_this.hList.push(_this.searchText);
						uni.setStorage({
							key: 'search_cache',
							data: _this.hList
						});
					}
				});
				
				_this.$emit('search', _this.searchText);
			}
		},
		keywordsClick(item) {
			//推荐搜索
			this.searchText = item;
		},
		delhistory() {
			//清空历史记录
			this.hList = [];
			uni.setStorage({
				key: 'search_cache',
				data: []
			});
		},
		startRecognize: function() {
			//语音输入
			let _this = this;
			let options = {};
			options.engine = 'iFly';
			options.punctuation = false; // 是否需要标点符号
			options.timeout = 10 * 1000;
			plus.speech.startRecognize(options, function(s) {
				_this.searchText = _this.searchText + s;
			});
		}
	}
};
</script>

<style lang="less" scoped>
.s-input {
	min-height: 80upx;
}
.search {
	width: 640upx;
	border-bottom: #eee;
	margin: 20upx auto 20upx;
	position: relative;
	input {
		background-color: #f7f7f7;
		padding: 10upx 74upx;
		font-size: 28upx;
		border-radius: 50upx;
	}
	.voice-icon {
		width: 36upx;
		height: 36upx;
		padding: 16upx 20upx 16upx 0;
		position: absolute;
		left: 16upx;
		top: 4upx;
		z-index: 10;
	}
	.search-icon {
		width: 66upx;
		height: 66upx;
		padding: 20upx 20upx 16upx 0;
		position: absolute;
		right: 0;
		top: 4upx;
		z-index: 10;
	}
}
.s-block {
	margin-top: 30upx;
	.header {
		font-size: 32upx;
		padding: 30upx;
		position: relative;
		image {
			width: 36upx;
			height: 36upx;
			padding: 10upx;
			position: absolute;
			right: 40upx;
			top: 24upx;
		}
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		view {
			width: 50%;
			color: #8a8a8a;
			font-size: 28upx;
			box-sizing: border-box;
			text-align: center;
			padding: 20upx 0;
			border-top: 2upx solid #fff;
			border-left: 2upx solid #fff;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			background-color: #f7f7f7;
		}
	}
}
.s-circle {
	margin-top: 30upx;
	.header {
		font-size: 32upx;
		padding: 30upx;
		border-bottom: 2upx solid #f9f9f9;
		position: relative;
		image {
			width: 36upx;
			height: 36upx;
			padding: 10upx;
			position: absolute;
			right: 40upx;
			top: 24upx;
		}
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx 20upx;
		view {
			padding: 8upx 30upx;
			margin: 20upx 30upx 0 0;
			font-size: 28upx;
			color: #8a8a8a;
			background-color: #f7f7f7;
			box-sizing: border-box;
			text-align: center;
			border-radius: 20upx;
		}
	}
}
.wanted-block {
	margin-top: 30upx;
	.header {
		font-size: 32upx;
		padding: 30upx;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		view {
			width: 50%;
			color: #8a8a8a;
			font-size: 28upx;
			box-sizing: border-box;
			text-align: center;
			padding: 20upx 0;
			border-top: 2upx solid #fff;
			border-left: 2upx solid #fff;
			background-color: #f7f7f7;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
.wanted-circle {
	margin-top: 30upx;
	.header {
		font-size: 32upx;
		padding: 30upx;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx 20upx;
		view {
			padding: 8upx 30upx;
			margin: 20upx 30upx 0 0;
			font-size: 28upx;
			color: #8a8a8a;
			background-color: #f7f7f7;
			box-sizing: border-box;
			text-align: center;
			border-radius: 20upx;
		}
	}
}
</style>
