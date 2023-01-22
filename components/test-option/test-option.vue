<template>
	<view class="mt-2">
		<view class="border flex p-2 font" :class="checked ? ' border-main text-main':''" @click="$emit('click',index)">
			<view class="mr-1">{{index | formatIndex}}</view>
			<view>
				<mp-html :content="label"></mp-html>
			</view>
		</view>
	</view>
</template>

<script>
	const en = {
		0: 'A',
		1: 'B',
		2: 'C',
		3: 'D',
		4: 'F',
		5: 'G'
	}
	export default {
		name: "test-option",
		filters: {
			formatIndex(index) {
				return en[index];
			}
		},
		props: {
			index: {
				type: Number,
				default: 0
			},
			label: {
				type: String,
				default: ''
			},
			checked: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
