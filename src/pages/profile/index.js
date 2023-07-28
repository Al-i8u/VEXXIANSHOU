// pages/profile/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {
      avatar: '',
      nickName: ''
    }
  },
  /**
   * 1. 获取微信用户头像
   * 2. 调用wx.uploadFile上传图片/word等
   * @param {*} ev 
   */
  getUserAvatar (ev) {
    // 调用接口上传图片
    wx.uploadFile({
      // 后台上传 api 地址
      url: wx.http.baseURL + '/upload',
      // 上传图片地址（主要参数）
      filePath: ev.detail.avatarUrl,
      // 上传图片参数名=》看后台文档
      name: 'file',
      // 上传需要单独添加 header
      header: {
        Authorization: getApp().state.token,
      },
      // 上传额外的参数
      formData: {
        type: 'avatar',
      },
      success: (res) => {
        // 转换 json 数据
        const data = JSON.parse(res.data)
        // 检测接口调用结果
        if (data.code !== 1e4) return wx.utils.toast('更新头像失败!')

        // 保存并预览图片地址
        this.setData({ 'userInfo.avatar': data.data.url })
      },
    })
  },
  // 获取微信用户昵称
  async getNickName (e) {
    console.log(e)
    // 1. 调用接口存储到数据库
    await wx.http.put('/userInfo', { nickName: e.detail.value })
    // 2. 存到 data 变量中
    this.setData({
      'userInfo.nickName': e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 从本地获取我的存储的用户信息=》回填
    this.setData({
      userInfo: wx.getStorageSync('x-userInfo')
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