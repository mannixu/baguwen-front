import api from "./request"

export default {
	// 获取首页数据
	getIndexData() {
		return api.get('/mobile/index')
	},
	// 获取拼团列表
	getGroupList(params) {
		params.usable =1
		return api.get('/mobile/group', params)
	},
	// 获取秒杀列表
	getFlashsaleList(params) {
		params.usable =1
		return api.get('/mobile/flashsale', params)
	},
	// 获取优惠券列表
	getCouponList() {
		return api.get('/mobile/coupon')
	},
	// 注册
	reg(data) {
		return api.post('/mobile/reg', data)
	},
	// 登录
	login(data) {
		return api.post('/mobile/login', data)
	},
	// 获取验证码
	getCaptchat(data) {
		return api.post('/mobile/get_captcha',data)
	},
	// 绑定手机号
	getBindPhone(data) {
		return api.post('/mobile/bind_mobile',data)
	},
	
	// 找回密码
	getForgetPwd(data) {
		return api.post('/mobile/forget',data)
	},
	// 退出登录
	loginOut(data) {
		return api.post('/mobile/logout',data)
	},
	// 修改密码
	updatePassword(data) {
		return api.post('/mobile/update_password',data)
	},
	// 上传图片
	uploadImage(data,onProgress =null) {
		return api.upload('/mobile/upload',data,{onProgress})
	},
	// 修改资料
	updateInfo(data) {
		return api.post('/mobile/update_info',data)
	},
	// 订单列表页 
	getOrderList(params) {
		return api.get('/mobile/order/list',params)
	},
	// 领取优惠券
	getUserCoupont(data) {
		return api.post('/mobile/user_coupon/receive',data)
	},
	// 优惠券列表
	getCoupontList(params) {
		return api.get('/mobile/user_coupon',params)
	},
	// 搜索接口
	getSearchList(params) {
		return api.get('/mobile/search',params)
	},
	// 查看课程详情
	readCourse(params) {
		return api.get('/mobile/course/read',params)
	},
	// 获取专栏列表
	readColumn(params) {
		return api.get('/mobile/column/read',params)
	},
	// 获取学习进度列表
	userHistoryList(params) {
		return api.get('/mobile/user_history/list',params)
	},
	// 更新学习进度
	updateUserHistory(data) {
		return api.post('/mobile/user_history/update',data)
	},
	// 考场列表
	getTestList(params) {
		return api.get('/mobile/testpaper/list',params)
	},
	// 开始考试
	startTest(params) {
		return api.get('/mobile/testpaper/read',params)
	},
	// 考试交卷
	userTestSava(data) {
		return api.post('/mobile/user_test/save',data)
	},
	// 考试记录
	userTestHistory(params) {
		return api.get('/mobile/user_test/list',params)
	}
	

}

