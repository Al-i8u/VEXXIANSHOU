Page({
  data: {
    // 双向绑定不支持对象变量
    formData: {
      name: '', // 屋主名字
      mobile: '', // 屋主手机
    },
    // 上个页面带过来的：小区名+楼号+房间号
    point: '', // 小区名
    building: '', // 楼号
    room: '', // 房间号
    gender: 1, // 性别: 1 男 ｜ 0 女性
    name: '', // 屋主名字
    mobile: '', // 屋主手机
    // 身份证正反照片
    // idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardFrontUrl: '',

    idcardBackUrl: '',
  },
  onLoad ({ point, building, room }) {
    this.setData({
      point, building, room
    })
  },
  // 上传身份证正反面
  async uploadImg (e) {
    console.log('上传的是：', e.mark.type)
    // 1. 使用wx.chooseMedia拍照或选择相册图片
    const res = await wx.chooseMedia({
      count: 1, // 只能选择1张图片
      mediaType: ['image'], // 只能选择图片类型
      sizeType: ['compressed'], // 默认为压缩模式
    })
    console.log('拍照或选择的结果：', res.tempFiles[0].tempFilePath)
    // 2. 使用
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: res.tempFiles[0].tempFilePath,
      name: 'file',
      // 上传需要单独添加 header
      header: {
        Authorization: getApp().state.token,
      },
      success: (result) => {
        const { code, data } = JSON.parse(result.data)
        console.log('上传结果：', data, code)
        if (code !== 1e4) {
          if (code === 401) {
            // 1. 获取访问页面的历史记录
            const historyList = getCurrentPages();
            // 2. 当前页面的地址=> 历史记录中最后一个
            const currPath = historyList[historyList.length - 1].route
            wx.navigateTo({
              url: `/pages/login/index?redirectUrl=/${currPath}`,
            });
          }

          return wx.utils.toast('上传失败！')
        }
        // 回显返回的上传地址
        this.setData({
          [e.mark.type]: data.url
        })

      },
      fail: () => {
      },
      complete: () => { }
    });

  },
  async goList () {
    /**
     * 新增房屋：
     * 1. 表单双向绑定
     * 2. 校验通过
     * 3. 通过后调用后台 api 新增
     */
    const { point, building, room, gender, name, mobile, idcardFrontUrl, idcardBackUrl } = this.data
    if (!/^[\u4e00-\u9fa5]{2,5}$/.test(name)) return wx.utils.toast('姓名格式错误！')
    if (!/^[1][3-8][0-9]{9}$/.test(mobile)) return wx.utils.toast('手机号格式错误！')
    if (!idcardFrontUrl || !idcardBackUrl) return wx.utils.toast('请上传完整的身份信息！')
    console.log('校验通过')
    await wx.http.post('/room', { point, building, room, gender, name, mobile, idcardFrontUrl, idcardBackUrl })
    // 新增成功后跳转房屋列表页面=》 reLaunch跳转会关闭所有页面，打开到应用内的某个页面
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture (ev) {
    // 移除图片的类型（身份证正面或反面）
    // 说明：type 对应的是： idcardFrontUrl ｜ idcardBackUrl
    const type = ev.mark.type
    // 说明：对象的 key 可以使用[变量]
    this.setData({ [type]: '' })
  },
})
