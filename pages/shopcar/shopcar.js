var app = getApp();
Page({

  data: {
    carts: [
      {
        id: "1", selected: true, uid: "17", goodsid: "80", num: "1", price: "1400.00", goods: { id: "80", goodsname:"轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子",price:"1400.00",goodsimage:'../../imgs/test/good.jpg',status:1}
      },
      {
        id: "2", selected: true, uid: "17", goodsid: "80", num: "1", price: "1400.00", goods: { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", goodsimage: '../../imgs/test/good1.jpg', status: 1 }
      }
      ],

    // 实现bindSelectAll事件，改变全选状态
    selectedAllStatus: true,
    total: 0,
    //  页面打开时的短暂加载数据初始化1
    newload: '',
    minusStatuses: "disabled",
    //判断购物车是否为空时的页面
    hasList: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      hasList: true
    })
    this.sum()
  },

  // -------------------------------------------------------------------------------
  //  页面打开时的短暂加载函数3
  newload: function () {
    wx.showLoading({
      title: '加载中',
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 500);
  },
  //   // 减号被禁用时在初始化数据函数
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
  bindMinus: function (e) {
    console.log(e.currentTarget.dataset)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    var sum = this.data.carts[index].sum;
    var price = this.data.carts[index].price;
    // console.log(1);
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = (num <= 1 ? 'disabled' : 'normal');
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
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
  bindPlus: function (e) {
    console.log(e.currentTarget.dataset)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    var sum = this.data.carts[index].sum;
    var price = this.data.carts[index].price;
    // console.log(num);
    // 自增
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = (num <= 1) ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
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
  bindManual: function (e) {
    // console.log(e.detail.value)
    var cheValue = e.detail.value;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    var sum = this.data.carts[index].sum;
    var price = this.data.carts[index].price;
    // console.log(num);

    if (cheValue == '' || cheValue == 0) {
      cheValue = 1
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = (cheValue <= 1) ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = cheValue;
    carts[index].sum = (cheValue * price).toFixed(1);
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;

    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    this.sum();
  },
  //   // -----------------------------------------------------------------------------------------
  // 商品单击复选框是否选中
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // console.log(carts[index].selected);
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
    this.sum();
  },
  //   // ---------------
  //   // 全选复选框是否选中
  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum();
  },
  // -----------------------------------------------------------------------------------------
  // 全选
  bindCheckout: function () {
    // 初始化toastStr字符串
    var toastStr = 'cid:';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].cid;
        toastStr += ' ';
      }
    }
    //存回data
    this.setData({
      // toastHidden: false,
      // toastStr: toastStr
    });
  },
  bindToastChange: function () {
    this.setData({
      // toastHidden: true
    });
  },
  // -----------------------------------------------------------------------------------------
  //  计算总的金额
  sum: function () {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }
    total = total.toFixed(2);
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
  // // 判断购物车已有商品是否有被选中
  // // 立即结算点击处理函数
  orderInto: function () {
    let che = { total: '', carts: '' }
    let that = this;
    let total = this.data.total;
    let carts = this.data.carts;
    let sel = [];
    for (var i = 0; i < carts.length; i++) {
      // selectedTotal += carts[i].selected;
      if (carts[i].selected) {
        sel.push(carts[i])
      }
    }
    carts = sel
    che.total = total;
    che.carts = carts;
    console.log(che)
    if (che.carts.length > 0) {
      wx.navigateTo({
        url: "/pages/shopcar/order/order?che=" + JSON.stringify(che)
      })
    } else {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // -----------------------------------------------------------




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let user = wx.getStorageSync('user');
  },
  // 加载数据
  shuaXin: function () {
    var that = this;
    var user = wx.getStorageSync('user')
    // console.log(user.id)
    // 初始化数据请求
    wx.request({
      url: app.globalData.bannerimg + 'index/shopcarSelectByUid',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: user.id,
      },
      success: function (res) {
        let result = res.data;
        console.log(result)
        // 把数据中的selected :‘true’ 变温布尔
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            result[i].selected = true;
          }
          that.setData({
            carts: result,
            hasList: true
          });
          // 加载弹框
          that.newload();
          // 减号被禁用时在初始化数据函
          that.minusStatuses();
          //  计算总的金额
          that.sum();
        } else {
          that.setData({
            carts: result,
            hasList: false
          });

        }
      }
    });
  },
})