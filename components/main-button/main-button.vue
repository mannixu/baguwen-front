<template>
	<view :class="bClass + ' ' + (disabled ? 'bg-main-disabled' :'')" :style="bStyle" class="bg-main main-btn" hover-class="bg-main-hover" @click="clickFn">
		<slot></slot> <!-- 中间一个插槽用接收按钮中字符串 -->
	</view>
</template>

<script>
	export default {
		name:"main-button",
		props: {
			bClass: { //控制按钮样式
				type: String,
				default: ''
			},
			bStyle: { //自定义一些样式
				type: String,
				default: ''
			},
			disabled:{ //控制背景颜色
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickFn() {
				if(this.disabled) return
				this.$emit('click')  //点击后对外发出通知
			}
		},
	}
</script>

<style>

</style>