<template>
  <div class="my-container">
    <!-- 用户基本信息 -->
    <div class="header user-info" v-if="user">
      <!-- 基础信息 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round :src="userInfo.photo" fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="rigth">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>

      <!-- 基数据统计 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 用户基本信息 -->
    <!-- 去登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="登录" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 去登录 -->
    <!-- grid宫格导航 -->
    <div>
      <van-grid :column-num="2" class="grid-nav" clickable>
        <!-- 收藏 -->
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <!-- 历史 -->
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 表格导航 -->
    <div class="van-cell-fs">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <!-- 退出按钮 -->
    <van-button
      type="default"
      size="large"
      class="van-button-quit"
      @click="logOut"
      v-if="user"
    >
      退出登录
    </van-button>

    <!-- grid宫格导航 -->
  </div>
</template>

<script>
import { getUserInfoAPI } from "@/api/index"; //网络请求
import { Dialog } from "vant";
import { mapState } from "vuex";

export default {
  created() {
    // 如果用户登录了则请求加载数据
    if (this.user) {
      this.getUserInfo();
    }
  },
  // 组件名称
  name: "MyIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      userInfo: {},
    };
  },
  // 计算属性
  computed: {
    ...mapState(["user"]),
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    logOut() {
      Dialog.confirm({
        title: "退出",
        message: "确认要退出登录?",
      })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfoAPI();
        // console.log(data);
        this.userInfo = data.data;
        // console.log(data.data);
      } catch (e) {
        this.$toast("获取数据失败,请稍后再试");
      }
    },
  },
};
</script> 

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat center;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
      .rigth {
        display: flex;
        align-items: center;
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 32px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 5px;
    .grid-item {
      height: 141px;
      i.iconfont {
        display: block;
        font-size: 45px;
        margin-bottom: 8px;
      }
      .toutiao-shoucang {
        color: #eb5353;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .van-button-quit {
    margin-top: 5px;
    color: #d86262;
    font-size: 28px;
  }
  .van-cell-fs {
    van-cell {
      width: 55px;
    }
  }
}
</style>