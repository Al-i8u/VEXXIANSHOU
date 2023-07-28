// house_pkg/pages/building/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上个页面选择的小区名字
    point: '',
    // 随机生成的楼号数量
    counts: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad ({ point }) {
    console.log('当前选择小区名：', point)
    // this.setData({
    //   point
    // })
    this.mock(point)
  },
  mock (point) {
    // 控制随机生成几个楼号
    const counts = Math.floor(Math.random() * 10 + 5)
    this.setData({
      counts,
      point
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})