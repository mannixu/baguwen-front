<template>
	<view class="subject" v-if="topic != ''">
	              <!-- 让他先显示题目 题目不空再显示最后一页 -->
	              <view class="fillBlanks">
	                  <text v-if="chapterName!=''">{{ chapterName }}</text>
	                  <text v-if="unitName!=''">{{ unitName }}</text>
								
	
	                  <view class="itemnum">
	                      <!-- 汇总页面 -->
	                      <block v-for="(item, numindex) in topic" :key="numindex">
	                          <!-- flase代表空显示红色num0  true代表不空显示蓝色 -->
	
	                          <view :class="!results[numindex] ? 'num0' : 'num1'" @tap="truntopic" :data-num1="numindex + '_a'">{{ numindex + 1 }}</view>
	
	                          <!-- _2没作用与前面选择答案传的保持一致 防止报错 -->
	                      </block>
	                      
	                  </view>
	
	                  <!-- //不提交展示 -->
	                  <button class="submit" v-if="radiosflag" @tap="submit" form-type="button">提交并查看结果</button>
	                  <!-- 提交后展示 -->
	                  <button class="submit" v-if="!radiosflag" @tap="doagagin" form-type="button">继续练习</button>
	              </view>
	          </view>
</template>

<script>
	export default {
		name:"answer_sheet",
		props: {
		  // 父组件传入的 题目数据 (父组件传递的数据不应该在子组件修改 可以通过在data设置个变量 把父组件传过来值赋给变量 然后修改变量)
		  
			  //章节名
			  chapterName: {
			    type: String,
			    default: ''
			  },
			  //小节名
			  unitName: {
			    type: String,
			    default: ''
			  },
		   
		  
		  //答题结果
		  topic: {
		    type: Array,
		    default: () => {
		      return [];
		    }
		  },
		  
		  //是否提交
		  radiosflag: {
		    type: Boolean,
		    default: true
		  },
		  results: {
		    type: Array,
		    default: () => {
		      return [];
		    }
		  },
		   
		},
		
		
		data() {
			return {
				
			};
		},
		
		methods:{
			truntopic: function (e) {
			     this.$emit('truntopic', e);
			},
			submit(event) {
				this.$emit('submit', event);
				
			},
			doagagin() {
			    this.$emit('doagagin');
				console.log("被点击")
			}
		},
		
		
	}
</script>

<style lang="scss" scoped>
.subject {
    padding: 10px;
    /* position: relative; */
}
.fillBlanks {
    font-size: 16px;
}
.itemnum {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 1px;
}
.submit {
    color: #ffffff;
    background-color: #0099ff;
    margin-top: 360px;
}
.num1 {
    color: #ffffff;
    border: 1px solid #0099ff;
    background-color: #0099ff;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-right: 10px;
}
.num0 {
    color: #ffffff;
    border: 1px solid #fe5a59;
    background-color: #fe5a59;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-right: 10px;
}
</style>