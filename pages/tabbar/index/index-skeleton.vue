<template>
	<view>
		<!-- 骨架屏   新页面在index引入 数据没加载到显示此页面更加友好-->
		<!-- banner&search -->
		<view class="px-2">
			<skeleton width="710" height="75"></skeleton>
			<skeleton width="710" height="300" oClass="mt-2"></skeleton>
		</view>
		<!-- icons -->
		<view class="flex flex-wrap p-2">
			<view class="flex flex-column justify-center align-center mt-3" style="width: 25%;" v-for="i in 8" :key="i">
				<skeleton width="70" height="70" :circular="true"></skeleton>
				<skeleton width="60" height="25" oClass="mt-2"></skeleton>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="mt-3 flex justify-center">
			<skeleton width="350" height="135" oClass="mr-2"></skeleton>
			<skeleton width="350" height="135"></skeleton>
		</view>
		<!-- 拼团 -->
		<view class="p-2 pt-4">
			<skeleton width="126" height="36"></skeleton>
			<view class="flex flex-nowrap mt-2">
				<skeleton width="300" height="175"></skeleton>
				<view class="ml-2">
					<skeleton width="367" height="31" oClass="mt-1"></skeleton>
					<skeleton width="130" height="31" oClass="mt-2"></skeleton>
					<skeleton width="150" height="31" oClass="mt-5"></skeleton>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
