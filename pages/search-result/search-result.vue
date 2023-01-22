<template>
	<view class=" flex flex-column" style="height: 100%;">
		<tabs :current="current" :tabs="tabs" @change="changeTab"></tabs>
		<!-- 搜索内容 -->
		<!-- swiper组件需要设置固定高度，否则内容无法显示 -->
		<view class="flex-1" style="height: 100vh;" > 
			<swiper :current="current" :duration="1000" style="height: 100%;" @change="changeCurrent">
				<swiper-item v-for="(t,tIndex) in tabs" :key="tIndex">
					<scroll-view @scrolltolower="reachBottom(t)" scroll-y="true"
						style="height: 100%;padding-top: 20rpx;">
						<course-list :item="item" v-for="(item,index) in t.list " :key="index" :type="t.type">
						</course-list>
						<!-- 加载loading -->
						<uni-load-more :status="t.loadStatus"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
						name: '课程',
						loadStatus: 'more',
						type: 'one',
						list: [],
						page: 1
					},
					{
						name: '专栏',
						loadStatus: 'more',
						type: 'two',
						list: [],
						page: 1
					}
				],
				limit: 10,
				searchValue: ''
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateBack()
		},
		onLoad(e) {
			this.searchValue = e.value
			this.getData()
		},
		methods: {
			getData() {
				const currentTab = this.tabs[this.current]
				const data = {
					keyword: this.searchValue,
					type: this.current == 0 ? 'course' : 'column',
					page: currentTab.page
				}
				currentTab.loadStatus = 'loading'
				this.$api.getSearchList(data).then(res => {
					currentTab.list = currentTab.page === 1 ? res.rows : [...currentTab.list, ...res.rows],
						console.log(currentTab.list, 'currentTab.list');
					if (res.rows.length < this.limit) {
						currentTab.loadStatus = 'noMore'
					} else if (res.rows.length === this.limit) {
						currentTab.loadStatus = 'more'
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
			reachBottom(t) {
				console.log('触发底部事件');
				const currentTab = this.tabs[this.current]
				if (currentTab.loadStatus !== 'more') return
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
