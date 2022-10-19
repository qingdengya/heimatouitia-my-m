<template>
  <div class="articlelist-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="msg"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 文章列表项 -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- 文章列表项 -->

        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入请求模块
import { getAeticleListAPI } from "@/api/index";
import ArticleItem from "@/components/article-item";
export default {
  // 组件名称
  name: "ArticleList",
  // 组件参数 接收来自父组件的数据
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  // 局部注册的组件
  components: {
    ArticleItem,
  },
  // 组件状态值
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, //请求获取下一页的时间戳
      error: false,
      isLoading: false,
      msg: "刷新成功", //提示下拉刷新成功的文本
    };
  },

  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getAeticleListAPI({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now(),
        });
        // if (Math.random() > 0.5) {
        //   JSON.parse("大大大大大大");
        // }
        // 2.把请求结果数据放到list数组中
        // console.log(data);
        const { results } = data.data;
        // console.log(results);
        this.list.push(...results);
        // 3.本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;

        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了.将finished设置为true
          this.finished = true;
        }
      } catch (e) {
        // console.log("请求失败", e);
        // 展示错误提示状态
        this.error = true;
        // 请求失败了 loading 也需要关闭
        this.loading = false;
      }
    },

    async onRefresh() {
      // 请求获取数据
      try {
        const { data } = await getAeticleListAPI({
          channel_id: this.channels.id,
          timestamp: Date.now(),
        });
        // if (Math.random() > 0.2) {
        //   JSON.parse("大大大大大大");
        // }
        this.list.unshift(...data.data.results);
        this.isLoading = false;
        this.msg = `刷新成功,刷新了${data.data.results.length}条数据`;
      } catch (e) {
        this.isLoading = false;

        this.msg = "刷新失败请重新再试";
      }
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
};
</script> 

<style scoped lang="less">
.articlelist-list {
  height: 79vh;
  overflow-y: auto;
}
</style>