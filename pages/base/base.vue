<template>
	<view class="content" >
		
	    <!-- swiper 想要点击切换加上current 想要获取当前页e.detail.current -->
	    <swiper style="height: 800px"  :current="currentTab"  @change="changeContent">
	        
	            <!-- 这个函数作用就是改变currentable的值 滑动加不加都可以滑动 -->
	            <swiper-item v-for="(item, index) in topic" :key="index">
					 <block v-if="item.type == 1">
						 <single_answer
						 :item="item"
						 :currentTab="currentTab"
						 :radiosflag="radiosflag"
						 :topicTotal="topic.length"
						 :selectflag="selectflag"
						 :results="results"
						 @truntopic="truntopic"
						 >
							 
						 </single_answer>
						
					 </block>
					 <block v-if="item.type == 2">
					 	<fill_answers
					 	:item="item"
					 	:currentTab="currentTab"
					 	:radiosflag="radiosflag"
					 	:topicTotal="topic.length"
					 	:value="inputtwo"
					 	:results="results"
					 	@bloselur="bloselur"
					 	@bindKeyInput="bindKeyInput"
					 	@truntopic="truntopic"
					 	>
					 						 							 
					 	</fill_answers>
					 						
					 </block>
					
				</swiper-item>
				<swiper-item >
					<answer_sheet
					:chapterName="chapterName"
					:unitName="unitName"
					:radiosflag="radiosflag"
					:topic="topic"
					:results="results"
					@submit="submitData"
					@truntopic="truntopic"
					@doagagin="doagagin"
					>
						
					</answer_sheet>
				</swiper-item>
			
		</swiper>
		
	</view>
</template>

<script>
	import { getTopicList } from 'api/base';
	
	export default {
		data() {
			return {
				topic:[],  //题目集合
				chapterName: '',  //章节名
				unitName: '',   //小节名
				currentTab: 0 , //swiper-item当前页
				radiosflag: true ,  //题目是否提交
				results: [],//题目未提交是题目是否回答，提交题目回答结果true false
				selectflag: [], // 我选的答案的顺序集合 是每个选择题 我选择的答案的顺序结合如 第一题选c 第二题选b 集合为[3,2]
				fillvalue:[] ,  // 用于判断题目的每个填空是否都有值的集合 fillvalue
				inputtwo: [],  //inputtwo是个二维数组  二维数组每一行是一道填空题各个答案
				
				
			};
		},
	
	
	created() {
	   
	   
	},
	onLoad(options) {
	  this.chapterName=options.chapterName;
	  this.unitName=options.unitName;
	  this.getTopicList();
	},
	// 定义方法
	methods: {
		/**
		 * 获取题目集合
		 */
		async getTopicList() {
		  // uniapp 支持 async await
		  const { data: res } = await getTopicList({
			  chapterTitle: this.chapterName,
			  unitName: this.unitName
		  });
		  this.topic=res;
		},
		/**
		 * 页面滑动事件
		 */
		changeContent: function (e) {
		    var current = e.detail.current;  //获取当前页
		    this.currentTab=current;
		},
		
		//redio单选框被点击
		truntopic: function (e) {
		    //选择题的点击事件  跳转下一页与设置选择题有值
		    var that = this; //获取参数跳转那一页
		
		    let renum1 = e.currentTarget.dataset.num1; //1_2 传过来第一题第二个答案
		
		    let num1 = renum1.charAt(0); //获取第几题
		
		    let seleid = renum1.charAt(2); //表示第几个答案 用于展示那个是我选的
		
			if (seleid=='a') {       //答题卡上题目被点击也会调用此方法
				this.currentTab=num1 //如果是答题卡页面 直接跳转指定页面
			}
		
		    let isresult = this.results;  //题目是否回答，提交题目回答结果true 未回答false
			
			
		    // setsele[num1 - 1] = seleid; //把我选的答案顺序放到集合里
		    this.$set(this.selectflag,num1 - 1 , seleid)
		    //如果为空情况点击 设置true有值  如果非空情况点击 去掉值  设置flase没值
		
		    if (isresult[num1 - 1] == '' || isresult[num1 - 1] == undefined || isresult[num1 - 1] == false) {
		        isresult[num1 - 1] = true; //选择题做题结果 true代表不空显示蓝色
				this.$set(this.results,num1 - 1 , true)
		    } else {  //取消选择
		        // isresult[num1-1]="";
				// num1=num1-1;  //设置页面不跳转
		    }
		
			// this.results=isresult
			// this.selectflag=setsele
			
			 
			
			this.currentTab=num1 //设置跳转下一页
		    // that.setData({
		    //     currentTab: num1 //设置跳转下一页
		    // });
		},
		
		
		//输入框失去焦点事件  主要判断此道填空是否回答
		bloselur(e) {
			
			
		    let that = this; 
		
		    let strid = e.currentTarget.dataset.num2; //填空传过来参数
		
		    let vlu = e.detail.value; //填空里值
		
		    let topid = strid.charAt(0); //题目id
		
		    let qusid = strid.charAt(2);//问题id
		    let fivalue = this.fillvalue;  //判断填空题是否有数据标志符
		
		    if (vlu == '' || vlu == undefined) {
		        //输入框无值
		        fivalue[qusid] = '';
		    } else {
		        //输入框有值
		        fivalue[qusid] = true;
		    } 
			// that.setData({
			//     fillvalue: fivalue
			// }); // console.log(fivalue)
			this.fillvalue=fivalue;
		
			//填空题正确答案个数
		    let trid = this.topic[topid].listTrue.length; 
		
		    let preresult = this.results;//获取题目回答结果 判断题目是否回答
		    
		
		    let okfill = this.fillvalue; //用于判断填空是否都有值
		
		    let flg = true;     //表示每个填空都有值
		
		    for (const key in okfill) {
		        //判断填空是否都有值
		        if (okfill[key] != true || okfill.length != trid) {
		            //有一个没值设置为flase
		            flg = false;
		        }
		    }
		
		    if (flg) {
		        //表示填空都有值
				this.$set(this.results,topid , true)
		        // preresult[topid] = true; //设置此道填空题都有值
				// this.results=preresult;
		       
				//都有值设置fillvalue为空不然 下一题默认fillvalue是有值的  用于判断题目的每个填空是否都有值的集合 fillvalue
				this.fillvalue=[];
		        // that.setData({
		        //     fillvalue: []
		        // });
		    } else {
		        //不是都有值重新设置一下 防止都有值 然后去掉一个空格值 不能及时更新
				this.$set(this.results,topid , '')
				// preresult[topid] = '';
				// this.results=preresult
		        
		    }
			
		},
		
		bindKeyInput: function (e) {
		   
			//获取输入值  //键盘输入时触发
			//题目id
			let topid = e.currentTarget.dataset.num2.charAt(0);
			let tiid = e.currentTarget.dataset.num2.charAt(2); //问题id
			
			let inputtw = this.inputtwo; //获得题目数组  inputtwo是个二维数组  二维数组每一行是一道填空题各个答案
			
			if (inputtw[topid] == undefined) {
			    inputtw[topid] = []; //定义第二层是个数组 不然为undefined
			} //不能直接给二维数组第二层赋值 必须先定义第二层数组
			
			inputtw[topid][tiid] = e.detail.value; //设置此行数据
			
			
			this.inputtwo=inputtw
			
			console.log(this.inputtw)
			console.log(this.inputtwo)
		},
		
		submitData(event) {
		    //提交题目效验 错题入库  题目记录 number+1
		    let that = this;
		    // let result = event.detail.value; //题目答题结果
			let topicval={}  //把所有答案放到对象中
			for (var i = 0; i < this.topic.length; i++) {  //循环选择题答案集合与填空题答案结合放到一个新的集合中
				if(this.selectflag[i]!=undefined){ //此i题为选择题
					let j=this.selectflag[i]  //获取选择题答案 选择的顺序 如c为2
					let v=this.topic[i].listError[j]   //获取选择的答案的值 如 c 天津
					let singlekey='radio' + i
					topicval[singlekey]=v
					// let singleval={singlekey:v}
					// result.push(singleval)  //topic.listError[selectflag[i]]为选中答案值
				}else{
					for (var z = 0; z < this.topic[i].listTrue.length ; z++) {  //'topic' + currentTab + '_input' + idx"
						let v=this.inputtwo[i][z]           //获取每个填空题每个输入框的值
						let fillkey='topic' + i + '_input' +z  //'topic' + currentTab + '_input' + idx" 用于获取是哪一题哪个选项
						topicval[fillkey]=v
						// let fillval={fillkey:v}
						// result.push(fillval)	
					}
					
				}
				
			}
			console.log(topicval)
		    let newresult = []; //错误题目结果
		
		    let errorid = [];
		    let topic = that.topic;
		    const keys = Object.keys(topicval);
		    const keyss = Object.values(topicval);
		    const values = Object.entries(topicval); //构建一个属性与属性值的二维数组 【属性,属性值】 【属性,属性值】
		
		    let index = 0; //用于题目遍历
		
		    let erid = 0; //用于存放错误题目集合的索引
		
		    let flag = true; //用于判断填空题做的可对
		
		    let nums = 0; //用于判断填空题问题个数
		
		    for (let key in values) { //values是每一题提交答案 选择题只有一个 填空有多个提交答案
		        //获取正确答案集合
		        let listtrue = topic[index].listTrue; //
		
		        let topicid = topic[index].id; //获取题目id
				
		        let rename = values[key][0].substring(0, 5); //获取答案名前缀 选择题以radio开头 填空题以topic开头
		
		        let revalue = values[key][1]; // 获取提交答案值 
		
		        if (rename == 'radio') {
		            //选择题处理逻辑
		            if (revalue == listtrue[0]) {
		                //答对
		                newresult[index] = true;
		            } else {
		                newresult[index] = false; //向结果集合存答题情况
		
		                errorid[erid] = topicid; //向错题id结合存错题id
		
		                erid++;
		            }
		
		            index++;
		        } 
				//填空题处理逻辑
		        if (rename == 'topic') {  //填空题name  'topic' + index + '_input' + idx
		            //题目次数
		            // let g = values[key][0];
		            // let z = g.charAt(5);
		            // let f = values[key][0].charAt(5);
		            let topid = values[key][0].charAt(5); //哪个题目
		
		            let qusid = values[key][0].charAt(12); //题目哪个个问题
		
		            let trueresult = listtrue[qusid]; //正确答案
		
		            if (revalue == trueresult) {//判断
		            } else {
		                //不正确
		                flag = false; //有一个问题不正确 则flag标志设置为false 表示此题错误
		            } //设置结果结合newresult和errorid 错题id集合
		
		            if (nums < listtrue.length - 1) {  //用于判断问题是不是属于同一题目
		                //  小于问题个数
		                nums++;
		            } else {
		                //等于问题个数即当前题目最后一个问题
		                if (flag) {
		                    //问题都回答正确
		                    newresult[index] = true;
		                } else {
		                    //有问题回答错误
		                    newresult[index] = false; //向结果集合存答题情况
		
		                    errorid[erid] = topicid; //向错题id结合存错题id
		
		                    erid++;
		                    flag = true; //重置flag
		                }
		
		                nums = 0; //重置nums
		
		                index++; //表示问题遍历完开始遍历下一题
		            }
		        }
		    } //循环结束 获取到 错误id接 errorid  和newrsult 题目结果集合
		    //把答题情况设置到data里
		
			this.results=newresult;
			this.radiosflag=false
		    // that.setData({
		    //     results: newresult,
		    //     radiosflag: false //表示已经提交过
		    // }); // console.log(errorid)
		    // console.log(newresult)
		    // console.log(JSON.stringify(errorid))
		
		    let eid = JSON.stringify(errorid); //数组类型 先转为字符串 再转对象才能传参成功
		
		    let re = JSON.parse(eid); //把错题返回服务器保存
		
		    uni.request({
		        method: 'post',
		        //依据接口情况
		        url: 'http://127.0.0.1:8080/baguwen/topic/errorid',
		        //微信小程序必须是https:
		        data: {
		            errorId: JSON.parse(eid),
		            userId: 1 //没做登录先设置为1
		        },
		        header: {
		            'content-type': 'application/json' // 默认值
		        },
		
		        success(res) {
		            // 没有返回结果后面可以设置预测分
		        },
		
		        fail(err) {
					
		        }
		    });
		},
		
		doagagin() {
		   
			this.getTopicList();
		   
			this.radiosflag=true;
			this.currentTab=0;
			this.results=[];
			this.selectflag=[]; 
			this.fillvalue=[] ;
			this.inputtwo=[]
		    
		}
		
	},
  };
</script>

<style lang="scss">

</style>
