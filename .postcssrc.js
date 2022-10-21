// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      // rootValus: 37.5,
      // 配置要转换的css
      // *表示所有
      propList: ['*'],
      // 配置不需要转换的样式资源
      exclude: 'github-markdown'
    }
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

  }
}
