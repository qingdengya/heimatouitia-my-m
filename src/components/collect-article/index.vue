<template>
  <van-icon
    class="collect_active"
    :color="value ? '#ffa600' : '#777'"
    :name="value ? 'star' : 'star-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>
<script>
import { addCollectAPI, clearCollectAPI } from "@/api/index";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
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
        // 判断value的值为 true  还是为 false

        if (this.value) {
          // console.log(11);
          // 值为真  取消收藏
          await clearCollectAPI(this.articelId);
          this.$toast.success("取消收藏! ");
        } else {
          // console.log(22);
          // 值为假  添加收藏
          await addCollectAPI(this.articelId);
          this.$toast.success("收藏成功! ");
        }
        this.$emit("input", !this.value);
      } catch (error) {
        // console.log(33);
        this.$toast.success("操作失败请,稍后再试! ");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.collect_active:active {
  background-color: #e6e6e6;
}
</style>