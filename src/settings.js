module.exports = {
  // 代理
  // proxy: '/ljn',
  proxy: '/157:8087',
  // proxy: '/40:8087',

  //mock相关
  startUpMock: true, //是否启用mock
  partialImport: true, //是否按需导入mock
  needMockList: [
    //需要按需导入的mock,开启partialImport后生效
    // '',
  ],
}
