<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- 导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="User.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="User.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="User.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="User.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <van-cell title="个性签名" value="内容" is-link />

    <!-- 个人信息 -->
    <!-- 编辑头像 -->
    <van-popup
      v-if="isUpdatePhotoShow"
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoto
        :img="this.image"
        @close="isUpdatePhotoShow = false"
        @update-photo="User.photo = $event"
      ></UpdatePhoto>
    </van-popup>
    <!-- 编辑头像 -->

    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="User.name"
      ></UpdateName>
    </van-popup>
    <!-- 编辑昵称弹出层 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-model="User.gender"
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
      ></UpdateGender>
    </van-popup>
    <!-- 编辑性别 -->

    <!-- 编辑日期 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-model="User.birthday"
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑日期 -->
  </div>
</template>

<script>
import { getUserProfileAPI } from "@/api";
import UpdateName from "@/views/user-profile/components/update-name.vue";
import UpdateGender from "@/views/user-profile/components/update-gender.vue";
import UpdateBirthday from "@/views/user-profile/components/update-birthday.vue";
import UpdatePhoto from "@/views/user-profile/components/update-photo.vue";
export default {
  name: "UserProfile",

  data() {
    return {
      User: {}, //用户信息
      isUpdatePhotoShow: false, //控制编辑头像的弹出层
      isUpdateNameShow: false, //控制编辑昵称弹出层
      isUpdateGenderShow: false, //控制编辑性别弹出层
      isUpdateBirthdayShow: false,
      image: null, //控制编辑生日的弹出层
    };
  },

  mounted() {},
  created() {
    this.getUserProfile();
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  methods: {
    async getUserProfile() {
      // 获取用户信息
      try {
        const { data } = await getUserProfileAPI();
        // console.log(data.data);
        this.User = data.data;
      } catch (error) {
        this.$toast("获取信息失败，请稍后再试！");
        console.log(error);
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // 基于文章对象获取 blob数据
      this.image = window.URL.createObjectURL(file);
      // 弹出层
      this.isUpdatePhotoShow = true;
      // file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value请客
      this.$refs.file.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .page-nav-bar {
    background-color: #2892ff;

    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>