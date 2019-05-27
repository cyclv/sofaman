// pages/goodsdt/goodsdt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../imgs/test/good.jpg',
      '../../imgs/test/good1.jpg',
      '../../imgs/test/good2.jpg'
    ],
    goodsdt:false, //商品规格弹框
    sizei: '', //规格的id
    colori: '', //颜色的id
    size: [{ id: 1, name: '大号' }, { id: 1, name: '中号' }, { id: 1, name: '小号' }],
    color: [{id: 1,name:'白色' },{id: 1,name:'蓝色' }, { id: 1, name: '深色'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 立刻购买
  buynow:function(){
    console.log(111)
    this.setData({goodsdt:true})
  },
  //尺寸选择
  slsize:function(e){
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    this.setData({sizei:idx})
  },
  slcolor: function (e) {
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    this.setData({ colori: idx })
  },
  // 关闭选择规格
  closegoodsdt:function(){
    this.setData({ goodsdt: false })
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