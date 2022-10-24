<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      :error-text="'加载失败，请稍后再试'"
      :immediate-check="false"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, i) in list" :key="i" :title="item.content" /> -->
      <commentItem
        v-for="(item, i) in list"
        :key="i"
        :title="item"
        @reply-click="$emit('reply-click', $event)"
      ></commentItem>
    </van-list>
  </div>
</template>

<script>
import { loadCommentAPI } from "@/api";
import commentItem from "@/views/article/components/comment-item.vue";
export default {
  // 组件名称
  name: "CommentList",
  // 组件参数 接收来自父组件的数据
  props: {
    articelId: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  // 局部注册的组件
  components: { commentItem },
  // 组件状态值
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onLoad() {
      try {
        //1. 请求数据
        const { data } = await loadCommentAPI({
          type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articelId.toString(), //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, //	获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        // console.log(data.data.results);
        // console.log(data);
        const { results } = data.data;
        this.$emit("onload-success", data.data);
        // console.log(results);
        // 2.将数据添加到list数组中
        this.list.push(...results);
        // 3.将loading设置为false
        this.loading = false;
        // 4.判断是否还有数据

        if (results.length) {
          // 有就更新下一页的数据页码
          // console.log(this.offset);
          this.offset = data.data.last_id;
        } else {
          // 没有就把finished设为true
          this.finished = true;
        }
      } catch (error) {
        console.log(error);
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script> 

<style scoped lang="less">
</style>