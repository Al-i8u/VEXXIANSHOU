import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({
  data: {
    houseList: []
  },
  onShow () {
    // 获取房屋列表
    this.getHouseList()
  },
  async getHouseList () {
    // 请求数据接口
    const { data: houseList } = await wx.http.get('/room')
    // 渲染数据
    this.setData({ houseList })
  },
  deleteHouse (ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      Dialog.confirm({
        message: '确定删除吗？',
      }).then(async () => {
        console.log('确定：')
        await wx.http.delete('/room/' + ev.mark.id)
        this.getHouseList()
      }).catch(() => {
        console.log('取消：')
      })
      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail (ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse () {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
