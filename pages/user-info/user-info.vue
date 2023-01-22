<template>
	<view class="pl-3">
		<uni-list :border="false">
			<uni-list-item  clickable @click="upload" >
				<view slot="header" class="flex align-center font">
					<text>头像</text>
				</view>
				<view slot="footer">
					
					<image :src="form.avatar" mode="aspectFill" style="width: 80rpx;height: 80rpx;border-radius: 100%;"
						class="bg-light"></image>
				</view>
			</uni-list-item>
			<uni-list-item title="昵称">
				<view slot="footer">
					<input type="text"  placeholder="请输入昵称" style="text-align: right;"
						placeholder-style="color:#bbb" class="font py-1" v-model="form.nickname" />
				</view>
			</uni-list-item>
			<uni-list-item title="性别" clickable @click="changeSex">
				<view slot="footer">
					<text class="font">{{form.sex || '未知'}}</text>
				</view>
			</uni-list-item>
			<uni-list-item title="手机" clickable @click="$navigateTo('/pages/bind-phone/bind-phone')">
				<view slot="footer">
					<text class="font">{{userInfo.phone || '未绑定'}}</text>
				</view>
			</uni-list-item>
		</uni-list>
		<view class="pr-3 pt-3">
			<main-button @click="save">保存</main-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				phone: '',
				form: {
					sex: '',
					avatar: '',
					nickname: ''
				},
				cloneForm: {},
				backCount: 0,
				saveStatus: false
			}
		},
		onBackPress() {
			// 文本未保存提示
			const arrForm = Object.values(this.form)
			const cloneForm = Object.values(this.cloneForm)
			let result = arrForm.filter(number => !cloneForm.includes(number))

			if (result.length > 0 && this.backCount === 0 && !this.saveStatus) {
				this.$toast('修改的内容未保存')
				this.backCount++
				return true
			}

		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo
			})
		},
		mounted() {
			this.form.sex = this.userInfo.sex
			this.form.avatar = this.userInfo.avatar
			this.form.nickname = this.userInfo.nickname
			this.cloneForm = JSON.parse(JSON.stringify(this.form))
		},
		methods: {
			updateToast() {

			},
			save() {
				this.saveStatus = true
				const data = Object.assign(this.form, {})
				const keys = Object.keys(this.form)
				this.$api.updateInfo(data).then(res => { 
					if (res === 'ok') {
						this.$toast('保存成功')
						console.log(keys, 'keys');
						// keys.forEach(k => this.$store.dispatch('updateUserInfo', {
						// 	[k]: this.form[k]
						// }))
						this.$store.dispatch('updateUserInfo',data)
						uni.navigateBack()
					}
				})
			},
			changeSex() {
				const itemList = ['男', '女', '未知']
				uni.showActionSheet({  //uni提供接口展示下面弹框 选择后返回索引
					itemList,
					success: (res) => {
						this.form.sex = itemList[res.tapIndex]
					}
				});
			},
			upload() {
				uni.chooseImage({
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.$api.uploadImage({
							file: res.tempFilePaths[0]
						}, (prograss) => {
							// uni.showToast({
							// 	title:`${prograss}%`,
							// 	icon:'loading'
							// })
							uni.showLoading({
								title: `${prograss}%`,
								icon: 'loading'
							})
						}).then(data => {
							this.form.avatar = data.data
							uni.hideLoading()
						}).catch(err => {
							this.$toast('哦豁，出错了请稍后重试' + err)
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
