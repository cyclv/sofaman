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
    wx.showLoading({title: '玩命加载中',})
    this.selectshopcar()
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
    console.log(e.currentTarget.dataset)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].goods_num;
    var sum = this.data.carts[index].goods_sum;
    var price = this.data.carts[index].amount;
    // console.log(1);
    // 如果只有1件了，就不允许再减了
    if (num > 1) {num--;}
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = (num <= 1 ? 'disabled' : 'normal');
    // 购物车数据
    var carts = this.data.carts;
    carts[index].goods_num = num;
    carts[index].sum = (num * price).toFixed(1);
    // 按钮可用状态
    // var minusStatuses = this.data.minusStatuses;
    // minusStatuses[index] = minusStatus;
    // 将数值与状态写回
    this.setData({
      carts: carts,
      // minusStatuses: minusStatuses
    });
    this.sum();
  },
  // 加号
  bindPlus: function (e) {
    var shopcarid = parseInt(e.currentTarget.dataset.id);
    bases.postrequst('api/shopcar/add', {id: shopcarid, value:'puls'}).then(function(res){
      console.log(res)
    })
    this.sum();
  },
  
  // 商品单击复选框是否选中
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    //console.log(carts[index].selected);
    // 写回经点击修改后的数组
    this.checkbox(carts)
    this.setData({carts: carts});
    this.sum();
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
    var carts = this.data.carts;
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;// 取反操作
    // 遍历
    for (var i = 0; i < carts.length; i++) {carts[i].selected = selectedAllStatus;}
    this.setData({selectedAllStatus: selectedAllStatus,carts:carts});
    this.sum();
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
    //console.log('总计',total)
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: total
    });
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
        url: "/pages/shopcar/payod/payod?shopcar=" + JSON.stringify(che)
      })
    } else {
      wx.showToast({title: '请选择要结算的商品',icon: 'success',duration: 2000})
    }
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 删除我的商品api/shopcar/delete
  deleteList:function(e){
    bases.getrequst('api/shopcar/delete',{id:e.currentTarget.dataset.id}).then(function(res){
      console.log(res)
    })
  },
  //查询购物车封装
  selectshopcar:function(){
    const that =this
    bases.getrequst('api/shopcar/list', { openid: wx.getStorageSync('openid') }).then(function (res) {
      console.log(res)
      if(res.code == 200){
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].selected = true;
        }
        that.setData({ carts: res.data, hasList: true })
        wx.hideLoading()
        that.sum()
      }else{
        that.setData({ hasList: false })
      }
    })
  }
})