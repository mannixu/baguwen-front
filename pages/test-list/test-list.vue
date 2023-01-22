<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card isFull note="true">
				<view class="flex justify-between ">
					<view class="h4 font-weight-bold">
						{{item.title}}
					</view>
					<view class="font-sm text-danger">
						时长：{{item.expire}}分钟
					</view>
				</view>
				<view class="flex my-3">
					<view class="flex-1">题目总数：{{item.question_count}}</view>
					<view class="flex-1">总分数：{{item.total_score}}</view>
					<view class="flex-1">及格分：{{item.pass_score}}</view>
				</view>
				<view class="flex justify-end" slot="actions">
					<main-button @click="startTest(item.id)" :disabled="item.is_test" bClass="px-2 mb-1"
						bStyle="height:80rpx;">
						{{item.is_test ? '你考过了' :'参加考试'}}
					</main-button>
				</view>
			</uni-card>
			<view class="divider"></view>
		</view>

		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	// getTestList
	export default {
		data() {
			return {
				loadStatus: "loading",
				page: 1,
				limit: 5,
				list: []
			}
		},
		created() {
			this.getData()
			uni.$on('refreshTestList', this.refresh)
		},
		destroyed() {
			uni.$off('refreshTestList', this.refresh)
		},
		// 下拉加载
		onReachBottom() {
			this.reachBottom()
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			refresh() {
				this.page = 1
				this.getData()
			},
			// 参加考试
			startTest(id) {
				console.log(id, 'id');
				uni.showModal({
					content: '是否要开始考试？',
					success: (res) => {
						if (res.confirm) {
							this.$authJump('/pages/test-detail/test-detail?id=' + id)
						} else if (res.cancel) {
							return
						}
					}
				});
			},
			reachBottom() {
				if (this.loadStatus !== 'more') return
				this.page++
				this.getData()
			},
			getData() {
				this.loadStatus = 'loading'
				this.$api.getTestList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					this.list = this.page === 1 ? res.rows : [...this.list, ...res.rows]
					console.log(this.list, 'list考场');
					if (res.rows.length < this.limit) {
						this.loadStatus = 'noMore'
					} else if (res.rows.length === this.limit) {
						this.loadStatus = 'more'
					}
				}).catch(err => {
					this.loadStatus = 'more'
					if (this.page > 1) {
						this.page -= 1
					}
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style>

</style>
