<template>
	
		<view class="item">
			
		    <view class="pic">
		        <image
		            :src="isunit  ? img.unit : (imagflag? img.open : img.close)"
		            @tap="changedata"
		            :data-nums="idx + 1"
		            :data-titles="item.title"
		            style="width: 15px; height: 15px"
		        ></image>
		    </view>
			
				<view class="stage flex flex-column  " style="margin-left: 10rpx; " >
					<view class="stageName">
						<text v-if="!isunit" style="margin-right: 10rpx;">第{{ idx+1 | formatType }}部分 </text>
						<text >{{ !isunit?item.title:item.unitName }}</text>
					 </view>
					<view>
						<image src="/static/images/icon/level.jpg" style="width: 97px; height: 15px"></image>
					</view>
				</view>
				<view class="edit" @tap="edit" :data-type="isunit?'unit':'chapter'" :data-chapterName="!isunit?item.title:item.unitName">
					<image src="/static/images/icon/edit.jpg" style="width: 21px; height: 20px"></image>
				</view>
			
		</view>
</template>

<script>
	export default {
		
		name:"chapterList",
		props: {
			imagflag: {
				type: Boolean,
				default: false
			},
			isunit: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: ''
			},
			idx: {
				type: Number,
				default: ''
			}
		},
		filters: {
			formatType(type) {
				let o = {
					0:"",
					1:"一",
					2:"二",
					3:"三",
					4:"四",
					5:"五",
					6:"六",
					7:"七",
					8:"八",
					9:"九",
					10:"十"
				}
				if(type>10&&type<20){
					let y=type%10
					
					return "十"+o[y]
				}else if(type>=20){
					let x=parseInt(type/10)
					let y=type%10
					
					return o[x]+"十"+o[y]
				}
				return o[type];
			}
		},
		data() {
			return {
				img: {
				    //动态图片
				    close: '/static/images/icon/shousuo.jpg',
				    open: '/static/images/icon/zhankai.jpg',
					unit: '/static/images/icon/unit.png'
				},
			};
		},
		created() {
			
		},
		methods: {
			changedata(e) {
				this.$emit("changedata",e)
			},
			 edit (e) {
				 console.log("edit被点击")
				 this.$emit("edit",e)
			}
		}
	}
</script>

<style>
.item {
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    padding: 10px;
    align-items: center;
}
.stage {
    width: 80%;
}
.stageName {
    font-size: 16px;
    margin-bottom: 10px;
}
.edit {
    width: 10%;
    text-align: center;
}
.pic {
    width: 10%;
}
</style>