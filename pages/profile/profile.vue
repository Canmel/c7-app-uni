<template>
	<view class="center">
		<view class="center_top"><view class="mask"></view></view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header"></view>
					<view>
						<text>{{ profile.username }}</text>
					</view>
					<view>
						<text>{{ profile.loginname }}</text>
					</view>
					<image src="../../static/img/profile/setting.png" mode=""></image>
				</view>
				<view class="order_status">
					<view class="status" v-for="item in status">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item">
					<image src="../../static/img/profile/5.png" mode="aspectFill"></image>
					<text>修改密码</text>
				</view>
				<view class="menu_item">
					<image src="../../static/img/profile/6.png" mode="aspectFill"></image>
					<text>意见反馈</text>
				</view>
				<view class="menu_item" @click="toPage('../common/services/services')">
					<image src="../../static/img/profile/7.png" mode="aspectFill"></image>
					<text>服务器设置</text>
				</view>
				<view class="menu_item">
					<image src="../../static/img/profile/8.png" mode="aspectFill"></image>
					<text>关于</text>
				</view>
			</view>

			<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @click="logout()">注销登录</button></view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                profile: {
                    username: '潘光辉',
                    loginname: 'p34001048'
                },
                status: [
                    {
                        key: 1,
                        name: '待发货',
                        url: '../../static/img/profile/one.png'
                    },
                    {
                        key: 2,
                        name: '待收货',
                        url: '../../static/img/profile/2.png'
                    },
                    {
                        key: 3,
                        name: '待评价',
                        url: '../../static/img/profile/3.png'
                    },
                    {
                        key: 4,
                        name: '全部订单',
                        url: '../../static/img/profile/4.png'
                    }
                ]
            };
        },
        methods: {
            logout: function() {
                uni.showModal({
                    content: '注销登录',
                    showCancel: true,
                    success: () => {
                        uni.navigateTo({
                            url: '../login/login'
                        });
                    }
                });
            },
            toPage: function(url) {
                uni.navigateTo({
                    url: url
                })
            }
        },
        computed: {}
    };
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		width: 100%;
		height: 100%;

		&_top {
			height: 18%;
			background: url('../../static/img/drawable-xxhdpi/launcher_bg.png') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, 0.4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #f9f9f9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #fefefe;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #ededed;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #f6f6f6;
		padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('../../static/img/drawable-xxhdpi/default_head.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}

		image {
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top: 0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: 0.5px;
			display: flex;
			flex-direction: column;
			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;
			}
		}
	}

	.baiban {
		background: #fefefe;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #fefefe;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #efefef;

			&:hover {
				background: #f6f6f6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/img/profile/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
