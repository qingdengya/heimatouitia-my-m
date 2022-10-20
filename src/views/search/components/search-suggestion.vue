<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(e, i) in SahSuggestion"
      :key="i"
      icon="search"
      clickable
      @click="$emit('search', e)"
    >
      <div slot="title" v-html="highlight(e)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from "@/api";
// 导入鲁大师
import { debounce } from "lodash";
export default {
  // 组件名称
  name: "searchSuggestion",
  // 组件参数 接收来自父组件的数据
  props: {
    // 父组件输入框的内容
    searchText: {
      type: String,
      required: true,
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      SahSuggestion: [], //联想建议数组
      htmlStr: "Hello <span style='color: red'>World</span>",
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    searchText: {
      // 当searchText发送改变回调用 handler函数
      // 注意handler 函数是固定的

      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
        // console.log(value);
      }, 500),

      immediate: true, //立即调用
    },
  },
  // 组件方法
  methods: {
    async loadSearchSuggestions(q) {
      // console.log(value);
      // 发请求拿数据
      try {
        const { data } = await getSearchSuggestionAPI(q);
        // console.log(data);
        // this.SahSuggestion = data.data.options;
        data.data.options[0]
          ? (this.SahSuggestion = data.data.options)
          : (this.SahSuggestion = [this.searchText]);
        // console.log(this.SahSuggestion);
      } catch (e) {
        this.$toast("获取联想建议失败,请稍后再试");
      }
    },
    highlight(text) {
      // 正则表达式  //中间的内容都会被挡住匹配字符串来使用, 而不是数据变量
      // 如果需要根据变量来动态创建正则表达式,则需要手动 new RegExp 一个正则的构造函数
      // new  RegExp 正则表达式的构造函数
      // 参数1:匹配模式字符串,,它会根据这个字符串创建正则对象
      // 参数2: 匹配模式,要写到字符串中
      const highlightStr = `<span style='color:#3194fa'>${this.searchText}</span>`;
      const reg = RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
};
</script> 

<style scoped lang="less">
</style>