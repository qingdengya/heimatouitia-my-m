<template>
  <div class="commentReply">
    <div>
      <van-nav-bar
        :title="
          comment.reply_count > 0 ? `${comment.reply_count} 条回复` : '暂无回复'
        "
      >
        <van-icon
          slot="left"
          name="cross"
          class="title-icon"
          @click="$emit('close')"
        ></van-icon>
      </van-nav-bar>
      <div class="scroll-wrap">
        <!-- 当前评论项 -->
        <commentItem :title="comment"></commentItem>
        <!-- 当前评论项 -->
        <!-- 评论回复列表 -->
        <van-cell title="全部回复"> </van-cell>
        <commentList
          :articelId="comment.com_id"
          type="c"
          :list="commentlsit"
        ></commentList>
        <!-- 评论回复列表 -->
      </div>
    </div>
    <div>
      <!-- 发布评论 -->
      <div class="post-wrap">
        <van-button
          class="post-btn"
          round
          size="small"
          @click="isPostShow = true"
          >写评论</van-button
        >
      </div>
      <!-- 发布评论 -->
      <van-popup v-model="isPostShow" position="bottom">
        <commentPost
          :target="comment.com_id"
          @closePopup="onPostSuccess"
        ></commentPost>
      </van-popup>
    </div>
  </div>
</template>

<script>
import commentItem from "@/views/article/components/comment-item.vue";
import commentList from "@/views/article/components/comment-list";
import commentPost from "@/views/article/components/comment-post";
export default {
  name: "commentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentlsit: [],
      a: "11111",
    };
  },
  components: {
    commentItem,
    commentList,
    commentPost,
  },

  mounted() {},

  methods: {
    onPostSuccess(data) {
      // 更新回复数量
      this.comment.reply_count++;
      // 关闭弹层
      this.isPostShow = false;
      // 将最新回复的内容展示到列表的前面

      this.commentlsit.unshift(data.new_obj);
      // console.log(data.new_obj.content);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.title-icon {
  color: #3296fa;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>