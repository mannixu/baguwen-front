<template>
	<view class=" no-login">
		<image src="../../static/noLogin.png" style="width: 300rpx;height: 300rpx"></image>
		<text class="font text-muted my-2">登录后才可以查看我的学习哦</text>
		<button size="mini" :plain="true" @click="$navigateTo('/pages/login/login')">立即登录</button>
	</view>
</template>

<script>
	export default {
		name:"no-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.no-login {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fff;
}
</style>