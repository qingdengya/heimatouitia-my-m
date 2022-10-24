<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      class="gender"
      :default-index="value"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from "@/api";
export default {
  name: "UpdateGender",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
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
        const localGender = this.localGender;

        await updateUserProfileAPI({
          gender: localGender,
        });
        // console.log(data);
        // 更新视图
        this.$emit("input", localGender);
        // 关闭弹层
        this.$emit("close");
        // 提示成功
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败,请稍后再试");
      }
    },
    onPickerChange(picker, value, index) {
      console.log(picker, value, index);
      this.localGender = index;
    },
  },
};
</script>

<style lang="less" scoped>
.update-gender {
  /deep/ .gender {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #2892ff;
    }
  }
}
</style>