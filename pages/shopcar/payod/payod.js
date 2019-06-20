// pages/shopcar/paysod/payod.js
const bases = require('../../../utils/base.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usinfo: wx.getStorageSync('userinfo'),
    shopcar:'',
    address:'',
    paynow:true,
    gdsinfo:'',
    total:'',
    integral:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.gdsinfo){
      var gdsinfo = JSON.parse(options.gdsinfo)
      //console.log(gdsinfo)
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
      //console.log('我的购物车商品',res)
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
    const num = gdsinfo.goods.goods_num
    const usinfo = wx.getStorageSync('userinfo')
    this.setData({ total: price * num, usinfo: usinfo, integral: price * num * 2.5})
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
      //console.log(res.data)
      if(res.code == 200){that.setData({address:res.data.address})}
    })
  },
  //购物车购买
  pay:function(e){
    var that = this
    const adid = this.data.address.id
    const type = e.currentTarget.dataset.type
    const data = { openid: wx.getStorageSync('openid'), address_id: adid, payment: type}
    //console.log(data)
    if(adid){
      bases.postrequst('api/order/add', data).then(function (res) {
        //console.log(res)
        if (type == 'wechat') {
          that.wxpay('支付情况', res.data)
        } else {
          // 积分购买
          //console.log('积分购买', res.code)
          if (res.code == 1022) {
            wx.showToast({ title: '积分不足', icon: 'loading', duration: 500 })
          }else if(res.code == 200){
            bases.wxzhifu()
          }
        }
      })
    }else{
      wx.showToast({
        title: '请选择收获地址', icon: 'loading'
      })
    }
    
  },
  // 直接购买
  paytwo: function(e){
    const type = e.currentTarget.dataset.type
    //console.log(type)
    const adid = this.data.address.id
    const gdif = this.data.gdsinfo 
    var that = this
    const data = {openid: wx.getStorageSync('openid'), address_id: adid, payment: type,goods_id: gdif.sku.goods_id, sku_id: gdif.sku.id, color_id: gdif.color.id, goods_num: gdif.goods.goods_num}
    //console.log(data)
    if (adid){
      bases.postrequst('api/order/buy',data).then(function (res) {
        //console.log(res)
        if (type == 'wechat') {
          that.wxpay(res.data)
        }else {
          // 积分购买
          console.log('积分购买')
          if (res.code == 1022) {
            wx.showToast({ title: '积分不足', icon: 'loading', duration: 500 })
          }else if(res.code == 200){
            bases.wxzhifu()
          }
        }
      })
    }else{
      wx.showToast({
        title: '请选择收获地址', icon: 'loading'
      })
    }
  },
  // 微信小程序支付方式
  wxpay:function(data){
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success(res) { 
        //console.log(res)
        wx.showToast({ title: '支付成功', icon: 'success', duration: 500 })
        // 支付成功
      },
      fail(res) {
        //console.log(res)
        // 支付失败
        wx.showToast({ title: '支付失败', icon: 'loading', duration: 500 })
      }
    })
  },
  // 积分支付

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