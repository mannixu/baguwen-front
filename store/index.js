import Vue from "vue"
import Vuex from "vuex"
// 导入 search.js 暴露的对象
import search from './modules/search';
import user from './modules/user';
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: null,
		token: null
	},
	modules: {
	  search,
	  user
	},
	actions: {
		// 持久化数据
		init({
			state
		}, data) {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				state.userInfo = JSON.parse(userInfo)
				state.token = JSON.parse(userInfo).token
			}
		},
		login({
			state
		}, userInfo) {
			state.userInfo = userInfo
			state.token = userInfo.token
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
			uni.$emit('userLogin', userInfo)  //发一个全局通知用于登录更新优惠券
		},
		updateUserInfo({
			state
		}, values) {
			Object.keys(values).forEach(k => state.userInfo[k] = values[k])
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo)) //保存到本地
		},
		loginOut({
			state
		}, data) {
			state.userInfo = null            //清除vuex缓存
			state.token = null
			uni.removeStorageSync('userInfo') //清除本地缓存
			uni.$emit('userLoginOut', data) //发一个全局通知用于退出更新优惠券
		},
		updateUserInfo({
			state
		}, values) {
			Object.keys(values).forEach(k => state.userInfo[k] = values[k])
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		}

	}

})
