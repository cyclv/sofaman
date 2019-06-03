// pages/goodsdt/goodsdt.js
const bases = require('../../utils/base.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsinfo:'', //商品信息
    goodsdt:false, //商品规格弹框
    buytype: 1, //购买类型
    sku: 1, //规格的id
    color: 1, //颜色的id
    color_image:'',
    slider:true,
    goods_num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    bases.getrequst('api/goods/detail', {goods_id:options.goods}).then(function(res){
      console.log('商品信息',res.data)
      that.setData({ goodsinfo: res.data})
    })
  },
  imageload:function(e){
    //console.log('加载完成',e.currentTarget.dataset.idx)
  },
  // 立刻购买
  buynow:function(e){
    const type = e.currentTarget.dataset.type
    this.setData({goodsdt:true,buytype: type})
  },
  //尺寸选择
  slsize:function(e){
    var item = e.currentTarget.dataset.item
    //console.log('规格选择信息',item)
    this.setData({sku:item})
  },
  // 颜色选择
  slcolor: function (e) {
    var item = e.currentTarget.dataset.item
    //console.log('颜色选择信息',item)
    this.setData({ color: item,'goodsinfo.goods.image':item.color_image})
  },
  // 关闭选择规格
  closegoodsdt:function(){
    this.setData({ goodsdt: false })
  },
  //商品收藏/api/collect/add
  collect:function(){
    var openid  = wx.getStorageSync('openid')
    console.log(this.data.goodsinfo.goods.id)
    bases.goodscollect({ openid: openid, goods_id: this.data.goodsinfo.goods.id}).then(function(res){
      if(res.code == 200){
        wx.showToast({title: '收藏成功',})
      }
    })
  },
  //购买按钮
  payinfo:function(e){
    const type = this.data.buytype
    const sku = this.data.sku
    const color = this.data.color
    if (!color.id){
      wx.showToast({ title: '选择颜色', icon: 'loading'})
    }else if (!sku.id){
      wx.showToast({ title: '请选择尺寸',icon:'loading'})
    }else if(type == 1){
      const data = { openid: wx.getStorageSync('openid'), goods_id: color.goods_id, sku_id: sku.id, color_id: color.id }
      this.addshopcar(data)
    } else if (type == 2) {
      
      const gdsinfo = this.data.goodsinfo
      gdsinfo.sku = sku
      gdsinfo.color = color
      gdsinfo.goods.goods_num = this.data.goods_num
      console.log(JSON.stringify(gdsinfo))
      wx.navigateTo({ url: '/pages/shopcar/payod/payod?gdsinfo=' + JSON.stringify(gdsinfo)})
    }
  },

  // 加入购物车函数
  addshopcar:function(data){
    const that = this
    bases.postrequst('/api/shopcar/add',data).then(function(res){
      console.log('加入购物车情况',res)
      if(res.code == 200){
        wx.showToast({title: '成功加入购物车',})
        that.setData({ goodsdt: false})
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 减号
  bindMinus: function () {
    var num = this.data.goods_num
    if(num > 1){
      this.setData({ goods_num: num - 1 })
    }else{
      wx.showToast({
        title: '数量不能小于1',icon:'loading'
      })
    }
  },
  // 加号
  bindPlus:function(){
    var num = this.data.goods_num
    this.setData({ goods_num: num + 1})
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