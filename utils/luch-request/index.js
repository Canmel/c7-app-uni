import Request from './request'

const test = new Request()

test.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.aaa.cn'
	config.header = {
		...config.header,
		'content-type': 'application/json;charset=UTF-8'
	}
	return config
})

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
		a: 1
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

test.interceptor.response((response) => { /* 请求之后拦截器 */
	return response
}, (response) => { // 请求错误做点什么
	return response
})

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://l27512n380.wicp.vip:36028/' /* 根域名不同 */
	return config
})

http.validateStatus = (response) => {
	return response.statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
		a: 1
	}
	uni.showLoading({
	    title: '加载中...'
	});
	let token = null;
	uni.getStorage({
		key: 'access_token',
		success: function(resp) {
			token = resp.data;
		}
	});
	if (token) {
		config.params.access_token = token;
	}
	return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
	uni.hideLoading();
	return response;
}, (response) => { // 请求错误做点什么
	uni.hideLoading();
	const pages = getCurrentPages();
	const curPages = pages[pages.length - 1];
	if(curPages.route === 'pages/login/login') {
		uni.showToast({
			image: '/static/img/drawable-xhdpi/out_checkdate_icon.png' ,
			title: '用户信息不正确或已过期，请重新登录'
		});
	}else {
		uni.navigateTo({
			url: '../../pages/login/login',
			success: (resp) => {
				uni.clearStorage()
			}
		})
	}
	
	return response
})

export {
	http,
	test
}
