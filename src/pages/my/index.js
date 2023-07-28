Page({
  data: {
    // 用户信息
    userInfo: {
      avatar: '',
      nickName: ''
    }

  },
  onShow () {
    this.getUser()
  },
  goLogin () {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  async getUser () {
    const { data } = await wx.http.get('/userInfo')
    console.log('用户信息：', data)
    this.setData({
      userInfo: {
        avatar: data.avatar,
        nickName: data.nickName
      }
    })
    // 本地存储一份=》修改信息页面获取使用（复用）
    wx.setStorageSync('x-userInfo', data);

  },
})
