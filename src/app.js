// app.js
// 2. 只执行 utils 目录下 index.js模块，让 wx 追加属性生效
import './utils/index'
import './utils/http'
App({
  // 小程序第一次本打开执行一次，然后小程序会被缓存 5 分钟=》过期销毁后，再次打开小程序，会在执行一次
  onLaunch() {
    this.getToken()
  },
  // 定义小程序全局数据和方法=》类似 vuex
  state: {
    // 将来登录成功后把后台返回的 token 存到 state对象
    // 作用：页面中获取 token=》1. 有=》登录了 2. 没有=》没登录，跳转登录页
    token: '',
    // 项目中所有 tabBar 页面的地址
    tabBarList: [
      '/pages/index/index',
      '/pages/my/index'
    ]
  },
  /**
   * 是否是 tabBar 页面
   * @param {*} url 跳转页面的地址
   * return true 是tabBar页面 ｜ false 不是tabBar页面
   */
  isTabBar(url) {
    return this.state.tabBarList.includes(url)
  },
  // 获取 token
  getToken() {
    // 使用异步获取本地数据方法=》不阻塞
    wx.getStorage({
      key: 'x-token',
      success: (result) => {
        console.log('获取 token:', result)
        // 存到全局变量中
        this.state.token = result.data
      }
    });

  },
  // 存储 token => 将来登录成功后调用
  /**
   * 
   * @param {*} token 
   */
  setToken(token) {
    // 1. 存到 state 中
    this.state.token = `Bearer ${token}`
    // 2. 持久化到本地
    wx.setStorageSync('x-token', this.state.token);
  }

})
