 // pages/invite/invite.js
const bases = require('../..//utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [{ id: 1, name: '张飞', img: '../../../imgs/benefit.png',time: '2018-05-20' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    bases.activelist().then(function (res) {
      //console.log(res.data[0])
      that.setData({ list: res.data[1] })
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
    var user = wx.get
    return {
      title: '让您的店铺赚钱的神器',
      path: '/pages/index/index?parentid=' + JSON.stringify(this.data.item),
      success: function (res) {
        console.log(res)
      }
    }
  }
})