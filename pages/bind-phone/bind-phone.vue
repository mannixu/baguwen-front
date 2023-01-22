<template>
	<view>
		<!-- 顶部返回&背景色 -->
		<view class="login-bg" />
		<!-- #ifndef MP -->
		<!-- <view class="py-3 px-4 back-btn" @click="goBack">
			
			<uni-icons color="#fff" type="back" size="20"></uni-icons>
		</view> -->
		<!-- #endif -->
		
		<!-- #ifndef MP -->
		<view class="login-back" @click="goBack">
			<uni-icons type="arrowleft" size="20" color="#FFFFFF"></uni-icons>
		</view>
		<!-- #endif -->
		<!-- 登录注册 模块 -->
		<view class="login">
			<view class="flex">
				<text class="title">绑定手机号</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" placeholder="请输入手机号" class="rounded font-md" v-model="form.phone" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="text" placeholder="验证码" class="rounded font-md" v-model="form.code" />
				<code-btn :phone="form.phone"></code-btn>
			</view>

			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">绑 定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {}
			}
		},
		methods: {
			submit() {
				console.log(this.form,'form');
				const data = Object.assign(this.form, {})
				this.$api.getBindPhone(data).then(res => {
					if (res === 'ok') {
						this.$toast('绑定成功')
						this.$store.dispatch('updateUserInfo', { //调用vuex方法重新存储有带有手机号的数据
							phone: data.phone
						})
					}
					uni.navigateBack()
					this.form = {}
				}).catch(err => {
					console.log(err, 'err');
				})

			},
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

