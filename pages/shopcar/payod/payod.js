// pages/shopcar/paysod/payod.js
const bases = require('../../../utils/base.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcar:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    bases.getrequst('api/shopcar/js', { openid: wx.getStorageSync('openid'), js_type:'shopcar'}).then(function (res) {
      console.log(res)
      if (res.code == 200) { that.setData({ shopcar: res.data }) }
    })
  },
  addaddress:function(){
    wx.navigateTo({
      url: '/pages/user/useradsadd/useradsadd',
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
    this.addresssl()
  },
  // 收货地址
  addresssl:function(){
    const that = this
    bases.getrequst('api/address/selected',{openid:wx.getStorageSync('openid')}).then(function(res){
      console.log(res.data)
      if(res.code == 200){that.setData({address:res.data.address})}
    })
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