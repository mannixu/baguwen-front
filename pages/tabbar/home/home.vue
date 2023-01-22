<template>
	<view class="animate__animated ">
		<!-- <button type="default" @click="goLogin">去登陆页</button> -->
		<!-- <view class="home-bg" /> animate__fadeInLeftBig-->
		<view class="home-bg2"><image mode="aspectFill" src="../../../static/1.9.jpg" class="imag" ></image> </view>
		<!-- <image mode="aspectFill" src="../../../static/1.9.jpg" class="imag" ></image> -->
		<!-- <view class="imag"></view> -->
		<!-- 顶部用户登录模块 -->
		<view class=" ">
		<uni-popup ref="popup2"  background-color="#fafafa" style="z-index: 4;"  @change="change">
			<view class="popup-content "  style="width:100%; background-color: #fafafa; height: 700rpx;" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<!-- <text class="text">popup 内容</text>   background-color: #fafafa; -->
				<view class="flex flex-wrap mt-16 p-5   " style="width: 80%;">
					<block v-for="(item,collectindex) in collectlist" :key="collectindex">
						<view class="flex flex-wrap px-3  collectlist font-sm  ml-2 bg-hover-light " :class="select==collectindex?'beselectfontcolor':''" @click="selectcolkectt(collectindex)" style="padding-top: 5rpx; padding-bottom: 5rpx; height: 45rpx;">
							{{item}}
						</view>
					</block>
					
					
				</view>
			</view>
		</uni-popup>
		</view>
		<uni-popup ref="popup"  background-color="#fff"  @change="change">
			<view class="popup-content "  style="width: 500rpx;  height: 100%;" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<!-- <text class="text">popup 内容</text> -->
				<view   class="flex flex-column  w-100 " >
					
					<scroll-view :scroll-top="scrollTop"   scroll-y="true"  class="w-100 mt-6  scroll-y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
						<block v-for="i in 18" key="i">
							<view class="mt-4 getheight ">
								<set-list
								text="发现好友"
								setclass="icon-xiaoxi1"
								
								></set-list>
							</view>
						</block>				
					</scroll-view>
					<view class="tab-sticky  border-top"  >
						<block v-for="j in 3" key="j" >
							<set-list
							text="设置"
							setclass="icon-xiaoxi1"
							isy="true"
							>
							</set-list>
						</block>
					</view>
					
				</view>
			</view>
		</uni-popup>
		<view class="position-relative ">
			<view class="flex justify-center w-100  " >
			<view class="flex justify-between  align-center top-sticky " :style="backgroundstr"  style="width: 100%; height: 75rpx;" >
				<view class="myiconfont    icon-caidan addclsss ml-4  mt-1"  @click="topopup('left')" ></view>
				
				 <image v-if="showhead"  class="bg-primary mt-0 mr-5 headimag animate__animated animate__fadeInUp"  :src="userInfo.avatar" mode="aspectFill"></image>
				
				<view  class="myiconfont   icon-xiaoxi8 addclsss  mr-2 mt-1"   ></view>
				
			</view>
			</view>
			
			
			<!-- 没登录显示样式 -->
			<view class="home-user flex p-3" v-if="!userInfo" @click="$authJump('/pages/user-info/user-info')">
				<view class="home-avatar mr-3">
					<image src="../../../static/c1.png" mode="" />
				</view>
				<view class="home-user-login flex flex-column justify-center align-start text-white">
					<text class="font-md" @click="goLogin">立即登录</text>
					<text class="mt-2 font-sm">登录解锁更多功能</text>
				</view>
			</view>
			<!-- 登录后显示样式 -->
			<view class="home-user flex p-3 align-center justify-center" v-else @click="$authJump('/pages/user-info/user-info')">
				<view class="home-avatar mr-3 " style="margin-top: 70rpx;"  >
					<image :src="userInfo.avatar" mode="aspectFill" />
				</view>
				<view class="home-user-login flex flex-column justify-center align-start text-white flex-1" style="margin-top: 70rpx;" >
					
					<text class="font-md">{{userInfo.nickname || userInfo.username || userInfo.phone}}</text>
					<text class="mt-2 font-sm">{{userInfo.desc || '暂无描述'}}</text>
				</view>
				<!-- 引用的 在阿里云图标库的图标 -->
				<view class="iconfont icon-leimupinleifenleileibie text-white"   style="font-size: 20px;margin-top: 70rpx;"></view>
				
			</view>
		</view>
		<!-- icons模块  -->
		<!-- <view class="position-relative  px-3 " style="margin-top: 130rpx;">
			<icon-card :iconList="iconList"></icon-card>
		</view> -->
		<!-- 底部选项列表模块 -->
		
		<view class="   px-3  downswiper " v-if="token">
			<view class="flex statikTop justify-center  " style="z-index: 6;">
				<view  style="width: 70%; ">
					<tabs :current="current" :tabs="tabs"  @showagain="showagainmethod" :issmall="issmall" :isfoldbox="isfoldbox" @change="changeTab"></tabs>
				</view>
			</view>
			<view style="z-index: 3;">
			<swiper :current="current"  :duration="1000" @change="changeCurrent" class="flex-1 flex flex-column "
				style="height: 580px;">  <!-- 100vh -->
				<swiper-item class="flex" v-for="(t,tIndex) in tabs" :key="tIndex">
					<scroll-view class="flex-1 " @scrolltolower="reachBottom" scroll-y="true">
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
			</view>
			
			
		</view>
		<no-login  v-if="!token"></no-login>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				iconList:[{
					icon:"icon-OrderHistory",
					text:"订单",
					path:"/pages/order-list/order-list"
				},{
					icon:"icon-pinglun2",
					text:"消息"
				},{
					icon:"icon-shoucang1",
					text:"收藏"
				},{
					icon:"icon-e-learning-monitor",
					text:"在学",
					path:"/pages/tabbar/learn/learn",
					type:'switchTab'
				}],
				type: 'center', //弹出层弹出方向
				scrollTop: 0    ,//滚动条初始位置
				old: {
					scrollTop: 0
				},
				isopen: false,
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
					},
					{
						name: '收藏',
						loadStatus: 'more',
						type: 'column',
						tColumn: 'three',
						list: [],
						page: 1
					}
				],
				issmall:true, //改变tab组件样式
				isfoldbox:2, //表示哪个tab有下拉按钮从0开始
				current: 0,
				limit: 10,
				list: [],
				showhead: false,  //是否显示小头像
				backgroundstr:'background-color: rgba(0,0,0,0)',
				// #515a5f #fafafa #ffffff
				// showagain:false
				collectlist:['全部','视频收藏','音频收藏','图文收藏','专栏收藏','题目收藏','博客收藏'],
				select:0  //选中哪个收藏
				
				
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				token: state => state.token
			})
		},
		onNavigationBarButtonTap() {  //监听导航栏按钮事件
			this.goSetting()
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
		onPageScroll(e) {
			console.log(e)
			var opacity = 0
			var x=0
			var y=0
			var z=0
			if(e.scrollTop <= 86){
				x=e.scrollTop-5
				y=e.scrollTop+4
				z=e.scrollTop+9
			  opacity = e.scrollTop / 86
			  this.showhead=false
			}else{
				x=81
				y=90
				z=95
			  opacity = 1
			  this.showhead=true  //显示头像
			}
			var str = "background-color:rgb("+x+","+y+","+z+","+ opacity +")"
			// this.setData({
			//   background:str
			// })
			this.backgroundstr=str
			console.log(this.backgroundstr)

		},
		methods: {
			selectcolkectt(e){
				this.select=e
				console.log("collection被点击")
				console.log(e)
				if(e==0){
					this.tabs[2].name='收藏'
					
				}else{
					this.tabs[2].name=this.collectlist[e]
				}
				
				console.log(this.tabs)
				
			},
			
			
			showagainmethod(){ //展示收藏按钮不被弹出层覆盖
				console.log(this.showhead)
				if(!this.showhead) return  //如果没滑到顶部不显示弹出层
				
				this.$refs.popup2.open("top")
				console.log("被点击showagain")
			},
			
			
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
			// 滚动底部事件
			reachBottom(e) {
				console.log(e, 'e');
				const currentTab = this.tabs[this.current]
				console.log(currentTab.loadStatus, 'currentTab.loadStatus');
				if (currentTab.loadStatus !== 'more') return
				console.log('滚动到底部');
				currentTab.page++
				this.getData()
			},
			changeCurrent(e) {
				this.current = e.detail.current
				const currentTab = this.tabs[this.current]
				if (currentTab.loadStatus === 'more' && currentTab.page === 1) {
					this.getData()
				}
			},
			changeTab(e) {
				this.current = e
			},
			
			scroll: function(e) {  //滚动触发事件
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			upper: function(e) { //滚动到顶部触发事件
				console.log(e)
			},
			lower(e) { //滚动到底部触发事件
				
				
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			goLogin() {
				this.$navigateTo('/pages/login/login')
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
			},
			goSetting() {
				console.log("setting被点")
				this.$navigateTo('/pages/setting/setting')
			},
			topopup(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
		}
	}
</script>

<style lang="less" scoped>
	// 导入图标css
	@import url('@/common/iconfont.css');
	@import url('@/common/myiconfont.css');

	.beselectfontcolor{
		color: #00cf8a;
	}
	.collectlist{
		// height: 30rpx;
		// width: 60rpx; 
		border-radius: 60rpx; 
		border: solid 1rpx;
		border-color: rgb(242, 242, 242);
		// background-color: rgb(240, 240, 240);
		
	}
	.headimag{
		width: 45rpx; 
		height: 45rpx;
		border: 1rpx solid #fff;
		border-radius: 45rpx;
	}
	.top-sticky{
		position: fixed;
		z-index: 99;
		top: 0;
		background-color: #ffffff;
	}
	.top-sticky2{
		position: fixed;
		z-index: 99;
		top: 0;
		// background-color: #ffffff;
	}
	.statikTop{
		background-color: #fff;
		position: sticky;
		z-index: 99;
		top: 74rpx;
		// background-color: blue;
		 // background-color:rgba(0,0,0,1);
		margin-left: -30rpx;  //抵消父盒子padding30rpx
		margin-right: -30rpx;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		
	}
	
	
	.downswiper{
		background-color: #fafafa;
		// background-color: blueviolet;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		// z-index: 6;
		position: relative;
		height: 1000rpx;
		top: 74rpx;
		margin-top: 90rpx;
	}

	.tab-sticky {
	    position: fixed;
	    left: 0;
	    right: 0;
	    bottom: -25rpx;
		width: 500rpx;
		margin-left: 30rpx;
		height: 280rpx;
		display: flex!important ;
		flex: 1!important;
		
		// background-color: red;
		margin-left: -23rpx;
	  }
	
	.scroll-y{
		height: 1242rpx;
	}

	.text {
			font-size: 12px;
			color: #333;
		}
	.popup-content {
			display: flex;
			
			padding: 15px;
			// height: 50px;
			
			
		}
	.addclsss{
		font-size: 50rpx;
		color: #FFFFFF;
	}
	.home-bg {
		position: fixed;  //如果某元素添加了position:fixed属性，会把该元素设置为固定定位，该元素会变成一个有框的空间，
		left: 0;
		right: 0;
		height: 350rpx;
		background-color: #5ccc84;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
	}
	.home-bg2 {
		position: absolute;  //如果某元素添加了position:fixed属性，会把该元素设置为固定定位，该元素会变成一个有框的空间，
		left: 0;
		right: 0;
		height: 437rpx;
		width: 750rpx;
		// background-color: rgba(0, 0, 0, .5);
		background-position: center;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		// filter: brightness(70%)  contrast(0.9);
		// background: url(../../../static/1.9.jpg) ;
		
	}
	.imag{
		height: 100%;
		width: 100%;
		// border-bottom-left-radius: 30rpx;
		// border-bottom-right-radius: 30rpx;
		filter: brightness(70%)  contrast(0.9);
		// background-color: blue;
		// filter:  opacity(70%);
		// filter:progid:DXImageTransform.Microsoft.gradient(enabled='false',startColorstr=#550000FF, endColorstr=#55FFFF00) ;
		  // filter: brightness(40%) ;

		// background: url(../../../static/1.9.jpg) ;
		// background-position: center;
		
		
		
		
		// z-index: 2;
		// background-color: red;
		// filter:blur(add=ture,direction=135,strength=100%)
		// background: linear-gradient(to right, #495056, #585C5F);
		
		
		
		
	}

	.home-user {

		.home-avatar,
		image {
			width: 125rpx;
			height: 125rpx;
			background-color: skyblue;
			border: 1rpx solid #fff;
			border-radius: 125rpx;
		}
	}

	.home-icons {
		background-color: #fff;
		height: 150rpx;
	}
</style>
