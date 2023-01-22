<template>
	<view class="flex px-2 pt-2 border-bottom ">
		<view class="flex flex-1  flex-column align-center "  :class="current === index ? 'current-tab':''"
			style="color:#888;" v-for="(item,index) in tabs" :key="index" @click="$emit('change',index)">
			<view class="flex  " @click="isopenmethod(index)" >
				<text class="">{{item.name}}</text>
				<view v-if="current === index&&isfoldbox==index"  class="myiconfont  icon-xiasanjiaoxing" style="margin-left: 6rpx;   color: black; font-size: 16rpx;"></view>
			</view>
			<view class=" flex justify-center  " :class="isfoldbox==index?'isfoldbox':''"  :style="issmall?'height: 20rpx;':''"  >
				<view v-if="current === index"  :style="issmall?'height: 4rpx;':'height: 10rpx;'" :class="issmall?'mt-0':'mt-1'" class="tab-line   rounded animate__animated animate__fadeIn animate__faster"  />
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "tabs",
		props: {
			current: {
				type: Number,
				default: 0
			},
			tabs:Array,
			issmall:{
				type:Boolean,
				default:false
			},
			isfoldbox:{  //哪个tab展示小图标
				type:Number,
				default:-1
			},
		},
		data() {
			return {
				isopen:false  //弹出层是否展开
				
			};
		},
		methods: {
			// changeCurrent(index) {
			// 	this.current =index
			// }
			isopenmethod(index){
				if(index!=this.isfoldbox) return;
				
				this.$emit('showagain')
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
				// if(!e.show){
				// 	console.log("show方法执行")
				// 	this.$emit("close")
				// }
			}
		},
	}
</script>

<style scoped lang="less">
	@import url('@/common/myiconfont.css');
	.current-tab {
		
		text {
			color: #00cf8a;
		}
		.isfoldbox{
			margin-left: -20rpx;
		}
		.tab-line {
			// width: 50rpx;
			// height: 10rpx;
			// background-color: #00cf8a;
			// border-radius: 8rpx;
			width: 50rpx;
			// height: 4rpx;
			background-color: #00cf8a;
			border-radius: 8rpx;
		}
	}
	.popup-content {
			
			
			
		}
</style>
