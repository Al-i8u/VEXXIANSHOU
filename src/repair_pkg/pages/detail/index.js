// map.js
// 导入腾讯lbs服务的sdk(方法合集)
import qqmap from "../../../utils/qqmap"
Page({
  data: {
    // 说明：经度+维度 标记地图中具体的一个位置
    latitude: 40.162796, // 纬度
    longitude: 116.629468, // 经度
    // 在地图上可视化标记经纬度
    markers: [
      {
        id: 1,
        // 自定义图标的经纬度
        latitude: 40.162828, // 纬度
        longitude: 116.6294, // 经度
        // 在当前指定的位置上显示自定义的图标
        width: 20,
        height: 20,
        // 图标的路径：支持本地图片/网络图片
        iconPath: '/static/images/marker.png',
      },
      {
        id: 2,

        latitude: 40.15916, // 纬度
        longitude: 116.63083, // 经度
        iconPath: 'https://img2.baidu.com/it/u=1524735825,523459233&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690736400&t=71cea0564a7aa91d2be62303a0ea25fa'

      }
    ],
  },
  onLoad ({ id }) {
    // 获取维修详情
    this.getRepairDetail(id)
  },
  goEdit () {
    wx.navigateTo({
      url: `/repair_pkg/pages/form/index?id=${this.data.id}`
    });

  },
  async getRepairDetail (id) {
    // 请求数据接口
    const { data } = await wx.http.get('/repair/' + id)
    // 测试使用
    // data.status = 2

    // 渲染报修详情
    this.setData({ ...data })
    // 说明：正常上门中状态的报修单data中，应该返回from和to经纬度坐标（没有返回）
    if (data.status === 2) {
      this.createPl()
    }
  },
  // 在地图上绘制维修工上门的路线
  createPl () {

  },
  // 受理中状态才能点击取消报修
  cancleRepair () {
    wx.showModal({
      title: '确认',
      content: '亲，确认取消报修吗？',
      success: async (result) => {
        if (result.confirm) {
          // 点击确定
          console.log('点击确定')
          await wx.http.put(`/cancel/repaire/${this.data.id}`)
          // 返回列表
          wx.navigateBack();

        }
      },
      fail: () => { },
      complete: () => { }
    });

  },
})
