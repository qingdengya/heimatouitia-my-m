<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请点击重试 "
    >
      <van-cell
        v-for="(article, i) in list"
        :key="i"
        :title="article.title"
        clickable
      />
    </van-list>
  </div>
</template>

<script>
import { loadSearchDataAPI } from "@/api";
export default {
  // 组件名称
  name: "searchResult",
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await loadSearchDataAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        // // 模拟加载失败
        // if (Math.random() > 0.2) {
        //   JSON.parse("大大大大大大");
        // }
        // console.log(data.data.results);

        // 2.将数据添加到数组列表中
        this.list.push(...data.data.results);
        // 3.将本次加载中的loading关闭
        this.loading = false;
        // 4.判断是否还有数据
        if (data.data.results.length) {
          //  如果有，则更新下一页数据的页码
          this.page++;
        } else {
          //   如果没有，则将加载状态置（finished）为结束
          this.finished = true;
        }
      } catch (e) {
        // 加载失败了提示状态
        // 加载失败了loading也有关闭
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script> 

<style scoped lang="less">
</style>