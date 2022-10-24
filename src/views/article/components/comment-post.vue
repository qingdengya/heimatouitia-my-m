<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="addCommet" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentAPI } from "@/api";
export default {
  name: "CommentPost",
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },

  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addCommet() {
      try {
        const { data } = await addCommentAPI({
          target: this.target.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, //评论内容
          art_id: this.articleId ? this.articleId.toString() : null, //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        this.message = "";
        // console.log(data);
        this.$emit("closePopup", data.data);
        this.$toast.success("已发布");
      } catch (error) {
        this.$toast("发布失败请稍候再试!");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
