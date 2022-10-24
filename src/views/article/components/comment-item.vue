<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="title.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ title.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{ liked: title.is_liking }"
        :icon="title.is_liking ? 'good-job' : 'good-job-o'"
        :loading="Commentloading"
        @click="onCommentLike"
      >
        {{ title.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ title.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ title.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', title)"
        >
          {{ "回复 " + title.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteCommentLikeAPI, addCommentLikeAPI } from "@/api";
export default {
  name: "CommentItem",
  components: {},
  props: {
    title: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      Commentloading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCommentLike() {
      console.log(this.title);
      this.Commentloading = true;

      try {
        // 判断 title.is_liking
        if (this.title.is_liking) {
          // 为真  取消点赞
          await deleteCommentLikeAPI(this.title.com_id);
          this.title.is_liking--;
        } else {
          // 为假   点赞
          await addCommentLikeAPI(this.title.com_id);
          this.title.is_liking++;
        }
        this.Commentloading = !this.Commentloading;
      } catch (error) {
        this.$toast("操作失败,请重试！ ");
      }

      this.Commentloading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .liked {
    color: #f2705e;
  }
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>