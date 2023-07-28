const app = getApp()


Page({
  data: {
    // 是否显示倒计时：true 显示就自动开始倒计时 ｜ false 不显示
    isShow: false,
    mobile: '1329322948',
    code: ''
  },
  /**
   * 获取验证码
   */
  async getCode () {
    /**
     * 1. 校验手机号格式
     * 2. 校验通过后，调用后台 api 发送验证码
     * 2. 开启倒计时（60s）,60s 内不能重复发送
     * /^[1][3-8][0-9]{9}$/
     */
    const { mobile } = this.data
    if (!/^[1][3-8][0-9]{9}$/.test(mobile)) return wx.utils.toast('手机号格式错误！')
    console.log('发送验证码')
    const { data } = await wx.http.get('/code', { mobile })
    // 注意实际开发：验证码发送到用户填写的手机上
    console.log('验证码数据：', data.code)
    // 测试：把返回的验证码存到系统的粘贴板=>复制
    // wx.setClipboardData({
    //   data: data.code
    // })
    // 开始倒计时
    this.setData({
      isShow: true,
      code: data.code
    })

  },
  // 倒计时结束执行
  finished () {
    // 不显示倒计时
    this.setData({
      isShow: false
    })
  },
  async loginer () {
    const { mobile, code } = this.data
    if (!/^[1][3-8][0-9]{9}$/.test(mobile)) return wx.utils.toast('手机号格式错误！')
    if (!/^\d{6}$/.test(code)) return wx.utils.toast('验证码为6位数字！')
    const { data } = await wx.http.post('/login', { mobile, code })
    // 存储 token 到全局
    app.setToken(data.token)

    if (this.redirectUrl) {
      if (app.isTabBar(this.redirectUrl)) {
        wx.switchTab({
          url: this.redirectUrl,
        })
      } else {
        wx.navigateTo({
          url: this.redirectUrl,
        })
      }
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})
