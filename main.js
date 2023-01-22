
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 将api挂载在全局
import api from "@/api/api.js"
import store from '@/store/index.js'
// 通用样式
import './styles/global.scss';
// 导入过滤器
import * as filters from './filters';
// 文章详情样式
import './styles/article-detail.scss';
// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 原型挂载处
Vue.prototype.$api = api
Vue.prototype.$toast = function(title, icon = "none") { //提示信息 放到vue中 简化代码
	uni.showToast({
		title,
		icon
	})
}
Vue.prototype.$navigateTo = function(url) {
	uni.navigateTo({
		url
	})
}
Vue.prototype.$authJump = function(url) {
	if (!store.state.userInfo) { //权限校验 没登录跳转登录页面
		this.$navigateTo('/pages/login/login')
		return
	}
	if (!store.state.userInfo.phone) { //没绑定手机号 跳转绑定手机页面
		this.$navigateTo('/pages-user/bind-phone/bind-phone')
		return
	}
	this.$navigateTo(url)
}
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif