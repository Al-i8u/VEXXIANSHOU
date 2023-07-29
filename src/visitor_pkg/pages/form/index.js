import dayjs from "dayjs";
Page({
  data: {
    houseId: '', // 访问房屋的 id
    houseName: '',
    dateLayerVisible: false,
    houseLayerVisible: false,
    maxDate: dayjs().add(2, 'day').valueOf(), // 最大可选时间
    minDate: Date.now(), // 最小可选时间
    currDate: Date.now(),
    visitDate: '',// 当前选中时间
    houseList: [
      // { name: '北京西三旗花园1号楼 101' },
      // { name: '北京东村家园3号楼 302' },
      // { name: '北京育新花园3号楼 703' },
      // { name: '北京天通苑北苑8号楼 403' },
    ],
  },
  onLoad () {
    this.getHouseList()
  },
  onSelect (e) {
    console.log('选中小区的信息：', e.detail);
    this.setData({ houseId: e.detail.id, houseName: e.detail.name })
  },
  selectDate (e) {
    console.log('选中的时间:', e.detail)
    // visitDate格式：2023-07-28
    this.setData({
      visitDate: wx.utils.formatTime(e.detail),

      dateLayerVisible: false
    })
  },
  async getHouseList () {
    const { data } = await wx.http.get('/house')
    console.log('获取访问房屋列表：', data);
    this.setData({ houseList: data })
  },
  openHouseLayer () {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer () {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer () {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer () {
    this.setData({ dateLayerVisible: false })
  },
  goPassport () {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
