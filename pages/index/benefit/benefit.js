// pages/index/benefit/benefit.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    benefit: [{ id: 1, price: 10, mprice: 200 }, {id:2,price:10, mprice: 400 }],
    selectid:0,
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 积分列表
    bases.getrequst('api/recharge/list').then(function(res){
      console.log(res)
      that.setData({benefit:res.data})
    })
    // 活动信息
    bases.activelist().then(function (res) {
      console.log(res.data[0])
      that.setData({ list: res.data[0] })
    })
  },
  // 选择优惠
  bnft:function(e){
    var idx = e.currentTarget.dataset.idx
    this.setData({ selectid: idx })
  },
  // 支付
  pay:function(){
    var idx = this.data.selectid
    var benefit = this.data.benefit
    //console.log('支付信息', benefit[idx].id);
    var that = this
    bases.postrequst('api/recharge/pay', { openid: wx.getStorageSync('openid'),recharge_id:benefit[idx].id}).then(function(res){
      that.wxpay(res.data)
    })
  },
  // 微信小程序支付方式
  wxpay: function (data) {
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success(res) {
        wx.showToast({ title: '支付成功', icon:'success'})
        // 支付成功
      },
      fail(res) {
        //console.log(res)
        wx.showToast({ title: '支付失败',icon:'loading'})
        // 支付失败
      }
    })
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