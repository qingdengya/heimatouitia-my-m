<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <span class="iconfont toutiao-dianzan"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <div class="aa">66</div>
  </div>
</template>

<style lang="less">
.aa {
  background-color: pink;
  width: 750px;
  height: 608px;
}
</style>
