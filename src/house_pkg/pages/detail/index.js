Page({
  onLoad ({ id }) {
    // 获取房屋详情
    this.getHouseDetail(id)
  },
  async getHouseDetail (id) {
    if (!id) return
    // 请求数据接口
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    // 检测接口返回的结果
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ ...houseDetail })
  },
})