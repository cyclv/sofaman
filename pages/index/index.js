//index.js
//获取应用实例
const app = getApp()
const base = require('../../utils/base.js')
Page({
  data: {
    imgUrls: [
      { id: 1, img: '../../imgs/top1.png', type: 1, pid: 2 }, 
      { id: 2, img: '../../imgs/top2.png', type: 2, pid: 2 }, 
      { id: 3, img: '../../imgs/top3.png', type: 1, pid: 2 }
    ],
    goodcl: [], //商品分类
    apply: [
      { id: 1, img: '../../imgs/user/index.png', text: '充值钜惠', src: '../index/benefit/benefit' },
      { id: 1, img: '../../imgs/user/user6.png', text: '客服中心', src: '../index/service/service' },
    ],
    goodsinfo: [], //商品列表
    classifyi:0
  },
  //轮播点击事件
  sliderbtn: function(e) {
    var info = e.currentTarget.dataset.item
    console.log(info)
    if (info.type == 1){
      wx.navigateTo({
        url:'/pages/index/benefit/benefit'
      })
    } else if (info.type == 2){
      wx.navigateTo({
        url:'/pages/goodsdt/goodsdt'
      })
    }else{
      console.log('没有跳转')
    }
  },
  onLoad: function () {
    const that = this
    base.ifuser();
    // 轮播请求
    base.getrequst('api/home/banner').then(function (res){
      //console.log(res.data)
    })
    // 分类请求
    base.getrequst('api/goods/class').then(function (res) {
      //console.log('分类',res.data)
      that.setData({ goodcl:res.data.list})
      //查询商品信息
      that.goosinfo(res.data.list[0].id, 1)
    })
  },
  // 商品信息查询api/goods/list
  goosinfo:function(id,page){
    const that = this
    base.getrequst('api/goods/list', {class_id:id,page:page,size:10}).then(function (res) {
      console.log('商品信息', res.data)
      that.setData({ goodsinfo: res.data.list })
    })
  },
  // 分类点击事件
  cbt:function(e){
    var idx = e.currentTarget.dataset;
    this.setData({classifyi:idx.idx})
    this.goosinfo(idx.id, 1)  //查询商品请求
  },
  // icon进入详情
  iconbt:function(e){
    var src = e.currentTarget.dataset.src;
    wx.navigateTo({ url: src})
  },
  // 进入商品详情
  detailInto:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsdt/goodsdt?goods=' + id
    })
  },
  getUserInfo: function(e) {
    
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
  // 页面下拉到底
  onReachBottom:function (){
    console.log(111)
  }
})
