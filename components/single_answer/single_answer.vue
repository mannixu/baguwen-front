<template>  <!-- 选择题组件 -->
  <view>
	<view class="stage">
	    <view class="name">{{ item.chapterTitle }}</view>
	    <view class="count">
	        <!-- 当前题目数/题目总数 -->
	        <text class="currentTab">{{ currentTab + 1 }}</text>
	        /{{ topicTotal }}
	    </view>
	</view>
	
	<view class="line"></view>
	
	<view class="subject">
	    <view class="subjectName">
	        <text class="year">(2014抚州)</text>
	        {{ item.topicName }}
	        <!-- 题目名 -->
	    </view>
	    <view class="desc">
	        <!-- 在王安石纪念馆参观时，一男游客和一女游客就王安石到底是临川人还是东乡人争得不可开交。 -->
	    </view>
	    <view class="items">
	       
	            <!-- 类型为选择题才进行遍历 -->
	            <radio-group :name="'radio' + currentTab" v-if="radiosflag">
	                <view class="item" v-for="(topicItem, idx) in item.listError" :key="idx">
	                    <!-- 遍历选择答案 -->
	
	                    <view class="left" @tap="truntopic" :data-num1="currentTab + 1 + '_' + idx">
	                        <label><radio class="trueselect" :value="topicItem" color="#0099FF" /></label>
	                        <!-- disabled={{index+'_'+idx==x[index][idx].name&&x[index][idx].vale?ture:false}} -->
	                    </view>
	
	                    <view class="result">{{ topicItem }}</view>
	                </view>
	            </radio-group>
	
	            <!-- 用于展示解答结果 -->
	            <block v-if="!radiosflag">
	                <view class="item" v-for="(topicItem, idx) in item.listError" :key="idx">
	                    <!-- 遍历选择答案 -->
	
	                    <view class="" >
	                        <label>
	                            <radio
	                                class="trueselect"
	                                :value="topicItem"
	                                :checked="topicItem == item.listTrue[0] || selectflag[currentTab] == idx"
	                                :color="topicItem == item.listTrue[0] ? '#0099FF' : '#FE5A59'"
	                                :disabled="topicItem == item.listTrue[0] ? '' : '' || selectflag[currentTab] == idx ? false : true"
	                            />
								
	                        </label>
	                        <!-- clour={{topicItem==item.listTrue?blue:red}} 显示radio颜色 正确答案显示蓝色非正确显示红色 -->
	                        <!-- disabled={{topicItem==item.listTrue?blue:red||selectflag[index]==idx?false:true}}  radiio是否可用 正确答案 和我选择答案不会被设置不可用selectflag[index]存放我选择答案位置 -->
	                    </view>
	
	                    <!-- 答案值 -->
	
	                    <view class="result">{{ topicItem }}</view>
	                </view>
	                <!-- 显示回答正确错误 -->
	                <view>
	                    <label v-if="results[currentTab]">回答正确</label>
	                    <label v-if="!results[currentTab]" class="writererror">回答错误</label>
	                </view>
	
	                <!-- 显示你的答案与正确答案  回答正确只显示正确答案-->
	                <view v-if="!results[currentTab]">
	                    <label class="left">你的答案：</label>
	                    <text>{{ item.listError[selectflag[currentTab]] }}</text>
	                </view>
	                <view>
	                    <label>正确答案：</label>
	                    <text>{{ item.listTrue }}</text>
	                </view>
	                <!-- 显示解析 -->
	                <view>
	                    <label>解析:</label>
	
	                    <text>
	                        {{ item.answer == null ? '没有解析' : item.answer }}
	                    </text>
	                </view>
	            </block>
	        
	        <!-- 上面用于展示选择题答案与正确答案 -->

	    </view>
	</view>
  </view>
</template>

<script>
	export default {
		name:"single_answer",
		props: {
		  // 父组件传入的 题目数据 (父组件传递的数据不应该在子组件修改 可以通过在data设置个变量 把父组件传过来值赋给变量 然后修改变量)
		  item: {
		    type: Object,
		    default: () => {
		      return {};
		    }
		  },
		  //当前页index 也表示第几题
		  currentTab: {
		    type: Number,
		    default: 0
		  },
		  //题目是否提交
		  radiosflag: {
		    type: Boolean,
		    default: true
		  },
		  
		  //总题目数
		  topicTotal: {
		    type: Number,
		    default: 0
		  },
		  // 存放你选择答案集合
		  selectflag: {
		    type: Array,
		    default: () => {
		      return [];
		    }
		  },
		  
		  // 存放回答正确或失败集合 用于展示回答结果
		  results: {
		    type: Array,
		    default: () => {
		      return [];
		    }
		  },
		  
		  
		  
		},
		created() {
			console.log("123")
			console.log(this.item)
		},
		data() {
			return {
				
			};
		},
		methods: {
			//redio单选框被点击
			truntopic: function (e) {
			     this.$emit('truntopic', e);
			},
		}
	}
</script>

<style lang="scss" scoped>
.content {
    font-family: 'Microsoft YaHei';
}
.stage {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.name {
    font-size: 16px;
    width: 90%;
}
.count {
    width: 10%;
    font-size: 13px;
}
.currentTab {
    font-size: 20px;
    color: #0099ff;
    font-weight: bold;
}
.line {
    border: 1px solid #cccccc;
    opacity: 0.2;
}
.subject {
    padding: 10px;
    /* position: relative; */
}
.subjectName {
    font-size: 16px;
}
.year {
    color: #0099ff;
}
.desc {
    margin-top: 10px;
    font-size: 16px;
}
.items {
    margin-top: 10px;
}
.item {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 20px;
}

.left {
    width: 10%;
}
.result {
    font-size: 16px;
    line-height: 30px;
}
.writererror {
    color: #fe5a59;
}
.high {
}
//重构radio的样式 

// .uni-radio-input.uni-radio-input-checked{
//     background-color: gray!important;
//     border-color: gray!important;
// 	background-clip: content-box!important;
// 	padding: 7rpx!important;
// 	box-sizing: border-box;
// 	&:before{
// 	    display: none !important;
// 	}
// }
</style>