<template>
	<view class="flex  align-center addweight  " :class="isy?'flex-column':''">
		<text class=" myiconfont text-dark addtextclass  font-weight-bold"  :class="setclass "></text>
		<text class=" " style="color: #56636c;" :class="isy?'font-sm mt--1 ml-0':'ml-2'">{{text}}</text>
	</view>
</template>

<script>
	export default {
		name:"set-list",
		props: {
			text: {
				type: String,
				default: ''
			},
			setclass: {
				type: String,
				default: ''
			},
			isy: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
@import url('@/common/myiconfont.css');
.addtextclass{
	font-size: 46rpx;
}
.addweight{
	width: 100%;
	margin-top: 40rpx;
}
</style>