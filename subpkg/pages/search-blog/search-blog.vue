<template>
  <view class="search-blog-container">
	  <!-- 3. 使用导入的 vuex 模块中的数据 -->
	      <!-- <div>{{ msg }}</div> -->
    <!-- search模块 -->
    <view class="search-bar-box">
      <my-search
        :placeholderText="defaultText"
        v-model="searchVal"
        :isShowInput="true"
        :config="{
          backgroundColor: '#f1f0f3'
        }"
        @search="onSearchConfirms"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
      />
    </view>
	<!-- 热搜列表 -->
	    <view class="search-hot-list-box card" v-if="showType === HOT_LIST">
	      <!-- 列表 -->
	      <search-hot-list @onSearch="onSearchConfirms" />
	    </view>
		
 <!-- 搜索历史 -->
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
     <search-history
       
        @onItemClick="onSearchConfirms"
      />
	  <!--  :searchData="searchData"
	   @removeAllSearchData="onRemoveAllSearchData"
        @removeSearchData="onRemoveSearchData" -->
    </view>
	
	<!-- 搜索结果 -->
    <view class="search-result-box" v-else>
      <search-result-list ref="mescrollItem"  :queryStr="searchVal" />
    </view>
  </view>
</template>

<script>
	// 2. 引入mescroll-comp.js
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
	
	// 导入 mapMutations 函数
	import { mapMutations } from 'vuex';
	// 0: 热搜列表 - 默认 host_list
	const HOT_LIST = '0';
	// 1：搜索历史 search_histroy
	const SEARCH_HISTORY = '1';
	// 2：搜索结果 search_result
	const SEARCH_RESULT = '2';
export default {
	// computed: {
	//     // 2. 在 computed 中，通过 mapState 函数，注册 state 中的数据，导入之后的数据可直接使用（就像使用 data 中的数据一样）
	//     // mapState(模块名, ['字段名','字段名','字段名'])
	//     ...mapState('search', ['msg'])
	//   },
	
	 // 3. 注册 mixins
	  mixins: [MescrollCompMixin],
  data() {
    return {
		HOT_LIST,
		SEARCH_HISTORY,
		SEARCH_RESULT,
		// 默认情况下 || 点击输入框的取消按钮时，显示【热搜列表】
		// 当 searchBar 获取焦点时 || 点击输入框清空按钮时，显示 【搜索历史】
		// 用户点击热搜列表 item || 用户点击搜索历史 || 用户按下搜索键，显示 【搜索结果】
		showType: HOT_LIST,
	 // 绑定输入框中的内容
	      searchVal: '',
	      // 默认的placeholderText
	      defaultText: '默认的placeholderText',
	 // 搜索历史数据
	      searchData: ['234','123','456','567']
	};
  },
  methods: {
	   ...mapMutations('search', ['addSearchData']),
	  /**
	   * 搜索内容
	   */
	  onSearchConfirms(val) {
	    
	    this.searchVal = val ? val : this.defaultText;
		// 保存搜索历史数据
		this.addSearchData(this.searchVal);
	    if (this.searchVal) {
	      this.showType = SEARCH_RESULT;
	    }
			
	  		
	  },
		
    
    
	      // searchbar 获取焦点
	      onSearchFocus(val) {
	        // console.log('searchbar 获取焦点');
			this.showType = SEARCH_HISTORY;
	      },
	      /**
	       * searchbar 失去焦点
	       */
	      onSearchBlur(val) {
	        // console.log('searchbar 失去焦点');
			
	      },
		 
	      /**
	       * searchbar 清空内容
	       */
	      onSearchClear() {
	        // console.log('searchbar 清空内容');
			this.showType = SEARCH_HISTORY;
	      },
	      /**
	       * searchbar 取消按钮
	       */
	      onSearchCancel(val) {
	        // console.log('searchbar 取消按钮');
			this.showType = HOT_LIST;
	      },
		/**
	     * 搜索内容
	     */
	    // onSearchConfirm(val) {
	    //   // 用户未输入文本，直接搜索时，使用【推荐搜索文本】
	    //   this.searchVal = val ? val : this.defaultText;
	    //   if (this.searchVal) {
	    //     this.showType = SEARCH_RESULT;
	    //   }
	    // },
		/**
	     * 删除数据
	     */
	    // onRemoveSearchData(index) {
	    //   this.searchData.splice(index, 1);
	    // },
	    // onRemoveAllSearchData() {
	    //   this.searchData = [];
	    // },
		
		
	/**
     * 保存搜索历史数据
     */
  //   saveSearchData() {
		// // console.log("我执行了")
  //     // 1. 如果数据已存在，则删除
  //     const index = this.searchData.findIndex((item) => item === this.searchVal);
  //     if (index !== -1) {
  //       this.searchData.splice(index, 1);
  //     }
  //     // 2. 新的搜索内容需要先于旧的搜索内容展示
  //     this.searchData.unshift(this.searchVal);
  //   },
		
  }
};
</script>

<style lang="scss" scoped>
.search-blog-container {
  .search-bar-box {
    background-color: $uni-bg-color;
    padding: $uni-spacing-row-sm;
    position: sticky;
    top: 0px;
    z-index: 9;
  }
}
</style>