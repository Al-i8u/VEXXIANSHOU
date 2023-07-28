import http from 'wechat-http'
console.log('http:', http)
// 接口基础地址=> axios.create({baseURL:url})
http.baseURL = 'https://live-api.itheima.net'

// 请求拦截器
http.intercept.request = (options) => {
  // console.log('请求参数：', options)
  /**
   * 统一添加 token：
   * 1. 获取 token
   * 2. 向options中追加请求头：Authorization = Bearer {{token}}
   */
  const token = getApp().state.token
  if (token) {
    options.header = {
      Authorization: token
    }
    // options.header.Authorization = token
  }

  // 拦截器处理后的请求参数
  return options
}

// 响应拦截器
// http.intercept.response = ({ statusCode, data, config }) => {
//   console.log(statusCode) // http 响应状态码
//   console.log(config) // 发起请求时的参数
//   // 拦截器处理后的响应结果
//   return data
// }
http.intercept.response = (response) => {
  // console.log('响应拦截器：', response)

  // 统一进行请求错误提示=》response.data.code !== 1e4
  if (response.data.code !== 1e4) {
    //  1. 请求失败了=> 提示
    wx.utils.toast(response.data.message, 'error')
    if (response.data.code === 401) {
      // 需求：跳转的时候携带当前访问页面的地址，跳到登录=》重新登录成功后，调回上次访问页面
      // 怎么获取当前访问页面路由地址?
      // 1. 获取访问页面的历史记录
      const historyList = getCurrentPages();
      // 2. 当前页面的地址=> 历史记录中最后一个
      const currPath = historyList[historyList.length - 1].route

      wx.redirectTo({
        url: `/pages/login/index?redirectUrl=/${currPath}`
      });
    }

    // 2. 阻断请求代码后续执行
    return Promise.reject(response.data)

  }
  // 拦截器处理后的响应结果=> 简化数据的返回，只返回 data
  return response.data
}


// 追加 http到 wx 全局对象中
// 说明：注意 wx 中已经存在一个叫 request的函数，不能重名
wx.http = http
wx.http.baseURL = http.baseURL
