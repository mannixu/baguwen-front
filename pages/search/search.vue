<template>
	<view>
		<!-- #ifdef MP -->
		<search-bar v-model="searchValue" @confirm="handleSearchEvent()"></search-bar>
		<!-- #endif -->
		<view class="p-2 flex justify-between align-center"  v-if="list.length">
			<text class="font-md font-weight-bold">历史记录</text>
			<text class="font-sm text-secondary" @click="clearHistory">清除全部</text>
		</view>
		<view class="flex flex-wrap p-2">
			<view v-for="(item,index) in list" :key="index" class="border font-sm mr-2 mb-2 p-2"
				style="border-radius: 4rpx;background-color: #f8f8f8;" @click="goResult(index)">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				searchValue: ''
			}
		},
		onNavigationBarSearchInputChanged(e) {//搜索框输入事件
			this.searchValue = e.text
		},
		onNavigationBarButtonTap() {//搜索按钮点击啥时间
			this.handleSearchEvent(this.searchValue)
		},
		onNavigationBarSearchInputConfirmed() {  //手机端键盘 事件
			this.handleSearchEvent(this.searchValue)
		},
		onLoad() {
			const list = uni.getStorageSync('searchHistory')
			if (list) {
				this.list = JSON.parse(list)
			}
			console.log(this.list,'list');
		},
		methods: {
			goResult(index) {
				this.$navigateTo(`/pages/search-result/search-result?value=${this.list[index]}`)
			},
			handleSearchEvent(v) {
				if (!v) return this.$toast('请输入关键词')//为空提示输入关键词
				const findItem = this.list.findIndex(item => item === v)//非空获取索引
				if (findItem !== -1 && findItem !== 0) {//索引合法 且不是第一个
					this.list.splice(findItem, 1)//splice() 方法用于添加或删除数组中的元素。第二个位删除元素个数 第一个为索引
					this.list.unshift(v)//方法将新项添加到数组的开头，并返回新的长度
				} else {
					this.list.unshift(v)
				}
				uni.setStorageSync('searchHistory', JSON.stringify(this.list))//保存到本地
				this.$navigateTo(`/pages/search-result/search-result?value=${v}`)
			},
			clearHistory() {
				uni.showModal({
					content: '是否确认清除历史记录',
					success: (res)=> {
						if (res.confirm) {
							uni.removeStorageSync('searchHistory')
							this.list =[]
						} else if (res.cancel) {

						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
