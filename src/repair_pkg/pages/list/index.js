Page({
  data: {
    list: []
  },
  onShow () {
    this.getList()
  },
  // 获取报修单列表
  async getList () {
    const { data: { rows } } = await wx.http.get('/repair')
    console.log('报修列表：', rows)
    this.setData({
      list: rows
    })
  },
  goDetail (ev) {
    wx.navigateTo({
      url: '/repair_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },
  addRepair () {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index',
    })
  },
})
