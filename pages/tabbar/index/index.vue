<template>
	<view class="container">
		
		
		<!-- 骨架屏应用 -->
		<indexSkeleton v-if="loading"></indexSkeleton>
		<view   v-else class=" animate__animated animate__fadeIn animate__fast">
			
		<block v-for="(item,index) in templates" :key="index">
			<!-- 搜索模块 -->
			
			<view class="  weightpad  flex flex-column" style="width: 750rpx;" v-if="item.type == 'search'">
				<view class="mt-3 	">
					<f-search-bar  :placeholder="item.placeholder"></f-search-bar>
				</view>
				<view   class="tab-sticky  "  >
				<!-- tabs -->
				    <my-tabs 
					:tabData="tabData" 
					:defaultIndex="currentIndex"
					@tabClick="tabClick"
					>
					</my-tabs>
				</view>
			</view>
			
			<!-- 轮播图模块 -->
			<view v-else-if="item.type == 'swiper'">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
					class="flex justify-center mt-2">
					<swiper-item class="flex justify-center shadow" v-for="(item,index2) in item.data" :key="index2"
						@click="swiperClick(item)">
						<image :src="item.src" mode="aspectFill" style="width: 720rpx;height: 300rpx;"
							class="rounded">
						</image>
					</swiper-item>
				</swiper>
			</view>
			<!-- icon图标模块 -->
			<icon-nav v-else-if="item.type === 'icons'" :list='item.data'></icon-nav>
			<!-- 优惠券模块  添加ref后面可以引用获取组件里方法-->
			<!-- <lgf-coupon v-else-if="item.type === 'coupon'"></lgf-coupon> -->
			<coolc-coupon v-else-if="item.type === 'coupon'" ref="couponList" types="carts"  color="#ff0000" ></coolc-coupon>
			<!-- <coupon-list v-else-if="item.type === 'coupon'" ref="couponList"></coupon-list> -->
			<!-- 拼团&秒杀 模块 -->
			<view v-else-if="item.type === 'promotion'">
				<active-list :type="item.listType"></active-list>
				
			</view>
			
			 <!-- 最新列表模块 -->
			<view v-else-if="item.type === 'list'">
				<view class="blank-line" />
				<view class="p-2 flex justify-between align-center">
					<text class="font-md font-weight-bold">最新列表</text>
					<text class="font-sm text-secondary" @click="goCourseList">查看全部</text>
				</view>
				<view>
					<course-list v-for="(item2,index2) in item.data" :key="index2" :item="item2"
						:type="item.listType">
					</course-list>
				</view>
			</view>
			<!-- 底部模块 -->
			<view v-else-if="item.type === 'imageAd'">
				<view class="blank-line" />
				<image :src="item.data" mode="aspectFill" style="height: 375rpx;width: 100%;"
					@click="imgItemClick(item)"></image>
			</view>
		</block>
		</view>
		
		<!-- <view>
			<scroll-view scroll-x="true" class="scroll-row mt-1">
				<course-list v-for="(item,index) in courselist" :key="index" :item="item"></course-list>
			</scroll-view>
		</view> -->
		
	</view>
</template>

<script>
	import indexSkeleton from "./index-skeleton.vue"
	export default {
		data() {
			
			return {
				coupon:[{
					list: [{
						url: "/pages/brand/index/id/1",
						money: "150",
						title: "满2000减150元",
						ticket: "uni-app实战在线教育类app开发",
						seller_name: "百达翡丽官方旗舰店",
						end_time: "2019-04-20 01:51:20",
						state: "1"
					}]
				}],
				
				// 模板数据
				templates: [],
				// 骨架屏状态
				loading: false,
				// tabs 数据源
				tabData: [{title:'推荐'},{title:'java'},{title:'前端'},{title:'python'},{title:'大数据'},{title:'人工智能'},{title:'安卓'},{title:'安全'},{title:'go'}],
				// 当前的切换 index
				currentIndex: 0,
				
				// bootomimg:{src:"/static/demo/banner/banner1.png"},#B7D5F7 181 214 249 #B5D6F9
				//#F4F8F9  244 248 249
				// recommendlist:[
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
						     
				// 	},
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
						     
				// 	},
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
						     
				// 	}
					 
				// ],
				
				// courselist:[
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
							
						     
				// 	},
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
						     
				// 	},
				// 	{
				// 		    "group_id": 19, 
				// 		    "id": 12, 
				// 		    "title": "unicloud商城全栈开发", 
				// 		    "cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png", 
				// 		    "price": "4.00", 
				// 		    "t_price": "10.00", 
				// 		    "type": "media", 
				// 		    "start_time": "2021-04-15T16:00:00.000Z", 
				// 		    "end_time": "2022-05-16T16:00:00.000Z" 
						     
				// 	}
					 
				// ],
				
				// swiper:[
				// 	{src:"/static/demo/banner/banner1.png"},
				// 	{src:"/static/demo/banner/banner2.png"}
				// ],
				// iconNav:[
				// 	{
				// 		name:"活动",
				// 		src:"/static/demo/icon/hd.png"
				// 	},
				// 	{
				// 		name:"考试",
				// 		src:"/static/demo/icon/test.png"
				// 	},
				// 	{
				// 		name:"秒杀",
				// 		src:"/static/demo/icon/ms.png"
				// 	},
				// 	{
				// 		name:"拼团",
				// 		src:"/static/demo/icon/pt.png"
				// 	},
				// 	{
				// 		name:"直播",
				// 		src:"/static/demo/icon/course.png"
				// 	},
				// 	{
				// 		name:"专栏",
				// 		src:"/static/demo/icon/column.png"
				// 	},
				// 	{
				// 		name:"电子书",
				// 		src:"/static/demo/icon/book.png"
				// 	},
				// 	{
				// 		name:"社区",
				// 		src:"/static/demo/icon/ask.png"
				// 	}
				// ]
			}
		},
		components: {
			indexSkeleton
		},
		created() {
			this.loading = true
			this.getData()
			uni.$on('userLogin', this.getCouponList)  //对全局通知的一个监听  
			uni.$on('userLoginOut', this.getCouponList)
		},
		destroyed() {   //生命周期函数 销毁调用 注销此监听
			uni.$off('userLogin',this.getCouponList)  //监听后别忘销毁
			uni.$off('userLoginOut',this.getCouponList)
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getData()
			this.getCouponList()
		},
		methods: {
			getCouponList() {
				console.log(this.$refs.couponList, 'this.$refs.couponList');
				this.$refs.couponList[0].getData()  //调用组件里方法刷新优惠券
			}, 

			getData() {
				this.$api.getIndexData().then(data=>{
					this.templates = data
				}).finally(()=>{
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>

<style>
	
	.weightpad{
		margin-left: -20rpx;  /* 抵消父盒子pading */
		margin-right: -20rpx;
		/* height: 300rpx; */
		background: linear-gradient( #B5D6F9, #F4F8F9);
	}
	.tab-sticky {
		
	    position: -webkit-sticky;
	    position: sticky;
	    z-index: 99;
		
		
	    top: 0;
		
		
	  }
</style>
