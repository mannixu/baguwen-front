import store from "@/store/index.js"
export default {
	// 请求拦截器 原理：利用微任务.then 让所有使用请求拦截器的函数 在拦截器函数之后执行
	config: {
		// 请求拦截器(给请求统一添加 公共请求头、baserUrl)
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				const baseUrl = 'http://demonuxtapi.dishait.cn'
				const appid = 'bd9d01ecc75dbbaaefce'
				const token = store.state.token
				// 添加公共请求参数
				options.url = baseUrl + options.url
				options.header = {
					appid,
					token
				}
				options.method = options.method || 'GET'
				resolve(options)
			})
		},
		// 响应拦截器 (接收参数请求后得到的数据，处理非成功数据reject，并将数据剥离返回resolve)
		responseRequest(data) {
			return new Promise((resolve, reject) => {
				const [error, res] = data
				if (res.data.msg !== 'ok') {
					const msg = res.data.data || '请求失败'
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					if(msg === 'Token 令牌不合法，请重新登录' || res.data.data === '您没有权限访问该接口!') {
						// store.dispatch('loginOut')
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
					return reject(msg)
				}
				return resolve(res.data.data)
			})
		}
	},
	request(options) {
		// console.log(options, 'options');
		// 使用的beforeRequest方法也是promise应将beforeRequest方法直接返回 (不然读不到return uni.request(opt))
		return this.config.beforeRequest(options).then(opt => {
			return uni.request(opt)
		}).then(this.config.responseRequest)
	},
	get(url, params = null, options = {}) {
		options.url = url
		options.url += params ? ('?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')) : ''
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data = null, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	upload(url, data = null, options = {}) {
		const toast = function(title, icon) {
			uni.showToast({
				title,
				icon
			})
		}
		options.url = url
		options.method = 'POST'
		return this.config.beforeRequest(options).then(opt => {
			return new Promise((resolve, reject) => {
				const uploadTask = uni.uploadFile({
					url: options.url, 
					filePath: data.file,
					name: 'file',
					header: options.header,
					success: (res) => {
						if (res.statusCode !== 200) {
							toast('上传失败', 'fail')
							return reject('上传失败' + errMsg)
						}
						toast('上传成功', 'success')
						return resolve(JSON.parse(res.data))

					},
					fail: (res) => {
						toast('上传失败', 'fail')
						return reject('上传失败' + res.errMsg)
					}
				});
				// 上传进度
				if (options.onProgress && typeof options.onProgress === 'function') {
					uploadTask.onProgressUpdate((res) => {
						options.onProgress(res.progress)
					});
				}

			})
		})
	}
}
