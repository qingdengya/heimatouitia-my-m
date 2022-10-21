<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="followedloading"
    @click="followed"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followedloading"
    @click="followed"
    >关注</van-button
  >
</template>

<script>
import { addfollowedAPI, cancelfollowedAPI } from "@/api";

export default {
  name: "FollowUser",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: [Number, String, Object],
      required: true,
    },
  },

  data() {
    return {
      followedloading: false,
    };
  },

  methods: {
    // 取消关注
    async followed() {
      // console.log("111");
      // console.log(this.isfollowed);
      this.followedloading = true; //展示关注按钮的loading 状态
      try {
        if (this.value) {
          // 已关注 取消关注
          // console.log("222");
          await cancelfollowedAPI(this.id);

          this.$toast("取消关注成功");
          // this.isfollowed = false;
        } else {
          // 没有关注 添加关注
          await addfollowedAPI(this.id);

          this.$toast("关注成功");
          // this.isfollowed = true;
        }
        // 更新视图状态

        // this.artice.is_followed = !this.artice.is_followed;
        this.$emit("input", !this.value);
      } catch (e) {
        console.log(e);
        let msg = "操作失败,请重新再试! ";
        if (e.response && e.response.status === 400) {
          msg = "你不能关注你自己";
        }

        // 失败
        this.$toast(msg);
      }
      this.followedloading = false;
    },
  },
};
</script> 

<style scoped lang="less">
</style>