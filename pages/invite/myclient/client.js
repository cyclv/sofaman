// pages/invite/invite.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
    var that = this;
    bases.getrequst('api/customer',{openid:userinfo.openid}).then(function (res) {
      console.log(res)
      if(res.code == 1003){
        that.setData({ info:''})
      } else if (res.code == 200){
        that.setData({ info: res.data.list })
      }
    })
  },
  clientdt:function(e){
    console.log(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '/pages/invite/mclientdt/clientdt?info=' + e.currentTarget.dataset.info
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
    var user = wx.getStorageSync('userinfo')
    console.log(user)
    return {
      title: '让您的店铺赚钱的神器',
      path: '/pages/index/index?parentid=' + user.id,
      success: function (res) {
        console.log(res)
      }
    }
  }
})