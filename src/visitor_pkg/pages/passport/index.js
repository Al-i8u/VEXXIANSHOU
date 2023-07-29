Page({
  onShareAppMessage () {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: this.data.url,
    }
  },
  async saveImg () {
    const res = await wx.api.wx.getImageInfo({
      src: 'this.data.url',
      success: (result) => { '1' },
      fail: (res) => { '2' },
      complete: (res) => { '3' },
    })
    console.log("图片信息：", res.path);
    const result = await wx.saveImageToPhotosAlbum({
      filePath: 'res.path',
    })
    console.log("保存结果：", result);
    wx.utils.toast('保存成功')
  },
  onLoad ({ id }) {
    this.getDetal(id)

  },
  async getDetal (id) {
    const { data } = await wx.http.get(`/visitor/${id}`)
    console.log("访客详情：", data)
    this.setData({ ...data })
  }
})
