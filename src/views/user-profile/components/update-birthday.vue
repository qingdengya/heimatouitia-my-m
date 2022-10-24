<template>
  <div class="update-birthday">
    <van-datetime-picker
      class="birthday"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from "@/api";
import dayjs from "dayjs";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  name: "UpdateBirthday",

  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");

        await updateUserProfileAPI({
          birthday: currentDate,
        });
        // console.log(data);
        // 更新视图
        this.$emit("input", currentDate);
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
/deep/ .birthday {
  .van-picker__cancel,
  .van-picker__confirm {
    color: #3296fa;
  }
}
</style>