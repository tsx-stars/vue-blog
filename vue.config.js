const path = require('path')
function mockServer() {
  if (process.env.NODE_ENV === 'development') {
    return require('./mock/mockServer.js')
  } else {
    return ''
  }
}

module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  devServer: {
    port: 9999, // 启动端口
    open: true, // 启动后是否自动打开网页
    proxy: {
      '/dev': {
        target: 'http://106.15.44.158:12306', // 后台接口域名
        // ws: true, //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/dev': '',
        },
      },
    },
    after: mockServer(),
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
          '^': path.join(__dirname, 'src/components'),
        },
      },
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/common.scss";',
      },
    },
  },
}
