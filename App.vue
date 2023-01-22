<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			this.$store.dispatch('init')   //刷新页面会调用此方法进行用户初始化
			
			//调用API从本地缓存中获取数据
			var subjects = uni.getStorageSync('subjects');
					
			if (!subjects) {
			    subjects = this.globalData.loadSubjects();
			    uni.setStorageSync('subjects', subjects);
			}
		},
		  globalData: {
		loadSubjects: function () {
		    var subjects = new Array();
		    var subject = new Object();
		    subject.id = '0';
		    subject.pic = '/static/images/subject/wuli.jpg';
		    subject.name = '八股文';
		    subject.status = '1';
		    subject.desc = '支持初中语文所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject);
		    var subject = new Object();
		    subject.id = '1';
		    subject.pic = '/static/images/subject/yuwen.jpg';
		    subject.name = '语文';
		    subject.status = '1';
		    subject.desc = '支持初中语文所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject);
		    var subject1 = new Object();
		    subject1.id = '2';
		    subject1.pic = '/static/images/subject/shuxue.jpg';
		    subject1.name = '数学';
		    subject1.status = '1';
		    subject1.desc = '支持初中数学所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject1);
		    var subject2 = new Object();
		    subject2.id = '3';
		    subject2.pic = '/static/images/subject/yingyu.jpg';
		    subject2.name = '英语';
		    subject2.status = '1';
		    subject2.desc = '支持初中英语所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject2);
		    var subject3 = new Object();
		    subject3.id = '4';
		    subject3.pic = '/static/images/subject/wuli.jpg';
		    subject3.name = '物理';
		    subject3.status = '1';
		    subject3.desc = '支持初中物理所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject3);
		    var subject4 = new Object();
		    subject4.id = '5';
		    subject4.pic = '/static/images/subject/huaxue.jpg';
		    subject4.name = '化学';
		    subject4.status = '1';
		    subject4.desc = '支持初中化学所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject4);
		    var subject5 = new Object();
		    subject5.id = '6';
		    subject5.pic = '/static/images/subject/shengwu.jpg';
		    subject5.name = '生物';
		    subject5.status = '1';
		    subject5.desc = '支持初中生物所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject5);
		    var subject6 = new Object();
		    subject6.id = '7';
		    subject6.pic = '/static/images/subject/lishi.jpg';
		    subject6.name = '历史';
		    subject6.status = '1';
		    subject6.desc = '支持初中历史所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject6);
		    var subject7 = new Object();
		    subject7.id = '8';
		    subject7.pic = '/static/images/subject/dili.jpg';
		    subject7.name = '地理';
		    subject7.status = '2';
		    subject7.desc = '支持初中地理所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject7);
		    var subject8 = new Object();
		    subject8.id = '9';
		    subject8.pic = '/static/images/subject/kexue.jpg';
		    subject8.name = '科学';
		    subject8.status = '2';
		    subject8.desc = '支持初中科学所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject8);
		    var subject9 = new Object();
		    subject9.id = '10';
		    subject9.pic = '/static/images/subject/shehui.jpg';
		    subject9.name = '历史与社会';
		    subject9.status = '2';
		    subject9.desc = '支持初中历史与社会所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject9);
		    var subject10 = new Object();
		    subject10.id = '11';
		    subject10.pic = '/static/images/subject/sixiang.jpg';
		    subject10.name = '思想品德';
		    subject10.status = '2';
		    subject10.desc = '支持初中思想品德所有教材版本的同步练习，覆盖中考考纲的冲刺总复习';
		    subjects.push(subject10);
		    return subjects;
		}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// 引入公共样式
	@import url('@/common/free.css');
	@import url('@/common/common.css');
	@import url('./common/animate.min.css');
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	// page {
	// 	background-color: #f5f5f5;
	// }

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
