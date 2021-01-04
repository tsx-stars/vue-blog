export default [
  {
    name: 'operate',
    describe: '运营数据',
    children: [
      {
        name: 'sms-send',
        describe: '短信发送数据',
      },
      {
        name: 'failed-sms',
        describe: '失败短信管理',
      },
    ],
  },
  {
    name: 'customer',
    describe: '客户管理',
    children: [
      {
        name: 'channel-mapping',
        describe: '客户通道映射表',
      },
    ],
  },
  {
    name: 'bill',
    describe: '账单管理',
    children: [
      {
        name: 'customer-bill',
        describe: '客户账单数据',
      },
      {
        name: 'supplier-bill',
        describe: '供应商账单',
      },
    ],
  },
]
