<template>
	<view>
		<!-- 考试时间倒计时 -->
		<view class="flex justify-center align-center timer-box">
			{{time_out |formatType}}
		</view>
		<view style="height: 85rpx;">
			
		</view>
	</view>
</template>

<script>
	let timer = null
	export default {
		name: "timer-box",
		props: {
			expire: {
				type: Number,
				default: 1
			},
		},
		filters: {
			formatType(data) {
				let hours = parseInt(data % (60 * 60 * 24) / (60 * 60))
				let minutes = parseInt(data % (60 * 60) / 60)
				let seconds = parseInt(data % 60)
				return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (
					seconds < 10 ? '0' + seconds : seconds)
			}
		},
		data() {
			return {
				time_out: 0
			};
		},
		mounted() {
			this.time_out = this.expire * 60
			if (this.time_out > 0) {
				timer = setInterval(this.handleTimeOut, 1000)
			}
		},
		beforeDestroy() {
			if (timer) return clearInterval(timer)
		},
		methods: {
			handleTimeOut() {
				if (this.time_out === 0) {
					this.$emit('end')
					clearInterval(timer)
					return
				}
				this.time_out--
			}
		},
	}
</script>

<style scoped lang="less">
	.timer-box {
		background-color: #fff;
		color: red;
		border-top: 1px solid red;
		border-bottom: 1px solid red;
		padding: 20rpx 0;
		font-size: 35rpx;
		height: 50rpx;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1000;
	}
</style>
