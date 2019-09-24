import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
import { http }  from '@/utils/luch-request/index.js'

Vue.component('cu-custom', cuCustom)

Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
