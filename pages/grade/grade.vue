<template>
    <view>
        <view class="menu">
            <view :class="currentTab == 0 ? 'select' : 'default'" data-current="0" @tap="switchNav">学习</view>
            <view :class="currentTab == 1 ? 'select' : 'default'" data-current="1" @tap="switchNav">练习</view>
        </view>
        <view class="content">
            <view class="hr"></view>
            <swiper :current="currentTab" style="height: 800px">
                <swiper-item>
                    <!-- parse <include src="tb.wxml"/> -->
                    <view class="title">当前教材：{{ subjectName }}</view>
					
                    <block v-for="(item, index) in chapter.data" :key="index">
                        <view class="item">
                            <view class="name">{{ item.title }}</view>
                            <view class="opr">
                                <image src="/static/images/icon/xia.jpg" style="width: 17px; height: 11px"></image>
                            </view>
                        </view>

                        <view class="line"></view>
                    </block>
                   
                </swiper-item>
                <swiper-item>
                    <!-- parse <include src="zk.wxml"/> -->
                    <view class="scoreInfo">
                        <view class="forecast">预测分</view>
                        <view class="score">?</view>
                        <view class="unit">分/120分</view>
                    </view>
                    <view class="title">
                        {{ subjectName }}
                    </view>
                    <block v-for="(item, idx) in chapter.data" :key="idx">
						
                        <chapterList 
						:item="item"
                        :imagflag="imag[idx]"
						:idx="idx"
						@changedata="changedata"
						@edit="edit"
                        >
                        </chapterList>

                        <!-- 小节部分 -->
						
                        <block v-if="imag[idx] " v-for="(item2, index) in unit[idx]" :key="index">
                            
                               <chapterList
                               :item="item2"
                               :imagflag="imag[idx]"
                               :idx="idx"
							   :isunit="true"
							   @edit="edit"
                               >
                               </chapterList>
                           
                        </block>
                    </block>

                   
                   <view class="line"></view>
                    
                    <view class="line"></view>
                    <view class="hr"></view>
                  
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 0,
            subjectName: '',
            chapter: [],

            //存放章节数据data
            unit: [],

            //二维数组存放多个章节的多个小节数据data
            unitid: '',

            //小节所属章节   解决bug章节打开状态都有相同数据
            // unitflag: [],

            //是否展示小节
            num: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '其他'],

            img: {
                //动态图片
                close: '/static/images/icon/shousuo.jpg',
                open: '/static/images/icon/zhankai.jpg'
            },

            //每个章节是开是关
            imag: [],

            
            data: []
        };
    },
    onLoad: function (e) {
        //获取首页传过来科目名
        var subjectName = e.subjectName;
        uni.setNavigationBarTitle({
            title: subjectName
        });
		this.subjectName=subjectName
        this.getData()
        
    },
	watch:{
		
	},
	
    methods: {
		getData(){
			let that=this
			uni.request({
			    method: 'get',
			    //依据接口情况
			    url: 'http://43.139.60.104:8080/baguwen/chapter/findCapterByCourse',
			    //微信小程序必须是https:
			    data: {
			        courseTitle: this.subjectName
			    },
			    header: {
			        'content-type': 'application/json' // 默认值
			    },
			
			    success(res) {
			        // console.log(res)
			        // that.setData({
			        //     chapter: res.data,
			        //     subjetcName: subjetcName //传过来科目名放到data中
			        // });
					
					that.chapter=res.data;
			    },
			
			    fail(err) {
			        // console.log(err)
			    }
			});
		},
		
        changedata(e) {
			console.log("被点击")
            var that = this;
            let index = 0; 

            let array = this.chapter.data; //获取循环数组对象


            let imag = this.imag; //存放展示+或-图标的变量

            let n = e.currentTarget.dataset.nums; //获取传递参数

            let twunit = this.unit; //获取存放小节的二维数组 用于下面设置值

            for (var i = 0; i < array.length; ++i) {
                
                let a = array[i].id;
				//如果当前点击的对象id和循环对象里的id一致
                if (a == n) {
                    //设置小节状态图片打开或关闭
                    if (imag[i] == false || imag[i] == undefined) {
						 this.$set(this.imag, i, true)
                    } else {
						this.$set(this.imag, i, false)
                    } //设置小节打开关闭

                   
                }

                index++;
            } 

           
            if (imag[n - 1]) {
                //在关闭状态 点击发送请求
                uni.request({
                    method: 'get',
                    //依据接口情况
                    url: 'http://127.0.0.1:8080/baguwen/unit/findUnitByChapterTitle',
                    //微信小程序必须是https:
                    data: {
                        chapterName: e.currentTarget.dataset.titles
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
					
                    success(res) {
                        //给数组一维下标n赋值一个数组
                        twunit[n - 1] = res.data; //n为章节id 要减一为下标

                       
					
						console.log(n-1)
						console.log("preunit"+that.unit)
						that.$set(that.unit,n - 1 , res.data.data)
						console.log("unit"+that.unit)
						console.log(res)
						console.log(res.data)
						console.log(res.data.data)
                    },

                    fail(err) {
                        // console.log(err)
                    }
                });
            }
        },

        switchNav: function (e) {
            var that = this;
            var index = e.target.dataset.current;

            if (this.currentTab == index) {
                return false;
            } else {
                // that.setData({
                //     currentTab: index
                // });
				this.currentTab=index
            }
        },

        edit(e) {
            // console.log(e)
			console.log("被点击")
            let title = e.currentTarget.dataset.chaptername; //传参在e里 参数名都改为小写
            let type = e.currentTarget.dataset.type; 
			let chapterName=''
			let unitName=''


            if (type == 'unit') {
                
				unitName=title
            }else{
				
				chapterName = title;
			}

           
		   

            uni.navigateTo({
                url: '../base/base?chapterName=' + chapterName + '&unitName=' + unitName
            });
        },

        changeData() {
            console.log('占位：函数 changeData 未声明');
        }
    }
};
</script>
<style>
.menu {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #0099ff;
    height: 40px;
}
.select {
    font-size: 12px;
    color: #0099ff;
    width: 50%;
    background-color: #ffffff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ffffff;
    border-radius: 3px;
}
.default {
    width: 50%;
    font-size: 12px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 3px;
}
.content {
    background-color: #f0eff4;
    height: 600px;
    font-family: 'Microsoft YaHei';
}
.title {
    margin: 10px;
    font-size: 16px;
}
.item {
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    padding: 10px;
    align-items: center;
}
.name {
    width: 90%;
    font-size: 16px;
}
.opr {
    width: 10%;
    text-align: center;
}
.line {
    border: 1px solid #cccccc;
    opacity: 0.2;
}
.scoreInfo {
    background-color: #ffffff;
    height: 140px;
}
.forecast {
    font-size: 13px;
    padding: 10px;
}
.score {
    font-size: 50px;
    text-align: center;
    color: #0099ff;
}
.unit {
    text-align: right;
    margin-right: 10px;
    font-size: 15px;
}
.pic {
    width: 10%;
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
.desc {
    font-size: 11px;
    color: #999999;
}
.hr {
    height: 20px;
}
</style>
