<template>
    <view class="content">
        <!-- <view>
    <image src="/images/icon/bg.jpg" style="width:100%;height:184px;"></image>
  </view> -->

        <!-- 首页轮播图 -->
		<view style="width: 750rpx; background-color: red;" >
			<swiper :indicator-dots="indicatorDots"  :autoplay="autoplay" :interval="interval" :duration="duration">
				<block v-for="(item, index) in imag" :key="index">
					<swiper-item>
						<!-- <view class="swiper-item {{item}}"></view> -->
						<image :src="item" style="width: 100%;"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>

        <view class="account">
            <view>
                <image src="/static/images/icon/head.jpg" style="width: 29px; height: 29px"></image>
            </view>
            <view>
                {{ userInfo.name }}
            </view>
            <view class="count">累计答{{ userInfo.number != null ? userInfo.number : 0 }}道</view>
        </view>
        <view class="line"></view>
        <view class="items">
            <block v-for="(item, index) in subjects" :key="index">
                <view class="item" @tap="seeSubject" :id="item.name">
                    <image :src="item.pic" :id="item.name" style="width: 20px; height: 22px"></image>
                    {{ item.name }}
                </view>
            </block>
            <view class="item" @tap="more">
                <image src="/static/images/subject/gengduo.jpg" style="width: 20px; height: 22px"></image>
                更多
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            userInfo: {
                name: '',
                number: ''
            },
            subjects: [],
            imag: ['/static/images/pract/bgw1.jpeg', '/static/images/pract/bgw2.jpeg', '/static/images/pract/bgw3.jpeg'],
            indicatorDots: true,
            vertical: false,
            autoplay: true,
            interval: 2000,
            duration: 500
        };
    },
    onShow: function () {
        //onload  页面加载只调用一次  onshow每次跳到页面都会调用
        var that = this; // app.getUserInfo(function(userInfo){

        let user = app.globalData.userInfo; //从app获取用户

		if(user!=null){
			// that.setData({
			//     userInfo: user
			// }); 
			this.userInfo=user
		}
       

        this.loadSubjects();
    },
	
    methods: {
        loadSubjects: function () {
            var subjects = uni.getStorageSync('subjects');
            var result = new Array();
            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].status == '1') {
                    result.push(subjects[i]);
                }
            }

			this.subjects=result;
            // this.setData({
            //     subjects: result
            // });
        },

        more: function () {
            uni.navigateTo({
                url: '../subjects/subjects'
            });
        },

        seeSubject: function (e) {
            var name = e.target.id;
            uni.navigateTo({
                url: '../grade/grade?subjectName=' + name
            });
        }
    }
};
</script>
<style>
.content {
    font-family: 'Microsoft YaHei';
}
.account {
    display: flex;
    flex-direction: row;
    padding: 10px;
    font-size: 16px;
}
.account view {
    margin-right: 10px;
}
.count {
    color: #0099ff;
}
.line {
    border: 1px solid #cccccc;
    opacity: 0.2;
}
.items {
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 13px;
}
.item {
    width: 30%;
    float: left;
    margin-bottom: 50px;
}
</style>
