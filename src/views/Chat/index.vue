<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, i) in list" :key="i">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name === 'xs'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-if="obj.name === 'my'">
          <div class="chat-pao">{{ obj.msg }}</div>
          <van-image fit="cover" round :src="url" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="word">
        <van-button slot="button" size="small" type="primary" @click="sendFn"
          >提交</van-button
        >
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入 socket.io-client 包
import { io } from "socket.io-client";
import { getUserInfoAPI } from "@/api";
// 定义变量，存储 websocket 实例
let socket = null;

export default {
  name: "Chat",
  data() {
    return {
      list: this.$store.state.message || [
        { name: "xs", msg: "你好！我是小思同学" },
        { name: "my", msg: "我是编程大王子" },
      ],

      word: "", //输入框的内容
      url: "https://img.yzcdn.cn/vant/cat.jpeg", //用户头像
    };
  },
  created() {
    // ...
    // 获取用户头像
    this.getUserInfo();
    // 创建客户端 websocket 的实例
    socket = io("http://toutiao.itheima.net", {
      query: {
        token: this.token,
      },
      transports: ["websocket"],
    });
    // 建立连接的事件
    socket.on("connect", () => {
      console.log("与服务器建立了连接");
    });
    // 接收到消息的事件
    socket.on("message", (data) => {
      // 把服务器发送过来的消息，存储到 list 数组中
      // console.log(data);
      this.list.push({
        name: "xs",
        msg: data.msg,
      });
      this.word = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
  watch: {
    list: {
      handler() {
        this.$store.commit("setMsg", this.list);
      },
      deep: true,
    },
  },
  methods: {
    sendFn() {
      // 判断内容是否为空
      if (!this.word) return;

      // 添加聊天消息到 list 列表中
      this.list.push({
        name: "my",
        msg: this.word,
      });
      // 把消息发送给 websocket 服务器
      socket.emit("message", {
        msg: this.word,
        timestamp: new Date().getTime(),
      });

      // 清空文本框的内容
      this.word = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      // 获取到所有的聊天 Item 项
      const chatItem = document.querySelectorAll(".chat-item");
      // 获取到最后一项对应的 DOM 元素
      const lastItem = chatItem[chatItem.length - 1];
      // 调用 scrollIntoView() 方法，显示这个元素
      lastItem.scrollIntoView({
        behavior: "smooth", // 动画平滑
      });
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfoAPI();
        this.url = data.data.photo;
        console.log(data.data.photo);
      } catch (error) {
        this.$toast("获取用户信息失败! 请稍候再试", error);
      }
    },
  },
  // 组件被销毁之前，清空 sock 对象
  beforeDestroy() {
    // 关闭连接
    socket.close();

    // 销毁 websocket 实例对象
    socket = null;
  },
};
</script>
 <style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 70%;
        min-height: 80px;
        line-height: 76px;
        border: 0.5px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -13px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -13px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 62px;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>

