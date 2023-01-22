<template>
	<view class="px-3">
		<view>
			<uni-list :border="false">
				<uni-list-item clickable title="账号安全" clickable link
					@click="$authJump('/pages/update-password/update-password')">
				</uni-list-item>
				<uni-list-item title="清除缓存" clickable @click="clearStorage">
					<view slot="footer">
						<view class="font">{{storageInfo.currentSize | changeSize}}</view>
					</view>
				</uni-list-item>
				<uni-list-item title="检查更新" clickable link>
				</uni-list-item>
				<uni-list-item title="当前版本" clickable>
					<view slot="footer">
						<view class="font">1.0.0</view>
					</view>
				</uni-list-item>
			</uni-list>
		</view>

		<view class="p-3" v-if="user">
		<main-button @click="loginOut">退出登录</main-button>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'  //处理 数字转换成kb mb单位的工具类
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				storageInfo: '',
				keys: []
			}
		},
		computed: {
			...mapState({  //从vuex获取用户
				user: state => state.userInfo
			})

		},
		mounted() { // 生命周期函数  页面刷新时调用
			this.getStoregeInfo()
		},
		filters: {
			changeSize: function(value) { //过滤器把数字转换成带有内存大小的数字
				return tool.bytesToSize(value);
			}
		},
		methods: {
			loginOut() {
				uni.showModal({
					content: '是否退出?',
					success: (res) => {
						if (res.confirm) {
							this.$api.loginOut({}).then(data => {
									this.$toast('退出成功')
									this.$store.dispatch('loginOut')
									uni.navigateBack({ delta: 1 })								
							})
						} else if (res.cancel) {
							return
						}
					}
				});
			},
			getStoregeInfo() {
				
				this.storageInfo = uni.getStorageInfoSync() //调用此方法可以获取所有本地存储的信息  storageInfo.currentSize可以获取本地缓存大小
				this.keys = this.storageInfo.keys.filter(item => item !== 'userInfo') //去除掉key为userinfo的数据 为了用户登录信息不被清除
				console.log(this.keys,'this.keys');
			},
			clearStorage() { //清除缓存
				uni.showModal({
					content: '是否清除缓存？',
					success: (res)=> {
						if (res.confirm) {
							console.log(this.keys,'this.keys');
							this.keys.forEach(item => {
								uni.removeStorageSync(item) //调用此方法一个一个清除缓存
							})
							this.$toast('已清除缓存')
						} else if (res.cancel) {
							return
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
