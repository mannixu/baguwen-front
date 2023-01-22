<template>
	<view>
		<view class="blank-line" />
		<view class="p-2">
			<text class="font-md font-weight-bold">
				{{type === 'group' ?'拼团' :'秒杀'}}
			</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-row mt-1">
			<course-list v-for="(item,index) in list" :key="index" :item="item"></course-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "active-list",
		props: {
			type: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				list: []
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				let type = this.type === 'group' ?'getGroupList' :'getFlashsaleList'  //根据传递过来是拼团还是秒杀 调用不同接口
				this.$api[type]({
					page: 1,
					usable: 1
				}).then(data => {
					this.list = data.rows
				})
			}
		},
	}
</script>

<style>

</style>
