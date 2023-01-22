<template>
	<view style="height: 100%;" class="flex flex-column animate__animated animate__bounceInDown animate__fadeIn">
		<icon-card :iconList="iconList"></icon-card>
		<tabs :current="current" :tabs="tabs" @change="changeTab"></tabs>
		<!-- 搜索内容 -->
		<swiper :current="current" :duration="1000" @change="changeCurrent" class="flex-1 flex flex-column"
			style="height: 100vh;">
			<swiper-item class="flex" v-for="(t,tIndex) in tabs" :key="tIndex">
				<scroll-view class="flex-1" @scrolltolower="reachBottom" scroll-y="true">
					<course-list :item="item" v-for="(item,index) in t.list " :key="index" :type="t.tColumn">
						<view slot="desc" class="font-sm text-light-muted my-1">学习进度</view>
						<view class="flex font-sm mb-1">
							<text class="text-danger mr-1">最近学习</text>
							<text class="text-muted">已学{{item.progress}}%</text>
						</view>
					</course-list>
					<!-- 加载loading -->
					<uni-load-more :status="t.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<no-login v-if="!token"></no-login>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				iconList: [{
					icon: "icon-OrderHistory",
					text: "帖子",
				}, {
					icon: "icon-pinglun2",
					text: "考试",
					path: "/pages-test/my-test/my-test"
				}, {
					icon: "icon-shoucang1",
					text: "电子书",
					path: "/pages-book/my-book/my-book"
				}],
				current: 0,
				tabs: [{
						name: '课程',
						loadStatus: 'more',
						type: 'course',
						tColumn: 'one',
						list: [],
						page: 1
					},
					{
						name: '专栏',
						loadStatus: 'more',
						type: 'column',
						tColumn: 'two',
						list: [],
						page: 1
					}
				],
				limit: 10,
				list: []
			}
		},
		computed: {
			...mapState({
				token: state => state.token
			})
		},
		onShow() {
			if (this.token) {
				this.tabs.forEach(item => {
					item.page = 1
					item.loadStatus = 'more'
				})
				// 延迟加载确保 学习进度数据已更新
				setTimeout(() => {
					this.getData()
				}, 500)
			}
		},
		methods: {
			getData() {
				const currentTab = this.tabs[this.current]
				currentTab.loadStatus = 'loading'
				this.$api.userHistoryList({
					page: currentTab.page,
					type: currentTab.type
				}).then(res => {
					console.log(res.rows, 'res');
					currentTab.list = currentTab.page === 1 ? res.rows : [...currentTab.list, ...res.rows],
						console.log(res.rows.length, 'res.rows.length');
					if (res.rows.length < this.limit) {
						currentTab.loadStatus = 'noMore'
					} else if (res.rows.length === this.limit) {
						currentTab.loadStatus = 'more'
					}
					console.log(currentTab.loadStatus, 'currentTab.loadStatus');
				}).catch(err => {
					currentTab.loadStatus = 'more'
					if (tab.page > 1) {
						tab.page = tab.page - 1
					}
				})
			},
			changeTab(e) {
				this.current = e
			},
			changeCurrent(e) {
				this.current = e.detail.current
				const currentTab = this.tabs[this.current]
				if (currentTab.loadStatus === 'more' && currentTab.page === 1) {
					this.getData()
				}
			},
			// 滚动底部事件
			reachBottom(e) {
				console.log(e, 'e');
				const currentTab = this.tabs[this.current]
				console.log(currentTab.loadStatus, 'currentTab.loadStatus');
				if (currentTab.loadStatus !== 'more') return
				console.log('滚动到底部');
				currentTab.page++
				this.getData()
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		height: 100%;

		.result {
			height: 100%;
		}
	}
</style>
