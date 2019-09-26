<template>
	<view class="content bg-white">
		<view class="logo"><image src="../../static/logo.png" mode=""></image></view>
		<view class="uni-form-item uni-column"><input type="tel" name="username" placeholder="请输入用户名" /></view>
		<view class="uni-form-item uni-column"><input type="password" name="password" placeholder="请输入密码" /></view>
		<button type="primary" style="width: 100%; border-radius: 10upx;" @click="doLogin()">登陆</button>
		<view class="links">
			<view @tap="gotoForgetPassword">忘记密码？</view>
			<view>|</view>
			<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		gotoRegistration: function() {
			uni.navigateTo({ url: 'registration' });
		},
		gotoForgetPassword: function() {
			uni.navigateTo({ url: 'forget-password' });
		},
		toMainPage: function() {
			uni.navigateBack({});
		},
		doLogin: function() {
			const that = this;
			this.$http
				.post('auth/oauth/token?grant_type=password&username=admin@camel.com&password=123456', {}, { header: { Authorization: 'Basic YW5kcm9pZDphbmRyb2lk' } })
				.then(res => {
					uni.setStorage({
						key: 'access_token',
						data: res.data.access_token
					});
					uni.setStorage({
						key: 'refresh_token',
						data: res.data.refresh_token
					});
					this.toMainPage();
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
$color-primary: #b49950;
.content {
	padding: 150upx 50upx;
}
.logo {
	text-align: center;
	image {
		height: 200upx;
		width: 200upx;
		margin: 0 0 60upx;
	}
}
.uni-form-item {
	margin-bottom: 40upx;
	padding: 0;
	border-bottom: 1px solid #e3e3e3;
	.uni-input {
		font-size: 30upx;
		padding: 7px 0;
	}
}
button[type='primary'] {
	background-color: $color-primary;
	border-radius: 0;
	font-size: 34upx;
	margin-top: 60upx;
}
.links {
	text-align: center;
	margin-top: 40upx;
	font-size: 26upx;
	color: #999;
	view {
		display: inline-block;
		vertical-align: top;
		margin: 0 10upx;
	}
	.link-highlight {
		color: $color-primary;
	}
}
</style>
