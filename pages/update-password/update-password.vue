<template>
	<view class="pl-3">
		<uni-list :border="false">  <!-- 取消边框 -->
			<uni-list-item title="原密码">
				<view slot="footer">
					<input type="text"  placeholder="请输入原密码" style="text-align: right;"
						placeholder-style="color:#bbb" class="font py-1" v-model="form.opassword" />
				</view>
			</uni-list-item>
			<uni-list-item title="新密码">
				<view slot="footer">
					<input type="text"  placeholder="请输入新密码" style="text-align: right;"
						placeholder-style="color:#bbb" class="font py-1" v-model="form.password" />
				</view>
			</uni-list-item>
			<uni-list-item title="确认密码">
				<view slot="footer">
					<input type="text"  placeholder="请输入确认密码" style="text-align: right;"
						placeholder-style="color:#bbb" class="font py-1" v-model="form.repassword" />
				</view>
			</uni-list-item>
		</uni-list>
		<view class="pr-3 pt-3">
			<main-button @click="updatePwd">保存</main-button>
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
			updatePwd() {
				const data = Object.assign(this.form, {})
				uni.showLoading({
					title: 'loading···'
				})
				this.$api.updatePassword(data).then(res => {
					if (res === 'ok') {
						this.$toast('修改成功')
						setTimeout(() => {
					
							this.$store.dispatch('loginOut')
							uni.navigateBack()
						}, 1000)
						
					}
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
