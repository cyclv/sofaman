// pages/shopcar/paysod/payod.js
const bases = require('../../../utils/base.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcar:'',
    address:'',
    paynow:true,
    gdsinfo:'',
    total:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options )
    if (options.gdsinfo){
      var gdsinfo = JSON.parse(options.gdsinfo)
      this.setData({ paynow: false, gdsinfo: gdsinfo})
      this.sum()
    }else{
      this.selectgoods()
    }
  },
  // 查询购物车
  selectgoods:function(){
    const that = this
    bases.getrequst('api/shopcar/js', { openid: wx.getStorageSync('openid'), js_type: 'shopcar' }).then(function (res) {
      if (res.code == 200) { that.setData({ paynow: true,shopcar: res.data }) }
    })
  },
  // 购车地址跳转
  addaddress:function(){
    wx.navigateTo({
      url: '/pages/user/useradsadd/useradsadd',
    })
  },
  //sum计算价格
  sum:function(){
    const gdsinfo = this.data.gdsinfo
    const price = gdsinfo.sku.sku_price
    const num = gdsinfo.sku.sku_price
    this.setData({ total: price * num})
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
    this.addresssl()
  },
  // 收货地址
  addresssl:function(){
    const that = this
    bases.getrequst('api/address/selected',{openid:wx.getStorageSync('openid')}).then(function(res){
      console.log(res.data)
      if(res.code == 200){that.setData({address:res.data.address})}
    })
  },
  pay:function(){
    const adid = this.data.address.id
    bases.postrequst('api/order/add', { openid: wx.getStorageSync('openid'), address_id: adid, payment:'wechat'}).then(function(res){
      console.log(res)
    })
  },
  paytwo:function(){
    const adid = this.data.address.id
    const gdif = this.data.gdsinfo 
    console.log(gdif)
    const data = { openid: wx.getStorageSync('openid'), address_id: adid, payment: 'wechat',
      goods_id: gdif.sku.goods_id, sku_id: gdif.sku.id, color_id: gdif.color.id, goods_num: gdif.goods.goods_num}
    console.log(data)
    bases.postrequst('api/order/buy',data).then(function (res) {
      console.log(res)
    })
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