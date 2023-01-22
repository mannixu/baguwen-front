<template>
	
	<view class="pl-2 m-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view style="min-width: 700rpx;display: inline-flex;" v-for="item in list" :key="item.id"
				class="mr-3 text-white" >
				<view class="coupon-item"  :style="item.isgetcoupon ? 'background-color : #DADADA ':'background-color : #FED0D0 '" > <!-- style="background-color: #FDE8E5;" -->
					<view class="coupon-money"  >
						<view style="display: flex; align-items: center!important; justify-content:center;">
							<view>
								<view class="layof" :style="item.isgetcoupon ? 'color : #474747 ':'color : #ff0000 '" >￥{{item.price}}</view>
								<view class="get-btn2"  :style="item.isgetcoupon ? 'color : #474747;background-color: #ccc;border-color: #ccc; ':'color : #ff0000;background-color: #fbb3b9;border-color: #FED0D0; '"       >{{ item.type | formatType }}优惠券</view>
							</view>
							<view style="margin-left: 25rpx;">
								<view class="attime" :style="item.isgetcoupon ? 'color : #474747 ':'color : #ff0000 '" >满600可用</view>
								<view class="attime2" :style="item.isgetcoupon ? 'color : #474747 ':'color : #EB2244 '" >有效期至 2023.01.08 23:59</view>
							</view>
						</view>
						<view class="attime2" :style="item.isgetcoupon ? 'color : #474747 ':'color : #EB2244 '"  style="margin-top: 10rpx;"> 适用{{ item.type | formatType }}：{{ item.value.title }}</view>
						
						
					</view>
					<view class="get-btn"  :style="item.isgetcoupon ? 'color : #474747;background-color: #ccc;border-color: #ccc; ':'color : #ff0000;background-color: #FED0D0;border-color: #ff0000; '"     >{{item.isgetcoupon ?'已领取':'领取'}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
	
    
</template>

<script>
export default {
	components:{

	},
	data() {
		return {
			list: []
		}
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
	props:{
		
		
		
		
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

<style lang='scss'>
.coupon-item {
	width:100%; height:auto;  display:table; border-radius:10upx; padding:0 20upx; margin-top:22upx; border:1px solid #eeeeee; position:relative;
	.coupon-money {
		width:533upx; height:auto; display:table; float:left; padding:26upx 0; border-style:none dotted none none; border-color:#eeeeee;
		
		.nick { width:100%; height:50upx; line-height:30upx; font-size:$font-sm; color:$font-color-999; }
		.attime{ width:100%; font-weight:bold; height:33upx; line-height:50upx; font-size:26upx;  }
		.attime2{ width:100%;  height:33upx; line-height:50upx; font-size:26upx;  }
		.layof { width:100%; height:48upx; line-height:30upx; font-size:50upx; color:#ff9000; font-weight:bold; }
	}
	.get-btn { width:100upx; height:52upx; line-height:50upx; position:absolute; top:50%; right:26upx; margin-top:-26upx; text-align:center; border-radius:60upx; color:#ff9000; border:1px solid #ff9000;background-color: #FDE8E5; font-size:$font-sm; float:right; }
	.get-btn2 { width:110upx; height:27upx; line-height: 21upx; position:absolute; top:65%; left:66upx; margin-top:-26upx;  text-align:center; border-radius:60upx; color:#ff0000; background-color: #fbb3b9; border:1px solid #FED0D0; font-size:19rpx; float:right; }
}
.coupon-item:after { width:26upx;  height:13upx; position:absolute; left:537upx; top:0px; border-radius:0 0 26upx 26upx; content:""; display:block; background:$bgcolor_white; border:1px solid #eeeeee; border-top:0px; }
.coupon-item:before { width:26upx;  height:13upx; position:absolute; left:537upx; bottom:0px; border-radius:26upx 26upx 0 0; content:""; display:block; background:$bgcolor_white;  border:1px solid #eeeeee; border-bottom:0px; } 
 /* background:$bgcolor_white; */
 .coupon-money::before {
 	display: block;
 	content: '';
 	width: 10rpx;
 	height: 18rpx;
 	/* background-color: var(--color); */
 	/* background-color: black; */
	background:$bgcolor_white;
 	border-top-right-radius: 13rpx;
 	border-bottom-right-radius: 13rpx;
	border:1px solid #eeeeee;
	border-left: 0px;
 	position: absolute;
 	top: 88rpx;
	left: -1rpx;
 }
 /* .coupon-money::before {
 	font-size: 25rpx;
 	text-align: center;
 	line-height: 100rpx;
 	display: block;
 	width: 100rpx;
 	height: 100rpx;
 	border-radius: 50%;
 	border-style: double;
 	border-color: black;
 	color: black;	
 	border-width: 3px;
 	background-color: transparent;
 	position: absolute;
 	transform: rotate(-30deg);
	background-color: #DADADA;
 	right: 40%;
 	top: 10%;
	left: 33%;
 	z-index: 9;
 }
 
 .coupon-money:before {
 	content: '已领取';
 } */
</style>