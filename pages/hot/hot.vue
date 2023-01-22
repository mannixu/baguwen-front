<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png" />
	<view class="search-box" @click="onToSearch">
	    <!-- 搜索模块 -->
	    <my-search placeholderText="uni-app 自定义组件" />
	</view>
	<view class="tab-sticky">
	<!-- tabs -->
	    <my-tabs 
		:tabData="tabData" 
		:defaultIndex="currentIndex"
		@tabClick="tabClick">
		</my-tabs>
	</view>
		
		
		 <!-- 基于 swiper 的 list 列表 -->
		     <swiper class="swiper" 
			 :current="currentIndex" 
			 :style="{ height: currentSwiperHeight + 'px' }"
			  @animationfinish="onSwiperEnd"
			       @change="onSwiperChange"
				   >
		     <swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
		        <view>
		          <!-- 加载动画 -->
		          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
		          <!-- 列表 -->
		          <block v-else>
		            <!-- 列表循环数据更改为 listData[tabIndex] -->
		            <hot-list-item
					 :class="'hot-list-item-' + tabIndex"
		              v-for="(item, index) in listData[tabIndex]"
		              :key="index"
		              :data="item"
		              :ranking="index + 1"
					  @click="onItemClick(item)"
		            ></hot-list-item>
		          </block>
		        </view>
		      </swiper-item>
		    </swiper>
	
  </view>
	  
</template>

<script>
	import { getHotTabs, getHotListFromTabType } from 'api/hot';
	export default {
		data() {
			return {
				// tabs 数据源
				tabData: [],
				// 当前的切换 index
				currentIndex: 0,
				// list 列表数据加载过程
				isLoading: true,
				// 以 index 为 key，对应的 list 为 val
				listData: {},
				
				 // 当前 swiper 的高度
				currentSwiperHeight: 0,
				      // 以 index 为 key，对应的 swiper 的高度 为 val
				swiperHeightData: {},
				// 当前的滚动距离
				currentPageScrollTop: 0 

			};
		},
	
	// 在实例创建完成后被立即调用
	created() {
		console.log("create执行了")
	  this.getHotTabs();
	  
	},
	methods: {
		async getHotTabs(){
			// uniapp 支持 async await
			console.log("gethottabs执行了")
			 const { data: res } = await getHotTabs();
			 console.log(res)
			 this.tabData = res;
			 console.log(this.tabData+"this.tabdata")
			 // 获取列表数据
			 this.getHotListFromTab();
		},
		
		/**
		     * list 列表数据
		     */
		    async getHotListFromTab() {
		      // 展示 loading
		      this.isLoading = true;
		      // 判断缓存是否有数据，不存在则重新获取数据
		      if (!this.listData[this.currentIndex]) {
		        // 获取列表数据
				
		        const id = this.tabData[this.currentIndex].title;
				
				console.log(id)
		        const { data: res } = await getHotListFromTabType(id);
		        // 放入数据缓存
		        this.listData[this.currentIndex] = res;
				console.log(res)
		      }
			  
			  
		
		      // 隐藏 loading
		      this.isLoading = false;
			   // 因为 this.$nextTick 存在一定的兼容性问题，所以更加推荐使用 setTimeout
			        setTimeout(async () => {
			          // 获取当前 swiper 的高度
			          this.currentSwiperHeight = await this.getCurrentSwiperHeight();
			          // 放入缓存
			          this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
			        }, 0);
		    },
			
			/**
			     * tab item 的点击事件
			     */
			tabClick(index) {
			    this.currentIndex = index;
				// 获取列表数据
			    this.getHotListFromTab();
			},
			/**
			 * 解决卡顿问题；等待 swiper 动画完成之后，获取数据
			 */
			onSwiperEnd() {
			  // 判断缓存是否有数据，不存在则重新获取数据
			  if (!this.listData[this.currentIndex]) {
			    this.getHotListFromTab();
			    return;
			  }
			  // 未 return ，则证明存在缓存数据，即同时存在 height 的缓存数据
			  this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			
			
			
			 /**
			     * 计算当前 swiper 的高度
			     */
			    getCurrentSwiperHeight() {
			      return new Promise((resolve, reject) => {
			        let sum = 0;
			        const query = uni.createSelectorQuery().in(this);
			        query
			          .selectAll(`.hot-list-item-${this.currentIndex}`)
			          .boundingClientRect((res) => {
			            res.forEach((item) => {
			              sum += item.height;
			            });
			            resolve(sum);
			          })
			          .exec();
			      });
			    },
		// 监听 swiper 的切换事件
				onSwiperChange(e) {
					this.currentIndex = e.detail.current;
		            },
		/**
		   * 监听页面的滚动
		   */
		  onPageScroll(res) {
		    this.currentPageScrollTop = res.scrollTop;
		  },   
		
			// 监听 swiper 的切换事件
		    onSwiperChange(e) {
		      if (this.currentPageScrollTop > 130) {
		        // 控制列表滚动位置
		        uni.pageScrollTo({
		          scrollTop: 130
		        });
		      }	
		      this.currentIndex = e.detail.current;
		    },
		 /**
		      搜索框点击事件
		     */
		    onToSearch() {
		      uni.navigateTo({
		        url: '/subpkg/pages/search-blog/search-blog'
		      });
		    },
		onItemClick(item) {
			console.log("被点击")
		      uni.navigateTo({
		        url: `/subpkg/pages/blog-detail/blog-detail?articleId=${item.id}&author=${item.nickname}`
		      });
		    }
	}
}
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    width: 100%;
    height: 80px;
  }
  .search-box {
      padding: 0 16px;
      margin-bottom: $uni-spacing-col-base;
    }
	.tab-sticky {
	    position: -webkit-sticky;
	    position: sticky;
	    z-index: 99;
	    top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
	  }
}
</style>
