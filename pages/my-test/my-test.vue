<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card isFull note="true">
				<view class="flex justify-between ">
					<view class="h4 font-weight-bold">
						{{item.testpaper.title}}
					</view>
					<view class="font-sm " :class="item.answer_status === 0?'text-danger' : 'text-success'">
						{{item.answer_status === 0 ?'正在考试' :'考试完成'}}
					</view>
				</view>
				<view class="flex my-3">
					<view class="flex-1">题目总数：{{item.testpaper.question_count}}</view>
					<view class="flex-1 ">最终得分：
						<text
							:class="item.read_status === 0 ?'text-danger':'text-success'">{{item.read_status === 0 ? '正在阅卷':item.score}}</text>
					</view>
				</view>
				<view class="flex justify-start font text-light-muted py-2 border-top" slot="actions">
					<view class="">
						{{item.created_time}}
					</view>
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
			reachBottom() {
				if (this.loadStatus !== 'more') return
				this.page++
				this.getData()
			},
			getData() {
				this.loadStatus = 'loading'
				this.$api.userTestHistory({
					page: this.page,
					limit: this.limit
				}).then(res => {
					console.log(res, 'res');
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
