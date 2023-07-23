Page({
  data: {
    notifyList: []
  },
  onLoad () {
    // 2. 页面加载时调用接口获取数据
    this.getNotifyList()
  },
  // 1. 定义方法请求数据接口
  async getNotifyList () {
    // 请求数据接口
    const { code, data: notifyList } = await wx.http.get('/announcement')
    // 检测接口调用的结果
    if (code !== 10000) return wx.utils.toast()
    // 更新数据
    this.setData({ notifyList })
  },
})