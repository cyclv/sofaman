let app = getApp();
var bases = require('../../../utils/base.js');
Page({
  data: {
    api: app.globalData.hpUrl,
    userinfo: wx.getStorageSync("userinfo"),
    status: 0,
    phone: true,
    yzphone:''
  },
  // yzm
  yzm:function(){
    var phone = this.data.yzphone
    console.log(phone)
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      wx.showToast({title: '电话号码有误',icon: 'loading',duration: 500})
    }else{
      bases.postrequst('api/sms',{openid:wx.getStorageSync('openid'),phone:phone}).then(function (res){
        console.log(res)
      })
    }
  },
  // 提交表单
  formsubmit: function (e) {
    console.log(e.detail.value)
    fromdt = e.detail.value
    let name = e.detail.value.name;
    let phone = e.detail.value.phone;
    let plate = e.detail.value.plate;
    let that = this;
    if (name.length == 0 || phone.length == 0) {
      wx.showToast({
        title: '输入不能为空',
        icon: "loading",
        duration: 500
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      wx.showToast({
        title: '电话号码有误',
        icon: 'loading',
        duration: 500
      })
    } else {
      let user = wx.getStorageSync("userinfo");
      // bases.postrq('Wx/saveuinfo', { id: user.id, name: name, phone: phone }).then(function (res) {
      //   //console.log(res.data)
      //   if (res.data) {
      //     wx.setStorageSync("userinfo", res.data);
      //     that.setData({ status: 0, userinfo: res.data })
      //     wx.showToast({ title: '修改成功', icon: 'success', duration: 500 })
      //   } else {
      //     wx.showToast({ title: '系统出错', icon: 'error', duration: 500 })
      //   }
      // })
    }
  },
  onLoad: function (options) {
    let user = wx.getStorageSync("userinfo");
    console.log(user)
    if (user.phone) {
      this.setData({ phone: true })
    } else {
      ///console.log('没有手机号')
      this.setData({ phone: false})
    }
  },
  // 存储手机号
  gitphone:function(e){
    this.setData({ yzphone: e.detail.value})
  },
  changeinfo: function () {
    this.setData({status: 1})
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 绑定手机号
  getphone: function (e) {
    var that = this;
    let fromdt = e.detail.value;
    var phone = e.detail.value.phone;
    console.log(e.detail.value)
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      wx.showToast({
        title: '电话号码有误',
        icon: 'loading',
        duration: 500
      })
    }else {
      var data = {openid:wx.getStorageSync('openid'), username: fromdt.name, sms_code: fromdt.yzm, phone: phone }
      console.log(data)
        bases.postrequst('api/bind',data).then(function (res) {
          console.log(res)
          if (res.code == 200) {
            wx.setStorageSync("userinfo", res.data);
            that.setData({ phone: true, userinfo: res.data })
            wx.showToast({title: '修改成功',icon: 'loading',duration: 500})
          } else {
            wx.showToast({title: '系统出错',icon: 'loading',duration: 500})
          }
        })
    }
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