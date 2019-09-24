<template>
	<view>
		<view class="cu-list menu-avatar">
			<view
				class="cu-item list-item"
				style="height: 170upx;"
				:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
				v-for="(item, index) in datas"
				:key="index"
				@touchstart="ListTouchStart"
				@touchmove="ListTouchMove"
				@touchend="ListTouchEnd($event, item)"
				:data-target="'move-box-' + index"
			>
				<view
					class="cu-avatar round lg"
					:style="[{ backgroundImage: 'url(' + imageUrl(item.image) + ')', 'background-color': '#f1f1f1' }]"
					v-on:click="clickHandler(item)"
				></view>
				<view class="content" style="height: 170upx;width: 70%;" v-on:click="clickHandler(item)">
					<view class="text-grey">{{ item.name }}</view>
					<view class="text-gray text-sm">
						<view class="list-prop-item" v-for="(prop, pi) in item.data" :key="pi" v-if="pi < 3">
							<text :class="'margin-right-xs cuIcon-' + icon(prop.icon) + ' text-' + iconColor(prop.icolor)"></text>
							<text>{{ prop.name }}：</text>
							<text>{{ prop.value }}</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs" v-if="item.desc">{{ item.desc }}</view>
					<view :class="'cu-tag round bg-' + iconColor(tag.color) + ' sm'" v-for="(tag, ti) in item.tags" :key="ti">{{ tag.name }}</view>
				</view>
				<view class="move" v-if="item.options">
					<view :class="'bg-' + opt.color" @click="optionClickHandler(item, opt)" v-for="(opt, oi) in item.options" :key="oi">{{ opt.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		datas: {
			type: Array
		}
	},
	computed: {},
	data() {
		return {
			modalName: null
		};
	},
	methods: {
		imageUrl(url) {
			return url ? url : 'static/img/drawable-xhdpi/no_pic.png';
		},
		clickHandler(item) {
			this.$emit('click', item);
		},
		optionClickHandler(obj, opt) {
			console.log(opt);
			this.$emit('handler', { data: obj, method: opt.method });
		},
		iconColor(c) {
			return c ? c : 'gray';
		},
		icon(i) {
			return i ? i : 'infofill';
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX;
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
		},
		ListTouchEnd(e, item) {
			if(item.options) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target;
				} else {
					this.modalName = null;
				}
			}
			this.listTouchDirection = null;
		}
	}
};
</script>

<style>
.list-item {
	height: 160upx;
}
.list-prop-item {
	width: 100%;
	display: inline-block;
}
</style>
