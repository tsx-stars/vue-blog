const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin') //gzip压缩

const { name, version, author } = require('./package.json')
const moment = require('moment')
process.env.VUE_APP_NAME = name
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_UPDATE_TIME = moment().format('YYYY/MM/DD HH:mm:ss')
process.env.VUE_APP_AUTHOR = author

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  devServer: {
    port: 9900, // 启动端口
    open: true, // 启动后是否自动打开网页
    proxy: {
      '/my': {
        target: 'http://106.15.44.158:8080', // 后台接口域名
        // ws: true, //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/my': '',
        },
      },
      '/zsk': {
        target: 'https://itsm2016.hundsun.com',
        changeOrigin: true,
        pathRewrite: {
          '^/zsk': '',
        },
      },
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
          // utils: path.join(__dirname, 'src/utils'),
        },
      },
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    config.when(process.env.NODE_ENV === 'production', (config) => {
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
      // config.performance.set('hints', false)
      // config.devtool('none')
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
