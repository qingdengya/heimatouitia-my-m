<template>
  <div class="channel-edit">
    <!-- 顶部 -->
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="editBtn"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, i) in myChannels"
        :key="i"
        @click="onMyChannelClick(channel, i)"
      >
        <van-icon
          name="clear"
          slot="icon"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: i === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 我的频道 -->

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="(Channels, i) in redChannels"
        :key="i"
        :text="Channels.name"
        @click="onAddChannels(Channels)"
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
// 导入获取所有频道列表api
import { getAllChannelsAPI, setMyChannelsAPI, delMyChannelsAPI } from "@/api";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  // 组件名称
  name: "ChannelEdit",
  // 组件参数 接收来自父组件的数据
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    // 父组件传递过来的选中的索引
    active: {
      type: Number,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      AllChannels: [], //推荐频道全部数据
      isEdit: false, //控制编辑状态的显示
      fiexChannels: [0], //固定频道,允许删除
      // user: this.$store.state.user,
    };
  },

  // 计算属性
  computed: {
    ...mapState(["user"]),

    // 方法1
    // redChannels() {
    //   const Channels = [];
    //   this.AllChannels.forEach((channel) => {
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id;
    //     });
    //     // r如果我的频道中不包含 该频道,则收集该频道的数据
    //     if (!ret) {
    //       Channels.push(channel);
    //     }
    //   });
    //   return Channels;
    // },

    // 方法2
    redChannels() {
      return this.AllChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return channel.id === myChannel.id;
        });
      });
    },
  },

  created() {
    // 发起网络请求 获取所有的频道列表
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannelsAPI();
        // console.log(this.myChannels);
        // console.log(data.data.channels);
        this.AllChannels.push(...data.data.channels);
        // console.log(this.AllChannels);
      } catch (e) {
        this.$toast("获取频道数据失败!");
      }
    },
    async onAddChannels(Channels) {
      this.myChannels.push(Channels);
      // console.log(this.a);
      // 数据化处理
      if (this.user) {
        // 已登录  用数据请求接口放到线上
        try {
          await setMyChannelsAPI({
            id: Channels.id, //频道id
            seq: this.myChannels.length, //序号
          });
        } catch (e) {
          this.$toast("保存失败,请稍后在试");
        }
      } else {
        // 未登录 把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    editBtn() {
      this.isEdit = !this.isEdit;
    },
    onMyChannelClick(channel, i) {
      // 如果是编辑状态,则执行删除频道
      if (this.isEdit) {
        // 如果是固定频道则不删除
        if (this.fiexChannels.includes(i)) {
          return;
        }
        this.myChannels.splice(i, 1);
        if (i <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        // 持久化处理
      } else {
        // 非编辑状态,执行切换频道
        this.$emit("update-active", i, false);
      }
      this.daleteChannel(channel);
    },
    // 删除持久化函数
    async daleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录  把数据更新到线上

          await delMyChannelsAPI(channel.id);
        } else {
          // 未登录  把数据更新到本地存储
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (e) {
        this.$toast("操作失败,请稍后再试");
      }
    },
  },
};
</script> 

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    // color: #f85959;
    line-height: 48px;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
  }
  /deep/ .van-grid-item__content {
    background-color: #f3f5f7;
    .van-grid-item__text,
    .text {
      white-space: nowrap;
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: #f85959;
      font-weight: 500;
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/.my-grid {
    .van-icon-clear {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 30px;
      z-index: 2;
      color: #fa7d59;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>