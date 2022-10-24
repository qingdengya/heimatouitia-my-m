<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 导航栏 -->

    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfileAPI } from "@/api";
export default {
  name: "UpdateName",
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      localName: this.value, //输入框内容
    };
  },

  mounted() {},

  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止背景点击
        duration: 0,
      });
      try {
        const localName = this.localName;
        // 判断是否为空
        if (!localName.length) {
          this.$toast("昵称不能为空");
          return;
        }

        await updateUserProfileAPI({
          name: localName,
        });
        // console.log(data);
        // 更新视图
        this.$emit("input", localName);
        // 关闭弹层
        this.$emit("close");
        // 提示成功
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败,请稍后再试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>