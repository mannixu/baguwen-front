<template>
	<view>
		<!-- #ifndef MP -->
		<view class="login-back" @click="back">
			<uni-icons type="arrowleft" size="20" color="#FFFFFF"></uni-icons>
		</view>
		<!-- #endif -->
		<view class="login-bg"></view>
		
		<view class="login">
			<view class="flex">
				<text class="title">{{ type == 'login' ? '登 录' : '注 册' }}</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" placeholder="请输入用户名" class="rounded font-md" v-model="form.username" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="text" placeholder="请输入密码" class="rounded font-md" v-model="form.password" />
			</view>
			<view class="login-form" v-if="type == 'reg'">
				<uni-icons type="locked"></uni-icons>
				<input type="text" placeholder="请输入确认密码" class="rounded font-md" v-model="form.repassword" />
			</view>
			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">{{ type == 'login' ? '登 录' : '注 册' }}
			</view>
			
			<view class="flex align-center justify-between my-3 font">
				<text class="py-3 text-main" @click="changeType">{{ type == 'login' ? '注册账号' : '去登录' }}</text>
				<text class="py-3 text-light-muted" @click="openForget">忘记密码？</text>
			</view>
			
			<view class="flex align-center justify-center wechatlogin">
				<!-- #ifndef MP -->
				<uni-icons type="weixin" size="25" color="#5ccc84" @click="wxLogin"></uni-icons>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<!-- <button type="default" open-type="getUserInfo" @getuserinfo="mpWxLogin">
					<uni-icons type="weixin" size="25" color="#5ccc84"></uni-icons>
				</button> -->
				<!-- #endif -->
			</view>
			
			<checkbox-group v-if="type == 'login'" class="flex align-center justify-center mt-4"
				@change="handleCheckboxChange">
				<label class="text-light-muted">
					<checkbox value="1" color="#7fd49e" style="transform: scale(0.7);" :checked="confirm" />
					<text class="font" @click.stop="userNeed">已阅读并同意用户协议&隐私声明</text>
				</label>
			</checkbox-group>
			
		
		</view>

	</view>
</template>

<script>
	// import tool from '@/common/tool.js';
	export default {
		data() {
			return {
				confirm: false,
				type: "login",
				form: {
					username: "",
					password: "",
					repassword: ""
				}
			}
		},
		onLoad(e) {
			
		},
		methods: {
			handleCheckboxChange(e) { //选中未选中
				this.confirm = !!e.detail.value.length
			},
			changeType() { //去登录 去注册
				this.type = this.type == 'login' ? 'reg' : 'login'
			},
			resetForm() { //重置表单
				this.form = {
					username: "",
					password: "",
					repassword: ""
				}
			},
			beforeLogin() { //判断是否勾选登录协议
				if (!this.confirm && this.type == 'login') {
					this.$toast('请先阅读并同意用户协议&隐私声明')
					return false
				}
				return true
			},
			submit() {
				if (!this.beforeLogin()) {
					return
				}
			
				uni.showLoading({
					title: '提交中...',
					mask: false
				});
				let data = Object.assign(this.form, {}) //复制对象到一个新的对象中并返回
			
				this.$api[this.type](data).then(user => {
					if (this.type == 'reg') {
						this.$toast('注册成功')
						this.resetForm()
						this.changeType()
					} else {
						this.handleLoginSuccess(user)
					}
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleLoginSuccess(user) { //登录成功调用方法
				this.$toast('登录成功')
				this.$store.dispatch('login', user)  //this.$store.dispatch 调用vuex里方法
				if (!user.phone) {  //未绑定手机号跳转页面绑定 退出
					uni.redirectTo({
						url: "/pages/bind-phone/bind-phone"
					})
					return
				}
				setTimeout(() => {  //350毫秒后跳转上一页
					// #ifdef H5
					uni.switchTab({
						url: "../tabbar/home/home"
					})
					// #endif
					// #ifndef H5
					this.back()
					// #endif
				}, 350)
			},
			back() {//返回上一个页面
				uni.navigateBack({
					delta: 1
				});
			},
			
		}
	}
</script>

<style>
/* 
 position: relative;                  // 相对定位
 当将块的position属性设置为relative时，与设置为absolute完全不同，这时子块是相对于他原本的位置定位，无论是否进行移动，其所占的位置仍然留有空位，后面的无定位块元素不会移动上来，因此，移动元素会导致覆盖其它框。若相对本身向上或向左的话要设置top，left为负值。
  position:absolute;             // 绝对定位,同时规定left和top
  border-top-left-radius  //左上圆角
   上边 | 右边 | 下边 | 左边 
   padding: 5px 1em 0 2em; 
 */
</style>
