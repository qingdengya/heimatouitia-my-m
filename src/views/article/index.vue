<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="returnToPreviousMenu"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="artice.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ artice.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="artice.aut_photo"
          />
          <div slot="title" class="user-name">{{ artice.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ artice.pubdate | relativeTime }}
          </div>
          <!-- 模板中 的$event 是事件参数 


            当我们传递给子组件的数据既要使用还要修改
             传递:props
             修改:自定义事件
                  @update-is_followed="artice.is_followed = $event"
             简写方式:在组件上使用v-midel
               value = "artice.is_followed"
               @input = "artice.is_followed = $event"
          
          
          
          -->
          <FollowUser
            class="follow-btn"
            v-model="artice.is_followed"
            :id="artice.aut_id"
          ></FollowUser>
          <!-- <van-button
            v-if="artice.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followedloading"
            @click="followed"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followedloading"
            @click="followed"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="artice.content"
          ref="article-content"
        ></div>
        <van-divider>到底了~~</van-divider>

        <!-- 文章评论 -->
        <CommentLists
          :articel-id="artice.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          :list="commentList"
          @reply-click="onReplyShow"
        ></CommentLists>
        <!-- 文章评论 -->

        <!-- 底部区域 -->

        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- 收藏组件 -->
          <!-- <van-icon color="#777" name="star-o" /> -->
          <CollectArticle
            class="btn-item"
            v-model="artice.is_collected"
            :articel-id="artice.art_id"
          ></CollectArticle>
          <!-- 收藏组件 -->

          <!-- 点赞组件 -->
          <LikeArticle v-model="artice.attitude" :articel-id="artice.art_id">
          </LikeArticle>
          <!-- 点赞组件 -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :target="artice.art_id"
            @closePopup="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- 发布评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 发布评论弹出层 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArtice">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" style="height: 100%" position="bottom">
      <!-- v-if 条件渲染   true:渲染元素节点 false:不渲染 -->
      <commentReply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></commentReply>
    </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>
import { getAeticleByIdAPI } from "@/api";
import "@/css/github-markdown.css";

// 加载图片预览插件
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import CommentLists from "@/views/article/components/comment-list.vue";
import CommentPost from "@/views/article/components/comment-post";
import commentReply from "@/views/article/components/comment-reply";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentLists,
    CommentPost,
    commentReply,
  },
  // 给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      artice: {}, //文章详情
      loading: true,
      errStatus: 0, //失败状态码
      followedloading: false,
      totalCommentCount: 0,
      isPostShow: false, //控制发布评论的显示状态
      commentList: [], //评论列表
      isReplyShow: false, //控制回复评论的显示状态
      currentComment: {}, //当前点击回复评论项
    };
  },

  created() {
    // 调用
    this.loadArtice();
  },
  methods: {
    async loadArtice() {
      this.loading = true;
      try {
        // // 模拟加载失败
        // if (Math.random() > 0.2) {
        //   JSON.parse("大大大大大大");
        // }
        const { data } = await getAeticleByIdAPI(this.articleId);
        // console.log(data);
        this.artice = data.data;
        // this.loading = false;
        console.log(this.artice);
        // 初始化图片点击预览

        // console.log(this.$refs["article-content"]);

        setTimeout(() => {
          this.previewImaage();
        }, 0);
      } catch (e) {
        // this.loading = false;
        // this.$toast("获取失败请稍后再试!");
        if (e.response && e.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false; //无论获取成功还是失败,都要关闭loading
    },
    // 得到所有的IMGe节点
    previewImaage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      // 获取所有 img 地址
      const images = [];
      // console.log(imgs);
      imgs.forEach((img, i) => {
        // console.log(img.src);
        images.push(img.src);
        // 给每个img 注册点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: i,
          });
        };
      });
    },
    returnToPreviousMenu() {
      this.$router.back();
    },
    // // 取消关注
    // async followed() {
    //   this.followedloading = true; //展示关注按钮的loading 状态
    //   try {
    //     if (this.artice.is_followed) {
    //       // 已关注 取消关注
    //       await cancelfollowedAPI(this.artice.aut_id);

    //       this.$toast("取消关注成功");
    //       // this.artice.is_followed = false;
    //     } else {
    //       // 没有关注 添加关注
    //       await addfollowedAPI(this.artice.aut_id);

    //       this.$toast("关注成功");
    //       // this.artice.is_followed = true;
    //     }
    //     this.artice.is_followed = !this.artice.is_followed;
    //   } catch (e) {
    //     let msg = "操作失败,请重新再试! ";
    //     if (e.response && e.response.status === 400) {
    //       msg = "你不能关注你自己";
    //     }

    //     // 失败
    //     this.$toast(msg);
    //   }
    //   this.followedloading = false;
    // },
    onPostSuccess(data) {
      this.isPostShow = false;
      // console.log(data.new_obj.content);
      this.commentList.unshift(data.new_obj);
    },
    onReplyShow(comment) {
      this.isReplyShow = true;
      this.currentComment = comment;
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  /deep/ .page-nav-bar {
    background-color: #2892ff;
    .van-nav-bar__title,
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
