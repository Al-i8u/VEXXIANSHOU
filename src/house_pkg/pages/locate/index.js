// house_pkg/pages/locate/index.ts
// 导入腾讯位置服务实例
import qqMap from '../../../utils/qqmap'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    // 附近小区列表
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 页面加载立即获取用户位置信息
    this.getUserPosition()
  },

  // 获取用户的位置信息(自动)
  async getUserPosition () {
    // 说明：latitude（纬度） + longitude（经度）= 定位地球🌍上任何一个位置
    // 场景：将来可以根据经纬度利用  腾讯LBS服务获取位置附近的服务=》1.转换地址    2. 饭馆、酒店、好玩、社区等
    const { latitude, longitude } = await wx.getLocation()
    console.log('用户的位置信息：', latitude, longitude)
    this.getPonit(latitude, longitude)
  },
  // 选择位置信息（手动）
  async choosePosition () {
    const { latitude, longitude } = await wx.chooseLocation();
    console.log('选择的位置信息：', latitude, longitude)
    this.getPonit(latitude, longitude)
  },
  // 根据经纬度坐标结合腾讯位置服务方法解析地址
  /**
   * 
   * @param {*} latitude 纬度
   * @param {*} longitude 经度
   */
  getPonit (latitude, longitude) {
    // 解析前显示 loading
    wx.showLoading({
      title: '位置解析中...',
      mask: true,
    })
    // 1. 根据定位解析地址
    qqMap.reverseGeocoder({
      // 要解析的坐标
      location: {
        latitude,
        longitude
      },
      success: (res) => {//成功后的回调
        console.log('解析后的地址：', res.result.address);
        // 存储解析的地址
        this.setData({
          address: res.result.address
        })
      },
      fail: function (error) {
        console.error('解析失败：', error);
      },
      complete: function () {

      }
    })
    // 2. 根据定位获取附近的小区
    qqMap.search({
      keyword: '小区',  //搜索关键词
      //设置周边搜索中心点
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        //搜索成功后的回调
        console.log('搜索结果：', res.data)
        const list = res.data.map(({ id, title }) => ({ id, title }))
        console.log('处理后的结果：', list)
        this.setData({
          list
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
        // 成功或失败都会执行
        wx.hideLoading();
      }
    })
  },
  // 跳转选择楼号页面
  goBuilding (e) {
    console.log('获取 mark 的参数值：', e.mark.point)
    // 选择楼号页面需要显示当前点击的小区名
    wx.navigateTo({
      url: `/house_pkg/pages/building/index?point=${e.mark.point}`
    });
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