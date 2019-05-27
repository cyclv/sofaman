// pages/shopcar/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordercl: [{ id: 1, name: '所有订单' },{id: 1, name: '待支付' }, { id: 1, name: '待收货' },{ id: 1,name:'待评价'}],
    selectcl:0,
    carts: [
      { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", goodsimage: '../../../imgs/test/good.jpg', status: 1 },
      { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", goodsimage: '../../../imgs/test/good.jpg', status: 1 }
    ],
    orderinfo:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.idx)
  },
  ordercl:function(e){
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    this.setData({selectcl:idx})
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