// pages/shopcar/order/order.js
const bases = require('../../../utils/base.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordercl: [{ id: 'all', name: '所有订单' }, { id: 0, name: '待支付' }, { id: 1, name: '待发货' }, { id: 2, name: '待收货' },{ id: 3,name:'待评价'}],
    selectcl:0,
    carts:'',
    orderinfo:true,
    wuliu:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.idx)
    this.selectod('all')
  },
  // 订单分类点击时间
  ordercl:function(e){
    var dataset = e.currentTarget.dataset
    this.setData({ selectcl:dataset.idx})
    this.selectod(dataset.id)
  },
  //订单信息查询
  selectod:function(idx){
    const that = this
    bases.getrequst('api/order/list', { openid: wx.getStorageSync('openid'), status: idx, page: 1, size: 10 }).then(function (res) {
      //console.log(res)
      if (res.code == 200){
        that.setData({ orderinfo:true,carts: res.data.data })
      }else if (res.code == 1003){
        that.setData({orderinfo:false})
      }
    })
  },
  // 再次付款
  payagin:function(e){
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/shopcar/payagain/payagain?odid=' + data.odid,
    })
  },
  // 取消订单colsepay
  colsepay: function (e) {
    var that = this
    var data = e.currentTarget.dataset
    bases.postrequst('api/order/close',{order_id:data.odid}).then(function (res) {
      if (res.code == 200) {
        that.selectod('all')
      } 
    })
  },
  //确认收货
  already:function(e){
    var data = e.currentTarget.dataset
    bases.postrequst('api/order/receipt', { order_id: data.odid }).then(function (res) {
      console.log(res)
    })
  },
  // 物流
  wuliu: function(info){
    console.log(info.currentTarget.dataset.odid)
    this.setData({ wuliu: info.currentTarget.dataset.odid}) 
  },
  closewl:function(){
    this.setData({ wuliu: false})
  },
  // 追评
  evaluate:function(e){
    var data = e.currentTarget.dataset
    wx.navigateTo({url: '/pages/shopcar/evaluate/evaluate?odid=' + data.odid,})
  },
  fuzhi:function(){
    wx.setClipboardData({
      data: this.data.wuliu.express_code,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  },
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