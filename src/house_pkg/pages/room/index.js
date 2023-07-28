// house_pkg/pages/room/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    building: '',
    rooms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad ({ point, building }) {
    this.mock(point, building)
  },
  mock (point, building) {
    // 生成的房间号
    const rooms = []
    for (let index = 0; index < 10; index++) {
      rooms.push(Math.floor(Math.random() * 900 + 100))
    }
    console.log('随机生成的房间号：', rooms)
    this.setData({
      point,
      building,
      rooms
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