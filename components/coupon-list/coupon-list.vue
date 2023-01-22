<template>
	<view class="pl-2 m-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view style="min-width: 310rpx;display: inline-flex;" v-for="item in list" :key="item.id"
				class="mr-3 text-white" :class="item.isgetcoupon ? 'receive':''">
				<view class="flex flex-column justify-center align-center bg-hover-warning py-2 px-2"
					style="border-right:2rpx dashed;">
					<view style="font-size: 34rpx;">
						￥{{item.price}}
					</view>
					<text class="font">
						适用{{ item.type | formatType }}：{{ item.value.title }}
					</text>
				</view>
				<view hover-class="bg-hover-warning" style="width: 110rpx;"
					class="flex align-center justify-center bg-warning" @click="getCoupon(item)">
					{{item.isgetcoupon ?'已领取':'领取'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "Coupon-list",
		data() {
			return {
				list: []
			};
		},
		filters: {
			formatType(type) {
				let o = {
					course:"课程",
					column:"专栏"
				}
				return o[type];
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$api.getCouponList().then(data => {
					this.list = data
				})
			},
			getCoupon(item) {
				if(item.isgetcoupon){ 
					return this.$toast("你已经领取过了")
				}
				// 领取优惠券
				this.$api.getUserCoupont({
					coupon_id: item.id
				}).then(res => {
					if (res === 'ok') {
						item.isgetcoupon = true
						this.$toast('领取成功')
					}
				})
			}
		},
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
</style>
