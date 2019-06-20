var app = getApp();
const bases = require('../../utils/base.js');
Page({

  data: {
    carts: [],  //购物车列表
    selectedAllStatus: true, //全选状态
    total: 0,//购物车总金额
    minusStatuses: "disabled",
    hasList: 0  //判断购物车是否为空时的页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  // 减号被禁用时在初始化数据函数
  minusStatuses: function () {
    var minusStatuses = [];
    var length = this.data.carts.length;
    for (var i = 0; i < length; i++) {
      minusStatuses.push("disabled");
    }
    this.setData({
      minusStatuses: minusStatuses
    });
  },
  // 减号
  bindMinus: function (e) {
    const that = this
    var shopcarid = parseInt(e.currentTarget.dataset.id);
    bases.postrequst('api/shopcar/update', { id: shopcarid, value: 'minus' }).then(function (res) {
      that.selectshopcar()
    })
    //this.sum();
  },
  // 加号
  bindPlus: function (e) {
    const that = this
    var shopcarid = parseInt(e.currentTarget.dataset.id);
    bases.postrequst('api/shopcar/update', { id: shopcarid, value:'puls'}).then(function(res){
      that.selectshopcar()
    })
    // this.sum();
  },
  
  // 商品单击复选框是否选中
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var carts = this.data.carts[index];
    if (carts.selected == 0){
      this.selectedgoods({id:carts.id,operation:'yes'})
    }else{
      this.selectedgoods({ id: carts.id, operation: 'no' })
    }
  },
  // 单选控制全选
  checkbox: function(carts){
    var selectall = true;
    for (var i = 0; i < carts.length; i++) {
      if (!carts[i].selected){selectall = false}
    }
    this.setData({ selectedAllStatus: selectall });
  },
  //全选复选框是否选中
  bindSelectAll: function () {
    var selectedAllStatus = this.data.selectedAllStatus;
    //console.log(selectedAllStatus)
    if (selectedAllStatus) {
      this.selectedgoods({ id:'', operation: 'no' })
    } else {
      this.selectedgoods({ id: '', operation: 'yes' })
    }
  },
  // -----------------------------------------------------------------------------------------
  //  计算总的金额
  sum: function () {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].goods_num * carts[i].goods_sku.sku_price;
      }
    }
    total = total.toFixed(2);
    // 写回经点击修改后的价格
    this.setData({total: total});
  },
  // 回tabar中的首页
  tobackHome: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // // 立即结算点击处理函数
  orderInto: function () {
    let che = { total: '', carts: '' }
    let that = this;
    let total = this.data.total;
    let carts = this.data.carts;
    let sel = [];
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        sel.push(carts[i])
      }
    }
    carts = sel
    che.total = total;
    che.carts = carts;
    //console.log('订单信息', JSON.stringify(che))
    if (che.carts.length > 0) {
      wx.navigateTo({
        url: "/pages/shopcar/payod/payod"
      })
    } else {
      wx.showToast({title: '请选择要结算的商品',icon: 'success',duration: 2000})
    }
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({ title: '玩命加载中', })
    this.selectshopcar()
  },
  // 删除我的商品api/shopcar/delete
  deleteList:function(e){
    const that= this
    bases.getrequst('api/shopcar/delete',{id:e.currentTarget.dataset.id}).then(function(res){
      wx.showToast({title: '删除成功',})
      that.selectshopcar()
    })
  },
  //查询购物车封装
  selectshopcar:function(){
    const that =this
    bases.getrequst('api/shopcar/list', { openid: wx.getStorageSync('openid') }).then(function (res) {
      //console.log(res)
      if(res.code == 200){
        that.setData({ carts: res.data, hasList: true })
        that.checkbox(res.data)
        that.sum()
      }else{
        that.setData({ hasList: false })
      }
      wx.hideLoading()
    })
  },
  // 操作商品信息
  selectedgoods:function(data){
    const that = this
    bases.postrequst('api/shopcar/selected', { openid: wx.getStorageSync('openid'), id: data.id, operation: data.operation }).then(function (res) {
      if(res.code == 200){
        that.selectshopcar()
      }
    })
  }
})