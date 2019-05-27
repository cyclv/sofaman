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
    goodcl: [{ id: 1, name: '全部' }, { id: 1, name: '新品' }, { id: 1, name: '墩子' }, { id: 1, name: '窗帘盒' }],
    apply: [
      { id: 1, img: '../../imgs/user/index.png', text: '充值钜惠', src: '../index/benefit/benefit' },
      { id: 1, img: '../../imgs/user/user6.png', text: '客服中心', src: '../index/service/service' },
    ],
    goodsinfo: [
      { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", activityprice: "1.00", goodsimage:'../../imgs/test/good.jpg'},
      { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", activityprice: "1.00", goodsimage: '../../imgs/test/good1.jpg' },
      { id: "80", goodsname: "轻奢后现代设计师定制换鞋凳不锈钢圆凳子北欧创意沙发等小墩子", price: "1400.00", activityprice: "1.00", goodsimage: '../../imgs/test/good2.jpg' }
      ],
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
    // 轮播请求
    base.getrequst('api/home/banner').then(function (res){
      //console.log(res.data)
    })
  },
  // 分类点击事件
  cbt:function(e){
    //console.log(e.currentTarget.dataset.idx)
    var idx = e.currentTarget.dataset.idx;
    this.setData({classifyi:idx})
  },
  // icon进入详情
  iconbt:function(e){
    var src = e.currentTarget.dataset.src;
    wx.navigateTo({ url: src})
  },
  // 进入商品详情
  detailInto:function(){
    wx.navigateTo({
      url: '../goodsdt/goodsdt'
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
