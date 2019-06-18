// pages/user/myintegral/index.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[
      {id:1,title:'充值积分',size:'80',time:'2018-05-20 11:20',type:'审核通过'},
      { id: 2, title: '邀请新商户', size: '80', time: '2018-05-20 11:20', type: '审核中' }  
    ],
    userct:'',
    ctselect:1,
    userinfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo')
    //console.log(userinfo)
    this.setData({ userinfo:userinfo})
    var that = this;
    bases.postrequst('api/bill/list',{openid:wx.getStorageSync('openid')}).then(function(res){
      console.log('消费记录',res.data)
      if(res.code = 200){
        that.setData({ userct: res.data, content: res.data.record.list})
      }
    })
  },
  ctbind:function(e){
    var idx = e.currentTarget.dataset.idx
    
    if(idx == 1){
      this.setData({ ctselect: idx, content: this.data.userct.record.list})
    }else{
      console.log(this.data.userct.bill.list,this.data.userct.record.list, idx)
      this.setData({ ctselect:idx, content: this.data.userct.bill.list})
    }
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