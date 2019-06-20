// pages/goodsdt/pingjia/pingjia.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingjia:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goodsid)
    const that = this
    bases.getrequst('api/goods/eavluate', { id: options.goodsid, page: 1, size: 1 }).then(function (res) {
      console.log('评价信息', res.data)
      if (res.code == 200) {
        that.setData({ pingjia: res.data.data})
      } else if (res.code == 1003) {
        that.setData({ pingjia: false })
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