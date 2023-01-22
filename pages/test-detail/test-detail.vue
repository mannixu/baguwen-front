<template>
	<view>
		<timer-box @end="end" :expire="expire" v-if="expire > 0"></timer-box>
		<uni-card isFull :title="q.type |formatType" :extra="'第'+current+'题'">
			<view class="mt-2">
				<mp-html :content="q.title">
					<view class="flex justify-center py-3 text-muted">
						加载中...
					</view>
				</mp-html>
			</view>
			<view>
				<!-- 问答 -->
				<textarea v-if="q.type === 'answer'" placeholder="请输入答案" v-model="q.user_value[0]"
					class="border p-2 w-100" style="box-sizing: border-box;"></textarea>
				<!-- 填空 -->
				<view v-else-if="q.type === 'completion'">
					<textarea v-for="(item,index) in q.user_value" placeholder="请输入答案" v-model="q.user_value[index]"
						class="border p-2 w-100 mb-2" style="box-sizing: border-box;"></textarea>
					<main-button @click="addCompletion">添加填空</main-button>
				</view>
				<!-- 单选 -->
				<view v-else-if="q.type === 'trueOrfalse' || q.type === 'radio'">
					<test-option v-for="(item,index) in q.options" :key="index" :index="index" :label="item"
						:checked="q.user_value === index" @click="handleDo"></test-option>
				</view>
				<!-- 多选 -->
				<view v-else-if="q.type === 'checkbox'">
					<test-option v-for="(item,index) in q.options" :key="index" :index="index" :label="item"
						:checked="index | formatChecked(q.user_value)" @click="handleDo"></test-option>
				</view>
			</view>
		</uni-card>
		<!-- 底部固定栏 -->
		<test-actions :current="current" :total="total" @on-page="onPage" @submit="beforeSubmit">
		</test-actions>
	</view>
</template>

<script>
	const textType = {
		answer: '问答题',
		completion: '填空题',
		trueOrfalse: '单选题',
		radio: '单选题',
		checkbox: '多选题',
	}
	export default {
		filters: {
			formatType(type) {
				return textType[type];
			},
			formatChecked(v, arr) {
				return arr.includes(v)
			}
		},
		computed: {
			q() {
				return this.list[this.current - 1] || {}
			},
			unDo() {
				let arr = []
				this.list.forEach((item, index) => {
					if (((item.type === 'answer' || item.type === 'completion') && !item.user_value[0]) || ((item
							.type === 'trueOrfalse' || item.type === 'radio') && item.user_value === -1) || (item
							.type === 'checkbox' && item.user_value.length === 0)) {
						arr.push(index + 1)
					}
				})
				return arr
			}
		},
		data() {
			return {
				current: 1,
				total: 4,
				list: [],
				id: 0,
				user_test_id: 0,
				title: '',
				expire: 0,
				isBack: false
			}
		},
		onBackPress() {
			// 真正返回 return false
			if (this.isBack) {
				// 通知考试列表页刷新
				uni.$emit('refreshTestList','')
				return false
			}
			// 拦截返回
			uni.showModal({
				content: '是否退出此次考试？',
				cancelText: '继续做题',
				confirmText: '放弃',
				success: (res) => {
					if (res.confirm) {
						this.isBack = true
						uni.navigateBack({
							delta: 1
						});
					}
				}
			});
			return true
		},
		onLoad(e) {
			if (!e.id) {
				this.$toast('非法参数')
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 600)
				return
			}
			this.id = e.id
			this.getData()
		},
		methods: {
			beforeSubmit() {
				if (this.unDo.length > 0) {
					uni.showModal({
						content: `你还有${this.unDo.join(',')}题未做`,
						showCancel: false
					})
					return
				}
				uni.showModal({
					content: '是否提交试卷？',
					cancelText: '继续做题',
					confirmText: '现在交卷',
					success: (res) => {
						if (res.confirm) {
							this.submit()
						} else if (res.cancel) {
							return
						}
					}
				});
			},
			submit() {
				uni.showLoading({
					title: 'loading···'
				});
				this.$api.userTestSava({
					user_test_id: this.user_test_id,
					value: this.list.map(item => {
						return item.user_value
					})
				}).then(res => {
					console.log(res, 'res');
					if (res === 'ok') {
						this.isBack = true
						uni.navigateBack({
							delta: 1
						});
						this.$toast('交卷成功')
					}
				}).finally(() => {
					uni.hideLoading()
				})
			},
			getData() {
				this.$api.startTest({
					id: this.id
				}).then(res => {
					console.log(res, 'res');
					this.list = res.testpaper_questions
					this.title = res.title
					this.total = res.testpaper_questions.length
					this.expire = res.expire
					this.user_test_id = res.user_test_id
				}).catch(err => {
					if (err === '请先绑定手机号') {
						this.$navigateTo('/pages/bind-phone/bind-phone')
					}
				})
			},
			// 考试时间结束后,自动提交试卷,并返回上一页
			end() {
				this.isBack =true
				this.$toast('考试结束')
				setTimeout(()=> {
					uni.navigateBack()
				},3000)
			},
			onPage(e) {
				console.log('current', e);
				this.current = e
			},

			addCompletion() {
				this.list[this.current - 1].user_value.push('')
			},
			handleDo(e) {
				if (this.q.type === 'trueOrfalse' || this.q.type === 'radio') {
					this.list[this.current - 1].user_value = e
					return
				}

				let index = this.q.user_value.findIndex(checked => checked == e)

				if (index === -1) {
					this.q.user_value.push(e)
				} else {
					this.q.user_value.splice(index, 1)
				}

			}
		}
	}
</script>

<style>

</style>
