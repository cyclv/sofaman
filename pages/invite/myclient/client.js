// pages/invite/myclient/client.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[{id:1,name:'张飞',img:'../../../imgs/benefit.png',time:'2018-05-20'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    bases.getrequst('api/customer',{openid:wx.getStorageSync('openid')}).then(function(res){
      console.log(res)
      if(res.code == 1003){
        console.log('暂无数据')
        that.setData({ info: '' })
      }else if (res.code == 200){
        that.setData({ info:res.data.list})
      }
    })
  },
  clientdt:function(e){
    var info = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '/pages/invite/mclientdt/clientdt?info=' + JSON.stringify(info),
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