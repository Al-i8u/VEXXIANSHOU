import http from 'wechat-http'

// 接口基础地址=> axios.create({baseURL:url})
http.baseURL = 'https://live-api.itheima.net'

// // 请求拦截器
// http.intercept.request = (options) => {
//   // 指定默认的头信息
//   const defaultHeader: AnyObject = {}
//   // 权限认证
//   defaultHeader.Authorization = 'Bearer token'
//   // 合并头信息
//   options.header = Object.assign({}, defaultHeader, options.header)
//   // 拦截器处理后的请求参数
//   return options
// }

// 响应拦截器
// http.intercept.response = ({ statusCode, data, config }) => {
//   console.log(statusCode) // http 响应状态码
//   console.log(config) // 发起请求时的参数
//   // 拦截器处理后的响应结果
//   return data
// }
http.intercept.response = (response) => {
  console.log('响应拦截器：', response)

  // 统一进行请求错误提示=》response.data.code !== 1e4
  if (response.data.code !== 1e4) {
    //  1. 请求失败了=> 提示
    wx.utils.toast(response.data.message, 'error')

    // 2. 阻断请求代码后续执行
    return Promise.reject(response.data)

  }
  // 拦截器处理后的响应结果=> 简化数据的返回，只返回 data
  return response.data
}


// 追加 http到 wx 全局对象中
// 说明：注意 wx 中已经存在一个叫 request的函数，不能重名
wx.http = http

