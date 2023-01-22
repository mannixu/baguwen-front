<template>
	<view style="background-color: #f5f5f3;" class="pb-4" v-if="dataStatus">
		<view class="" style="padding: 50rpx;padding-bottom: 20rpx;">
			<image :src="list.cover" mode="aspectFilla" style="width: 655rpx;height: 400rpx;background-color: red;">
			</image>
		</view>
		<view class="px-3">
			<slider @changing="changingSlider" @change="changeSlider" :value="position" :max="duration" :block-size="20"
				block-color="#5ccc84" activeColor="#5ccc84" />
			<view class="flex justify-between font" style="color:#5ccc84;">
				<text>{{currentTime | formatTime }}</text>
				<text>{{duration | formatTime}}</text>
			</view>
			<view class="flex justify-center pt-3 icons align-center">
				<text class="iconfont icon-ziyuan11" @click="loop" :style="loopStatus ? 'color: #5ccc84;':''"></text>
				<text class="iconfont " :class="isPlaying ? 'icon-tianchongxing-':'icon-bofang2'" @click="play"></text>
				<text class="iconfont icon-shoucang1" @click="collect"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from "@/common/tool.js"
	export default {
		name: "f-audio",
		props: {
			list: Object,
			src: String,
		},
		computed: {
			position() {
				return this.isPlayEnd ? '0' : this.currentTime
			}
		},
		filters: {
			formatTime(s) {
				if (!s) return "00:00:00"
				return tool.formatSeconds(s);
			}
		},
		data() {
			return {
				_audioContext: null,
				// 播放状态
				isPlaying: false,
				// 播放结束状态
				isPlayEnd: false,
				// 当前时间
				currentTime: 0,
				// 总时长
				duration: 0,
				// 拖动中
				changing: false,
				// 循环状态
				loopStatus: false,
				// 加载状态
				dataStatus:false
			};
		},
		beforeDestroy() {
			if (this._audioContext !== null && this.isPlaying) {
				this.stop()
			}
		},
		created() {
			this.createAudio()
		},

		methods: {
			createAudio() {

				this._audioContext = uni.createInnerAudioContext()
				this._audioContext.autoplay = false
				this._audioContext.src = this.src

				// 播放
				this._audioContext.onPlay(() => {
					console.log('开始播放');
				});
				// 播放进度
				this._audioContext.onCanplay(() => {
					this.duration = this._audioContext.duration
				})
				this._audioContext.onTimeUpdate((e) => {
					if (this.changing) return
					this.currentTime = this._audioContext.currentTime
					// 获取播放进度，传给父组件
					if (this.duration > 0) {
						this.$emit('onProgress', ((this.currentTime / this.duration) * 100).toFixed(2))
					}

				});
				// 播放结束
				this._audioContext.onEnded(() => {
					this.currentTime = 0
					this.isPlaying = false
					this.isPlayEnd = true
				});
				// 播放错误
				this._audioContext.onError(() => {
					this.isPlaying = false
				});
				this.dataStatus =true
				console.log(this.dataStatus,'加载状态',this.duration,'总时长');
			},
			// 播放事件
			play() {
				if (!this.src) return this.$toast('数据有误，请联系管理员')
				if (this.isPlaying) {
					return this.pause()
				}
				this.isPlaying = true
				this._audioContext.play()
				this.isPlayEnd = false
			},
			// 暂停事件
			pause() {
				console.log('暂停');
				this.isPlaying = false
				this._audioContext.pause()
			},
			stop() {
				this.isPlaying = false
				this._audioContext.stop()
			},
			// 循环播放
			loop() {
				this.loopStatus = !this.loopStatus
				let toast = this.loopStatus ? '开启循环' : '关闭循环'
				this._audioContext.loop = this.loopStatus
				this.$toast(toast)
			},
			// 拖动事件
			changeSlider(e) {
				// console.log(e.detail.value,'e');
				this._audioContext.seek(e.detail.value)
				this.changing = false
			},
			// 拖动中事件
			changingSlider(e) {
				this.changing = true
				this.isPlaying = false
				this.currentTime = e.detail.value

			},
			collect() {
				this.$toast('暂无此功能')
			}
		},
	}
</script>

<style scoped lang="less">
	.icons {
		text {

			&:first-child,
			&:last-child {
				font-size: 30px;
				color: #ccc;
			}

			&:nth-child(2) {
				font-size: 50px;
				margin: 0 50rpx;
				color: #5ccc84;
			}
		}
	}
</style>
