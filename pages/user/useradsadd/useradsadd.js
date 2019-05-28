// pages/user/useradsadd/useradsadd.js
const bases = require('../../../utils/base.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adrchange:true,
    adrs:{},
    region: ['浙江省', '杭州市', '拱墅区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.address){
      console.log(JSON.parse(options.address))
      this.setData({adrs: JSON.parse(options.address),adrchange:false})
    }else{
      console.log('没有')
    }
  },
  // 地址修改器
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //删除收货地址
  delectbtn:function(e){
    console.log(e.currentTarget)
    // bases.getrequst('api/address/delete', {id:adid}).then(function (res) {
    //   console.log(res)
    // })
  },
  //提交信息
  formSubmit:function(e){
    const openid = wx.getStorageSync('openid')
    const formif = e.detail.value
    const region = this.data.region
    const adrchange = this.data.adrchange
    const that = this
    if(!formif.username){
      wx.showToast({title: '收件人不能为空',icon: 'loading',duration: 500})
    }else if (!formif.address){
      wx.showToast({ title: '详细地址不能为空', icon: 'loading', duration: 500 })
    }else if (!formif.phone) {
      wx.showToast({ title: '手机号不能为空', icon: 'loading', duration: 500 })
    }else if (!(/^1(3|4|5|7|8)\d{9}$/.test(formif.phone))) {
      wx.showToast({ title: '手机号号格式有误', icon: 'loading', duration: 500 })
    }else{
      const data = { openid: openid, username: formif.username, phone: formif.phone, 
        province: region[0], city: region[1], area: region[2], detail: formif.address,selected:1}
      // 判断是修改，还是添加
      if (adrchange){
        bases.postrequst('api/address/add', data).then(function (res) {
          console.log(res)
        })
      }else{
        data.id = that.data.adrs.id
        //console.log(data)
        bases.postrequst('api/address/edit',data).then(function (res) {
          console.log(res)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})