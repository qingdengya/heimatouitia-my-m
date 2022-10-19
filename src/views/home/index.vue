<template>
  <div class="home-container">
    <!-- 头部导航栏 -->
    <van-nav-bar id="page-nav-bar" fixed>
      <!-- 搜索 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 头部导航栏 -->
    <!-- 频道导航 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="e.name" v-for="e in channels" :key="e.id">
        <!-- 文章列表 -->
        <ArticleList :channels="e"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="popupShow">
        <i class="iconfont toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!--  频道导航 -->
    <!-- 频道编辑弹出层模块 -->
    <van-popup
      v-model="show"
      closeable
      position="top"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
    <!-- 频道编辑弹出层模块 -->
  </div>
</template>

<script>
import { getUserChannelsAPI } from "@/api/index";
import ArticleList from "@/views/home/components/article-list.vue";
// 加载编辑页面
import ChannelEdit from "@/views/home/components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  // 组件名称
  name: "HomeIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEdit,
  },
  // 组件状态值
  data() {
    return {
      // 控制被激活的标签  默认第一0
      active: 0,
      // 频道列表
      channels: [],
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async getUserChannels() {
      try {
        // 用uesr 判断用户的登录状态
        if (this.user) {
          // 已登录  获取用户频道
          const { data } = await getUserChannelsAPI();
          this.channels = data.data.channels;
        } else {
          // 未登录  判断本地存储是否有数据 有获取本地 没有获取线上默认频道
          if (getItem("TOUTIAO_CHANNELS")) {
            // 有就拿来使用
            this.channels = getItem("TOUTIAO_CHANNELS");
          } else {
            // 没有 获取线上默认地址
            const { data } = await getUserChannelsAPI();
            this.channels = data.data.channels;
          }
        }

        // console.log(data);
      } catch (e) {
        this.$toast("获取频道数据失败");
      }
    },
    popupShow() {
      this.show = true;
    },
    onUpdateActive(i, show = true) {
      this.active = i;
      this.show = show;
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.getUserChannels();
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
};
</script> 

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .van-button {
      border: none;
      background-color: #54a7ff;
      font-size: 28px;
    }
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      width: 50px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>