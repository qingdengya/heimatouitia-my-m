<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}/`">
    <div slot="title" class="van-multi-ellipsis--l2 title">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" class="cover-item-img"> </van-image>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count + "条评论" }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    >
    </van-image>
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  // 组件名称
  name: "ArticleItem",
  // 组件参数 接收来自父组件的数据
};
</script> 

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
    .cover-item-img {
      width: 100%;
      height: 146px;
    }
  }
}
</style>