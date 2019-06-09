// pages/wxinfo/wxinfo.js
var bases = require('../../utils/base.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo: function (e) {
    var userinfo = e.detail.userInfo;
    let user = wx.getStorageSync('openid')
    let parentid = wx.getStorageSync('parentid')
    console.log(user,userinfo)
    // 用户注册封装
    bases.postrequst('api/login', { openid: user, avatar: userinfo.avatarUrl, nickname: userinfo.nickName, parent_id:parentid}).then(function (res) {
      console.log('用户信息',res.data.user)
      if (res.data.user) {
        wx.setStorageSync('userinfo', res.data.user);
        wx.navigateBack({
          delta: 2,
        })
      } else {
        wx.navigateBack({
          delta: 2,
        })
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