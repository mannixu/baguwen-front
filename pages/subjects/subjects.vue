<template>
    <view class="content">
        <block v-for="(item, index) in subjects" :key="index">
            <view class="item">
                <view class="pic">
                    <image :src="item.pic" style="width: 28px; height: 33px"></image>
                </view>
                <view class="subject">
                    <view class="name">{{ item.name }}</view>
                    <view class="desc">{{ item.desc }}</view>
                </view>
                <view class="btn">
                    <switch type="switch" :checked="item.status == '1'"  @change="switchChange(item.id,item.status)" />
                </view>
				
            </view>

            <view class="line"></view>
        </block>
    </view>
</template>

<script>
export default {
    data() {
        return {
            subjects: []
        };
    },
    onLoad: function () {
        this.onLoadClone3389();
    },
    methods: {
        onLoadClone3389: function () {
            // this.setData({
            //     subjects: uni.getStorageSync('subjects')
            // });
			this.subjects=uni.getStorageSync('subjects')
			console.log("subjects+xxxx"+this.subjects)
        },

        switchChange: function (id,status) {

            var subjects = uni.getStorageSync('subjects');//本地缓存获取数据
			
            var result = new Array();

            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].id == id) {
                    //获取被点击的组件修改它状态
                    if (status=='2') {
                        subjects[i].status = '1';
                    } else {
                        subjects[i].status = '2';
                    }
                }
				
                result.push(subjects[i]);
            } //放到本地缓存

            uni.setStorageSync('subjects', result);
            // this.setData({
            //     subjects: result
            // }); 
			this.subjects=result;

        }
    }
};
</script>
<style>
.item {
    display: flex;
    flex-direction: row;
    padding: 10px;
}
.pic {
    width: 10%;
}
.subject {
    width: 75%;
}
.btn {
    width: 15%;
}
.name {
    font-weight: bold;
}
.desc {
    font-size: 12px;
    margin-top: 10px;
    color: #666666;
}
.line {
    border: 1px dotted #cccccc;
}
</style>
