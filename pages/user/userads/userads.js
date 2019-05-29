// pages/user/userads/userads.js
const bases = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ address_id: 8, user_id: 59, consignee: "曹义超", mobile: '17858412499', provincename: '杭州市,江干区,汽车北站', is_top:true}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 编辑地址
  addressdt:function(e){
    const address = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../useradsadd/useradsadd?address=' + JSON.stringify(address),
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    const openid = wx.getStorageSync('openid')
    bases.getrequst('api/address/list', { openid: openid }).then(function (res) {
      //console.log(res)
      if (res.code == 1103) {
        //console.log('没有数据')
      } else if (res.code == 200) {
        that.setData({ list: res.data.list })
      }
    })
  },
  // 设置默认地址
  radioChange:function(e){
    //console.log('地址id', e.detail.value)
    bases.getrequst('api/address/default',{id:e.detail.value}).then(function (res) {
      //console.log(res)
      if (res.code == 200) {
        wx.showToast({title:'设置为默认地址',mask:true,icon:'success',duration:500})
      }
    })
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