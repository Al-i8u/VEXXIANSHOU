/**
 * 封装工具函数
 * 技巧：
 * 1. 通过一个对象集中封装管理函数
 * 2. 统一导出使用
 * 好处：
 * 集中管理和维护
 */

const utils = {
  // 封装工具函数的地儿
  test: 1,
  // es5定义函数写法
  fn: function () {
    console.log(123)
  },
  // es6定义函数写法(推荐)
  // 基于微信showToast二次封装=》更好用=》提高开发效率
  toast (title, icon = 'none') {
    wx.showToast({
      title,
      icon,
      duration: 1500,
      mask: true
    });

  }
}

//  1. wx是一个全局对象,可以向这个对象里边追加属性存值
wx.meng = 1e4
wx.utils = utils

export default utils