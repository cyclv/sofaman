//post 封装请求
function postrequst(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url:'https://api.lyworker.com/' + url,
      data: data,
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      method: "POST",
      success: function (res) {
        // console.log(res)
        resolve(res.data)
      }
    })
  })
}
// get 封装请求
function getrequst(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.lyworker.com/' + url,
      data: data,
      header: {'content-type': 'application/json'},
      method: "GET",
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
// 商品收藏取消收藏
function goodscollect(data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.lyworker.com/api/collect/add',
      data: data,
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      method: "POST",
      success: function (res) {resolve(res.data)}
    })
  })
}
// get 活动列表
function activelist(url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.lyworker.com/api/activity/list',
      data: data,
      header: { 'content-type': 'application/json' },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
// get 用户信息更新
function updatauser() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.lyworker.com/api/user',
      data: { openid:wx.getStorageSync('openid') },
      header: { 'content-type': 'application/json' },
      method: "GET",
      success: function (res) {
        resolve(res)
        if (res.code == 200) { wx.setStorageSync('userinfo', res.data) }
      }
    })
  })
}
// 微信alert
function wxzhifu(){
  wx.showModal({
    title: '成功',
    content: '支付成功',
    cancelText:'回到首页',
    confirmText:'查看订单',
    success(res) {
      if (res.confirm) {
        wx.navigateTo({ url: '/pages/shopcar/order/order' })
      } else if (res.cancel) {
        wx.switchTab({ url: '/pages/index/index' })
      }
    }
  })
}
module.exports = {
  postrequst: postrequst,
  getrequst: getrequst,
  goodscollect:goodscollect,
  activelist: activelist,
  updatauser: updatauser,
  wxzhifu: wxzhifu
}