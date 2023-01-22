<template>
	<view class="p-3">
		<view class="flex text-white mt-3" :class="item.btn !== '立即使用' ?'receive':''" v-for="(item,index) in list"
			:key="index">
			<!-- 将父容器的display：flex，侧边栏大小固定后，将内容区flex：1，内容区则会自动放大占满剩余空间。 -->
			<view class="flex-1">
				<view class="flex  flex-column justify-center align-start bg-hover-warning p-2"
					style="border-right:2rpx dashed;border-top-left-radius: 8rpx;border-bottom-left-radius: 8rpx;">
					<view class="font-lg">
						￥{{item.price}}
					</view>
					<text class="font">
						适用{{item.typeName}}：{{item.title}}
					</text>
				</view>
			</view>
			<view hover-class="bg-hover-warning"
				style="width: 200rpx; border-top-right-radius: 8rpx;border-bottom-right-radius: 8rpx;"
				class="flex align-center justify-center bg-warning" @click="onClickCoupon(item)">
				{{item.btn}}
			</view>
		</view>
		<!-- 加载loading -->
		<view class="mt-3">
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				more: 'loading',
				page: 1,
				limit: 5,
				list: [],
				type: '',
				goods_id: 0
			}
		},
		mounted() {
			this.getData()
		},
		onLoad(e) {
			console.log(e,'e');
			if (e.type && e.goods_id) {
				this.type = e.type
				this.goods_id = e.goods_id
			}
		},
		// 上拉加载 
		onReachBottom() {
			this.reachBottom()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getData()
		},
		methods: {
			reachBottom() {
				if (this.more !== 'more') return
				this.page++
				this.getData()
			},
			getData() {
				this.more = 'loading'
				this.$api.getCoupontList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					// formatList对数据添加过期状态
					const rows = this.formatList(res.rows)
					this.list = this.page === 1 ? rows : [...this.list, ...rows],
						console.log(this.list, 'this.list');
					if (res.rows.length < this.limit) {
						this.more = 'noMore'
					} else if (res.rows.length === this.limit) {
						this.more = 'more'
					}
				}).catch(err => {
					this.more = 'more'
					if (this.page > 1) {
						this.page -= 1
					}
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			formatList(list) {
				list.forEach(v => {
					const endTime = new Date(v.end_time).getTime()
					const currentTime = new Date().getTime()
					// 过期状态
					v.expired = currentTime > endTime
					v.btn = v.used === 1 ? '已使用' : (v.expired ? '已过期' : '立即使用')
					v.typeName = v.type === 'course' ? '课程' : '专栏'
					if ((v.btn === '立即使用' && this.type && this.goods_id) && (v.type != this.type || v.goods_id !=
							this.goods_id)) {
						v.btn = '不可用'
					}

				})
				return list
			},
			onClickCoupon(item) {
				if(item.btn !== '立即使用') return
				uni.$emit('chooseCoupon',{
					user_coupon_id:item.id,
					price:parseInt(item.price)
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="less">
	.receive {
		color: #fff;

		.bg-hover-warning,
		.bg-warning {
			background-color: #ccc !important;

		}
	}
	
	// lex属性 是 flex-grow、flex-shrink、flex-basis三个属性的缩写。
	// flex-grow：定义项目的的放大比例；
	// 	默认为0，即 即使存在剩余空间，也不会放大；
	// 	所有项目的flex-grow为1：等分剩余空间（自动放大占位）；
	// 	flex-grow为n的项目，占据的空间（放大的比例）是flex-grow为1的n倍
	// flex-shrink：定义项目的缩小比例；
	// 	默认为1，即 如果空间不足，该项目将缩小；
	// 	所有项目的flex-shrink为1：当空间不足时，缩小的比例相同；
	// 	flex-shrink为0：空间不足时，该项目不会缩小；
	// 	flex-shrink为n的项目，空间不足时缩小的比例是flex-shrink为1的n倍。
	// flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间。相当于设置初始值
	// 	默认值为auto，即 项目原本大小；
	// 	设置后项目将占据固定空间。

</style>
