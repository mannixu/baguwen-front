<template>
	<view class="p-3">
		<view class="flex bg-white shadow rounded">
			<view v-for="(item,index) in iconList" :key="index" class="flex-1 flex flex-column align-center justify-center py-3" hover-class="bg-light" @click="open(item)">
				<text class="iconfont" :class="item.icon" style="font-size: 20px;color: #febd00;"></text>
				<text class="font-sm mt-1 text-secondary">{{item.text}}</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name:"icons-card",
		props: {
			iconList: Array,
		},
		methods:{
			open(item){
				console.log(item,'item');
				if(!item.path){
					this.$toast('该功能暂未开放')
					return
				}
				if(item.type === 'switchTab') {
					console.log(122123);
					uni.switchTab({
						url:item.path
					})
				} else{
					this.$authJump(item.path)
				}
				
			}
		}
	}
</script>

<style>
// 导入图标css
	@import url('@/common/iconfont.css');
</style>
