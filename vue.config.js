module.exports = {
  // 选项...
  outputDir:'todo',
  baseUrl: './',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/api': {
        //是否允许跨域
        changeOrigin: true,
        target: 'https://cn.bing.com',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}