<template>
	<view :style="handleStyle" :class="handleClass"> 
		
	</view>
</template>

<script>
	export default {
		name:"skeleton",
		props: {
			width: {
				type: [Number,String],
				default: ''
			},
			height: {
				type: [Number,String],
				default: ''
			},
			oClass:{
				type: String,
				default: ''
			},
			// 圆角
			circular:{
				type: Boolean,
				default: false
			}
		},
		computed: {
			handleStyle() {
				return `width:${this.width}rpx;height:${this.height}rpx;background-color: #f5f5f3;` 
			},
			handleClass() {
				let c = ''
				if(this.circular) {
					c ='rounded-circle'
				}
				return c + this.oClass
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>