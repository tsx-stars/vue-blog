module.exports = {
  lintOnSave: false,
  outputDir: 'vue-blog',
  devServer: {
    port: 9999, // 启动端口
    open: true, // 启动后是否自动打开网页
    proxy: {
      '/dev': {
        //target: 'http://127.0.0.1:12306', // 后台接口域名
        target: 'http://106.15.44.158:12306', // 后台接口域名
        // ws: true, //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
}
