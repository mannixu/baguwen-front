<template>
	<view>
		<view style="background-color:#FFFFFF ;color:#928e8a ; border-radius: 30rpx; padding-top: 6rpx; padding-bottom: 6rpx;" class=" mx-1  flex justify-center align-center " @click="goSearch">
			<uni-icons color="#707070 " type="search" size="20"></uni-icons>
			<text class="ml-2">请输入搜索内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"f-search-bar",
		data() {
			return {
				
			};
		},
		methods: {
			goSearch() {
				this.$navigateTo('/pages/search/search')
			}
		}
	}
</script>

<style>

</style>