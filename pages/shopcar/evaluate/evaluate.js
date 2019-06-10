// pages/shopcar/evaluate/evaluate.js
const bases = require('../../../utils/base.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    order_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.odid)
    if (options.odid){
      this.setData({order_id: options.odid})
    }
  },
  ctbind:function(e){
    console.log(e.currentTarget.dataset.idx)
    var idx = e.currentTarget.dataset.idx;
    this.setData({ select: idx})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  frombtn:function(e){
    console.log(e.detail.value)
    var info = e.detail.value
    bases.postrequst('api/order/pingjia/add', { order_id: this.data.order_id, content: info.content}).then(function(res){
      console.log(res)
    })
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