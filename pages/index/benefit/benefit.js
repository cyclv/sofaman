// pages/index/benefit/benefit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    benefit: [{ id: 1, price: 10, mprice: 200 }, {id:2,price:10, mprice: 400 }],
    selectid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log('支付信息', benefit[idx])
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