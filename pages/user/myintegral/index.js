// pages/user/myintegral/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[
      {id:1,title:'充值积分',size:'80',time:'2018-05-20 11:20',type:'审核通过'},
      { id: 2, title: '邀请新商户', size: '80', time: '2018-05-20 11:20', type: '审核中' }  
    ],
    content1:[
      {id:1,title:'充值积分',size:'80',time:'2018-05-20 11:20',type:'审核通过'},
      { id: 2, title: '邀请新商户', size: '80', time: '2018-05-20 11:20', type: '审核中' }  
    ],
    content2: [
      { id: 1, title: '购买商品', size: '1200', time: '2018-05-20 11:20'},
      { id: 2, title: '购买商品', size: '660', time: '2018-05-20 11:20'}
    ],
    ctselect:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ctbind:function(e){
    var idx = e.currentTarget.dataset.idx
    if(idx == 1){
      this.setData({ ctselect: idx, content: this.data.content1})
    }else{
      this.setData({ ctselect: idx, content:this.data.content2})
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