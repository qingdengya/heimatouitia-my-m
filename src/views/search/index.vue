<template>
  <div class="search-container">
    <!-- 搜索导航 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索导航 -->

    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow" :searchText="searchText"></searchResult>
    <!-- 搜索结果-->

    <!-- 搜索建议-->
    <searchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></searchSuggestion>
    <!-- 搜索建议-->

    <!-- 搜索历史记录 -->
    <searchHistory
      v-else
      :searchHistories="searchHistories"
      @allDelte="allDelte"
      @search="onSearch"
    ></searchHistory>
    <!-- 搜索历史记录 -->
  </div>
</template>

<script>
import searchResult from "@/views/search/components/search-result.vue";
import searchSuggestion from "@/views/search/components/search-suggestion.vue";
import searchHistory from "@/views/search/components/search-history.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  // 组件名称
  name: "searchIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { searchResult, searchSuggestion, searchHistory },
  // 组件状态值
  data() {
    return {
      searchText: "", //绑定顶部搜索的value值
      isResultShow: false,
      searchHistories: getItem("TOUTIAO_SERACHHistories") || [], //历史记录
    };
  },
  watch: {
    // 监视searchHistories 存储历史记录的数组
    // 只要发生改变就存储到本地
    searchHistories(val) {
      setItem("TOUTIAO_SERACHHistories", val);
    },
  },
  methods: {
    // 搜索执行的操作
    onSearch(val) {
      // this.$toast(val);
      this.searchText = val; //更新文本框内容
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      // 存储搜索记录
      this.searchHistories.unshift(val);
      // 要求:不要有重复历史记录  最新的数据排在前面
      this.isResultShow = true;
    },
    // 取消后执行的操作
    onCancel() {
      // this.$toast("取消");
      // 返回上一级页面
      this.$router.back();
    },

    allDelte() {
      // 删除所有历史记录
      this.searchHistories = [];
    },
  },
};
</script> 

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #54a7ff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>