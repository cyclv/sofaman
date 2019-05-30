//app.js
const dunge = require('utils/base.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res.code)
        dunge.getrequst('api/openid', { js_code: res.code}).then(function(res){
          //console.log(res.data.openid.openid)
          wx.setStorageSync('openid', res.data.openid.openid)
          dunge.getrequst('api/user', { openid: res.data.openid.openid}).then(function (res) {
            //console.log('用户信息', res.data)
            if(res.code == 200){wx.setStorageSync('userinfo', res.data)}
            else {
              wx.setStorageSync('userinfo', false)
              wx.navigateTo({url: '/pages/wxinfo/wxinfo',})}
          })
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})