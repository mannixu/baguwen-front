<template>   <!-- 填空题组件 -->
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
			 <view class="items">

	
	        <!-- <button bindtap="truntopic" data-num1="5">xxx</button> -->
	        <!-- 显示填空题 -->
	        
	            <view class="item" v-for="(item0, idx) in item.listTrue" :key="idx">
	                <view>答案{{ idx + 1 }}：</view>
	
	               <input
	                    :disabled="!radiosflag ? true : false"
	                    :value="values[idx]"
	                    :name="'topic' + currentTab + '_input' + idx"
	                    :data-num2="currentTab + '_' + idx"
	                    @blur="bloselur"
	                    @input="bindKeyInput"
	                    :placeholder="!radiosflag ? values[idx] : '请输入答案' + (idx + 1)"
	                />
	            </view>
	            <label>你的答案：</label>
	            <text>\n</text>
	            <text>\n</text>
	            <!-- 遍历你的答案 -->
	            <block   v-for="(item1, inputindex) in item.listTrue" :key="inputindex+'b'">
	                <view>
	                    <label>答案{{ inputindex + 1 }}：</label>
	                   {{ values[inputindex] }}
					   
	                </view>
	            </block>
				<text>\n</text>
	            <!-- 填空回答情况 -->
				
	            
	
	            <block v-if="!radiosflag">
					<view>
					    <label v-if="results[currentTab] && !radiosflag">回答正确</label>
					    <label v-if="!results[currentTab] && !radiosflag" class="writererror">回答错误</label>
					</view>
	                <label>正确答案</label>
	                <view v-for="(item2, inputindex2) in item.listTrue" :key="inputindex2+'c'">
	                    <view>
	                        <label>答案{{ inputindex2 + 1 }}：</label>
	                        {{ item2 }}
	                    </view>
	                </view>
	           
	
	            <!-- 显示填空解析 -->
	            <view>
	                <label>解析:</label>
	
	                <text>
	                    {{ item.answer == null ? '没有解析' : item.answer }}
	                </text>
	            </view>
				</block>
	        
	        <!-- 上面显示填空题 -->				 
			 </view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"fill_answers",
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
		  
		  // 输入的内容
		  // value 名称不可修改，与 $emit('input') 事件对应
		   value: {
		     type: Array,
		     
		   },
		  
		  // 存放回答正确或失败集合 用于展示回答结果
		  results: {
		    type: Array,
		    default: () => {
		      return [];
		    }
		  },
		  
		  
		  
		},
		
		data() {
			return {
				//inputtwo是个二维数组  二维数组每一行是一道填空题各个答案
			values:[]
				
				
			};
		},
		
		// watch: {
		//   // 侦听数据的变化
		//   value: {
		//     handler(val) { //(发生变化时回调方法)
		//       this.values = val;
		//       console.log(this.values)
		//     },
		//     // 该回调将会在侦听开始之后被立即调用
		//     immediate: true
		//   },
		  
		// },
		
			
		
		methods: {
			//输入框失去焦点事件  主要判断此道填空是否回答
			bloselur: function (e) {
			    this.$emit('bloselur', e);
			},
			bindKeyInput: function (e) {
				
				let tiid = e.currentTarget.dataset.num2.charAt(2); //问题id
				this.$set(this.values, tiid, e.detail.value);
				
				console.log(this.values)
				// input 的事件名称不可修改，与 props 中的 value 对应
				// 当同时存在：
				// props -> value
				// $emit('input', val)
				// 时，在组件外可以使用 v-model 完成双向数据绑定。
				// 即：用户输入内容时，父组件传递过来的 value 同步发生变化
				// 详细见 vue 中 v-model 指令：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
				this.$emit('bindKeyInput', e);
			},
		}
	}
</script>

<style lang="scss" scoped>
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
.writererror {
    color: #fe5a59;
}
.high {
}
</style>