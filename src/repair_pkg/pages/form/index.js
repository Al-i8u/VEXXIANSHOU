Page({
  data: {
    description: '',
    mobile: '',
    houseId: '',
    houseInfo: '',
    repairItemId: '',
    repairItemName: '',
    appointment: '',
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [

    ],

    repairItem: [],

    attachment: []
  },

  onLoad() {
    // 获取房屋列表
    this.getHouseList(),
      this.getRepairItem()
  },
  selectHouse(ev) {
    // 获取用户选择房屋的 id 和名称
    const { id: houseId,
      name: houseInfo } = ev.detail
    // 页面中渲染
    this.setData({ houseId, houseInfo })
  },
  selectRepairItem(ev) {

    // 获取用户选择的维修项目及 id
    const { name: repairItemName, id } = ev.detail
    this.setData({
      repairItemName,
      repairItemId: id
    })
  },
  selectTime(e) {
    console.log(e.detail)
    this.setData({
      dateLayerVisible: false, // 关闭选择时间弹层
      // appointTime: wx.utils.formatTime(e.detail)
      appointment: wx.utils.formatTime(e.detail)

    })
  },
  afterRead(ev) {
    // console.log(ev.detail.file)
    // 临时文件
    const { file } = ev.detail
    // 调用接口上传至服务器
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        Authorization: getApp().state.token,
      },
      success: (res) => {
        // 转换 json 数据
        const data = JSON.parse(res.data)
        // 上传完成需要更新
        const { attachment } = this.data
        attachment.push({ ...data.data })
        // 渲染数据
        this.setData({ attachment })
      },
    })
  },
  // 获取维修项目
  async getRepairItem() {
    // 请求数据接口
    const { code, data: repairItem } = await wx.http.get('/repairItem')
    // 检测接口返回的数据
    if (code !== 10000) return wx.utils.toast('获取维修项目失败!')
    // 数据渲染
    this.setData({ repairItem })
  },
  async submitForm() {
    // 解构获取接口需要的参数
    const { houseId, repairItemId, appointment, mobile, description, attachment } = this.data
    if (!houseId) return wx.utils.toast('请选择房屋信息!')
    if (!repairItemId) return wx.utils.toast('请选择维修项目!')
    if (!/^[1][3-8][0-9]{9}$/.test(mobile.trim())) return wx.utils.toast('请填写正确的手机号码!')
    if (!appointment) return wx.utils.toast('请选择预约日期!')
    if (!description.trim()) return wx.utils.toast('请填写问题描述!')
    console.log('校验过')
    // 请求数据接口
    try {
      await wx.http.post('/repair', { id, test: undefined, houseId, repairItemId, appointment, mobile, description, attachment })
      setTimeout(() => {
        wx.utils.toast('添加报修单成功！')
      }, 1000)
      wx.reLaunch({
        url: '/repair_pkg/pages/list/index',
      })
    } catch (error) {
      wx.utils.toast('添加报修失败！', 'error')
    }
    await wx.http.post('/repair', {
      houseId,
      repairItemId,
      appointment,
      mobile,
      description,
      attachment
    })
    // 跳转到表单列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  },

  // 获取房屋列表
  async getHouseList() {
    // 请求数据接口
    const { code, data: houseList } = await wx.http.get('/house')
    // 检测接口返回的结果
    if (code !== 10000) return wx.utils.toast('获取房屋列表失败!')
    // 数据渲染
    this.setData({ houseList })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
