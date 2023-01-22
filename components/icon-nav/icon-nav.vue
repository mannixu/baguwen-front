<template>
	<view class="flex flex-wrap pt-3">
		<view style="width: 25%;" v-for="(item,index) in list" :key="index" class="flex flex-column align-center py-1"
			hover-class="bg-light" @click="goDetail(item)">
			<image :src="item.src" mode="aspectFill" style="width: 70rpx;height: 70rpx;border-radius: 100%;"></image>
			<text class="mt-1 font-sm" style="color: #56636c;">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "icon-nav",
		props: {
			list: Array
		},
		mounted() {},
		methods: {
			goDetail(item) {
				console.log(item);
				if (item.type == 'webview') {
					this.$openWebview(item.url)
					return
				}
				switch (item.module) {
					case 'test':
						this.$navigateTo('/pages/test-list/test-list')
						break;
					case 'column':
					case 'flashsale':
					case 'group':
						this.$navigateTo('/pages/practice/practice')
						break;
					case 'live':
						this.$navigateTo('/pages/list/list?module=' + item.module)
						break;
					case "book":
						this.$navigateTo("/pages/my-book/my-book")
						break;
					default:
					this.$toast(item.name +'模块暂未开放')
						break;
				}
			}
		},
	}
</script>

<style lang="less">

</style>
