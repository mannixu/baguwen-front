<template>
	<view class="flex align-center p-2 border-bottom py-3" @click="$emit('click')">
		<view class="font-lg text-muted flex-shrink " style="width: 80rpx; text-align: center;">
			{{(index + 1) | formatIndex }}
		</view>
		<view class="flex flex-column ml-3">
			<text class="font-md">{{title}}</text>
		<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"menu-item",
		props: {
			title: {
				type: String,
				default: ''
			},
			index: {
				type: Number,
				default: 0
			},
		},
		filters: {
			formatIndex(index) {
				if(index < 10) {
					return '00' +index
				} 
				if(index >= 10 && index<100) {
					return '0' +index
				}
				return index;
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.border-style {
		padding:0 10rpx;border: 1px solid #d52e2d;color: #d52e2d;border-radius: 8rpx;
	}
</style>