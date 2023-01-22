<template>
	<view class="scroll-row-item course" :class="'course-'+ type" @click="goDetail(item)">
		<!-- 图文部分 -->
		<view class="position-relative">
			<image v-if="item.cover == 'null'" src="/static/c1.png" class="d-block"></image>
			<image v-else :src="item.cover" class="d-block"></image>
			<view class="font-sm text-white bg-secondary px-1">{{item.type | formatType}}</view>
		</view>
		<view class="last-child flex flex-column flex-shrink">
			<text class="text-ellipsis font-md">{{item.title}}</text>
			<slot name="desc">
				<view v-if="item.try" class="font-small text-light-muted my-auto " v-html="item.try"></view>
			</slot>
			<view class="flex flex-1 align-end">
				<!--  flex-column -->
				<slot>
					<!-- 插槽有内容就会替换slot内的元素内容，没有则显示 -->
					<text class="text-danger font" v-if="tag" style="min-width: 120rpx;">{{tag}}：</text>
					<text class="flex flex-nowrap align-end">
						<text class="text-danger font" v-if="item.price == 0">免费</text>
						<text class="text-danger font" v-else>￥{{item.price}}</text>
						<text class="text-light-muted font-sm" v-if="item.t_price">￥{{item.t_price}}</text>
					</text>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	const coverType = {
		media: '图文',
		video: '视频',
		audio: '音频',
		column: '专栏'
	}
	export default {
		name:"course-list",
		props: {
			item: Object,
			type: {
				type: String,
				default: 'two'
			},
			tag: {
				type: String,
				default: ''
			},
			disable:false
		},
		filters: {
			formatType(type) {
				return coverType[type]
			}
		},
		methods: {
			goDetail(item) {
				if(this.disable) return
				console.log(item, 'item');
				let params = `id=${item.id}`
				if (this.item.group_id) {
					params += `&group_id=${this.item.group_id}`
				}
				if(this.item.flashsale_id) {
					params+=`&flashsale_id=${this.item.flashsale_id}`
				}
				
				let url = '/pages/course/course?' + params
				if (!item.type || item.type === 'column') {
					url = '/pages/column/column?' + params
				}
				if(item.type === 'live') {
					url = `/pages/live/live?id=${item.id}`
				}
				this.$navigateTo(url)
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="less">
/* scroll-row-item{ display: inline-block!important; }
	block  块级元素特点：
	1、每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）
	2、元素的高度、宽度、行高以及顶和底边距都可设置。
	3、元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。
    inline  内联元素特点：
    1、和其他元素都在一行上；
    2、元素的高度、宽度及顶部和底部边距不可设置；
    3、元素的宽度就是它包含的文字或图片的宽度，不可改变。
	inline-block
	内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点。
	inline-block 元素特点：
	1、和其他元素都在一行上；
	2、元素的高度、宽度、行高以及顶和底边距都可设置。
	
	.course {
		view:first-child { course下的第一个view
		
		flex-shrink"
		在给他子元素不加flex-shrink且父盒子中不加flex-wrap=“wrap”的情况下，超出父盒子的宽度，父盒子会自动压缩子盒子的宽度。
		当给子盒子加上flex-shrink: 0，子盒子不会被压缩宽度；
 */
	.course {
		view:first-child {
			view {
				position: absolute;  //定位
				right: 10rpx;
				bottom: 10rpx;
				background-color: rgba(0, 0, 0, .4);
			}
		}
	}
	
	.course-two {
		width: 340rpx;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	
		view {
	
			&:first-child,
			image {
				width: 340rpx;
				height: 180rpx;
				margin-right: 20rpx;
			}
	
			.last-child {
				text {
					margin-top: 10rpx;
				}
			}
		}
	}
	
	.course-one {
		display: flex !important;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	
		.last-child {
			width: 340rpx;
			height: 180rpx;
		}
	
		view {
	
			&:first-child,
			image {
				width: 340rpx;
				height: 180rpx;
				flex-shrink: 1;
				margin-right: 20rpx;
			}
	
			.last-child {
				width: 340rpx;
				height: 180rpx;
			}
		}
	}
</style>