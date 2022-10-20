<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- 搜索历史头部 -->
      <div v-if="isDeleteShow">
        <span @click="allDelte">全部删除</span>
        &nbsp; &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"> </van-icon>
    </van-cell>
    <!-- 搜索历史内容 -->
    <van-cell
      v-for="(e, i) in searchHistories"
      :key="i"
      :title="e"
      clickable
      @click="onSearchItemClick(e, i)"
    >
      <van-icon name="close" v-if="isDeleteShow"> </van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "searchHistory",
  // 组件参数 接收来自父组件的数据
  props: {
    searchHistories: {
      type: Array,
      required: true,

      // Prop数据
      //  Prop是受父组件数据影响的
      // 如果是普通数据(数字 字符串 布尔值) 绝对不能修改  修改了也不会传导给父组件
      // 如果是引用类型数据（数组 对象）
      // 可以修改，例如[].push
      // 不能重新赋值
    },
  },

  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      isDeleteShow: false,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onSearchItemClick(e, i) {
      if (this.isDeleteShow) {
        // 删除历史记录
        this.searchHistories.splice(i, 1);
      } else {
        // 非删除状态  直接进行搜索
        this.$emit("search", e);
      }
    },
    allDelte() {
      this.$emit("allDelte");
    },
  },
};
</script> 

<style scoped lang="less">
</style>