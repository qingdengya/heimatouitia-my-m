<template>
  <div class="update-photo">
    <img :src="img" alt="" ref="imge" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhotoAPI } from "@/api";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "UpdatePhoto",
  props: {
    img: {
      type: [Object, String],
      required: true,
    },
  },

  data() {
    return {
      cropper: null,
    };
  },

  mounted() {
    const image = this.$refs.imge;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
    });
  },

  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // console.log(blob);
        this.updateUserPhoto(blob);
      });
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁止背景点击
        duration: 0,
      });
      try {
        const formData = new FormData();
        formData.append("photo", blob);
        const { data } = await updateUserPhotoAPI(formData);
        // console.log(data);
        // 关闭弹出层
        this.$emit("close");
        // 更新视图
        this.$emit("update-photo", data.data.photo);
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-photo {
  height: 100%;
  background-color: #000;
  img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    font-size: 30px;
    // color: #fff;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      color: #fff;
      text-align: center;
      padding: 0 30px;
      width: 90px;
      height: 90px;
      line-height: 90px;
    }
  }
}
</style>