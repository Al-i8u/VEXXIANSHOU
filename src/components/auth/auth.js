// components/auth/auth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否登录=》1. true 显示 slot 内容  2. false 不显示 slot 内容
    isLogin: false
  },
  lifetimes: {
    attached () {
      // 组件挂在后执行
      this.check()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 检测是否登录
    check () {
      /**
       * 从 app 中获取 token =》getApp()
       * 1. 有 token =》true 显示 slot 内容 
       * 2. 没有 token => false 不显示 slot 内容
       * 
       * 说明：!!值 =》
       * 1. 如果值是''、undefined、null =》返回 false
       * 2. 如果值存在的=》返回 true
       */

      let isLogin = !!getApp().state.token;
      // 1. 没有 token 接收的 slot内容不显示
      this.setData({
        isLogin
      })
      // 2. 没有 token跳回登录（必须）
      if (!isLogin) {
        const historyList = getCurrentPages()
        const currPath = historyList[historyList.length - 1].route
        wx.redirectTo({
          url: `/pages/login/index?redirecUrl=/${currPath}`
        });

      }

    }
  }
})