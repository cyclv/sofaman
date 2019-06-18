// pages/goodsdt/goodscx/goodscx.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom:0,
    goodsinfo:1,
    pagesize:1,
    goodsnm:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    console.log(e.detail.value.goodsnm)
    var goodsnm = e.detail.value.goodsnm;
    if (goodsnm) {
      const that = this
      bases.getrequst('api/goods/list', { goods_name: goodsnm, page: this.data.pagesize,size:6}).then(function (res) {
        console.log('商品信息', res.data)
        that.setData({ goodsinfo: res.data.list, goodsnm:goodsnm})
      })
    }else{
      wx.showToast({
        title: '请输入内容', icon: 'loading'
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 进入商品详情
  detailInto: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goodsdt/goodsdt?goods=' + id
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
    var goodsnm = this.data.goodsnm
    var pagesize = this.data.pagesize + 1
    console.log(goodsnm, pagesize)
    const that = this
    bases.getrequst('api/goods/list', { class_name: goodsnm, page: pagesize, size: 6 }).then(function (res) {
      if (res.data.list.length > 0) {
        var newdata = res.data.list
        var goods = that.data.goodsinfo
        console.log(newdata)
        for (var i = 0; i < newdata.length; i++) {
          goods.push(newdata[i])
        }
        console.log('合并后的数据', goods)
        that.setData({ bottom: 1, goodsinfo: goods, pagesize: pagesize++ })
      } else {
        console.log('到底了')
        that.setData({ bottom: 2 })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})