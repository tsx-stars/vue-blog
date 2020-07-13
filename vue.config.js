const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin') //gzip压缩

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') //查看打包时间
const smp = new SpeedMeasureWebpackPlugin()

const { name, version, author, email } = require('./package.json')
const moment = require('moment')
process.env.VUE_APP_NAME = name
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_UPDATE_TIME = moment().format('YYYY/MM/DD HH:mm:ss')
process.env.VUE_APP_AUTHOR = author
process.env.VUE_APP_EMAIL = email

function mockServer() {
  if (process.env.NODE_ENV === 'development' || true) {
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
    let config = {
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
          '^': path.join(__dirname, 'src/components'),
        },
      },
    }
    if (process.env.NODE_ENV === 'production') {
      return smp.wrap(config)
    } else {
      return config
    }
  },
  chainWebpack(config) {
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    })
    //gzip压缩
    config
      .plugin('compression')
      .use(CompressionWebpackPlugin, [
        {
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 1024,
          deleteOriginalAssets: false, // 删除源文件
          minRatio: 0.8,
        },
      ])
      .end()
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
    })
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },
}
