<template>
  <van-icon
    class="LikeArticle_active"
    :color="value === 1 ? '#f07060' : '#777'"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>
<script>
import { addLikeArticleAPI, clearLikeArticleAPI } from "@/api/index";
export default {
  name: "LikeArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articelId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },

  mounted() {},

  methods: {
    async onCollect() {
      this.loading = true;
      try {
        let stetus = -1;
        if (this.value === 1) {
          // 已点赞 取消点赞
          await clearLikeArticleAPI(this.articelId);
        } else {
          // 未点赞 点赞
          await addLikeArticleAPI(this.articelId);
          stetus = 1;
        }
        this.$emit("input", stetus);
        this.$toast.success(stetus === 1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        this.$toast("操作失败,请稍后再试! ");
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.LikeArticle_active:active {
  background-color: #e6e6e6;
}
</style>