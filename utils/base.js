//post 封装请求
function postrequst(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url:'http://dunge.lyworker.com/' + url,
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
      url: 'http://dunge.lyworker.com/' + url,
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
      url: 'http://dunge.lyworker.com/api/collect/add',
      data: data,
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      method: "POST",
      success: function (res) {resolve(res.data)}
    })
  })
}
// 用户是否需要授权
function ifuser() {
  if (!wx.getStorageSync('userinfo')){
    wx.navigateTo({
      url: '/pages/wxinfo/wxinfo',
    })
  }
}
module.exports = {
  postrequst: postrequst,
  getrequst: getrequst,
  goodscollect:goodscollect,
  ifuser: ifuser
}